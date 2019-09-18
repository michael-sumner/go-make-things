---
title: "How to build a query string from an object with vanilla JS"
date: 2018-11-01T10:30:00-04:00
draft: false
categories:
- Code
- JavaScript
---

If you're [sending data to API via Ajax](/ajax-and-apis-with-vanilla-javascript/), you may need add that data to the endpoint URL as a set of key/value pairs.

For example, with the [Petfinder API](https://www.petfinder.com/developers/api-docs/), you need to include an API key and the ID of the shelter you want to get a list of pets for. You can optionally also specify the maximum number of animal listings to get back, whether the data should be in JSON or XML, and more.

Here's an example.

```http
https://api.petfinder.com/shelter.getPets?format=json&key=1234my_key_would_go_here_5678&count=25&id=ABC99
```

Building those strings is a bit tedious. And if your content has spaces or special characters, you need to encode them with `encodeURIComponent()`.

Today, I wanted to show you a programmatic way to build query strings from an object with vanilla JS.

## Creating a helper function

Let's create a helper function named `buildQuery()`, inspired by [the WordPress `build_query()` method](https://codex.wordpress.org/Function_Reference/build_query).

This function will accept your data as an object of key/value pairs, and return a query string.

```js
var buildQuery = function (data) {
	// Do something...
};
```

First, let's check if the `data` passed in is already a string, and if so, return it as-is.

```js
var buildQuery = function (data) {

	// If the data is already a string, return it as-is
	if (typeof (data) === 'string') return data;
};
```

Next, we'll create an array that we'll push the key/value pairs to. As you'll see later, this provide a convenient way to separate them with an ampersand (`&`), without adding one to the last item.

Then, we can loop through the `data` object.

```js
var buildQuery = function (data) {

	// If the data is already a string, return it as-is
	if (typeof (data) === 'string') return data;

	// Create a query array to hold the key/value pairs
	var query = [];

	// Loop through the data object
	for (var key in data) {
		if (data.hasOwnProperty(key)) {
			// Do something...
		}
	}

};
```

Next, let's encode the key and value for each item in the object by running them through `encodeURIComponent()`.

We'll join them together into a string, separated with an equals sign (`=`). Then, we'll push the string to the `query` array.

Finally, we'll use the `join()` method to turn the array into a string, separating each item with an ampersand (`&`). Then, we'll return the resulting string.

```js
var buildQuery = function (data) {

	// If the data is already a string, return it as-is
	if (typeof (data) === 'string') return data;

	// Create a query array to hold the key/value pairs
	var query = [];

	// Loop through the data object
	for (var key in data) {
		if (data.hasOwnProperty(key)) {

			// Encode each key and value, concatenate them into a string, and push them to the array
			query.push(encodeURIComponent(key) + '=' + encodeURIComponent(data[key]));
		}
	}

	// Join each item in the array with a `&` and return the resulting string
	return query.join('&');

};
```

[You can find `buildQuery()` on the Vanilla JS Toolkit.](https://vanillajstoolkit.com/helpers/buildquery/)

## How to use it

Looking at the Petfinder API example from above, you'd use it like this.

```js
var endpoint = 'https://api.petfinder.com/shelter.getPets';
var query = buildQuery({
	format: 'json',
	key: '1234my_key_would_go_here_5678',
	count: 25,
	id: 'ABC99'
});
var callURL = endpoint + '?' + query;

// logs "https://api.petfinder.com/shelter.getPets?format=json&key=1234my_key_would_go_here_5678&count=25&id=ABC99"
console.log(callURL);
```

## Browser Compatibility

The `buildQuery()` method works in all modern browsers, and back to at least IE6.