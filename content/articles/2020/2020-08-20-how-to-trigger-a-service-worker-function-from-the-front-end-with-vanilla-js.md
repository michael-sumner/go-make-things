---
title: "How to trigger a service worker function from the front end with vanilla JS"
date: 2020-08-20T10:30:00-04:00
draft: false
categories:
- Code
- JavaScript
- Technology
---

As part of [my ongoing series on service workers](/series/service-workers/), we looked at [how to save pages for offline viewing as a user visits them](/saving-recently-viewed-pages-offline-with-service-workers-and-vanilla-js/) and [how to cache files with an expiration date](/how-to-set-an-expiration-date-for-items-in-a-service-worker-cache/).

Today, we're going to build on that feature by looking at how to trigger service worker behaviors from the front end.

## The `message` event

The service worker API includes a `postMessage()` method.

This method creates an event that your service worker can listen for and respond to.

```js
navigator.serviceWorker.controller.postMessage('hi');
```

In your service worker, you can listen for the `message` event with the `addEventListener()` method.

The `event.data` property contains the argument you passed in to the `postMessage()` method.

```js
// If the "hi" message is posted, say hi back
self.addEventListener('message', function (event) {
	if (event.data !== 'hi') return;
	console.log('Oh, hi there!');
});
```

The data you pass in to `postMessage()` isn't limited to just strings.

You can pass in arrays and objects (anything that can be `JSON.stringify()`-ed) too. You don't need to stringify or parse them. The API handles that for you automatically.

```js
navigator.serviceWorker.controller.postMessage({
	type: 'hi',
	name: 'Dave',
	greeting: 'Hello there'
});

// If the "hi" message is posted, say hi back
self.addEventListener('message', function (event) {
	if (event.data.type !== 'hi') return;
	console.log(`${event.data.greeting}, ${event.data.name}!`);
});
```

## Cleaning up your cache on load

In a previous article, we looked at [how to cache pages a user visits, and make them available when the user goes offline](/saving-recently-viewed-pages-offline-with-service-workers-and-vanilla-js/). This is a great technique, but if a user visits your site often, their "available offline" cache can get quite big.

It's probably a good idea to limit how many articles the cache can hold.

To do this, we'll first emit a `cleanUp` message after the page is done loading.

```js
if (navigator && navigator.serviceWorker) {

	// Initialize the service worker
	navigator.serviceWorker.register('/sw.js');

	// Cleanup old cache on page load
	window.addEventListener('load', function () {
		navigator.serviceWorker.controller.postMessage('cleanUp');
	});
}
```

Inside our service worker, we'll add a `message` event listener, and run it if the message is `cleanUp`.

When it runs, we'll call a `trimCache()` method, and pass in [the key for our HTML cache, `pageID`](/how-to-update-a-service-worker/), as an argument, along with what the max size the cache should be.

```js
// Trim caches over a certain size
self.addEventListener('message', function (event) {
	if (event.data !== 'cleanUp') return;
	trimCache(pageID, 35);
});
```

Inside `trimCache()` method, we'll use the `caches.open()` method to open the cache associated with the `key`.

Then, we'll use the `caches.keys()` method to get the keys for all of the items in the cache.

If the number of items is less than or equal to our `max`, we won't do anything. Otherwise, we'll use the `cache.delete()` method to delete the first item.

Then, we'll pass the `key` and `max` recursively into `trimCache()` to run it again.

```js
/**
 * Remove cached items over a certain number
 * @param  {String}  key The cache key
 * @param  {Integer} max The max number of items allowed
 */
var trimCache = function (key, max) {
	caches.open(key).then(function (cache) {
		cache.keys().then(function (keys) {
			if (keys.length <= max) return;
			cache.delete(keys[0]).then(function () {
				trimCache(key, max);
			});
		});
	});
};
```

If you're [caching other files as their requested, like image files](/offline-first-with-service-workers-and-vanilla-js/), it's probably a good idea to use the `trimCache()` method on them, too.

```js
// Trim caches over a certain size
self.addEventListener('message', function (event) {
	if (event.data !== 'cleanUp') return;
	trimCache(pageID, 35);
	trimCache(imgID, 20);
});
```

## Other use cases

Other interesting things you can do with the `postMessage()` event:

- Create your own on-site "offline reading" tool. When users click a button, send a message to your service worker to fetch the page and save it for offline.
- Similarly, a web-based podcast site that saves `mp3` files for offline listening if the user requests it.
- A "clear cache" button to [refresh API data before it expires](/how-to-set-an-expiration-date-for-items-in-a-service-worker-cache/) (if, for example, a user purchases a new product that hasn't shown up in their profile yet).
- User-defined offline preferences. Let users decide if they want to save an entire app offline, run it online only, or backup just the stuff you've looked at recently.

There are certainly more. The `postMessage()` method opens up a lot of possibilities!

## Security concerns

For added security, its recommended that you only run the callback method if the `postMessage()` event came from a trusted site.

You can do this by checking the `event.origin` property.

```js
// Trim caches over a certain size
self.addEventListener('message', function (event) {
	if (event.origin !== 'https://your-awesome-website.com') return;
});
```