---
title: "How to automatically sanitize reactive data with vanilla JS"
date: 2019-08-23T10:30:00-04:00
draft: false
categories:
- Code
- HTML
- JavaScript
---

Yesterday, we looked at [how build a reactive, state-based UI with vanilla JS](/data-reactivity-with-vanilla-js/).

One of the dangers of a state-based UI when working with third-party or user-supplied data (such as todo items in a todo list) is that [you expose yourself to the risk of a cross-site scripting (XSS) attack](/preventing-cross-site-scripting-attacks-when-using-innerhtml-in-vanilla-javascript/).

Today, let's look at how to automatically sanitize data before rendering your UI.

## The trick

The trick to preventing a XSS attack is to remove or encode any markup in the data before using it.

A simple way to do that is with [a helper function](https://vanillajstoolkit.com/helpers/sanitizehtml/) that encodes any markup in a string, turning something like `<strong>Hello!</strong>` into `&lt;strong&gt;Hello!&lt;/strong&gt;`.

```js
/*!
 * Sanitize and encode all HTML in a user-submitted string
 * (c) 2018 Chris Ferdinandi, MIT License, https://gomakethings.com
 * @param  {String} str  The user-submitted string
 * @return {String} str  The sanitized string
 */
var sanitizeHTML = function (str) {
	var temp = document.createElement('div');
	temp.textContent = str;
	return temp.innerHTML;
};
```

This works by creating a temporary `div` and adding the content with `textContent` to escape any characters. It then returns them using `innerHTML` to prevent those escaped characters from transforming back into unescaped markup.

## Automatically doing this with reactive data

Here's our reactive data method from yesterday.

```js
/**
 * Reactivity update the data object
 * @param {Object} obj The data to update
 */
var setData = function (obj) {
	for (var key in obj) {
		if (obj.hasOwnProperty(key)) {
			data[key] = obj[key];
		}
	}
	app.innerHTML = template(data);
};
```

Before passing `data` into the `template()` function, we want to loop through it and use the `sanitizeHTML()` method on any strings. Let's create a `clone()` helper method that will accept the object to copy as an argument.

```js
/**
 * Create an immutable copy of an object and recursively encode all of its data
 * @param  {*} obj The object to clone
 * @return {*}     The immutable, encoded object
 */
var clone = function (obj) {
	// Code goes here
};
```

## Creating a sanitized copy of the data

First, let's create a new object to push our sanitized data into. Then, we'll loop through each item in the `obj`.

If the item is a string, we'll sanitize it. Otherwise, we'll push it as-is.

```js
var clone = function (obj) {

	var cloned = {};

	for (var key in obj) {
		if (obj.hasOwnProperty(key)) {
			if (typeof obj[key] === 'string') {
				cloned[key] = sanitizeHTML(obj[key]);
			} else {
				cloned[key] = obj[key];
			}
		}
	}

	return cloned;

};
```

So far, so good. But what happens if the item is an object, or an array? We need to loop through each of those and sanitize its content, too.

__We need *recursion*.__

## Recursive sanitizing

The first thing we'll do is identify what type our `obj` is.

The `typeof` method calls both objects and arrays `object`. We need something more accurate. Fortunately, there's [a trick we can use to get the true type of an object](/true-type-checking-with-vanilla-js/).

```js
// Get the object type
var type = Object.prototype.toString.call(obj).slice(8, -1).toLowerCase();
```

If the `obj` is an object, we'll loop through it with a `for...in` loop. But rather than sanitize the content, we'll pass it back into `clone()` and set the result to our `cloned[key]`.

That's *recursion*.

```js
var clone = function (obj) {

	// Get the object type
	var type = Object.prototype.toString.call(obj).slice(8, -1).toLowerCase();

	// If an object, loop through and recursively encode
	if (type === 'object') {
		var cloned = {};
		for (var key in obj) {
			if (obj.hasOwnProperty(key)) {
				cloned[key] = clone(obj[key]);
			}
		}
		return cloned;
	}

};
```

Next, if the `obj` is an array, we'll loop through it with `Array.map()`, passing each item in our new array recursively into the `clone()` method.

```js
var clone = function (obj) {

	// Get the object type
	var type = Object.prototype.toString.call(obj).slice(8, -1).toLowerCase();

	// If an object, loop through and recursively encode
	if (type === 'object') {
		var cloned = {};
		for (var key in obj) {
			if (obj.hasOwnProperty(key)) {
				cloned[key] = clone(obj[key]);
			}
		}
		return cloned;
	}

	// If an array, create a new array and recursively encode
	if (type === 'array') {
		return obj.map(function (item) {
			return clone(item);
		});
	}

};
```

If the `obj` is a string, we can sanitize it. Otherwise, we'll return it as-is.

```js
var clone = function (obj) {

	// Get the object type
	var type = Object.prototype.toString.call(obj).slice(8, -1).toLowerCase();

	// If an object, loop through and recursively encode
	if (type === 'object') {
		var cloned = {};
		for (var key in obj) {
			if (obj.hasOwnProperty(key)) {
				cloned[key] = clone(obj[key]);
			}
		}
		return cloned;
	}

	// If an array, create a new array and recursively encode
	if (type === 'array') {
		return obj.map(function (item) {
			return clone(item);
		});
	}

	// If the data is a string, encode it
	if (type === 'string') {
		return sanitizeHTML(obj);
	}

	// Otherwise, return object as is
	return obj;

};
```

## Putting this all together

Now, in our `setData()` method, we'll clone the data before passing it into the template.

```js
/**
 * Reactivity update the data object
 * @param {Object} obj The data to update
 */
var setData = function (obj) {
	for (var key in obj) {
		if (obj.hasOwnProperty(key)) {
			data[key] = obj[key];
		}
	}
	var sanitized = clone(data);
	app.innerHTML = template(sanitized);
};
```

[Try it yourself here.](https://codepen.io/cferdinandi/pen/MWgJorQ)