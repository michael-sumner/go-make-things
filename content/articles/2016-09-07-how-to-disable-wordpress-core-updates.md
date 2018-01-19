---
categories:
- Code
- WordPress
date: '2016-09-07'
permalink: /how-to-disable-wordpress-core-updates/
title: How to disable WordPress core updates
url: /2016/09/07/how-to-disable-wordpress-core-updates
---

I was recently working with a client who had made some custom security modifications to their database. Anytime someone ran the WordPress "Click to Update" process on WP Core, it would break the entire site.

Even knowing this, I managed to do it three times, in part because the button is giant and blue, and at least once I accidentally clicked it instead of the "Update Plugins" button I meant to click.

Here's a little bit of code that removes that button---and the accompanying nag message---from the WordPress dashboard, avoiding this problem altogether.

```lang-php
/**
 * Remove the "Time to Update" nag message in WordPress
 */
function keel_hide_core_updates_nag() {
    remove_action( 'admin_notices', 'update_nag', 3 );
}
add_action( 'admin_menu', 'keel_hide_core_updates_nag' );


/**
 * Remove the ability to update from the Dashboard
 */
function keel_remove_core_updates_action() {
	?>
		<style type="text/css">
			.core-updates {
				display: none;
				visibility: hidden;
			}
		</style>
	<?php
}
add_action( 'admin_head', 'keel_remove_core_updates_action' );
```

Pop that in your `functions.php` file, or better yet, [create a custom plugin](https://github.com/cferdinandi/gmt-disable-wp-core-updates).