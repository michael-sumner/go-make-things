---
title: Using the Stripe Checkout API with vanilla JavaScript
date: 2022-09-28T10:30:00-04:00
draft: false
categories:
- Code
- Design and UX
- HTML
- JavaScript
---

I'm putting the finishing touches on a new [Academy workshop](https://vanillajsacademy.com), _Web Apps_, that will be available in January 2023.

For the workshop, we'll be building a complete ecommerce platform for a fictional photo shop. That includes building the digital store front with an integrated shopping cart and checkout system, and a management dashboard with a login system to add and modify the photos that are for sale.

For the shopping cart, we'll be using [the Stripe API](https://stripe.com/docs/payments/checkout).

One thing that quickly becomes apparent if you look at their docs, though, is that they don't expect anyone to use vanilla JS with it. The docs offer examples in a variety of backend languages using the SDKs, without any clear instructions on how to use it with plain old JS.

So today, I wanted to teach you how to do that. Let's dig in!

## The checkout flow

One of the most confusing things about using the Stripe API is the checkout flow.

Let's say you have a list of items a person wants to buy, saved as a JavaScript object. You want to send them to [a hosted checkout page, like this demo](https://checkout.stripe.dev/preview).

```js
let cart = [
	{
		name: 'Anchor',
		description: 'Keeps your boat in place',
		image: 'anchor.jpg',
		price: 99,
		quantity: 1
	}
];
```

To do that, you need to...

1. **Make an API call to the Stripe checkout sessions endpoint with the details of your cart.** This returns a session object that holds the details about the cart.
2. **Redirect the user to a checkout session.** The returned session object includes a redirect URL. Send users there to enter their payment information.
3. **After checkout, they're redirected back to your site.** You can show a confirmation message and so on.

It's not very complicated, but the docs are a bit... detailed? It can get overwhelming!

## Register a Stripe account

To get started, you need to register for an account with Stripe. 

You'll also need _test_ API keys. These let you charge a bunch of fake transactions using [test card numbers](https://stripe.com/docs/testing#cards). 

You'll receive a _public key_. This starts with `pk_`, and can be published publicly in your JS source code. You'll also receive a _secret key_, which, as the name suggests, is secret and should _never be published anywhere or stored in your source code_. It starts with `sk_`.

## Creating a checkout session

This requires your _secret key_. As a result, it cannot be run client-side.

In the workshop, we'll be using Cloudflare Workers, [a serverless vendor](https://vanillajsguides.com/serverless/), to handle this. They support [private environment variables](/how-to-use-environment-variables-with-cloudflare-workers-and-vanilla-js/), and let you author code in vanilla JS.

The request to the Stripe Checkout Sessions API requires your secret key as an `Authorization` header, prefixed with `Bearer`.

For a `body`, Stripe needs a PHP-style query string. We'll be using a `buildQuery()` helper function to do that from an object (more on that shortly).

```js
/**
 * Get a Stripe Checkout session
 * @return {Promise} Resolves to the session object
 */
async function getStripeSession () {

	// Call the Stripe API
	let stripeRequest = await fetch('https://api.stripe.com/v1/checkout/sessions', {
		method: 'POST',
		headers: {
			'Authorization': `Bearer ${API_TOKEN}`,
			'Content-type': 'application/x-www-form-urlencoded'
		},
		body: buildQuery({
			// ...
		})
	});

}
```

The `body` object needs an array of allowed `payment_method_types`. Set `mode` to `payment` (or `subscription` for recurring payments).

Include `success_url` and `cancel_url` properties, with URLs to redirect the customer to on success or if the transaction is cancelled, respectively.

Finally, we include an array of `line_items`. These are the items in their cart.

```js
// Call the Stripe API
let stripeRequest = await fetch('https://api.stripe.com/v1/checkout/sessions', {
	method: 'POST',
	headers: {
		'Authorization': `Bearer ${API_TOKEN}`,
		'Content-type': 'application/x-www-form-urlencoded'
	},
	body: buildQuery({
		payment_method_types: ['card'],
		mode: 'payment',
		success_url: 'http://my-website.com/success/',
		cancel_url: 'http://my-website.com/checkout/',
		line_items
	})
});
```

