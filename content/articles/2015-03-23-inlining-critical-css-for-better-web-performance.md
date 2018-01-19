---
categories:
- Code
- CSS
- Design &amp; UX
- JavaScript
- Web Performance
date: '2015-03-23'
permalink: /inlining-critical-css-for-better-web-performance/
title: Inlining critical CSS for better web performance
url: /2015/03/23/inlining-critical-css-for-better-web-performance
---

Last summer, I tried to implement [some performance tweaks to my site](https://gomakethings.com/how-to-build-wicked-fast-rwd-sites/) that I hoped would push it below the 500ms mark (just half a second) for displaying content to visitors. I failed miserably.

At the time, my site was already displaying content after 700ms, but the updates I made were *increasing* start render time rather than reducing it.

Last week, I took another shot at it and succeeded. My site now starts rendering content in about 400-500ms, a 40-percent reduction. Here's how I did it.

<!--more-->

## The starting point and what numbers to look at

I test my site's performance using [WebPageTest.org](http://www.webpagetest.org/). Historically, developers have looked at load time as the key metric for performance. While it's somewhat important, there are two that matter a lot more:

* Time to First Byte, which tells you how quickly your server is sending data back to the browser after a user types in your URL.
* Time to Start Render, which is how quickly the browser begins displaying content to your visitor after they type in your URL.

First byte is typically server related, while first render is largely a matter of how you structure your CSS and markup&mdash;though obviously a slow time to first byte will impact your time to start render. This article will be largely focused on start render time, though I will touch briefly on time to first byte near the end.

### My website's baseline performance

|                                                          | First View | Subsequent Views |
|----------------------------------------------------------|------------|------------------|
| Landing Page                                             | ~950ms     | ~700ms           |
| [Blog](http://www.webpagetest.org/result/140803_WF_NSQ/) | 711ms      | 322ms            |

***Note:*** *I don't have the exact numbers on the landing page because I forgot to save the test before making my updates.*

## The Strategy

I'd already done quite a bit to [improve the performance of this site](https://gomakethings.com/wicked-fast-websites/).

Your stylesheet is neccessary for rendering content properly, but while it's being downloaded and parsed, it also blocks any rendering from happening. To get around this challenge, an emerging technique recommended by both [Google](https://developers.google.com/speed/pagespeed/service/PrioritizeCriticalCss) and [Filament Group](http://www.filamentgroup.com/lab/performance-rwd.html) is to inline your critical path CSS. Yes, that's right. Inline your CSS.

It works like this:

1. Extract the styles that apply to above-the-fold content and load them inline in the `<head>`.
2. Load your full stylesheet asynchronously so that the rest of your page can continue downloading and rendering.

Sounds wacky, but it makes a big difference.

## How to decide what to inline

When I mentioned this technique to a few folks on Twitter, the most common question was how I decided what to inline.

If you use a JS task runner like Gulp or Grunt, there are a few plugins you can use to automate this: [Critical by Addy Osmani](https://github.com/addyosmani/critical) and [Critical CSS by Filament Group](https://github.com/filamentgroup/criticalCSS). Addy also created [an online generator](http://jonassebastianohlsson.com/criticalpathcssgenerator/) if command line isn't thing.

**I didn't use any of these.**

I tried using them, and found that they often left out styles important for rendering layout on smaller or taller viewports (as in, my iPhone), so I created my critical CSS manually. Easier than you'd think!

### Using Sass

If you still write vanilla CSS, this may be a fair bit harder. Because I work with Sass and keep my all of [my components in their own modular files](https://github.com/cferdinandi/kraken), doing this manually was a breeze.

I import all off my Sass components into a `main.scss` file. I created a second file, `critical.scss`, and used it to import just the critical path components, eliminating any need to write code twice or do lots of copy-and-pasting.

Here are the components I included:

* Normalize.css
* My grid system
* Typography basics
* Button styling
* SVG styles for my icons
* Navigation styles
* Utility classes

### The magic number

All told, my critical path CSS was about 9kb minified, closer to 3kb after gzipping.

The magic number you should care about is 14kb. That's (give or take) how much data a server sends per round trip when the browser makes a request for a web page. You want your above-the-fold content&mdash;required styles, scripts, markup, everything&mdash;to weight 14kb or less so that the browser can start rendering it as soon as that first packet of data is received.

## How to inline and async your CSS

The inlining piece is pretty straightforward. Add the contents of your critical CSS file to your `<head>` element inside a `<style>` tag:

```lang-markup
<head>
	<!-- Your other header markup -->
	<style>
		.some-styles {
			font-weight: bold;
		}
		...
		.etc-etc {
			color: #333333;
		}
	</style>
</head>
```

Rather than adding your full stylesheet via a `<link>` element as you normally would, I used [loadCSS.js from the Filament Group](https://github.com/filamentgroup/loadCSS) (inlined in the `<head>`) to load it asynchronously. There's no natively supported way to load CSS files async (as there is with JS), so this script helps prevent render blocking.

```lang-markup
<head>
	<!-- Your other header markup -->
	<script>
		function loadCSS( href, before, media, callback ){ ... }
		loadCSS( '/path/to/your/full.css' );
	</script>
	<style>
		.some-styles {
			font-weight: bold;
		}
		...
		.etc-etc {
			color: #333333;
		}
	</style>
</head>
```

Then, I added a `<noscript>` fallback in the footer (again, to prevent render blocking) for browsers that don't support JavaScript or have it turned off.

```lang-markup
<noscript>
	<link href='/path/to/your/full.css' rel='stylesheet' type='text/css'>
</noscript>
```

## What about browser caching?

This brought my start render times below 500ms. Not too shabby. However, it also meant that the browser was no longer able to take advantage of having my stylesheet cached for reuse on subsequent pages and visits.

Fortunately, there was a relatively easy way to get around this, developed by the wonderfully talented folks at Filament Group: Set a cookie when the full stylesheet is loaded asynchronously, and then check for that cookie on subsequent page visits. If it's there, skip the critical CSS inlining and just load the stylesheet via a traditional `<link>` element.

This does, of course, require some server-side logic.

### Setting the cookie with loadCSS

Setting the cookie requires one additional, *super* lightweight script from the Filament Group, [onloadCSS.js](https://github.com/filamentgroup/loadCSS/blob/master/onloadCSS.js) that runs a callback when the CSS file is loaded.

```lang-markup
<head>
	<!-- Your other header markup -->
	<script>
		function loadCSS( href, before, media, callback ){ ... }
		var stylesheet = loadCSS( '/path/to/your/full.css' );
		onloadCSS( stylesheet, function() {
			var expires = new Date(+new Date + (7 * 24 * 60 * 60 * 1000)).toUTCString();
			document.cookie = 'fullCSS=true; expires=' + expires;
		});
	</script>
	<!-- Your inline CSS -->
</head>
```
The example code above sets a cookie called `fullCSS` that expires after a week.

### Server-side logic in WordPress

Implementation for this will vary based on your CMS and server technology. I use WordPress. Here's what my `functions.php` file looks like.

```lang-php
/**
 * Load theme scripts in the footer
 */
function keel_load_theme_files() {
	// If stylesheet is in browser cache, load it the traditional way
	// Otherwise, inline critical CSS and load full stylesheet asynchronously
	// See keel_initialize_theme_detects()
	if ( isset($_COOKIE['fullCSS']) && $_COOKIE['fullCSS'] === 'true' ) {
		wp_enqueue_style( 'keel-theme-styles', get_template_directory_uri() . '/path/to/full.css', null, null, 'all' );
	}
	// Load JavaScript file
	wp_enqueue_script( 'keel-theme-scripts', get_template_directory_uri() . '/path/to/full.js', null, null, true );
}
add_action('wp_enqueue_scripts', 'keel_load_theme_files');

/**
 * Include feature detect inits in the header
 */
function keel_initialize_theme_detects() {
	// If stylesheet is in browser cache, load it the traditional way
	if ( isset($_COOKIE['fullCSS']) && $_COOKIE['fullCSS'] === 'true' ) {
	?>
		<script>
			// Contains loadCSS.js, onloadCSS.js, and some light feature detection (for things like SVG support)
			<?php echo file_get_contents( get_template_directory_uri() . '/path/to/detects.js' ); ?>
		</script>
	<?php

	// Otherwise, inline critical CSS and load full stylesheet asynchronously
	} else {
	?>
		<script>
			<?php echo file_get_contents( get_template_directory_uri() . '/path/to/detects.js' ); ?>
			var stylesheet = loadCSS('<?php echo get_template_directory_uri() . "/path/to/full.css"; ?>');
			onloadCSS( stylesheet, function() {
				var expires = new Date(+new Date + (7 * 24 * 60 * 60 * 1000)).toUTCString();
				document.cookie = 'fullCSS=true; expires=' + expires;
			});
		</script>
		<style>
			<?php echo file_get_contents( get_template_directory_uri() . '/path/to/critical.css' ); ?>
		</style>
	<?php
	}
}
add_action('wp_head', 'keel_initialize_theme_detects', 30);

/**
 * Include script inits in the footer
 */
function keel_initialize_theme_scripts() {
	// If cookie isn't set, load a noscript fallback
	if ( !isset($_COOKIE['fullCSS']) || $_COOKIE['fullCSS'] !== 'true' ) {
	?>
		<noscript>
			<link href='<?php echo get_template_directory_uri() . "/path/to/full.css"; ?>' rel='stylesheet' type='text/css'>
		</noscript>
	<?php
	}

	?>
		<script>
			// Inline footer JavaScript and inits
		</script>
	<?php
}
add_action('wp_footer', 'keel_initialize_theme_scripts', 30);
```

## Time to first byte

Every time someone visits a page on my site, WordPress has to grab data from the database, run a bunch of logic, and merge it into my template files to generate HTML files. Every. Single. Time. This is common for most CMS-based websites.

I also run my site on cheap, shared hosting, so all of that server work can really impact time to first byte. To improve performance and minimize server load, I use [ZenCache](http://zencache.com/), a caching plugin.

ZenCache pre-compiles all of the pages on my site into static HTML files and serves those when people visit a page instead of requiring WordPress to build them fresh every time. It also automatically updates the static files whenever I make an update to a page.

What makes ZenCache really shine, though, is that it provides me with a way to server two separate versions of a page based on whether or not that `fullCSS` coookie is set.

### Cookie-specific cached pages in WordPress

If you buy the Pro version of ZenCache, there's a GUI way to do this in the WordPress dashboard. But if you don't need the fullset of Pro features, there's also a fairly easy way to do this with a "ZenCache plugin".

Create a file called `critical-css-salt.php` and add this to it:

```lang-php
<?php

	if(!defined('WPINC')) // MUST have WordPress.
		exit('Do NOT access this file directly: '.basename(__FILE__));
	/*
	 * If implemented; this file should go in this special directory.
	 *    `/wp-content/ac-plugins/my-ac-plugin.php`
	 */
	function critical_css_salt_plugin() {
		/**
		 * All plugins need a reference to this class object instance.
		 *
		 * @var $ac \zencache\advanced_cache Object instance.
		 */
		$ac = $GLOBALS['zencache__advanced_cache']; // See: `advanced-cache.php`.
		/*
		 * This plugin will dynamically modify the version salt.
		 */
		$ac->add_filter(get_class($ac).'__version_salt', 'critical_css_salt_shaker');
	}
	critical_css_salt_plugin(); // Run this plugin.
	/*
	 * Any other function(s) that may support your plugin.
	 */
	function critical_css_salt_shaker($version_salt) {
		if ( isset($_COOKIE['fullCSS']) && $_COOKIE['fullCSS'] === 'true' )
			$version_salt .= 'fullcss'; // Give users with cached CSS files their own variation of the cache.
		else $version_salt .= 'inlinecss'; // A default group for all others.
		return $version_salt;
	}
```

Using an FTP server, upload the file `wp-content/ac-plugins`. (That's a custom directory you'll need to add. Don't use the regular `plugins` directory.)

If most of that was greek to you, buy the Pro version, and add this to the "Dynamic Version Salt" section (untested):

```
(string)@$_COOKIE['mycookie']
```

## The Results

|                                                                          | First View | Subsequent Views |
|--------------------------------------------------------------------------|------------|------------------|
| Original Landing Page                                                    | ~950ms     | ~700ms           |
| [Original Blog](http://www.webpagetest.org/result/140803_WF_NSQ/)        | 711ms      | 322ms            |
| [Updated Landing Page](http://www.webpagetest.org/result/150319_9P_146G/)| 497ms      | 406ms            |
| [Updated Blog](http://www.webpagetest.org/result/150318_AA_PYX/)         | 496ms      | 494ms            |

Not too bad. Because of the hosting I use, these numbers can sometimes run ~100ms higher. A better hosting solution (for example, [Digital Ocean's SSD Cloud Servers](https://www.digitalocean.com/)) might improve the metrics even more.

You may also have noticed that my subsequent page load times went up a little bit on blog pages. This is most likely due to some other changes I made over the last few weeks, including [inlining SVG sprites](https://gomakethings.com/using-svgs/). I'll be continuing to tweak things.