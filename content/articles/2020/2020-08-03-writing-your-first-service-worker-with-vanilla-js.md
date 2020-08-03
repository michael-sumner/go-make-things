---
title: "Writing your first service worker with vanilla JS"
date: 2020-08-03T10:30:00-04:00
draft: false
categories:
- Accessibility
- Art and Science
- Business and Leadership
- Careers
- Code
- CSS
- Design and UX
- HTML
- JavaScript
- Technology
- Web Performance
- WordPress
- Vanilla Framework Demos
---

Last week, I raved about how much [I love service workers](/the-amazing-power-of-service-workers/). Today, I'm going to teach you how to write your first one.

Let's get started.

## Serving an offline page

For this demo, we're going to keep things simple. If the user goes offline, we'll show an "offline" page letting them know.

If you were building a restaurant site, this would be a good place to include hours, directions, and a phone number. If you were running on a conference, you might include directions, contact info for the organizer, and a quick summary of the schedule.

An offline page like this should provide a "minimum viable experience" for someone who needs to interact with your business but doesn't have an internet connection at the moment.

## Secure connection required

Because service workers act as middleware between your site and the internet, it's *really* important that information is secure and encrypted.

As a result, service workers will only work on sites that have an SSL certificate installed.

There is an exception for `localhost` testing, but you can't run them from `file://`. You need to have a local server running. [Here are a bunch of ways to do that.](https://gist.github.com/willurd/5720255)

I use the python approach in my terminal window.

```bash
python -m SimpleHTTPServer 8000
```

## Registering a service worker

To use a service worker, the first thing you need to do is *register* it with the browser.

The `navigator` object has a property called `serviceWorker`. One of the methods under this property is `register()`.

We want to run this method inside a `script` element, and pass in the path to our service worker file.

```html
<script>
	// Initialize the service worker
	navigator.serviceWorker.register('sw.js');
</script>
```

Unlike other types of JavaScript files, service workers will only work for the directory in which they exist. A service worker file located at `/js/sw.js` would only work for files in the `/js` directory.

As a result, you should place your service worker file inside the *root directory* of your site.

## Checking for browser support

Since older browsers don't support service workers, it's also a good idea to make sure service workers are supported before trying to run them.

We can do this with a simple feature test to make sure the `navigator` object and `serviceWorker` property exist.

```html
<script>
	// Initialize the service worker
	if (navigator && navigator.serviceWorker) {
		navigator.serviceWorker.register('sw.js');
	}
</script>
```

## The service worker lifecycle

Like other apps, a service worker has to install before it can run.

Much like browser updates, it waits until the user "quits" your site entirely (by closing the browser itself, or closing all open tabs with your site loaded) to finish installing.

Once it's installed, it's *active* and running, and can intercept HTTP requests and do things with them.

### Browser tools can help with development

In your browser's developer tools, under the *Application* tab, there's a *Service Worker* section.

If you check the box for "Update on reload," your service worker file will automatically refresh when you reload your browser. When it's reloaded, you can click the "skip waiting" button to install it immediately without having to close the browser.

This can make the development process a lot nicer.

## Listening for events

Service workers can listen for events from your site and react to them.

For example, when the service worker installs itself, we want to download an `offline.html` file and save it to a local cache of files so that we can use it if the user goes offline.

To do that, we'll add an event listener to our `sw.js` file for the `install` event.

[Service workers use Promises.](/promises-in-javascript/) Inside the callback, we're going to open a new cache called `core` using the `caches.open()` method. Then we're going to request the `offline.html` file with the `new Request()` constructor, and add it to the `core` cache with the `cache.add()` method.

The `event.waitUntil()` method tells the browser that the installation isn't complete until the cached files have been saved.

```js
// On install, cache some stuff
addEventListener('install', function (event) {
	event.waitUntil(caches.open('core').then(function (cache) {
		cache.add(new Request('offline.html'));
		return;
	}));
});
```

This code is what saves our `offline.html` file for use when the user is offline.

You could also add other critical files, like external CSS or JS files, your `favicon.ico` file, and self-hosted typefaces. Anything you need to serve up your minimum viable offline experience should go here.

## Showing `offline.html` when the user goes offline

Now that we have an offline page cached, we can show it to our user whenever they go offline.

To do that, we'll add an event listener for `fetch` events, which run whenever our site makes an HTTP request.

Inside the callback, we'll first save the `event.request` to a variable to make it easier to work with. Then, we'll check the `request.headers` to see if the file type is `text/html`. Because they only work in modern browser, service workers can use modern JS methods like `String.includes()` without polyfills or transpiling.

```js
// listen for requests
addEventListener('fetch', function (event) {

	// Get the request
	var request = event.request;

	// HTML files
	// Network-first
	if (request.headers.get('Accept').includes('text/html')) {
		// It's an HTML file. Do something...
	}

});
```

If it's an HTML file, we want to first try to get the actual file that was request.

We'll [use the `fetch()` method](/how-to-use-the-fetch-api-with-vanilla-js/) to pass along the `request`, and if it's successful, we'll return it as-is.

If there was an error, though, we'll use the `caches.match()` method to try to find the `offline.html` file in our cached files, and `return` that instead.

```js
// listen for requests
addEventListener('fetch', function (event) {

	// Get the request
	var request = event.request;

	// HTML files
	// Network-first
	if (request.headers.get('Accept').includes('text/html')) {
		event.respondWith(
			fetch(request).then(function (response) {
				return response;
			}).catch(function (error) {
				return caches.match('offline.html');
			})
		);
	}

});
```

The `caches.match()` method is extra awesome because you don't even have to specific the ID of the cache (in this case, `core`).

It automatically looks in all caches, and if it finds a match, returns it.

## A demo

[You can see this in action here.](https://cferdinandi.github.io/service-worker-demo/)

Visit the page, then leave. Turn off your wifi connection, then jump back to the site to get the offline page.

You can [dig into the source code on GitHub](https://github.com/cferdinandi/service-worker-demo).

## A bug fix

When I first deployed my service worker, I ran into a bug in Chrome that was sometimes throwing errors in the console.

I found a solution on StackOverflow that checks for a few things first and seems to prevent the error from happening.

```js
// listen for requests
addEventListener('fetch', function (event) {

	// Get the request
	var request = event.request;

	// Bug fix
	// https://stackoverflow.com/a/49719964
	if (event.request.cache === 'only-if-cached' && event.request.mode !== 'same-origin') return;

	// HTML files
	// Network-first
	if (request.headers.get('Accept').includes('text/html')) {
		event.respondWith(
			fetch(request).then(function (response) {
				return response;
			}).catch(function (error) {
				return caches.match('offline.html');
			})
		);
	}

});
```

## Browser support

Service workers work in all modern browsers, but have no IE support.

There's no polyfill, either. Treat this as a progressive enhancement.