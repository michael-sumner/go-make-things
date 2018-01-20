---
categories:
- Code
- JavaScript
- WordPress
date: '2017-10-27'
url: /conditional-cost-of-living-discounts-with-javascript-and-some-api-magic/
title: Conditional cost of living discounts with JavaScript and some API magic
---

<img src="https://gomakethings.com/wp-content/uploads/2017/10/col-discounts.jpg" alt="" width="1440" height="358" class="aligncenter size-full wp-image-17301" />

Yesterday, I added an automatic cost of living discount feature to my site for [Vanilla JS Pocket Guides](/guides/).

If you visit the site from a country where the salary, cost of living, and exchange range with the US make the pocket guides unfairly expensive or unaffordable, you're offered a custom discount code and amount that brings the price inline with what someone in the US would pay relative to what they make in a year.

If you've been holding off because my guides are too expensive where you live hopefully this helps you out.

Today, I wanted to show you how I make this all work.

*__Note:__ If your country doesn't show up, [please email me](/about/)! So far, I've only added countries that people have emailed me about.*

*Also, I hope this is obvious, but `FAKE_CODE` won't really work, and people in the US don't get offered a cost-of-living discount.*

## Getting a visitor's location

[Free GEO IP](https://freegeoip.net) lets you get a person's geographic information based on their IP address.

I use this to get a visitor's ISO code (the two digit country code).

## Some boring sever-side stuff

My store is powered by [Easy Digital Downloads (EDD)](https://easydigitaldownloads.com/).

I wrote [a custom plugin](https://github.com/cferdinandi/gmt-pricing-parity) that adds a new post type: Pricing Parity. When I create a new pricing parity discount, I choose a country and discount code from a set of dropdown menus. The plugin automatically populates the list of discount codes available in EDD.

<img src="https://gomakethings.com/wp-content/uploads/2017/10/col-discount-example.png" alt="" width="960" height="362" class="aligncenter size-full wp-image-17300" />

The plugin also provides a short code I can use to generate my discount message.

It accepts variables for things like the country name, the discount code, and more, so I can quickly change my discount message on the fly if I want to.

```html
[[pricing_parity]Hi! Looks like you're from {{country}}, where my Vanilla JS Pocket Guides might be a bit expensive. You can use the code {{code}} at checkout to take {{amount}} off any of my guides. Cheers![/pricing_parity]]
```

## Custom JavaScript

I don't just drop the shortcode on my site and call it a day, though.

Since everyone's cost-of-living discount is different, I can't [cache the discount shortcode](/how-i-improved-the-speed-of-my-wordpress-site-by-500/), and that would add a lot of latency to page loads.

Instead, I drop the shortcode onto [it's own page](/pricing-parity/), and use Ajax to get the content and drop it into the page when it's ready.

I only display it on product and checkout pages, but I grab the discount message when someone first visits any page and store it with `sessionStorage`. That way, it's immediately displayed when they hit a product sales page.

### The code that makes it all work

Here's the custom JavaScript.

```js
/**
 * Load pricing parity message
 */
;(function (window, document, undefined) {

	'use strict';

	// Render the pricing parity message
	var renderPricingParity = function (data) {

		// Make sure we have data to render
		if (!data) return;

		// Only render on sales pages
		if (!/\/guides\//.test(window.location.pathname) && !/\/checkout\//.test(window.location.pathname)) return;

		// Get the nav
		var nav = document.querySelector('header');
		if (!nav) return;

		// Create container
		var pricing = document.createElement('div');
		pricing.id = 'pricing-parity';
		pricing.className = 'bg-muted padding-top-small padding-bottom-small';
		pricing.innerHTML = data;

		// Insert into the DOM
		nav.parentNode.insertBefore(pricing, nav);

	};

	// Get the pricing parity message via Ajax
	var getPricingParity = function () {

		// Set up our HTTP request
		var xhr = new XMLHttpRequest();
		if (!('responseType' in xhr)) return;

		// Setup our listener to process compeleted requests
		xhr.onreadystatechange = function () {
			// Only run if the request is complete
			if ( xhr.readyState !== 4 ) return;

			// Process our return data
			if ( xhr.status === 200 ) {

				// Get the content and render it
				var pricing = xhr.response.querySelector('#pricing-parity-content');
				if (!pricing) return;
				renderPricingParity(pricing.innerHTML);

				// Save the content to sessionStorage
				sessionStorage.setItem('gmt-pricing-parity', pricing.innerHTML);

			}
		};

		// Create and send a GET request
		xhr.open('GET', '/pricing-parity');
		xhr.responseType = 'document';
		xhr.send();

	};

	// Don't run on the pricing parity page itself
	if (document.querySelector('#pricing-parity-content')) return;

	// Get and render pricing parity info
	var pricing = sessionStorage.getItem('gmt-pricing-parity');
	if (typeof pricing === 'string') {
		renderPricingParity(pricing);
	} else {
		getPricingParity();
	}

})(window, document);
```

I'm doing a few things here that I want to point out.

### XHR.responseType

I'm using the `responseType` property of XMLHttpRequest (XHR) to get my pricing parity page as a document. This let's me search for content inside it with `querySelector()`.

The `response` type property is only supported in IE10 and up, so I do a quick feature check before running it.

```js
// Set up our HTTP request
var xhr = new XMLHttpRequest();
if (!('responseType' in xhr)) return;
```

On success, I can grab my `#pricing-parity-content` message with `querySelector()` and grab it's contents with `innerHTML`.

```js
// Get the content and render it
var pricing = xhr.response.querySelector('#pricing-parity-content');
if (!pricing) return;
renderPricingParity(pricing.innerHTML);
```

### sessionStorage

I also save my message to `sessionStorage` so that I only have to make the Ajax call once. After that, I can just pull the discount text directly from storage.

```js
// Save the content to sessionStorage
sessionStorage.setItem('gmt-pricing-parity', pricing.innerHTML);
```

When the script first loads, I check to see if there's an entry in `sessionStorage`, and if so, immediately run my `renderPricingParity()` method.

```js
// Get and render pricing parity info
var pricing = sessionStorage.getItem('gmt-pricing-parity');
if (typeof pricing === 'string') {
	renderPricingParity(pricing);
} else {
	getPricingParity();
}
```

You'll notice I'm checking if it's a string, and not whether or not it exists. If there was no discount, its saved as an empty string, and `if (pricing) {}` would fail, triggering another, unnecessary Ajax call.

### Creating a new element

I use `document.createElement` to create a new `div`, and `insertBefore()` to inject it into the DOM. I add a handful of properties specific to my layout to give it some style.

```js
// Create container
var pricing = document.createElement('div');
pricing.id = 'pricing-parity';
pricing.className = 'bg-muted padding-top-small padding-bottom-small';
pricing.innerHTML = data;

// Insert into the DOM
nav.parentNode.insertBefore(pricing, nav);
```

### Only running it on sales pages

Before rendering anything, I run a quick check to make sure the page is a product or checkout page.

I'm using a simple regex pattern to check for `/guides/` or `/checkout/` in the URL `pathname`. If it contains either of those, it's a sales page. Otherwise, it's not and I can bail.

```js
// Only render on sales pages
if (!/\/guides\//.test(window.location.pathname) && !/\/checkout\//.test(window.location.pathname)) return;
```

If you live somewhere with a cost-of-living that makes buying [my guides](/guides/) expensive, I hope this makes things a bit easier for you.