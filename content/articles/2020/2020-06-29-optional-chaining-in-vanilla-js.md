---
title: "Optional chaining in vanilla JS"
date: 2020-06-29T10:30:00-04:00
draft: false
categories:
- Code
- JavaScript
---

In vanilla JS, if you try to run a method on an element or object that doesn't exist the browser throws an error. The same thing happens if you try to access a nested object property that doesn't exist.

```js
// If an element with the class .harry-potter doesn't exist, the browser throws this error:
// Uncaught TypeError: Cannot read property 'classList' of null
document.querySelector('.harry-potter').classList.add('meh');

// If harry isn't a property of wizards, or house isn't a property of harry, the browser throws this error:
// Uncaught TypeError: Cannot read property 'house' of undefined
var wizards = {};
wizards.harry.house.toLowerCase();
```

For debugging purposes, the error and hard failure is really useful. But it can make writing resilient code that doesn't break if the thing you're looking for doesn't exist a lot harder.

Let's look at how to fix this.

## The old-school way to handle this

Historically, you've had to check for the thing you're trying to manipulate before trying to run your chained code.

```js
// Get an element with the class .harry-potter
var harry = document.querySelector('.harry-potter');

// If an element with the class .harry-potter exists, add the .meh class
if (harry) {
	harry.classList.add('meh');
}

// If the wizards.harry.house property exists, convert it to lower case
if (wizards.harry && wizards.harry.house) {
	wizards.harry.house.toLowerCase();
}
```

This works, but it results in verbose code and it's really easy to forget a check and cause an error.

Fortunately, there's a newer, simpler way to handle this.

## Optional chaining

Optional chaining is a browser-native way to chain methods or properties, and *conditionally* continue down the chain if the value is *not* `null` or `undefined`.

To use optional chaining, add a question mark (`?`) before the dot (`.`) in your chain.

```js
// If an element with the class .harry-potter doesn't exist, nothing happens
document.querySelector('.harry-potter')?.classList.add('meh');

// If harry isn't a property of wizards, or house isn't a property of harry, nothing happens
var wizards = {};
wizards.harry?.house.toLowerCase();
```

You can also combine optional chaining with something called a *nullish coalescing operator* (`??`, more on that tomorrow) to conditionally use an alternate value if the item doesn't exist.

```js
// If wizards.harry.house doesn't exist, use "hufflepuff" instead
var house = wizards.harry?.house.toLowerCase() ?? 'hufflepuff';
```

## Browser support

Optional chaining works in all modern browsers, but unfortunately has no IE support and cannot be polyfilled.