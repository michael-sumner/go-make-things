---
title: "Checking if a value is an array with vanilla JS"
date: 2020-09-02T10:30:00-04:00
draft: false
categories:
- Code
- JavaScript
---

Today, we're going to learn how to check if an item is an array with vanilla JS.

Let's dig in.

## The problem

In JavaScript, the `typeof` operator returns a string indicating the *type* of an object. Or, at least, it's supposed to.

But it doesn't always return the result you would expect for certain types of JS objects.

```js
// returns "number"
// Cool, that's what we'd expect
typeof 42;

// returns "boolean"
// Also expected, cool cool
typeof true;

// returns "object"
// Looking good, keep it up
typeof {};

// returns "object"
// Wait, what?
typeof [];

// returns "object"
// What the... ok, this is just weird
var h1 = document.querySelector('h1');
typeof h1;
```

The `typeof` operator says a lot of things that you or I probably wouldn't consider *objects* objects.

And yes, [(almost) everything is an object in JavaScript](/everything-is-an-object-in-javascript/). But `[]`? That's an array, obviously. The `h1` element is a Node.

Fortunately, there's a native method that can help here.

## The `Array.isArray()` method

The `Array.isArray()` method accepts a single argument: the value you want to check.

If it's an array, the method returns `true`. If it's not, it returns `false`.

```js
// returns false
Array.isArray({});

// returns true
Array.isArray([]);
```

Sweet!

Unfortunately, there aren't currently equivalents for true objects (`{}`), elements, and so on. For those, I recommend [the `Object.prototype.toString.call()` hack](/true-type-checking-with-vanilla-js/).

## Browser compatibility

The `Array.isArray()` method works in all modern browsers, and back to IE9.