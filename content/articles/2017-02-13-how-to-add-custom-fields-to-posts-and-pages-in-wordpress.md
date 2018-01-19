---
categories:
- Code
- WordPress
date: '2017-02-13'
permalink: /how-to-add-custom-fields-to-posts-and-pages-in-wordpress/
title: How to add custom fields to posts and pages in WordPress
url: /2017/02/13/how-to-add-custom-fields-to-posts-and-pages-in-wordpress
---

Ever want to capture more data when creating a post or a page? Want to add some custom fields to your custom post type?

With WordPress's metabox functionality, you can! There are a few moving parts here, so let's walk through them one-by-one.

***Quick aside:*** *I'm going to share some PHP snippets. Place them in a plugin, or (less ideally) your `functions.php` file.*

## Create your metabox

This has two parts:

1. A function that sets up the metabox, giving it a name and telling WordPress which content types to load it on (posts, pages, some custom post type, etc.).
2. A function that generates the actual markup for the metabox.

### Setting up the metabox

We can use the `add_meta_box()` function to create new metaboxes. We need to hook into WordPress's `add_meta_boxes` action hook.

In `add_meta_box()`, you'll give your metabox an ID, a name, a function to use to generate the markup, a post type to display it on (posts, pages, etc.), and a location and priority on the page.

The post type can only be a single value (not an array), so if you want to use your metabox on multiple post types, you'll need to repeat the `add_meta_box()` function a couple of times.

```lang-php
/**
 * Create the metabox
 * @link https://developer.wordpress.org/reference/functions/add_meta_box/
 */
function _namespace_create_metabox() {

	// Can only be used on a single post type (ie. page or post or a custom post type).
	// Must be repeated for each post type you want the metabox to appear on.
	add_meta_box(
		'_namespace_metabox', // Metabox ID
		'Some Metabox', // Title to display
		'_namespace_render_metabox', // Function to call that contains the metabox content
		'post', // Post type to display metabox on
		'normal', // Where to put it (normal = main colum, side = sidebar, etc.)
		'default' // Priority relative to other metaboxes
	);

	// To add the metabox to a page, too, you'd repeat it, changing the location
	add_meta_box( '_namespace_metabox', 'Some Metabox', '_namespace_render_metabox', 'page', 'normal', 'default' // Priority relative to other metaboxes );

}
add_action( 'add_meta_boxes', '_namespace_create_metabox' );
```

### Rendering the metabox markup

Now we need to create content for the function specified in `add_meta_box()`.

We'll want to grab the `$post`, and get our saved field value (if one exists). We also need to include a security field that we'll check against to make sure this is a valid submission from the WordPress Dashboard.

You'll note that our field data is wrapped in an `esc_attr()` function. This escapes and encodes any data for proper use in an input field `value`.

```lang-php
/**
 * Render the metabox markup
 * This is the function called in `_namespace_create_metabox()`
 */
function _namespace_render_metabox() {
	// Variables
	global $post; // Get the current post data
	$details = get_post_meta( $post->ID, '_namespace', true ); // Get the saved values
	?>

		<fieldset>
			<div>
				<label for="_namespace_custom_metabox">
					<?php
						// This runs the text through a translation and echoes it (for internationalization)
						_e( 'Item Name', '_namespace' );
					?>
				</label>
				<?php
					// The `esc_attr()` function here escapes the data for
					// HTML attribute use to avoid unexpected issues
				?>
				<input
					type="text"
					name="_namespace_custom_metabox"
					id="_namespace_custom_metabox"
					value="<?php echo esc_attr( $details ); ?>"
				>
			</div>
		</fieldset>

	<?php
	// Security field
	// This validates that submission came from the
	// actual dashboard and not the front end or
	// a remote server.
	wp_nonce_field( '_namespace_form_metabox_nonce', '_namespace_form_metabox_process' );
}
```


## Saving your metabox

When the post or page is submitted, we want to save any data in our custom fields.

To do that, we first look to see if the submitted data contains our security field. If it does, we validate that field using the `wp_verify_nonce()` function. We also check that the submitting user has permission to edit the post.

Finally, we make sure that our field was submitted with data. If all criteria are met, we can save our field.

It's important to sanitize any data before saving it to the database. This prevents malicious code and scripts from being run on your server. We'll use the `wp_filter_post_kses()` function, which strips our dangerous code and allows through anything you can include a post.

