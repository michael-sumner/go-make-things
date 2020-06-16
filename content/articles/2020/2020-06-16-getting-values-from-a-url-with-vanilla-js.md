---
title: "Getting values from a URL with vanilla JS"
date: 2020-06-16T10:30:00-04:00
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

Let's say you have a URL string, like this.

```js
var str = 'https://learning.gomakethings.com/search?query=fetch&page=2#using-the-fetch-api';
```

If you need to get the hash (`#using-the-fetch-api`) or the URL search parameters (`?query=fetch&page=2`) from the string, how would you?

Today, we're going to learn how to get data from a URL string using the `URL()` constructor method.

## Creating a URL object

We can convert the URL string into a URL object using the `new URL()` constructor.

```js
var url = new URL('https://learning.gomakethings.com/search?query=fetch&page=2#using-the-fetch-api');
```

If you had a relative URL with a different base URL then the current site, you could also pass that base in as an optional second argument.

```js
var relativeURL = new URL('/search?query=fetch&page=2#using-the-fetch-api', 'https://learning.gomakethings.com');
```

This returns a new `URL` object that looks like this.

```js
var url = {
	hash: "#using-the-fetch-api",
	host: "learning.gomakethings.com",
	hostname: "learning.gomakethings.com",
	href: "https://learning.gomakethings.com/search?query=fetch&page=2#using-the-fetch-api",
	origin: "https://learning.gomakethings.com",
	password: "",
	pathname: "/search",
	port: "",
	protocol: "https:",
	search: "?query=fetch&page=2",
	searchParams: "URLSearchParams {}",
	username: ""
};
```

Now, you can easily snag properties from the URL string.

[Here's a demo.](https://codepen.io/cferdinandi/pen/ExPgGQV)

## Working with search parameter values

The `URL()` object also provides some handy methods for working with search parameters in your URL.

One of the properties on the returned object is `search`. You can use that to get the entire search parameter string.

```js
// logs "?query=fetch&page=2"
console.log(url.search);
```

But what if you wanted to get the value of `query` or `page`?

For that, we have the `URLSearchParams()` object, which is automatically mapped to the `searchParams` property in the object returned from the `URL()` constructor.

It contains a handful of methods for getting, setting, and deleting search parameters.

```js
// Get the value for the the "query" parameter
// returns "fetch"
url.searchParams.get('query');

// Gets all matching values, if there's more than one
// returns ["fetch"]
url.searchParams.getAll('query');

// Checks if a value exists in the search params (boolean)
// returns true
url.searchParams.has('query');

// Gets an Iterator of keys
// Iterators can be looped through with a for...of
url.searchParams.keys();

// Gets an iterator of values
url.searchParams.values();

// Appends a new search parameter entry
// This adds an *additional* entry if the key already exists
url.searchParams.append('query', 'chicken');

// Sets a search parameter entry
// If the value already exists, it will replace it
// If there are more than one, all others are deleted
url.searchParams.set('query', 'chicken');

// Deletes all instances of a search parameter
url.searchParams.delete('query');

// Provides an iterator method for looping through search parameter values
url.searchParams.forEach(function (value, key) {
	console.log(key, value);
});

// Sorts search parameters alphabetically by key
url.searchParams.sort();
```

## Browser Compatibility

The `URL()` and `URLSearchParams()` constructors work in all modern browsers, but not IE. They can be polyfilled with [Polyfill.io](https://polyfill.io/v3/).