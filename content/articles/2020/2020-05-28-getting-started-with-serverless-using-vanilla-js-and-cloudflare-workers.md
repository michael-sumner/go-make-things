---
title: "Getting started with serverless using CloudFlare Workers and vanilla JS"
date: 2020-05-28T10:30:00-04:00
draft: false
categories:
- Code
- JavaScript
---

I a big advocate of [static HTML, static site generators, and the JAMStack](/building-a-website-with-hugo-and-other-static-site-generators/).

Whenever I talk about this, a question that comes up quite a bit

> What happens if you need server-side logic?

Today, I want to talk about _serverless_: what it is, when you'd want to use, and how you can take advantage of CloudFlare Workers with vanilla JS to quickly and easily start using it.

## What is serverless?

_Serverless_ is a terrible name for an awesome thing.

**It's mostly just a silly marketing term for "Server as a Service."**

With _serverless_, you don't have to worry about "the server" itself. You write some code, push it to your account, and then you can call the API endpoint where that file is located (or visit the URL directly) to run the code.

Different vendors support different language, but the one I've become most fond of is [CloudFlare Workers](https://workers.cloudflare.com/).

## CloudFlare Workers and vanilla JS

I love CloudFlare Workers for two big reasons:

1. They have a super simple GUI you can use, so command line knowledge isn't required.
2. It uses vanilla JS.

Most of the other vendors I've looked at require you to push code to a GitHub account, or use a CLI package, or author your code in another language.

CloudFlare Workers are simple, fast, and let me write code in plain old JavaScript. Oh, and it's free!

## Getting started with CloudFlare Workers

1. **Sign up.** Visit [workers.cloudflare.com](https://workers.cloudflare.com/) and click the big old "Sign Up" button.
2. **Go to your workers.** Once you're logged in, click the "Workers" button in the right-hand navigation.
3. **Create a worker.** Click the "Create a Worker" button. This will bring up a simple GUI you can use to create your serverless function.

A CloudFlare serverless script has two parts. Both get pasted into the `Script` window.

First, create a new event listener for the `fetch` event. This will fire whenever the endpoint is called. In the callback, run `event.respondWith()`, and pass in the `handleRequest()` function, with `event.request` as the argument.

(*This is just how they're setup. It will make more sense in a minute.*)

```js
addEventListener('fetch', function (event) {
	event.respondWith(handleRequest(event.request));
});
```

Next, you create an `async` *handler function* to actually run when the request happens.

In the event listener above, we used `handlerRequest()`, so that's what we'll call our function. You can call it anything, but if you name it something else, change the name in the event listener, too.

```js
/**
 * Respond to the request
 * @param {Request} request
 */
async function handleRequest(request) {
	// Do stuff...
};
```

Now, we can create our API response.

To do this, we `return` a `new Response()` object. This object accepts two arguments: a response string, and an object with information about the response (such as the `status` code).

If you're returning an object of data, pass it into `JSON.stringify()` to convert it to a string first.

```js
/**
 * Respond to the request
 * @param {Request} request
 */
async function handleRequest(request) {
	return new Response(JSON.stringify({
		greeting: 'Hi there, friend!'
	}), {
		status: 200
	});
};
```

There's one little hiccup I ran into: CORS and permissions. We need to allow requests from other domains to access the API.

To do that, create a `new Headers()` object, and add `Access-Control-Allow-*` permissions. Below is a good _general use_ set of rules for public APIs. We'll look at securing your endpoint in a future post.

Next, add the `headers` to the options object.

```js
/**
 * Respond to the request
 * @param {Request} request
 */
async function handleRequest(request) {

	let headers = new Headers({
		'Access-Control-Allow-Origin': '*',
		'Access-Control-Allow-Methods': 'GET, HEAD, POST, OPTIONS',
		'Access-Control-Allow-Headers': '*'
	});

	return new Response(JSON.stringify({
		greeting: 'Hi there, friend!'
	}), {
		status: 200,
		headers: headers
	});

};
```

Finally, click the "Save and Deploy" button.

And that's it. Now you have a serverless API.

## Calling the API

When you save and deploy, a popup will show up with the API for your endpoint. You can also find it again at any time by visiting the API under your Workers section in CloudFlare.

Here's what mine looked like for the example above.

```http
https://still-base-253d.gomakethings.workers.dev
```

Then, you can [call your API just like you would any other endpoint](/how-to-use-the-fetch-api-with-vanilla-js/).

For example, copy/paste this into the console of your browser's developer tools. The response object should get logged out in response.

```js
fetch('https://still-base-253d.gomakethings.workers.dev').then(function (response) {
	if (response.ok) {
		return response.json();
	};
	return Promise.reject(response);
}).then(function (data) {
	console.log(data);
}).catch(function (error) {
	console.warn(error);
});
```

Hopefully this helps you get started creating your own serverless functions. If I didn't explain anything well, please reach out and let me know.

Tomorrow, we'll look at the basics of serverless API security.