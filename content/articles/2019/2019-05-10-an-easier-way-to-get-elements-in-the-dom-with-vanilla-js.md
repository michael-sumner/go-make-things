---
title: "An easier way to get elements in the DOM with vanilla JS"
date: 2019-05-10T10:30:00-04:00
draft: false
categories:
- Code
- JavaScript
---

The `querySelector()` and `querySelectorAll()` methods are really handy for getting elements in the DOM.

But, they're a bit verbose, especially if you're used to using jQuery's `$()` selector shorthand. *And*, `querySelectorAll()` returns a NodeList instead of an array, which limits what you can do with it.

Today, let's look at two helper methods to make getting DOM elements easier.

## Getting the first matching element in the DOM

Let's create a helper function named `$()` that we'll use as a wrapper for `querySelector()`.

```js
var $ = function (selector) {
    return document.querySelector(selector);
};
```

This is a good start, but what if you wanted to look for elements inside an element other than the `document`?

We can add another (optional) argument: `parent`. If present, we'll attach `querySelector()` to that. Otherwise, we'll use the `document`.

```js
var $ = function (selector, parent) {
    return (parent ? parent : document).querySelector(selector);
};
```

[Here's a demo.](https://codepen.io/cferdinandi/pen/JVgOgo) You can find [this helper method on the Vanilla JS Toolkit](https://vanillajstoolkit.com/helpers/qs/), too.

## Getting all matching elements in the DOM

We can also create a helper function that serves as a wrapper for `querySelectorAll()`. Let's name this one `$$()`.

We can use the same format as our `$()` helper.

```js
var $$ = function (selector, parent) {
    return (parent ? parent : document).querySelectorAll(selector);
};
```

I mentioned earlier that one downside of `querySelectorAll()` is that it returns a NodeList instead of an array. That means that you can't use methods like `map()` and `reduce()` with it out-of-the-box.

Let's set up `$$()` to automatically convert the NodeList to an array before returning it to give us more flexibility.

The `Array.slice()` method creates a new array from an existing one. By using `call()`, we can apply that method to an array-like not-actually-an-array object like a NodeList.

```js
var $$ = function (selector, parent) {
    return Array.prototype.slice.call((parent ? parent : document).querySelectorAll(selector));
};
```

[Here's another demo.](https://codepen.io/cferdinandi/pen/pBMpoQ) You can also [find this function on the Vanilla JS Toolkit](https://vanillajstoolkit.com/helpers/qsa/).