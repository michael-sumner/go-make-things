---
title: "Converting a NodeList to an array with vanilla JavaScript"
date: 2018-03-21T10:30:00-04:00
draft: false
categories:
- Code
- JavaScript
---

The native JavaScript ES6 release brought a handful of helpful methods for working with arrays: `Array.forEach()`, `Array.every()`, `Array.some()`, `Array.filter()`, and more.

Unfortunately, you can't use any of these with the elements you get back when using `querySelectorAll()`, because it returns a NodeList, not an array.

Today, I'm going to show you how to convert a NodeList to an array so you can take full advantage of all those cool new ES6 array methods.

## NodeList vs. Array

[What's the difference between a NodeList and an array anyways?](/nodelists-vs-arrays/) I actually wrote about this last year.

> NodeLists and Arrays are two different things because NodeLists are actually not a JavaScript API, but a browser API.
>
> Things like `querySelectorAll()` and `getElementsByTagName()` aren’t JavaScript methods, they’re browser APIs that let you access DOM elements. You can then manipulate them with JavaScript.

This used to confuse me like crazy, too, because JavaScript is *the* scripting language of the front end. Turns out, other languages can access these methods, too.

(*MDN provides an example [using Python with `getElementsByTagName()`](https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model/Introduction#DOM_and_JavaScript).*)

## Converting a NodeList to an Array

So... how do you convert a NodeList to an array?

The original way to handle this was to use the `call()` method to run the `Array.prototype.slice()` method on your NodeList, like this.

```js
// Get all buttons as a NodeList
var btns = document.querySelectorAll('button');

// Convert buttons NodeList to an array
var btnsArr = Array.prototype.slice.call(btns);
```

[Here's a demo for you to play with.](https://jsfiddle.net/cferdinandi/y5n9s1mu/)

This works, but it's a bit verbose. There's a new method you can use to achieve the same thing: `Array.from()`.

The `Array.from()` method creates a new array from an existing one, *or* from an array-like object (which is what a NodeList is).

```js
// Get all buttons as a NodeList
var btns = document.querySelectorAll('button');

// Convert buttons NodeList to an array
var btnsArr = Array.from(btns);
```

[Here's an updated demo with `Array.from()`.](https://jsfiddle.net/cferdinandi/y5n9s1mu/3/)

## Browser Compatibility

The `Array.prototype.slice.call()` approach has been around for a *long* time. It works in all modern browsers, and back to at least IE6.

The `Array.from()` method works in all modern browsers, but has no IE support (only Edge). You can [push support back to at least IE9 with a polyfill](https://vanillajstoolkit.com/polyfills/arrayfrom/), though.