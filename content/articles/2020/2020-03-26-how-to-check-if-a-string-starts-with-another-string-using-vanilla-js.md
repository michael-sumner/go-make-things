---
title: "How to check if a string starts with another string using vanilla JS"
date: 2020-03-26T10:30:00-04:00
draft: false
categories:
- Code
- JavaScript
---

Today, we're going to look at how to check if a string starts with a specific substring of characters.

Let's dig in.

## The `String.startsWith()` method

Let's say you have a string, and you want to check if it starts with `Hello`.

You can use the `String.startsWith()` method to do that. Call it on the string you want to test and pass in the string you want to check for. It will return a boolean (`true`/`false`).

Here's an example.

```js
// The string
var str = 'Hello universe';

// Check if the string starts with "Hello"
// returns true
str.startsWith('Hello');
```

The `String.startsWith()` method is case-sensitive. If you checked for `hello` in the example above, it would return `false` instead of `true`.

```js
// Check if the string starts with "hello"
// returns false
str.startsWith('hello');
```

## Starting further into the string

You can optionally pass in a second argument, `position`. If you do, the `startsWith()` method will start searching that number of characters in.

```js
// returns false
str.startsWith('Hello', 6);

// returns true
str.startsWith('universe', 6);
```

## Browser compatibility

This works in all modern browsers, but not IE. [You can polyfill it back to at least IE6.](https://vanillajstoolkit.com/polyfills/stringstartswith/)