---
categories:
- Web Performance
- WordPress
date: '2017-09-18'
permalink: /how-i-improved-the-speed-of-my-wordpress-site-by-500/
title: How I improved the speed of my WordPress site by 500%
url: /2017/09/18/how-i-improved-the-speed-of-my-wordpress-site-by-500
---

Over the last few months, my [WordPress site](https://gomakethings.com) had gone from a rather snappy 700ms start render time to upwards of 3 or 4 seconds.

With a few small changes, I was able to get my start render time back down to 700ms. Today, I want to show you how I did it.

## The background

I've added a lot of plugins as I've focused on growing my business&mdash;[Easy Digital Downloads](easydigitaldownloads.com) and a handful of extensions, as well as some custom MailChimp API integration stuff I wrote to help grow my email list.

To find the culprit, I went through the long and annoying process of:

1. Deactivating every single plugin on my site,
2. Reactivating them one-at-a-time, and
3. Running a test on [WebPagetest](http://www.webpagetest.org/) each time until the time to first byte increased.

Here's what I found.

## Why time to first byte?

I use [DigitalOcean](https://m.do.co/c/08a079d9bd9a) for my hosting. They're amazing. Their servers are super affordable and super fast.

(*__PS:__ that link above is an affiliate link that gets you a $10 credit to try them out.*)

That said, a few of my plugins involve some heavier server processes that slow things down. With template-based CMS's like WordPress, running on inexpensive hosting, this can be a large source of latency.

I run a caching plugin to pre-render my template files into static HTML, but some plugins can turn this behavior off if they need to always render content dynamically.

## What I found

There were three plugins (written by me) that were causing almost all of my performance issues, and all three of them are form plugins that users can use to sign up for my newsletter or get details about my products.

To detect when they're submitted and make sure a robot isn't auto-submitting requests to a URL over and over again, I use the [`wp_nonce_field` API](https://codex.wordpress.org/Function_Reference/wp_nonce_field).

These fields are not compatible with caching, because they change in value every day or two. After that point, they'll stop working if users are served an older cached version of the file since the value won't match.

I include an email signup form on almost every page on my site, so for all intents and purposes, caching was turned off on my whole site.

## What I did

I ripped out `wp_nonce_field` from all of the plugin forms, and replaced them with a `[NAMESPACE]_submit_id` hidden field. Here's how that works.

First, I added this to each plugin. It creates a custom hash for our `*_submit_id` field to use.

```php
/**
 * Create a random submit string hash
 */
function PLUGIN_NAMESPACE_set_submit_string() {

	if ( empty( get_site_option( 'PLUGIN_NAMESPACE_submit_hash' ) ) ) {
		update_site_option( 'PLUGIN_NAMESPACE_submit_hash', wp_generate_password( 24, false ) );
	}

}
add_action( 'plugins_loaded', 'PLUGIN_NAMESPACE_set_submit_string' );
```

Then, in our form itself, we'll add a field with that hash as it's value.

```php
$form =
	'<form ...>' .
		'<input type="hidden" id="PLUGIN_NAMESPACE_submit" name="PLUGIN_NAMESPACE_submit" value="' . get_site_option( 'PLUGIN_NAMESPACE_submit_hash' ) . '">' .
		// Additional form stuff...
	'</form>';
```

Finally, on submit, we check that:

1. The field exists, and
2. The value matches our stored value.

```php
/**
 * Process the form
 */
function PLUGIN_NAMESPACE_process_form() {

	// Check that form was submitted
	if ( !isset( $_POST['PLUGIN_NAMESPACE_submit'] ) ) return;

	// Verify data came from proper screen
	if ( strcmp( $_POST['PLUGIN_NAMESPACE_submit'], get_site_option( 'PLUGIN_NAMESPACE_submit_hash' ) ) !== 0 ) return;

	// Do the rest of your form tasks...

}
add_action( 'init', 'PLUGIN_NAMESPACE_process_form' );
```

Now, the form can be cached.

## What about success and error messages?

The problem with caching the form, of course, is that users won't get success and error messages after their submission. There's a way to get around this.

Most WordPress caching plugins will ignore URLs with query strings in them, since they often impact the content that's generated. We can use that to our advantage to force an uncached version of the form after a submit.

```php
/**
 * Process the form
 */
function PLUGIN_NAMESPACE_process_form() {

	// Check that form was submitted
	if ( !isset( $_POST['PLUGIN_NAMESPACE_submit'] ) ) return;

	// Verify data came from proper screen
	if ( strcmp( $_POST['PLUGIN_NAMESPACE_submit'], get_site_option( 'PLUGIN_NAMESPACE_submit_hash' ) ) !== 0 ) return;

	// Create a cache-breaking URL
	$referrer = 'the-url-to-your-form.com'; // How you get this depends on how you've setup your plugin
	$status_redirect = add_query_arg( 'PLUGIN-NAMESPACE-form', 'submitted', $referrer );

	// Do the rest of your form tasks...

	// Redirect and break cache
	wp_safe_redirect( $status, 302 );
	exit;

}
add_action( 'init', 'PLUGIN_NAMESPACE_process_form' );
```

## Any downsides to this approach?

Because our hidden form field value never changes, someone who wants to spam your form could do so by repeatedly submitting to a static URL with form data.

However, because that field's value is being generated uniquely for your site and not shared across anyone who uses the plugin, someone needs to specifically target your site.

I also employ additional spam prevention measures like time-based and field-value based honeypots.

Now, my entire site is cached, and I'm seeing 700ms start render times again.