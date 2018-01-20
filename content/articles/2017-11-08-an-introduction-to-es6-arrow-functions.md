---
categories:
- Code
- JavaScript
date: '2017-11-08'
permalink: /an-introduction-to-es6-arrow-functions/
title: An introduction to ES6 arrow functions
url: /2017/11/08/an-introduction-to-es6-arrow-functions
---

*This post was adapted from my new Vanilla JS Pocket Guide, ["Variables, Functions, and Scope."](/guides/variables-functions-and-scope/)*

Arrow functions were introduced to JavaScript in ES6.

Their intent was to provide a shorter syntax for writing functions and eliminate some of the confusion that exists around `this`. Because they look so dramatically different from traditional functions, though, they often make scripts *more* confusing.

However, more and more scripts and tutorials are being written with arrow functions, so it's important that you at the very least understand how they work and can read code written with them.

## Basic Syntax

A basic arrow function isn't all that different from a traditional function. The word `function` gets dropped, an a fat arrow (`=>`) is added between the parentheses and brackets (`()` and `{}`, respectively).

```javascript
// A traditional function
var add = function (num1, num2) {
	return num1 + num2;
};

// The arrow function version
var add = (num1, num2) => {
	return num1 + num2;
};
```

*__Note:__ Named arrow functions have to be written as a function declaration. There's no way to write one as a function expression.*


## A simpler way to return a value

If your function is only returning a value, as is the case with our `add()` function, you can simplify the function even further by dropping the brackets and `return`.

```javascript
// returns `num1 + num2`
var add = (num1, num2) => num1 + num2;
```

This only works if the only thing you're doing is returning a value. If you need to do more stuff with your function, you have to use brackets.

## Browser Compatibility

Arrow functions work in all modern browsers, Safari 10 and up, and Mobile Chrome and Android 45 and up. They have no IE support.

Since support for them is pretty limited at this time, you would need to use a compiler like [Babel](https://babeljs.io) to convert them to traditional functions for broader browser support. Unfortunately, they cannot be polyfilled.

Babel does actually have an "in the browser" version you can load with a script tag, *but...* it requires you to inline your entire script, so it's not really a good solution for production sites.