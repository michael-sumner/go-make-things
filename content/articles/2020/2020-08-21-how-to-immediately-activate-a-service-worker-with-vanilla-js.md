---
title: "How to immediately activate a service worker with vanilla JS"
date: 2020-08-21T10:30:00-04:00
draft: false
categories:
- Code
- JavaScript
- Web Performance
---

You've [written your first service worker](/writing-your-first-service-worker-with-vanilla-js/) and are [saving pages for offline viewing as the user visits them](/saving-recently-viewed-pages-offline-with-service-workers-and-vanilla-js/). Maybe you've [loading your web fonts from a service worker cache](/improving-web-font-performance-with-service-workers/), too, for better performance.

You visit your site for the first time, click a few pages, go offline, and... nothing.

What's going on? Today, we're going to learn why this happens, and how to immediately activate a service worker.

(*If you haven't yet, you should read [the other articles in this series](/series/service-workers/) or today's article won't make much sense.*)

## Service workers install in the background

When you visit a website with a registered service worker for the first time, the worker doesn't immediately install and activate itself.

It installs in the background, but typically doesn't activate the next time you visit the page. That means you need to close any open tabs on that page and then visit again before it kicks in and does its things.

But, you can tell the service worker to skip the waiting and activate right away.

## The `skipWaiting()` method

The `skipWaiting()` method tells the service worker to, well, skip waiting.

You put it in your `install` event listener, and the service worker will activate right away and start intercepting `fetch` events *before* it's finished installing any of your core "on install" files and such.

```js
// On install, cache some stuff
self.addEventListener('install', function (event) {

	// Activate right away
	self.skipWaiting();

	// Cache your core stuff...
	event.waitUntil(caches.open(coreID).then(function (cache) {
		cache.add(new Request('/offline/'));
		// ...
		return cache;
	}));

});
```

And that's it!

## Why isn't this the default behavior?

Service workers are designed to *progressively enhance* your site.

Just like with browser updates, the default is purposely to update in the background and only run when available. I also think it's reasonable to assume that developers may want any core "cache these on install" files cached and fully available before running the service worker as a default behavior.

Fortunately, there's a relatively easy way to tell the worker to behave differently if you want.