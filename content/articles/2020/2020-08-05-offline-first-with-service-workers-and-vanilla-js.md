---
title: "Offline first with service workers and vanilla JS"
date: 2020-08-05T10:30:00-04:00
draft: false
categories:
- Code
- JavaScript
- Web Performance
---

So far this week, we've looked at [how to write your first service worker](/writing-your-first-service-worker-with-vanilla-js/), and [how to cache pages for offline viewing](/saving-recently-viewed-pages-offline-with-service-workers-and-vanilla-js/).

Today, we're going to look at a strategy called "offline-first."

(*If you haven't read the first two articles in this series, you should go do that first or today's article won't make much sense.*)

## What is offline-first?

Up to this point, we've used our service worker cache to serve files if the network can't be reached (as in, if the user is offline). This is an approach called "network-first."

And for files that are likely to change, that's a good strategy.

But what about files that change very infrequently? For things like image files, it might instead make sense to check the service worker cache _first_, and only go out to the network if the file isn't cached yet.

This approach is called "offline-first."

In addition to imagines, it can also be used for things like CSS and JS files, web fonts, and API responses. For things like games, it might make sense to go offline-first with _everything_, including the HTML files.

## Going offline-first for image files

We're going to add a new item to our the callback function for the `fetch` event listener.

For this one, we want to check if the request is for an `image` file. One again, we'll check the `Accept` property on the `requeste.headers` object using the `get()` method.

```js
// Images
// Offline-first
if (request.headers.get('Accept').includes('image')) {
	// It's an image. Do something...
}
```

We'll use the `event.respondWith()` method to respond with our service worker instead of letting the request go through like it normally would.

Then, we'll use the `caches.match()` method to see if the requested file already exists in a cache.

```js
// Images
// Offline-first
if (request.headers.get('Accept').includes('image')) {
	event.respondWith(
		caches.match(request).then(function (response) {
			// Check for the file in cache...
		})
	);
}
```

If there's a `response` in the cache, we'll `return` it. Otherwise, we'll use the `fetch()` method to go out to the network and look for it.

```js
// Images
// Offline-first
if (request.headers.get('Accept').includes('image')) {
	event.respondWith(
		caches.match(request).then(function (response) {
			return response || fetch(request).then(function (response) {
				// If there's no file in cache, fetch it from the network...
			});
		})
	);
}
```

Finally, when the response from the network comes back, we'll clone it and store it to cache, just like with did with our HTML files. This time, we'll use a cache called `images`.

Then, we'll `return` the `response`.

```js
// Images
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

[Here's a demo.](https://cferdinandi.github.io/sw-offline-first/) You can [view the source code on GitHub](https://github.com/cferdinandi/sw-offline-first).

## When and why should you use an offline-first approach?

The offline-first approach is best used with larger assets that change infrequently.

It has two primary benefits:

1. **It reduces bandwidth for your users.** Because files are being pulled locally after initially being downloaded, the user doesn't have to use data on subsequent views.
2. **It reduces load time by quite a bit.** Larger, static assets like images, CSS, and JS files are some of the biggest bottlenecks in web performance. Pulling those files from the cache means they return instantly and dramatically reduce time to render.