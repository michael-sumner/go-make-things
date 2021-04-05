---
title: "How to build a query string from an object of data with vanilla JS"
date: 2021-04-05T10:30:00-04:00
draft: false
categories:
- Code
- JavaScript
---

Today, we're going to look at how to build a query string using a data object with vanilla JS. This used to be kind of tedious, but a few new JavaScript methods have made it a lot easier.

Let's dig in!

## An example

Let's say you have an object of data, like this.

```js
let petfinderData = {
	key: '12345',
	shelterID: 'abc00',
	count: 20,
	animals: ['dogs', 'cats']
};
```

You want to convert it into a query string that you can send along with an API request, like this.

```js
let endpoint = 'https://api.petfinder.com?key=12345&shelterID=abc00&count=20&animals=dogs%2Ccats';
```

How would you do that?

## The `URLSearchParams()` method

The `URLSearchParams()` method was built specifically for creating and manipulating query string data.

To create a `URLSearchParams` object, we can use the `new URLSearchParams()` constructor, passing in our data object as an argument.

```js
let query = new URLSearchParams(petfinderData);
```

Once you have a `URLSearchParams` object, you can use [a variety of methods to get and add values to the data](/getting-values-from-a-url-with-vanilla-js/#working-with-search-parameter-values), if needed.

In our case, we just need to get a query string, which we can do with the `URLSearchParams.toString()` method.

This automatically encodes any data in our object for us, and returns a query string.

```js
let query = new URLSearchParams(petfinderData);

// returns "key=12345&shelterID=abc00&count=20&animals=dogs%2Ccats"
let queryString = query.toString();
```

[Here's a demo.](https://codepen.io/cferdinandi/pen/rPNgEe)

We can use it to create our URL like this.

```js
let endpoint = `https://api.petfinder.com?${queryString}`;
```

## A helper function

I've put together [a little helper function, `buildQuery()`](https://vanillajstoolkit.com/helpers/buildquery/), that you can use to more easily create query strings from objects.

```js
/*!
 * Build a query string from an object of data
 * (c) 2021 Chris Ferdinandi, MIT License, https://gomakethings.com
 * @param  {Object} data The data to turn into a query string
 * @return {String}      The query string
 */
function buildQuery (data) {
	return new URLSearchParams(data).toString();
}

let petfinderData = {
	key: '12345',
	shelterID: 'abc00',
	count: 20,
	animals: ['dogs', 'cats']
};

let endpoint = `https://api.petfinder.com?${buildQuery(petfinderData)}`;
```