---
title: "How to remove white space from the beginning or end of a string with vanilla JS"
date: 2020-04-01T10:30:00-04:00
draft: false
categories:
- Code
- JavaScript
---

Today, we're going to look at a few different ways to remove whitespace from the start or end of a string with vanilla JavaScript.

Let's dig in.

## The `String.trim()` method

You can call the `trim()` method on your string to remove whitespace from the beginning and end of it. It returns a new string.

```js
var hello = '     Hello there!    ';

// returns "Hello there!"
hello.trim();
```

*The `String.trim()` method works in all modern browsers, and back to IE9.*

## The `String.trimStart()` method

The `trimStart()` method works just like `trim()`, but only removes whitespace from the start of the string.

```js
// returns "Hello there!    "
hello.trimStart();
```

*The `String.trimStart()` method works in all modern browsers, but has no IE support. [You can push support back to IE9 with a polyfill.](https://vanillajstoolkit.com/polyfills/stringtrimstart/)*

## The `String.trimEnd()` method

The `trimEnd()` method work just like `trimStart()`, but removes whitespace from the end of the string instead of the beginning.

```js
// returns "     Hello there!"
hello.trimEnd();
```

*The `String.trimEnd()` method works in all modern browsers, but has no IE support. [You can push support back to IE9 with a polyfill.](https://vanillajstoolkit.com/polyfills/stringtrimend/)*