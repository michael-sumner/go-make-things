---
title: "How to show content based on a user's location using CloudFlare Workers and vanilla JS"
date: 2020-06-11T10:30:00-04:00
draft: false
categories:
- Code
- JavaScript
---

Last week, we looked at [how to use CloudFlare Workers to create a middleman API](/how-to-create-a-middleman-api-with-cloudflare-workers-and-vanilla-js/).

Today, we're going to learn how to create a custom middleman API we can use to show content based on a user's location.

(*If you haven't read [the article on middleman APIs](/how-to-create-a-middleman-api-with-cloudflare-workers-and-vanilla-js/) yet, got read that first or this post won't make much sense.*)

## Why would you need to do this?

The first use case that comes to mind is something I use this approach for on my own site: location-based pricing.

Depending on where you live, my courses may cost less than hour's worth of your salary, or more than a month of your work. To make my products fairly priced no matter where someone lives, [I offer location-based pricing](/location-based-pricing/).

Someone who lives in Kenya or India or Poland pays less than someone who lives in the United States (in actual US dollars, but about the same percentage of their salary).

<img alt="A screenshot of my checkout page with a location-based discount applied to the cart" src="https://gomakethings.com/img/articles/pricing-parity.jpg">

I use an API that detects a visitor's location and tells me which country they're visiting from. If you're from a country that gets a discount, on my product pages, you see a message telling you about the discount. And on the checkout page, a discount is automatically applied to your cart.

I created a PHP-based API for my cart, but this is now *way* easier than the thing I built using CloudFlare Workers.

## Getting a user's location

Inside our CloudFlare Worker `handleRequest()` method, the `request` object has a property on it called `cf`. This contains a bunch of information CloudFlare provides about the request, including some data about where the request originated.

We can `return `a `Response()` object that contains the user's country&mdash;`request.cf.country`&mdash;as API data.

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
		location: request.cf.country
	}), {
		status: 200,
		headers: headers
	});

};
```

Now, if you make a call to the Worker API, you'll get back the location.

```js
fetch('path.to.your.workers.dev').then(function (response) {
	return response.json();
}).then(function (data) {
	// The user's location
	console.log(data.location);
}).catch(function(error) {
	console.warn(error);
});
```

## Showing discount codes

Going back to my example, what if you wanted to show a discount code based on the user's location? You probably don't want to put that in your client side JS, since anyone can go and pull the discount code.

In your CloudFlare Worker, you can create an object of available discount codes based on country.

```js
/**
 * Available discounts
 */

var discounts = {
	US: {
		location: 'United States',
		locationCode: 'US',
		discountAmount: 15,
		discountCode: 'HIAMERICA',
	},
	CA: {
		location: 'Canada',
		locationCode: 'CA',
		discountAmount: 33,
		discountCode: 'HICANADA',
	},
	AU: {
		location: 'Australia',
		locationCode: 'AU',
		discountAmount: 42,
		discountCode: 'HIAUSTRALIA',
	}
};
```

Then, in the `handleRequest()` function, you can add a `discount` property to the returned data. Find the matching discount in the `discounts` object and use that as the value (it will show up as `null` if there isn't one).

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
		location: request.cf.country,
		discount: discounts[request.cf.country]
	}), {
		status: 200,
		headers: headers
	});

};
```

In your client side API call, you can get the discount and display it however you want.

```js
fetch('path.to.your.workers.dev').then(function (response) {
	return response.json();
}).then(function (data) {

	// The user's location
	console.log(data.location);

	// The discount code, if one exists
	console.log(data.discount);

	// If there's a discount code, do something with it
	if (data.discount) {
		// Do something...
	}

}).catch(function(error) {
	console.warn(error);
});
```

And that's it!