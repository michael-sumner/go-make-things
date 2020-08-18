---
title: "How to update a service worker"
date: 2020-08-18T10:30:00-04:00
draft: false
categories:
- Code
- JavaScript
- Web Performance
---

As part of [my ongoing series on service workers](/series/service-workers/), today, we're going to look at how to update a service worker (and get the browser to install the new version).

Let's dig in.

## It's really damn simple

Every time a page loads on your site, the browser checks to see if the [registered service worker](/writing-your-first-service-worker-with-vanilla-js/) is different from the one it has installed.

If it is, it installs the new one in the background, and activates it the next time the browser reloads (just like it did the original service worker).

So, if you want to update your service worker, you literally just update it and replace the old one with it on the server.

But of course, there's a little bit more to it than that.

## Updating the caches associated with your service worker

Your service worker caches don't get wiped out when service worker updates. They stick around forever, even if they're no longer needed.

It's a good idea to delete them when you install a new service worker to avoid taking up unnecessary space on someone's device.

I learned the trick to doing this from Jeremy Keith's awesome book, *[Going Offline](https://abookapart.com/products/going-offline)*.

First, you include a version number in your service worker. I like to use [semantic versioning](/semantic-versioning/) for this.

```js
var version = '1.4.2';
```

Next, instead of using plain old cache names like `core` and `images`, I prefix them with the `version`.

```js
var version = '1.4.2';
var coreID = version + '_core';
var pageID = version + '_pages';
var imgID = version + '_img';

// ...

// On install, cache some stuff
self.addEventListener('install', function (event) {
	event.waitUntil(caches.open(coreID).then(function (cache) {
		// Install my core files
	}));
});
```

Now I have versioned cache names.

## Removing old caches

Finally, when the new worker is activated, we want to remove any caches that don't start with the current `version`.

To do this, you setup an event listener for the `activate` event.

```js
// On version update, remove old cached files
self.addEventListener('activate', function (event) {
	// Do something when the service worker is activated
});
```

We'll use the `event.waitUntil()` method to make sure all of our asynchronous tasks complete, then we'll use the `caches.keys()` method to get a Promise for the key names of all the service worker caches associated with the site.

```js
// On version update, remove old cached files
self.addEventListener('activate', function (event) {
	event.waitUntil(caches.keys().then(function (keys) {
		// Do something with each of the caches
	});
});
```

To make life easier, I like to create an array called `cacheIDs` that contains the key names of all of my caches.

```js
var version = '1.4.2';
var coreID = version + '_core';
var pageID = version + '_pages';
var imgID = version + '_img';
var cacheIDs = [coreID, pageID, imgID];
```

In the handler for my `caches.key()` Promise, I use [the `Array.fitler()` method](/what-array.filter-does-in-vanilla-js/) to get a list of cache keys *not* in my `cacheIDs` array, and use [the `Array.includes()` method](/how-to-check-for-an-item-in-an-array-with-vanilla-js/) to check for the key in the array.

Then, I use the `Array.map()` method to loop through each non-existent key and delete it from the cache.

We use `Array.map()` instead of `Array.forEach()` here because we need to return an array to resolve the `Promise.all()` method.

```js
// On version update, remove old cached files
self.addEventListener('activate', function (event) {
	event.waitUntil(caches.keys().then(function (keys) {
		return Promise.all(keys.filter(function (key) {
			return !cacheIDs.includes(key);
		}).map(function (key) {
			return caches.delete(key);
		}));
	}));
});
```

Finally, we return `self.clients.claim()` to resolve the `waitUntil()` method.

```js
// On version update, remove old cached files
self.addEventListener('activate', function (event) {
	event.waitUntil(caches.keys().then(function (keys) {
		return Promise.all(keys.filter(function (key) {
			return !cacheIDs.includes(key);
		}).map(function (key) {
			return caches.delete(key);
		}));
	}).then(function () {
		return self.clients.claim();
	}));
});
```

With this setup, anytime you update your service worker, the browser will remove the old caches, freeing up potentially unneeded space.