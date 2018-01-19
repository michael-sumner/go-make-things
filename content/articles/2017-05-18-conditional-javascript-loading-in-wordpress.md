---
categories:
- Code
- JavaScript
- Web Performance
- WordPress
date: '2017-05-18'
permalink: /conditional-javascript-loading-in-wordpress/
title: Conditional JavaScript loading in WordPress
url: /2017/05/18/conditional-javascript-loading-in-wordpress
---

Earlier this week, I shared a technique for [only loading your JavaScript file if the browser passes your feature test](https://gomakethings.com/how-to-only-load-your-javascript-file-if-the-browser-supports-your-code/).

Newsletter subscriber [Vijay Rudraraju](http://vjdesign.com.au) asked me how you would do this with WordPress. Great question!

In WordPress, you normally use `wp_enqueue_script()` to load your JS files as an external file. We instead want to add `loadJS` and our feature test inline in the footer, and call our external file with it.

This is definitely *not* the WordPress way of doing things, by the way. By not using `wp_enqueue_script()`, the file never gets registered and can’t be called as a dependency by other scripts. *However*, if you’re writing vanilla, dependency-free scripts, it’s typically not a problem.

Here’s the code you would use to make it all happen...

```lang-php
/**
 * Load inline footer content
 */
function yourThemeNameSpace_load_inline_footer() {
	?>
		<script>
			/*! loadJS: load a JS file asynchronously. [c]2014 @scottjehl, Filament Group, Inc. (Based on http://goo.gl/REQGQ by Paul Irish). Licensed MIT */
			function loadJS(e,t){"use strict";var n=window.document.getElementsByTagName("script")[0],o=window.document.createElement("script");return o.src=e,o.async=!0,n.parentNode.insertBefore(o,n),t&&"function"==typeof t&&(o.onload=t),o}

			// Asynchronously load JavaScript if browser passes mustard test
			if ( 'querySelector' in document && 'addEventListener' in window ) {
				loadJS('<?php echo get_template_directory_uri() . "path/to/your/js/file.js"; ?>');
				// Example with path
				loadJS('<?php echo get_template_directory_uri() . "dist/js/my-scripts.js"; ?>');
			}
		</script>
	<?php
}
add_action('wp_footer', 'yourThemeNameSpace_load_inline_footer', 30);
```