```lang-php
/**
 * Save the metabox
 * @param  Number $post_id The post ID
 * @param  Array  $post    The post data
 */
function _namespace_save_metabox( $post_id, $post ) {

	// Verify that our security field exists. If not, bail.
	if ( !isset( $_POST['_namespace_form_metabox_process'] ) ) return;

	// Verify data came from edit/dashboard screen
	if ( !wp_verify_nonce( $_POST['_namespace_form_metabox_process'], '_namespace_form_metabox_nonce' ) ) {
		return $post->ID;
	}

	// Verify user has permission to edit post
	if ( !current_user_can( 'edit_post', $post->ID )) {
		return $post->ID;
	}

	// Check that our custom fields are being passed along
	// This is the `name` value array. We can grab all
	// of the fields and their values at once.
	if ( !isset( $_POST['_namespace_custom_metabox'] ) ) {
		return $post->ID;
	}
	/**
	 * Sanitize the submitted data
	 * This keeps malicious code out of our database.
	 * `wp_filter_post_kses` strips our dangerous server values
	 * and allows through anything you can include a post.
	 */
	$sanitized = wp_filter_post_kses( $_POST['_namespace_custom_metabox'] );
	// Save our submissions to the database
	update_post_meta( $post->ID, '_namespace', $sanitized );

}
add_action( 'save_post', '_namespace_save_metabox', 1, 2 );
```

## Saving revision history

This is optional, and potentially undesireable for certain data types, but you can save your field data to revision history. Restoring a a post to an old version will also update the metabox.

We'll hook into the `save_post` action hook to do this.

```lang-php
/**
 * Save events data to revisions
 * @param  Number $post_id The post ID
 */
function _namespace_save_revisions( $post_id ) {

	// Check if it's a revision
	$parent_id = wp_is_post_revision( $post_id );

	// If is revision
	if ( $parent_id ) {

		// Get the saved data
		$parent = get_post( $parent_id );
		$details = get_post_meta( $parent->ID, '_namespace', true );

		// If data exists and is an array, add to revision
		if ( !empty( $details ) ) {
			add_metadata( 'post', $post_id, '_namespace', $details );
		}

	}

}
add_action( 'save_post', '_namespace_save_revisions' );
```

### Restoring from revision history

Naturally, when restoring a post, we'll want to update the metabox field value as well.

We'll hook into the `wp_restore_post_revision` action hook for this, updating the post meta value with the historic version.

```lang-php
/**
 * Restore events data with post revisions
 * @param  Number $post_id     The post ID
 * @param  Number $revision_id The revision ID
 */
function _namespace_restore_revisions( $post_id, $revision_id ) {

	// Variables
	$post = get_post( $post_id ); // The post
	$revision = get_post( $revision_id ); // The revision
	$details = get_metadata( 'post', $revision->ID, '_namespace', true ); // The historic version

	// Replace our saved data with the old version
	update_post_meta( $post_id, '_namespace', $details );

}
add_action( 'wp_restore_post_revision', '_namespace_restore_revisions', 10, 2 );
```

### Displaying your metabox field in the revisions view

If you want to be able to see the historic version in the revisions view, you'll need two additional functions.

First, we'll add a field to the revision fields with the `_wp_post_revision_fields` filter.

```lang-php
/**
 * Get the data to display on the revisions page
 * @param  Array $fields The fields
 * @return Array The fields
 */
function _namespace_get_revisions_fields( $fields ) {
	// Set a title
	$fields['_namespace'] = 'Some Item';
	return $fields;
}
add_filter( '_wp_post_revision_fields', '_namespace_get_revisions_fields' );

Next, we'll tell WordPress to show that field on the revisions page with the `_wp_post_revision_field_my_meta` filter.

```lang-php
/**
 * Display the data on the revisions page
 * @param  String|Array $value The field value
 * @param  Array        $field The field
 */
function _namespace_display_revisions_fields( $value, $field ) {
	global $revision;
	return get_metadata( 'post', $revision->ID, $field, true );
}
add_filter( '_wp_post_revision_field_my_meta', '_namespace_display_revisions_fields', 10, 2 );
```

And now, you've got a fully functioning custom field. You can [grab the full code from this tutorial on GitHub](https://gist.github.com/cferdinandi/b851efcd82534311310d545b0c1b870c).

In a future article, I'll show you how to work with multiple fields, set defaults, and avoid over-taxing your database.