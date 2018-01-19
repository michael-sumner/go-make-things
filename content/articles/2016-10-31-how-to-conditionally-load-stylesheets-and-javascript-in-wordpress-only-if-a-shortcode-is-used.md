---
categories:
- Code
- JavaScript
- Web Performance
- WordPress
date: '2016-10-31'
title: How to conditionally load stylesheets and JavaScript in WordPress only if a shortcode is used
---

One thing that annoys me about WordPress is when a shortcode requires some scripts and styles, and a plugin loads those files on every page, whether they're needed or not.

Ideally, you would conditionally load your styles and scripts only if the shortcode that requires them is used.

There are a few ways to do this, but when styles are required, you're usually out of luck (because the code will get executed after all of the header stuff, where you CSS is loaded, has already happened).

To get around it, I add [loadCSS](https://github.com/filamentgroup/loadCSS) and [loadJS](https://github.com/filamentgroup/loadJS) in the footer, and use them to load my scripts and styles.

```php
/**
 * Load scripts and styles conditionally and async
 */
function load_styles_and_scripts_conditionally() {

	// Get the $post object
	global $post;

	// Only load your scripts and styles if the post contains your shortcode (change 'your_shortcode')
	if ( !is_a( $post, 'WP_Post' ) || !has_shortcode( $post->post_content, 'your_shortcode') ) return;

	?>
		<script>
			;(function (window, document, undefined) {
				'use strict';
				<?php
					// Inline the content from loadCSS.js: https://github.com/filamentgroup/loadCSS
					echo file_get_contents( plugin_dir_url( __FILE__ ) . 'dist/js/loadCSS.js' );

					// Inline the content from loadJS.js: https://github.com/filamentgroup/loadJS
					echo file_get_contents( plugin_dir_url( __FILE__ ) . 'dist/js/loadJS.js' );
				?>

				// Load my stylesheet async
				loadCSS( '<?php echo plugin_dir_url( __FILE__ ); ?>dist/css/my-styles.css' );

				// Load my scripts async
				loadJS( '<?php echo plugin_dir_url( __FILE__ ); ?>dist/js/my-sripts.js' );

			})(window, document);
		</script>
	<?php
}
// add_action( 'wp_head', 'photoboard_photoswipe_styles_and_scripts' );
add_action( 'wp_footer', 'photoboard_photoswipe_styles_and_scripts' );
```

Depending on how your JavaScript is written, you could load this in the header instead. Just comment out the `add_action` for `wp_footer` and uncomment the one for `wp_head`.

In this example, all of my files are in a `dist` subdirectory in my plugin folder, with my scripts in a `js` subdirectory under that, and my styles in `css`.