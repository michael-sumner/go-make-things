---
title: "How to set an expiration date for items in a service worker cache"
date: 2020-08-17T10:30:00-04:00
draft: false
categories:
- Code
- Design and UX
- JavaScript
- Web Performance
---

Over the last few weeks, we've looked at [how to create service workers](https://gomakethings.com/writing-your-first-service-worker-with-vanilla-js/), [cache pages for offline viewing](https://gomakethings.com/saving-recently-viewed-pages-offline-with-service-workers-and-vanilla-js/), and [serve assets from offline-first](https://gomakethings.com/offline-first-with-service-workers-and-vanilla-js/) for better performance.

Today, we're going to look at how to set an expiration date on cached service worker assets, so that you can fetch a fresh copy of an asset after a certain period of time.

(*If you haven't read [the other articles in this series](https://gomakethings.com/series/service-workers/), you should go do that first or today's article won't make much sense.*)

## A service worker cache is forever

Not literally forever.

If the user decides to completely empty their cached assets, they can get deleted. And some operating systems (:cough: iOS :cough:) only store assets in web apps for a finite amount of time.

But generally speaking, assets in cache stick around until they're manually deleted or overwritten.

For most use cases, that's totally fine. But what if you want to use a cached asset for only a fixed amount of time?

## An example

Students who purchase my courses can access them through a learning portal.

After they log in, an API call returns a big ass list of all of the stuff they have access to. If you've purchased a lot of my products, the API return can be several MBs in size.

That's a lot of data to transfer on every page load, so performance reasons, I want to cache that data.

For some students, the data can be 10mb of more in size, which is too large for `localStorage`. But Service Workers allow a minimum of 50mb in cached data, perfect for this use case.

However, because the stuff a student has access to can change over time, I don't want to store the data in the cache forever.

I want to keep it for an hour or two, and then try to get fresh data to use after that.

## How to give service worker cached assets an expiration date

There's no "fetched on date" you can access for assets cached with service workers. But, you can add one yourself!

[I learned this trick from Lucas Verney](https://phyks.me/2019/01/manage-expiration-of-cached-assets-with-service-worker-caching.html), and modified it a bit to fit my preferred coding style.

In my `fetch` event listener, I first check to see if the `request.url` is for my desired endpoint using the `String.includes()` method.

If it is, I use the `event.respondWith()` method to intercept the request.

```js
// Products API
// Offline-first until expires
if (request.url.includes('/path/to/my/api/endpoint/')) {
	event.respondWith(
		// Handle the response...
	);
}
```

I'm using an offline-first approach for this, so I use the `caches.match()` method to look for the `request` in a service worker cache first.


```js
// Products API
// Offline-first until expires
if (request.url.includes('/path/to/my/api/endpoint/')) {
	event.respondWith(
		caches.match(request).then(function (response) {
			// Look for a match in the cache
		})
	);
}
```

If I find a match, I want to check to see if it's still valid/not expired. I created an `isValid()` helper function that returns `true` if the cache is still valid.

We'll look at how that works shortly, but if it's `true`, I `return` the `response`.

```js
// Products API
// Offline-first until expires
if (request.url.includes('/path/to/my/api/endpoint/')) {
	event.respondWith(
		caches.match(request).then(function (response) {

			// If there's a cached API and it's still valid, use it
			if (isValid(response)) {
				return response;
			}

		})
	);
}
```

If it's not still valid (or doesn't exist), I instead use the `fetch()` method to get fresh data from the API.

Here's where the magic happens.

When the data returns, I create a copy of it with the `response.clone()` method. Then, I open up a cache called `api` using the `caches.open()` method.

When the cache is ready, I create a `new Headers()` object with the cloned response headers. Then, I append a new header, `sw-fetched-on`, and use the `new Date().getTime()` method to get a UTC timestamp of when the data was actually requested.

I create a `new Response()` from the `copy`, and save that to the cache. Then, I `return` the actual `response`.

```js
// Products API
// Offline-first until expires
if (request.url.includes('/path/to/my/api/endpoint/')) {
	event.respondWith(
		caches.match(request).then(function (response) {

			// If there's a cached API and it's still valid, use it
			if (isValid(response)) {
				return response;
			}

			// Otherwise, make a fresh API call
			return fetch(request).then(function (response) {

				// Cache for offline access
				var copy = response.clone();
				event.waitUntil(caches.open('api').then(function (cache) {
					var headers = new Headers(copy.headers);
					headers.append('sw-fetched-on', new Date().getTime());
					return copy.blob().then(function (body) {
						return cache.put(request, new Response(body, {
							status: copy.status,
							statusText: copy.statusText,
							headers: headers
						}));
					});
				}));

				// Return the requested file
				return response;

			});

		})
	);
}
```

Remember my `isValid()` helper?

Inside it, I check to make sure that a `response` exists. If it does, I get the `sw-fetched-on` header, which is a UTC timestamp (in milliseconds) of when the `response` was last fetched from the network.

I add two hours in milliseconds to it, then compare it to a UTC timestamp for right now. If the "fetched plus two hours" timestamp is bigger than right now, it's still valid and I `return true`. Otherwise, it's expired and I `return false`.

```js
/**
 * Check if cached API data is still valid
 * @param  {Object}  response The response object
 * @return {Boolean}          If true, cached data is valid
 */
var isValid = function (response) {
	if (!response) return false;
	var fetched = response.headers.get('sw-fetched-on');
	if (fetched && (parseFloat(fetched) + (1000 * 60 * 60 * 2)) > new Date().getTime()) return true;
	return false;
};
```

## Fallback to the cache

There's one edge case I wanted to account for.

If the data has expired, but the API call to get fresh data fails, I think it's better to serve slightly out-of-date data then nothing at all, so I want to fallback to the cache.

Inside a `catch()` handler, I again check to see if there's a `response` in a cache, and if so, `return` it without checking it's validity.

If not, I fallback to an `offline.json` file to help avoid any fatal errors on the front end.

```js
// Products API
// Offline-first until expires
if (request.url.includes('/path/to/my/api/endpoint/')) {
	event.respondWith(
		caches.match(request).then(function (response) {

			// If there's a cached API and it's still valid, use it
			if (isValid(response)) {
				return response;
			}

			// Otherwise, make a fresh API call
			return fetch(request).then(function (response) {

				// Cache for offline access
				var copy = response.clone();
				event.waitUntil(caches.open('api').then(function (cache) {
					var headers = new Headers(copy.headers);
					headers.append('sw-fetched-on', new Date().getTime());
					return copy.blob().then(function (body) {
						return cache.put(request, new Response(body, {
							status: copy.status,
							statusText: copy.statusText,
							headers: headers
						}));
					});
				}));

				// Return the requested file
				return response;

			}).catch(function (error) {
				return caches.match(request).then(function (response) {
					return response || caches.match('/offline.json');
				});
			});
		})
	);
}
```

## More than just APIs

I use this approach for API handling, but you can use it with any asset you want to keep for a while, but not forever.

I find it's a happy medium that gives you a bit more control over the user experience.