---
title: "What's the difference between polyfills, helper functions, and transpiling in JavaScript?"
date: 2019-09-16T10:30:00-04:00
draft: false
categories:
- Code
- JavaScript
---

Friday's article on [what can and can't be polyfilled in JavaScript](/what-can-and-cant-be-polyfilled-in-vanilla-js/) sparked some interesting conversations with a few readers about polyfills, helper functions, and transpiling, and how they're different.

Today, let's clear that all up.

## Some example code

To make this tangible, let's look at some sample code. Imagine you had a loop you wanted to run using the `Array.prototype.forEach()` method, and that you might be using in it some browsers that don't support it.

(*This method has really good browser support today, but it's a simple example to work with, so bear with me.*)

```js
var sandwiches = ['turkey', 'tuna', 'ham'];

// Log each sandwich to the console
sandwiches.forEach(function (sandwich) {
	console.log(sandwich);
});
```

Let's look at three different ways that you could support this in browsers that lack an `Array.prototype.forEach()` method.

## Polyfills

With a polyfill, you would use your code as-is.

```js
var sandwiches = ['turkey', 'tuna', 'ham'];

// Log each sandwich to the console
sandwiches.forEach(function (sandwich) {
	console.log(sandwich);
});
```

*But*... you would include some code that adds the method to the `Array.prototype` if it doesn't exist.

```js
// If the forEach() method doesn't already exist on Array.prototype
if (!Array.prototype.forEach) {

	// Attach a function called forEach() to the Array.prototype
 	Array.prototype.forEach = function (callback, thisArg) {

 		// Use a traditional for loop to loop through the array
 		// and run the callback function
		thisArg = thisArg || window;
		for (var i = 0; i < this.length; i++) {
			callback.call(thisArg, this[i], i, this);
		}

	};

}
```

## Helper functions

Instead of a polyfill, you could write a helper function that uses an older, more well-supported approach under-the-hood, but provides an easier syntax.

```js
var forEach = function (arr, callback) {
	for (var i = 0; i < arr.length; i++) {
		callback(arr[i], i);
	}
};
```

And instead of using our code as-is, we would rewrite it like this.

```js
var sandwiches = ['turkey', 'tuna', 'ham'];

forEach(sandwiches, function (sandwich) {
	console.log(sandwich);
});
```

## Transpiling

A transpiler like [Babel](https://babeljs.io/) will take your modern code and output older, more broadly supported code.

You run it *before* deploying your code to production. The code that it spits out is what actually gets sent to the browser. Our original code might come out of Babel looking like this.

```js
var sandwiches = ['turkey', 'tuna', 'ham'];

for (var i = 0; i < sandwiches.length; i++) {
	console.log(sandwiches[i]);
}
```

Transpiling also works for operators and expressions&mdash;things that you can support with polyfills or helper functions.

It can convert `let` and `const` to properly scoped `var` declarations, convert arrow functions to traditional ones, convert spread syntax to other approaches, and more.

## Which one should you use?

Like all things programming: it depends.

I favor polyfills whenever possible. Modern browsers are optimized to run modern code, so shipping transpiled code can sometimes result in worse performance for a majority of your users.

Polyfills let you ship modern code that works everywhere. And a service like [polyfill.io](https://polyfill.io) will detect what your user's browser needs automatically, so that they don't get polyfills for features their browser already supports natively.

If you *need* (or just really want) to use non-polyfillable features&mdash;things like template literals&mdash;transpiling is your only choice. You can combine techniques, though. You can tell Babel to *only* transpile one feature, and polyfill the rest.

These days, I use helper functions to handle repetitive or complex tasks, but not for feature support type things.