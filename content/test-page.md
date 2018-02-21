---
title: "Test page"
date: 2018-02-21T11:49:28-05:00
draft: false
noTitle: false
noIndex: false
---

```js
document.addEventListener('click', function (event) {

	// If the clicked element doesn't have the class, bail
	if (!event.target.matches('.click-me')) return;

	// Otherwise, do whatever...

}, false);

/**
 * Element.closest() polyfill
 * https://developer.mozilla.org/en-US/docs/Web/API/Element/closest#Polyfill
 */
if (!Element.prototype.closest) {
	if (!Element.prototype.matches) {
		Element.prototype.matches = Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector;
	}
	Element.prototype.closest = function (s) {
		var el = this;
		var ancestor = this;
		if (!document.documentElement.contains(el)) return null;
		do {
			if (ancestor.matches(s)) return ancestor;
			ancestor = ancestor.parentElement;
		} while (ancestor !== null);
		return null;
	};
}

for (var i = 0; i < something.length; i++) {
	var thing1 = something[i];
}
```

```css
.toggle-content {
	display: none;
	height: 0;
	opacity: 0;
	overflow: hidden;
	transition: height 350ms ease-in-out, opacity 750ms ease-in-out;
}

.show-fast {
	transition: height: 100ms ease-in-out, opacity 300ms ease-in-out;
}

.show-slow {
	transition: height: 2000ms ease-in-out, opacity 2500ms ease-in-out;
}

.toggle-content.is-visible {
	display: block;
	height: auto;
	opacity: 1;
}

```

```scss
.toggle-content {
	color: $color-thing;
	display: none;
	height: 0;
	opacity: 0;
	overflow: hidden;
	transition: height 350ms ease-in-out, opacity 750ms ease-in-out;
}

.show-fast {
	transition: height: 100ms ease-in-out, opacity 300ms ease-in-out;
}

.show-slow {
	transition: height: 2000ms ease-in-out, opacity 2500ms ease-in-out;
}

.toggle-content.is-visible {
	display: block;
	height: auto;
	opacity: 1;
}
```

```html
<div class="toggle-content">
	This content reveals at normal speed.
</div>

<div class="toggle-content show-fast">
	This content reveals quickly.
</div>

<div class="toggle-content show-slow">
	This content reveals at slowly.
</div>
```

```php
<?php

/**
 * functions.php
 * For modifying and expanding core WordPress functionality.
 */


	/**
	 * Load theme files
	 */
	function keel_load_theme_files() {
		$keel_theme = wp_get_theme();
		wp_enqueue_style( 'keel-theme-styles', get_template_directory_uri() . '/dist/css/main.min.' . $keel_theme->get( 'Version' ) . '.css', null, null, 'all' );
		if ( isset($_COOKIE['fontsLoaded']) && $_COOKIE['fontsLoaded'] === 'true' ) {
			wp_enqueue_style( 'keel-theme-fonts', 'https://fonts.googleapis.com/css?family=PT+Serif:400,400i,700', null, null, 'all' );
		}
	}
	add_action('wp_enqueue_scripts', 'keel_load_theme_files');
```