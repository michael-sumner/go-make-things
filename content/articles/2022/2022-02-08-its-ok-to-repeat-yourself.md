---
title: Its OK to repeat yourself (DRY coding isn't the Holy Grail)
date: 2022-02-08T10:30:00-05:00
draft: false
categories:
- Code
- Design and UX
- JavaScript
---

Last week, [Ali Spittel tweeted](https://twitter.com/ASpittel/status/1489616929241563137)...

> Don't repeat yourself too much, but also don't abstract your code to an extent that it is not understandable.

In programing, DRY is an acronym that stands for _Don't Repeat Yourself_. It's good advice that's sometimes treated as a Holy Grail in coding. 

Sometimes, a little repeated code a good thing. Today, I wanted to look at some specific examples of when DRY is good, and when it creates more problems than it solves.

Let's dig in!

## Why DRY?

With any code you write, the "ideal" structure is one that makes your code easier to understand and maintain long term.

Blocks of repeated code create maintenance challenges.

Consider this function, `contentList()`. It takes an array of items and generates an unordered list (`ul`) as an HTML string from them.

```js
/**
 * Create a list of linked content items
 * @param  {Array}   items The content
 * @return {String}        The content list HTML
 */
function contentList (items) {
	let list = items.map(function (item) {
		return `<li id="${item.id}"><a class="link-no-underline" href="${item.url}">${item.title}</a></li>`;
	}).join('');
	return`<ul>${list}</ul>`;
}
```

What if you _also_ needed a way to create an _ordered list_ (`ol`) from an array of items? You might create a second function, `contentListOrdered()`.

```js
/**
 * Create a list of linked content items
 * @param  {Array}   items The content
 * @return {String}        The content list HTML
 */
function contentListOrdered (items) {
	let list = items.map(function (item) {
		return `<li id="${item.id}"><a class="link-no-underline" href="${item.url}">${item.title}</a></li>`;
	}).join('');
	return`<ol>${list}</ol>`;
}
```

This absolutely works! But, now you're also repeating yourself.

Imagine that something changes. Maybe one of the properties in the array of `items` gets renamed. Maybe you want to remove a class. Maybe you want to add an icon.

Whatever it is, now you need to make that same change in two places. This is where DRY programming comes in.

## Making functions DRY

With our content list functions, the only difference between them is whether the list is _ordered_ or _unordered_. 

This makes it a great candidate for abstraction! We can add a second property to our `contentList()` function, `ordered`. If `true`, we'll return an _ordered list_. If not, we'll return an _unordered list_ instead.

```js
/**
 * Create a list of linked content items
 * @param  {Array}   items   The content
 * @param  {Boolean} ordered If true, return an ordered list
 * @return {String}          The content list HTML
 */
function contentList (items, ordered) {
	let list = items.map(function (item) {
		return `<li id="${item.id}"><a class="link-no-underline" href="${item.url}">${item.title}</a></li>`;
	}).join('');
	return ordered ? `<ol>${list}</ol>` : `<ul>${list}</ul>`;
}
```

With one function parameter and a one-line code change, we removed six lines of code and a bunch of future maintenance challenges. That's great!

But sometimes, you can take this too far.

## Too much abstraction is bad

In the portal that my students use to access [their courses, books,](https://vanillajsguides.com) and [workshops](https://vanillajsacademy.com), I have two endpoints.

One handles all of the _account management_ stuff: logging in, changing your password, and so on. The other is used to get product data to render into the UI.

I have two utility functions to help me with that.

```js
/**
 * Make a call to the courses API
 * @param  {Object}  data  Data to send with the API [optional]
 * @return {Promise}       The fetch Promise
 */
function callAPI (data) {
	return fetch('/account-endpoint', {
		method: 'POST',
		headers: {
			'X-Requested-With': 'XMLHttpRequest',
			'Content-type': 'application/x-www-form-urlencoded'
		},
		body: buildQuery(data)
	}).then(function (response) {
		return response.json();
	}).then(function (data) {
		if (data.code >= 200 && data.code < 300) return data;
		throw data;
	});
}

/**
 * Get data for a product
 * @return {Promise} The fetch Promise
 */
function getProductData (api) {
	return fetch(`/product-endpoint&api=${api}`).then(function (response) {
		return response.json();
	}).then(function (data) {
		if (data.code >= 200 && data.code < 300) return data;
		throw data;
	}).catch(function (error) {
		if (error.code === 401) {
			logoutUser();
		}
	});
}
```

Both of these methods using `fetch()` to call an API. They both accept some data as an argument. They both convert the `response` to JSON, and handle errors.

It's tempting to look at these and try to wrap them into one utility function.

**But they have a handful of small differences that make additional abstraction worse than just having two functions.**

The `callAPI()` method sends `POST` requests. The `getProductData()` method makes `GET` requests. The endpoint for each is different. The `headers` are different. The way data is passed along to the API is different. The way errors are handled is different.

```js
function getData (product, data) {

	// Setup all of the options
	let endpoint = product ? `/product-endpoint&api=${api}` : '/account-endpoint';
	let options = {};
	if (!products) {
		options = {
			method: 'POST',
			headers: {
				'X-Requested-With': 'XMLHttpRequest',
				'Content-type': 'application/x-www-form-urlencoded'
			},
			body: buildQuery(data)
		};
	}

	// Make the call
	let call = fetch(endpoint, options).then(function (response) {
		return response.json();
	}).then(function (data) {
		if (data.code >= 200 && data.code < 300) return data;
		throw data;
	});

	// If it's the product API, handle errors
	if (product) {
		call.catch(function (error) {
			if (error.code === 401) {
				logoutUser();
			}
		});
	}

	// Return the API call
	return call;

}
```

By the time you account for all of these differences, you end up with an abstracted function that's more bloated and less usable than just having two functions.

I often tell my students "readability is more important than brevity." It's also more important than abstraction.