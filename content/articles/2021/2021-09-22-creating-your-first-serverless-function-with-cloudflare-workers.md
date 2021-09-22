---
title: "Creating your first serverless function with Cloudflare Workers"
date: 2021-09-22T10:30:00-04:00
draft: false
categories:
- Code
- JavaScript
- Technology
---

_The following is an excerpt from [my new pocket guide and video course on Serverless](https://vanillajsguides.com/serverless/)._

Back in August, I wrote [an introduction to serverless](/what-is-serverless/), and what it actually is (a marketing buzzword for a cool thing). Today, I wanted to show you how to write your first serverless function with Cloudflare Workers.

## Why Cloudflare?

I love Cloudflare Workers for two big reasons:

1. There's a super simple GUI you can use, so command line knowledge isn't required (but is an option if you want).
2. It uses vanilla JS.

Most of the other vendors I've looked at require you to push code to a GitHub account, or use a CLI package, or author your code in another language.

Cloudflare Workers are simple, fast, and let me write code in plain old JavaScript (they support a bunch of other languages, too). They have a bunch of other awesome features, too, like databases and scheduled tasks.

Let's dig in!

## Creating an account

Before we do anything else, you'll need to create a Cloudflare Workers account.

Visit [https://workers.cloudflare.com](https://workers.cloudflare.com/) and click the "Sign Up" button. Once you have an account, you'll be ready to create your first serverless function.

If you'd prefer, Cloudflare provides [a CLI tool for Workers called Wrangler](https://developers.cloudflare.com/workers/cli-wrangler). To make things simpler, though, we'll be using the web GUI tool for this guide.

## Creating your first serverless function

Once you're signed up and logged in, if Cloudflare doesn't immediately drop you in the _Workers_ area, click the "Workers" button in the right-hand navigation.

Then, click the "Create a Worker" button.

This will bring up a simple GUI you can use to create your first serverless function. Cloudflare prepopulates this with a template, but we're going to wipe it out and start fresh. Highlight the prepopulated code, then delete it.

A CloudFlare serverless function has two parts.

1. **A `fetch` event listener.** This detects HTTP requests to the API endpoint for your serverless function, and runs different tasks in response.
2. **A handler function.** This runs in response to API calls, running your serverless functions and returning an API response.

## Listening for HTTP requests

First, let's add our `fetch` event listener.

Whenever the listener is triggered, we're going to run a `handleRequest()` function, passing in the `event.request` as an argument. The `handleRequest()` method will run whatever functions should happen in response to the request, then `return` a `new Response()`.

Inside the listener callback function, we'll use the `event.respondWith()` method to send that `Response` back.

```js
// Listen for API calls
addEventListener('fetch', function (event) {
	event.respondWith(handleRequest(event.request));
});
```

## Running our serverless functions

Now that we're listening for HTTP requests, we can create the `handleRequest()` function that will actually run our serverless functions.

Because API calls are asynchronous, this needs to be an `async` function.

```js
/**
 * Respond to the request
 * @param {Request} request
 */
async function handleRequest(request) {
	// Do stuff...
}
```

For this first function, all we're going to do is return an API response with a success message.

To do that, we'll use the `new Response()` constructor to create a `Response` object, and `return` it. For the first parameter, the `body`, we'll pass in an object with the `greeting` property, and a value of `Hi, Universe!`.

Then, we'll pass the object into the `JSON.stringify()` method to convert it to a string.

The second argument on the `new Response()` constructor is an object of options. We'll include a `status` code of `200`, indicating that the request was successful.

```js
/**
 * Respond to the request
 * @param {Request} request
 */
async function handleRequest(request) {

	// return a Response object
	return new Response(JSON.stringify({
		greeting: 'Hi, Universe!'
	}), {
		status: 200
	});

}
```

In order to actually be able to call this API, we also need to define permission headers to allow requests from other domains. If we don't, we'll get CORS errors.

To do that, we'll use the `new Headers()` constructor, and pass in an object of `Access-Control-Allow-*` permissions. Below is a good _general use_ set of rules for public APIs. We'll look at securing your endpoint in a future section.

Next, we'll add the `headers` to the options object.

```js
/**
 * Respond to the request
 * @param {Request} request
 */
async function handleRequest(request) {

	// Define response headers
	let headers = new Headers({
		'Access-Control-Allow-Origin': '*',
		'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
		'Access-Control-Allow-Headers': '*'
	});

	// return a Response object
	return new Response(JSON.stringify({
		greeting: 'Hi, Universe!'
	}), {
		status: 200,
		headers: headers
	});

}
```

When you're done, click the "Save and Deploy" button. Now, your first serverless function is live and accessible with an API call.

## Calling the API for your serverless function

When you save and deploy, a popup will appear with the API endpoint for your serverless function. You can also find it again at any time by visiting the API under the Workers section in CloudFlare.

Here's what mine looked like for the example above.

```
https://goat-evergreen-manta.gomakethings.workers.dev
```

You can call your API using the `window.fetch()` method, just like you would any other API.

```js
fetch('https://goat-evergreen-manta.gomakethings.workers.dev').then(function (response) {
	if (response.ok) {
		return response.json();
	}
	throw response.status;
}).then(function (data) {
	console.log(data);
}).catch(function (error) {
	console.warn(error);
});
```

You can go back and edit your serverless function at any time by clicking the "Quick Edit" button. You can also change the API endpoint using the "Rename" button.