We need to convert our `cart` array into the format that Stripe is looking for. We'll use [the `Array.map()` method](/how-to-use-the-items-in-an-array-to-create-a-new-one-with-vanilla-javascript/) to do that.

Set the `currency` to your preferred currency code. Each item is an object with `price_data` and a `quantity`. The biggest gotcha is the `unit_amount`. 

Stripe does weird math here. Something that costs $99 would have a `unit_amount` of `9900`, so we have to multiply our `price` by `100`.

```js
let cart = [
	{
		name: 'Anchor',
		description: 'Keeps your boat in place',
		image: 'anchor.jpg',
		price: 99,
		quantity: 1
	}
];

let line_items = cart.map(function (item) {
	return {
		price_data: {
			currency: 'usd',
			product_data: {
				name: item.name,
				description: item.description,
				images: [item.image]
			},
			unit_amount: item.price * 100,
		},
		quantity: item.quantity,
	};
});
```

Once we get our session back, we can parse it into JSON with the `Response.json()` method, and send it back to our client-side code as an API response (if you're new to serverless, [I've written a primer here.](/getting-started-with-serverless-using-cloudflare-workers-and-vanilla-js/))

```js
// Get the API response
let stripeResponse = await stripeRequest.json();
```

## The buildQuery() helper function

There are simple one-liners for converting objects into query strings.

```js
let query = new URLSearchParams(data).toString();
```

However, they combine multiple items in an array together with a comma (`,`), and Stripe doesn't like this.

```js
// This makes Stripe mad
let query = 'images=anchor.jpg%2Canchor-underwater.jpg';
```

It expects array items to use a PHP-like `[]` syntax.

```js
// This makes Stripe happy
let query = 'images[0]=anchor.jpg&images[1]=anchor-underwater.jpg';
```

Here's a helper function that will convert an object into the PHP-style format that Stripe wants.

```js
/**
 * Create a PHP-style query string from an object
 * @param  {Object} data   The data to serialize into a string
 * @param  {String} prefix The prefix to use before the string
 * @return {String}        The serialized query string
 */
function buildQuery (data, prefix) {

	// Determine the data type
	var type = Object.prototype.toString.call(data).slice(8, -1).toLowerCase();

	// Loop through the object and create the query string
	return Object.keys(data).map(function (key, index)  {

		// Cache the value of the item
		var value = data[key];

		// Add the correct string if the object item is an array or object
		if (type === 'array') {
			key = prefix + '[' + index + ']';
		} else if (type === 'object') {
			key = prefix ? prefix + '[' + key + ']' : key;
		}

		// If the value is an array or object, recursively repeat the process
		if (typeof value === 'object') {
			return buildQuery(value, key);
		}

		// Join into a query string
		return key + '=' + encodeURIComponent(value);

	}).join('&');

}
```

## Redirecting to checkout

Once you get back the Stripe Checkout Session object, completing the process is as simple as redirecting the user to the `session.url` that you get back.

```js
// Call your serverless API to get a session object
let sessionRequest = await fetch('https://my-cloudflare.workers.dev', {
	method: 'POST',
	headers: {
		'Content-type': 'application/json'
	},
	body: JSON.stringify({
		cart,
		success_url: `https://my-website.com/success/`,
		cancel_url: `https://my-website.com/checkout/`
	})
});

// Get the session data
let session = await sessionRequest.json();

// Redirect to Stripe Checkout
window.location.href = session.url;
```

## Students won't have to figure this all out on their own

The server-side Stripe API bits are a bit clunky. 

I'll be providing students with a bunch of starting boilerplate code so they can focus more on data manipulation and integrating their serverless configuration with the front end. 

If this felt overwhelming... it is! Don't panic, and don't let it deter you from taking the new _Web Apps_ Academy workshop I'll be launching in January.