---
title: "How to setup a middleman API with vanilla JS"
date: 2021-04-30T10:30:00-04:00
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

_This is another excerpt from my new and updated [APIs and Asynchronous JS pocket guide](https://vanillajsguides.com/apis/)._

Yesterday, we looked at [API credentials and security with vanilla JS](/api-credentials-and-security-with-vanilla-js/). Near the end of the article, I noted...

> Sometimes, APIs require credentials but don’t provide short term tokens. For example, the Mailchimp API uses a permanent API key with basic auth to authenticate every request.
>
> Alternatively, you made need to make an authenticated API call that does not require any input from a user. They don’t have credentials. You do, and want to use that data on a publicly available site.
>
> This creates a serious problem for JavaScript developers.

Today, we're going to look at how to work around this problem.

## A middleman API

A _middleman API_ is an endpoint you setup on a server. You store your API credentials securely on the server, and call the _middleman API_ from your JavaScript. The _middleman API_ then the real API call with your secure credentials.

When it gets a response, it sends back the data, optionally filtering out any information you don't want exposed publicly.

Here's some pseudo-code showing how you might do that with the NYT API.

```javascript
// In your JavaScript, call the middleman API
// You don't provide any API credentials
fetch('https://my-middleman-api.com').then(function (response) {
	if (response.ok) {
		return response.json();
	}
	throw response;
}).then(function (data) {
	console.log(data);
}).catch(function (error) {
	console.warn(error);
});

// On a server, make the real API call with your credentials, then return it
let apiKey = '1234';
return fetch(`https://api.nytimes.com/svc/topstories/v2/technology.json?api-key=my_api_key_${apiKey}`);
```

## How to setup a middleman API

There are countless ways to set up your own server-side middleware for your APIs, and covering all of them is well beyond the scope of this guide.

But one of the simplest ways, if you're already comfortable with vanilla JS, is to use [Cloudflare Workers](https://workers.cloudflare.com/).

Cloudflare Workers are what's called _serverless functions_ (which is really just a fancy marketing phrase for on-demand server functionality managed by someone else). Unlike most serverless offerings, you can author Cloudflare Workers in vanilla JS. They offer a free version (at time of writing), and have a GUI that you can use to manage your functions.

Here's a super simple version for the NYT API, without any error handling.

```javascript
// Listen for API requests
addEventListener('fetch', function (event) {
	event.respondWith(handleRequest(event.request));
});

/**
 * Respond to the request
 * @param {Request} request
 */
async function handleRequest(request) {

	// Call the NYT API with our credentials
	let apiKey = '1234';
	let response = await fetch(`https://api.nytimes.com/svc/topstories/v2/home.json?api-key=${apiKey}`);
	let data = await response.json();

	// Return the data
	return new Response(JSON.stringify(data), {
		status: 200,
		headers: new Headers({
			'Access-Control-Allow-Origin': '*',
			'Access-Control-Allow-Methods': 'GET, HEAD, POST, OPTIONS',
			'Access-Control-Allow-Headers': '*'
		})
	});

};
```

Inside your client-side JavaScript you would use it like this.

```javascript
fetch('https://nyt.my-workers-domain.workers.dev/').then(function (response) {
	if (response.ok) {
		return response.json();
	}
	throw response;
}).then(function (data) {
	console.log(data);
}).catch(function (error) {
	console.warn(error);
});
```

If you want to dig more into this topic, I've written articles on [how to get started with Cloudflare Workers](https://gomakethings.com/getting-started-with-serverless-using-cloudflare-workers-and-vanilla-js/), [how to secure your serverless functions](https://gomakethings.com/securing-serverless-functions-with-cloudflare-workers/), and [how to use environment variables](https://gomakethings.com/how-to-use-environment-variables-with-cloudflare-workers-and-vanilla-js/).