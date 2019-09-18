---
title: "How to check if something is an object with vanilla JavaScript"
date: 2018-04-04T10:30:00-04:00
draft: false
categories:
- Code
- JavaScript
---

Yesterday, we learned that `typeof` returns `object` for both objects and arrays in vanilla JavaScript. We also learned about [the `Array.isArray()` method for checking if an item is an array](/how-to-check-if-an-object-is-an-array-with-vanilla-javascript/).

But how do you check if something is an object?

There is no `Object.isObject()` method, unfortunately. But... we can make a small helper function to do just that.

## The `isPlainObject()` helper method

In JavaScript, basically everything is an object.

jQuery has a method called `isPlainObject()` to distinguish the broader Object prototype from an object of key/value pairs (`{}`). I like the logic behind that, so I'm going to stick with the same convention.

```js
var isPlainObject = function (obj) {
	// Conduct our check here.
};
```

As we learned yesterday, the `Object.prototype.toString()` method can be use to get a more specific type than `typeof`. Let's use that to check if our item is a plain object or not.

```js
var isPlainObject = function (obj) {
	return Object.prototype.toString.call(obj) === '[object Object]';
};

// Returns true
isPlainObject({sandwich: 'tuna', chips: 'cape cod'});

// Returns false
isPlainObject(['tuna', 'chicken', 'pb&j'])
```

## Browser Compatibility

This helper method works in all modern browsers, and at least back to IE6. You can also find it on the [Vanilla JS Toolkit](https://vanillajstoolkit.com/helpers/).