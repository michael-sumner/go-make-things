---
categories:
- Code
date: '2015-03-18'
url: /using-svgs/
title: Using SVGs
---

For quite some time, I've been a strong advocate of using [icon fonts](/icon-fonts/). They're lightweight, scalable, and easily styleable with CSS.

I recently made the switch to using SVG, and I'm not looking back. This article details how I currently work with SVG.

<!--more-->

## Why I made the switch to SVG

Icon fonts worked great for me for quite a while. There are two major reasons why I switched to SVG.

First, icon fonts were and are a hack. A brilliant hack, but a hack nonethless. And that resulted in some weird, unpredictable failures. [Chris Coyier ellaborates:](https://css-tricks.com/svg-sprites-use-better-icon-fonts/)

> Icon fonts seem to fail in weird ways. For instance, you map the characters to normal letters, then the font loading fails and you get random characters abound. Or you map to "Private Use Area" and some browsers decide to re-map them to [really weird characters like roses](https://cdn.css-tricks.com/wp-content/uploads/2014/03/icon-font-fail.png), but it's hard to replicate. Or you want to host the @font-face files on a CDN, but that's cross-origin and Firefox hates that, so you need your server to serve the right cross-origin headers, but your Nginx setup isn't picking that up right, SIGH.

Second, and this one is huge for me: SVGs are simply easier to maintain and work with. You'll see why when I explain how I work with them.

One additional win for SVG: Multi-color icon support is *much* easier with SVG.

## How I include SVG files

There are lots of different ways you can work with SVGs. I use two different approaches, depending on the use case:

1. **Inline SVG.** This is where you take the content of the SVG file and include it directly in your markup. This method is straightforward, and let's you directly target each shape within the SVG with CSS.
2. **SVG Sprites.** If I'll be using a set of icons across multiple pages, I instead use an SVG sprite. This method works allows you to include an SVG by referencing its ID, and makes it easy to change an icon and have those changes reflected instantly across a site (so long as the ID remains the same).

## How to use an inline SVG

Open the SVG file in your text editor of choice, and then literally copy and paste the content from the file into your markup.

```markup
<svg>...</svg>
```

## How to create an SVG sprite

My Gulp boilerplate ([available on GitHub](https://github.com/cferdinandi/gulp-boilerplate)) includes an SVG sprite generator. I simply drop all of my SVG files into the `svg` folder, run my build, and it generates a sprite for me. Super easy to add and remove icons.

However, this approach requires comfort working with command line, and if you're not there, that's ok. [IcoMoon](https://icomoon.io/), the fantastic icon font generator, also now lets you easily create SVG sprites.

<p class="text-center"><img src="https://gomakethings.com/wp-content/uploads/2015/03/icomoon-svg.jpg" alt="icomoon-svg" width="832" height="193" class="alignnone img-border size-full wp-image-5947" /></p>

1. Pick your icons.
2. Click the "Generate SVG/PNG" button in the lower left-hand corner.
3. Click "Download".
4. The `svgdefs.svg` is your SVG sprite.

## How to use an SVG sprite

Add the contents of your sprite to the markup in a hidden container.

```markup
<div hidden>
	<svg>...</svg>
</div>
```

To use an icon, simply reference its ID using the `<use>` element.

```markup
<svg class="icon">
    <use xlink:href="#icon-logo"></use>
</svg>
```

Add some simple styling with CSS (the `.svg` class is added via a [simple feature detection script](#fallbacks)).

```css
/**
 * Hide icons by default to prevent blank spaces in unsupported browsers
 */
.icon {
	display: inline-block;
	fill: currentColor;
	height: 0;
	width: 0;
}

/**
 * Display icons when browser supports SVG.
 * Inherit height, width, and color.
 */
.svg .icon {
	height: 1em;
	width: 1em;
}
```

### External SVG sprites

Instead of embedding, you can link to the SVG as an external file. However, this method is not supported in Internet Explorer and requires you to use [svg4everybody](https://github.com/jonathantneal/svg4everybody), a JavaScript polyfill. I've also found that inlining the sprite results in faster peceived performance.

While this will gain you some browser caching benefits, I've found that perceived load times are better using the inlined sprite approach, as the icons are rendered immediately.

### Automating sprite embedding with WordPress

If you're using WordPress, you can configure your theme to automatically add your SVG sprite into your markup without having to manually update files when you make changes. Add this to your `header.php` file, right after the opening `<body>` tag (update the path to point to your SVG sprite in your theme directory).

```php
<div hidden>
	<?php echo file_get_contents( get_template_directory_uri() . '/path/to/your/svg-sprite.svg' ); ?>
</div>
```

## Browser Compatibility

SVG is well supported in IE 9 and up, and all modern browsers, as well as Opera Mini ([new development!](https://dev.opera.com/blog/opera-mini-server-upgrade/)).

### Fallbacks

I implement a simple feature text inline in the `<head>`. This adds an `.svg` class to the `<html>` element, which you can use to add fallback content.

```javascript
;(function (window, document, undefined) {
	'use strict';
	var supports = !!document.createElementNS && !!document.createElementNS('http://www.w3.org/2000/svg', 'svg').createSVGRect; // SVG feature detection
	if ( supports ) { // If SVG is supported, add `.svg` class to <html> element
		document.documentElement.className += (document.documentElement.className ? ' ' : '') + 'svg';
	}
})(window, document);
```

I add a class to my CSS for supporting text. It's always accessible to screen readers, but on visually displayed if SVGs are not supported.

```css
/**
 * Hide fallback text content if browser supports SVG
 */
.svg .icon-fallback-text {
	border: 0;
	clip: rect(0 0 0 0);
	height: 1px;
	margin: -1px;
	overflow: hidden;
	padding: 0;
	position: absolute;
	width: 1px;
}
```

You would use like this.

```markup
<a href="http://twitter.com/...">
	<svg class="icon">
		<use xlink:href="#icon-twitter"></use>
	</svg>
	<span class="icon-fallback-text">Tweet This</span>
</a>
```