---
title: "Default function arguments with ES6 default parameters"
date: 2018-02-19T10:30:00-05:00
draft: false
categories:
- Code
- JavaScript
---

On Friday, we looked at [how to set default function arguments](/default-function-arguments-with-vanilla-javascript/). Today, I want to show you an even easier way using ES6 default parameters.

## The old way

Traditionally, to set a default for a function argument, you need to redefine an argument variable if it's not already set.

```js
var add = function (num1, num2) {

	// If num1 or num2 aren't defined, set them to 0
	num1 = num1 || 0; // conditional operator
	num2 = num2 ? num2 : 0; // ternary operator

	// Add the numbers
	return num1 + num2;

};
```

This is... clunky and annoying. There's a better way!

## ES6 Default Parameters

With ES6, you can now define a default value by providing a variable name for your arguments.

```js
var add = function (num1 = 0, num2 = 0) {
	// Add the numbers
	return num1 + num2;
};
```

## Browser Compatibility

Now for the bad news: this works in all modern browsers, including MS Edge, but *doesn't* work in any version of Internet Explorer.

*And*, there's also no way to polyfill it. If you want to use this awesome feature and still support a good chunk of web users (and you should), you'll unfortunately need to use [a precompiler like Babel](https://babeljs.io/).

I'll be waiting another year or so before using this in projects.