---
title: "Saving recently viewed pages offline with service workers and vanilla JS"
date: 2020-08-04T10:30:00-04:00
draft: false
categories:
- Accessibility
- Code
- Design and UX
- HTML
- JavaScript
- Web Performance
---

Yesterday, we learned [how to write your first service worker](/writing-your-first-service-worker-with-vanilla-js/). We created a simple offline page to show users when they're not online.

Today, we're going to learn how to save pages as the user visits them and make them accessible to users when they go offline.

(*This article is going to build on yesterday's, so if you haven't read it yet, start there.*)

## Updating our service worker

In the request for HTML files, if the file is found, we're going to create a copy of it and save it to a cache before returning it.

First, we'll check to see if the `response.type` is `opaque`. If so, that means we're not allowed to store it because of CORS settings and we'll ignore it. Otherwise, we can save it.

```js
// HTML files
// Network-first
if (request.headers.get('Accept').includes('text/html')) {
	event.respondWith(
		fetch(request).then(function (response) {

			// Save the response to cache
			if (response.type !== 'opaque') {
				// Good to save!
			}

			// Then return it
			return response;

		}).catch(function (error) {
			return caches.match('offline.html');
		})
	);
}
```

To save it, we'll create a copy of the `response` using the `clone()` method. If we don't copy it, our service worker will throw an error when trying to return it since, as far as the worker is concerned, it's already "in use."

Then, we'll use the `caches.open()` method to open up a new cache, `pages` (as you'll see later in the article, it's a good idea to store different types of assets in different caches).

Once the cache opens up, we'll use the `cache.put()` method to put the `copy` into the cache, associating it with the `request`.

```js
// HTML files
// Network-first
if (request.headers.get('Accept').includes('text/html')) {
	event.respondWith(
		fetch(request).then(function (response) {

			// Save the response to cache
			if (response.type !== 'opaque') {
				var copy = response.clone();
				event.waitUntil(caches.open('pages').then(function (cache) {
					return cache.put(request, copy);
				}));
			}

			// Then return it
			return response;

		}).catch(function (error) {
			return caches.match('offline.html');
		})
	);
}
```

## Serving the cached file when the user is offline

Now that we've got our file saved in a cache, we'll want to fallback to it when the user is offline.

If the page isn't found (such as when the user is offline), the `catch()` method will fire. In our callback, we can use the `caches.match()` method to check if the `request` is saved in one of the caches.

If it is, we'll return the cached `response`. If not, we'll find and return our offline page instead.

```js
// HTML files
// Network-first
if (request.headers.get('Accept').includes('text/html')) {
	event.respondWith(
		fetch(request).then(function (response) {

			// Save the response to cache
			if (response.type !== 'opaque') {
				var copy = response.clone();
				event.waitUntil(caches.open('pages').then(function (cache) {
					return cache.put(request, copy);
				}));
			}

			// Then return it
			return response;

		}).catch(function (error) {
			return caches.match(request).then(function (response) {
				return response || caches.match('offline.html');
			});
		})
	);
}
```

## Showing the user a list of available offline pages

If you want, you can display a list of the pages that are available for offline browsing.

In our `offline.html` page, let's add an empty element to add a list of articles to.

```html
<div data-offline></div>
```

On the page, we're going to add some JavaScript to check the service worker cache and get back a list of cached files.

First, let's make sure that the `navigator` object exists, and that `serviceWorker` is a property of it.

```js
if (navigator && navigator.serviceWorker) {
	// We can do service worker stuff...
}
```

If so, we can use the `caches.open()` method to open our `pages` method. Once it's opened, the `cache.keys()` method will return an array of keys in the cache.

This is why it's helpful to save different types of files into different caches. It makes it really easy to quickly get a list of all cached HTML files (or images, or whatever else you've cached).


```js
if (navigator && navigator.serviceWorker) {
	caches.open('pages').then(function (cache) {
		cache.keys().then(function (keys) {
			// Do something with the files...
		});
	});
}
```

Next, we'll use the `querySelector()` to get the `[data-offline]` page. Then, we'll use the `innerHTML` property to add a list of pages.

I like to [use the `Array.map()` method to convert arrays into markup](/using-array.map-to-create-markup-from-an-array-with-vanilla-js/). For each item, I'm first going to create a list item with the `key.url`.

```js
if (navigator && navigator.serviceWorker) {
	caches.open('pages').then(function (cache) {
		cache.keys().then(function (keys) {
			var offline = document.querySelector('[data-offline]');
			offline.innerHTML =
				'<ul>' +
					keys.map(function(key) {
						return '<li><a href="' + key.url + '">' + key.url + '</a></li>';
					}).join('') +
				'</ul>';
		});
	});
}
```

## A demo

[To see this in action, visit this demo page.](https://cferdinandi.github.io/service-worker-pages-demo/)

Once you've given the service worker a chance to install (visit, quit, come back), turn off your wifi and reload the page. The page should still show up, but without the picture.

With your wife still off, [try to visit this other demo page](https://cferdinandi.github.io/service-worker-pages-demo/jellyfish.html). The page should show the offline view instead, with a list of available pages.

[You can download the source code here.](https://github.com/cferdinandi/service-worker-pages-demo)