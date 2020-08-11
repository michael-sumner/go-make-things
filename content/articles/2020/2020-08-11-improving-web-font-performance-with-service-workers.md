---
title: "Improving web font performance with service workers"
date: 2020-08-11T10:30:00-04:00
draft: false
categories:
- Code
- CSS
- Design and UX
- HTML
- JavaScript
- Web Performance
---

Over the last few days, we've looked at [how to self-host web fonts](/how-to-self-host-google-fonts/) and [how to load them asynchronously for better performance](/how-to-load-css-asynchronously/).

Today, we're going to look at how to cache them with service workers for even better performance.

(*If you haven't yet, you should go read [the rest of my service worker series](/series/service-workers/) first or this article won't make a ton of sense.*)

## Adding a web font to your site

For today's lesson, we're going to use [PT Serif](https://fonts.google.com/specimen/PT+Serif), the same typeface I use for my sites, and [we're going to self-host them](/how-to-self-host-google-fonts/).

After downloading them, I'm going to add them to a `/fonts` directory. Then I'm going to create a `fonts.css` in my `/css` directory that loads them.

```css
@font-face {
	font-family: "PT Serif";
	font-style: normal;
	font-weight: 400;
	src: local("PT Serif"), local("PTSerif-Regular"), url("fonts/pt-serif-v11-latin-regular.woff2") format("woff2"), url("fonts/pt-serif-v11-latin-regular.woff") format("woff");
}

/* ... */
```

Next, inside my main styles for the page, I'm going to use PT Serif as my `font-family`.

```css
body {
	font-family: "PT Serif", serif;
}
```

And finally, on each HTML file on my site, I'm going to [load my `fonts.css` file asynchronously](/how-to-load-css-asynchronously/).

```html
<link rel="stylesheet" href="css/fonts.css" media="print" onload="this.media='all'; this.onload=null;">
```

Now I've got a custom web font loading on my site, and I'm ready to add service workers to improve the performance.

## Pre-caching `fonts.css` and my web fonts

When the service worker installs, I want to automatically fetch my `fonts.css` file and the web fonts, and store them locally in a cache.

Currently, we only pre-cache our `offline.html` page. We want to add a few things here.

```js
// On install, cache some stuff
addEventListener('install', function (event) {
	event.waitUntil(caches.open('core').then(function (cache) {
		cache.add(new Request('offline.html'));
		return;
	}));
});
```

First, let's create an array of the `fontFiles` that are used on the site.

```js
// Font files
var fontFiles = [
	'fonts/pt-serif-v11-latin-regular.woff',
	'fonts/pt-serif-v11-latin-regular.woff2',
	'fonts/pt-serif-v11-latin-italic.woff',
	'fonts/pt-serif-v11-latin-italic.woff2',
	'fonts/pt-serif-v11-latin-700.woff',
	'fonts/pt-serif-v11-latin-700.woff2',
	'fonts/pt-serif-v11-latin-700italic.woff',
	'fonts/pt-serif-v11-latin-700italic.woff2'
];
```

Then, we can use the `cache.add()` method to pre-cache both `css/fonts.css` and each of the font files.

You can use `Promise.all()` for this, but I'm instead using the `Array.forEach()` method and looping through each one individually.

```js
// On install, cache some stuff
addEventListener('install', function (event) {
	event.waitUntil(caches.open('core').then(function (cache) {
		cache.add(new Request('offline.html'));
		cache.add(new Request('css/fonts.css'));
		fontFiles.forEach(function (file) {
			cache.add(new Request(file));
		});
		return;
	}));
});
```

Now, all of our font assets will pre-cache when the service worker installs.

## Loading fonts from the cache instead of the network

Because font files are so performance intensive and unlikely to change meaningfully over time, we're going to use an *offline-first* approach with them.

Our current service worker file uses this approach for images.

```js
// Images & Fonts
// Offline-first
if (request.headers.get('Accept').includes('image')) {
	event.respondWith(
		caches.match(request).then(function (response) {
			return response || fetch(request).then(function (response) {

				// Stash a copy of this image in the images cache
				var copy = response.clone();
				event.waitUntil(caches.open('images').then(function (cache) {
					return cache.put(request, copy);
				}));

				// Return the requested file
				return response;

			});
		})
	);
}
```

We can extend this to *also* go offline-first with fonts and our `fonts.css` file.

In our `if` statement, we're going to also check to see if the `request.url` includes our font-file suffix (`pt-serif-v11`) or our `font.css` path using the *or operator* (`||`) and the `includes()` method.

If so, we'll use the same offline first approach we use for images.

```js
// Images & Fonts
// Offline-first
if (request.headers.get('Accept').includes('image') || request.url.includes('pt-serif-v11') || request.url.includes('css/fonts.css')) {
	event.respondWith(
		caches.match(request).then(function (response) {
			return response || fetch(request).then(function (response) {

				// Stash a copy of this image in the images cache
				var copy = response.clone();
				event.waitUntil(caches.open('images').then(function (cache) {
					return cache.put(request, copy);
				}));

				// Return the requested file
				return response;

			});
		})
	);
}
```

Because we already have these files pre-cached, we don't need to copy and save them in our `images` cache.

Before doing the copy-and-cache thing, we'll check to see if the `request` is for an image, and *only then* will we clone and cache it.

```js
// Images & Fonts
// Offline-first
if (request.headers.get('Accept').includes('image') || request.url.includes('pt-serif-v11') || request.url.includes('css/fonts.css')) {
	event.respondWith(
		caches.match(request).then(function (response) {
			return response || fetch(request).then(function (response) {

				// If an image, stash a copy of this image in the images cache
				if (request.headers.get('Accept').includes('image')) {
					var copy = response.clone();
					event.waitUntil(caches.open('images').then(function (cache) {
						return cache.put(request, copy);
					}));
				}

				// Return the requested file
				return response;

			});
		})
	);
}
```

And with that, we're caching our web fonts and service them locally.

## Putting it all together

[You can see a demo of this approach here.](https://cferdinandi.github.io/sw-fonts/) If you want to play around with the source code, you can [download it from GitHub](https://github.com/cferdinandi/sw-fonts).

After shifting my own site to this approach, I saw a *dramatic* improvement in performance.

On a high-speed internet connection, my site has it's first contentful pain at 500ms (half a second) mark, and finishes rendering in 1.1 seconds (after the fonts load). On subsequent visits (after the font is in cache), the site finishes loading in about 400ms!

The improvement is even more dramatic on slower connections.

I tested the site on a slow 3g connection based in Sydney (my servers are in the United States, and I *don't* use a CDN). The site is fully rendered in 3.7 seconds on first load, and 2.4 seconds on subsequent visits.

That's better than many sites do on high speed connections!