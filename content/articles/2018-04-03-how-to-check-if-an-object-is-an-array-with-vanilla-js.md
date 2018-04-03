---
title: "How to check if an object is an array with vanilla JavaScript"
date: 2018-04-03T10:30:00-04:00
draft: false
categories:
- Code
- JavaScript
---

You may have used `typeof` to check the type of a JavaScript object before. Unfortunately, that doesn't work for arrays.

Today, I'm going to show you how to check if an item is an array with vanilla JavaScript.

## The problem with `typeof`

For many object types in JavaScript, you can use `typeof` to determine what kind of object it is.

```js
// Returns 'string'
typeof 'Hello, world!';

var sayHi = function () {
	alert('Hello, world!');
};

// Returns 'function'
typeof sayHi;
```

However, this doesn't work with arrays. It returns `object`, just like objects, dates, and more.

```js
// Returns 'object'
typeof ['tuna', 'chicken', 'pb&j'];

// Also returns 'object'
typeof {sandwich: 'tuna', chips: 'cape code'};
```

## An old-school way to check if something is an array

Todd Motto showed me an interesting way to deal with this: the `Object.prototype.toString()` method.

This method converts the object type into a string. And in JavaScript, confusingly, *everything* is an object&mdash;not just proper objects (`{}`).

To make this work, you use `call()` to call the `toString()` method on your array.

```js
var arr = ['tuna', 'chicken', 'pb&j'];
var obj = {sandwich: 'tuna', chips: 'cape cod'};

// Returns '[object Array]'
Object.prototype.toString.call(arr);

// Returns '[object Object]'
Object.prototype.toString.call(obj);
```

## The modern way to check if something is an array.

The `Array.isArray()` method check if a value is an array or not.

```js
var arr = ['tuna', 'chicken', 'pb&j'];
var obj = {sandwich: 'tuna', chips: 'cape cod'};

// Returns true
Array.isArray(arr);

// Return false
Array.isArray(obj);
```

It works in all modern browsers, and IE9 and up. You can [push support back to at least IE6 with a tiny polyfill](https://vanillajstoolkit.com/polyfills/arrayisarray/) that actually uses `Object.prototype.toString()` under the hood.