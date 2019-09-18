---
title: "Using array methods with NodeLists in vanilla JS"
date: 2019-04-05T10:30:00-04:00
draft: false
categories:
- Code
- JavaScript
---

*__Quick reminder:__ there's only two days left to get early bird discounting on the next session of the [Vanilla JS Academy](https://vanillajsacademy.com) running in May. Use the code `EarlyBird` at checkout to save 40%.*

The `querySelectorAll()` method is awesome, and makes it really easy to find all matching elements. And modern array methods like `map()` and `filter()` are super powerful.

Unfortunately, `querySelectorAll()` returns a NodeList, not an array, so those methods won't work with it.

```js
// Get all wizards
var wizards = document.querySelector('[data-wizard]');

// Filter out Harry Potter
// NOTE: This WILL NOT work
var noHarry = wizards.filter(function (wizard) {
	return wizard.getAttribute('[data-wizard]') !== 'Harry Potter';
});
```

There are two quick ways to fix that. Both involve converting your NodeList into an array.

## `Array.from()`

The `Array.from()` method converts an array-like object into an actual array.

```js
// Get all wizards as an array
var wizards = Array.from(document.querySelector('[data-wizard]'));
```

This works in all modern browsers, included Edge, but not IE. You can [fix that with a polyfill](https://vanillajstoolkit.com/polyfills/arrayfrom/).

## `Array.prototype.slice.call()`

If you don't want to use a polyfill, you can use the `call()` method to apply the `Array.slice()` method&mdash;which creates a new array from an existing one&mdash;to a non-array.

```js
// Get all wizards as an array
var wizards = Array.prototype.slice.call(document.querySelector('[data-wizard]'));
```

This works back to at least IE6.