---
title: "How to get all of the query string parameters from a URL with vanilla JS"
date: 2021-04-16T10:30:00-04:00
draft: false
categories:
- Code
- JavaScript
---

Let's imagine you have a URL with some query string parameters, and you want to get an object with all of the key/value pairs in that string.

```js
let url = 'https://sandwich-shop.com?sandwich=chicken%20salad&bread=wheat&topping=tomato&topping=spicy+mayo';
```

Today, let's learn how to do that.

## Creating a helper function

Let's start by creating a helper function, `getParams()`. We'll accept a `url` as an argument, but use the `window.location` as a default if one is not provided.

```js
function getParams (url = window.location) {
	// Do stuff...
}
```

Inside the function, we want to create a new object, push all of the query string keys and values form our `url` into it, and then return the object.

```js
function getParams (url = window.location) {
	let params = {};
	// Do stuff with the URL...
	return params;
}
```

Let's look at how to get the query string values from our URL.

## The `URL()` and `URLSearchParams()` objects

Last year, I wrote about [the `URL()` and `URLSearchParams()` objects](/getting-values-from-a-url-with-vanilla-js/), and how you can use them to get query string values from a URL string.

The `URLSearchParams()` object itself has a `forEach()` method that you can use to loop through every parameter. We can use it to iterate through each parameter and push it to an object.

We'll pass the `url` into a `new URL()` constructor, then call the `forEach()` method on the `searchParams` property.

```js
function getParams (url = window.location) {

	// Create a params object
	let params = {};

	new URL(url).searchParams.forEach(function (val, key) {
		// Push the key/value to the params object
	});

	return params;

}
```

Inside the `forEach()` method, we'll add the `key` and its `val` to the `params` object. We don't need to decode anything. The `URLSearchParams()` object does that for us automatically.

```js
function getParams (url = window.location) {

	// Create a params object
	let params = {};

	new URL(url).searchParams.forEach(function (val, key) {
		params[key] = val;
	});

	return params;

}
```

## Handling multiple keys with the same name

What we have so far works great, but... our URL has two keys with the same name: `topping`.

The way it's currently written, `getParams()` will only include the last one, wiping out each subsequent key with the new one.

Let's check to see if the `key` already exists in `params`. If so, we'll turn it into an array, add the existing value, and push the new one.

```js
function getParams (url = window.location) {

	// Create a params object
	let params = {};

	new URL(url).searchParams.forEach(function (val, key) {
		if (params[key] !== undefined) {
			params[key] = [params[key]];
			params[key].push(val);
		} else {
			params[key] = val;
		}
	});

	return params;

}
```

This works great if there's only two of the same `key`, but if there's more than that, the value of that `key` will already be an array. Creating a new one will cause issues.

Let's first check to see if the `params[key]` is already an array using [the `Array.isArray()` method](/the-array.isarray-method-in-vanilla-js/).

```js
function getParams (url = window.location) {

	// Create a params object
	let params = {};

	new URL(url).searchParams.forEach(function (val, key) {
		if (params[key] !== undefined) {
			if (!Array.isArray(params[key])) {
				params[key] = [params[key]];
			}
			params[key].push(val);
		} else {
			params[key] = val;
		}
	});

	return params;

}
```

## The completed script

Now, we can use our script like this.

```js
// Pass in a URL string
getParams(url);

// Use the current URL
getParams();
```

[Here's a demo of the completed script](https://codepen.io/cferdinandi/pen/PVwwpZ) that you can play with.

You can [find this helper function on the Vanilla JS Toolkit](https://vanillajstoolkit.com/helpers/getparams/).