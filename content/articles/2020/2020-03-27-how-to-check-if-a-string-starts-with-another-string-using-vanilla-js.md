---
title: "How to check if a string ends with another string using vanilla JS"
date: 2020-03-27T10:30:00-04:00
draft: false
categories:
- Code
- JavaScript
---

Yesterday, we looked at [how to check if a string starts with another string using vanilla JS](/how-to-check-if-a-string-starts-with-another-string-using-vanilla-js/). Today, we're going to learn how to check if a string *ends* with a substring instead.

Let's dig in.

## The `String.endsWith()` method

Let's say you have a string, and you want to check if it ends with `universe`.

You can use the `String.endsWith()` method to do that. Call it on the string you want to test and pass in the string you want to check for. It will return a boolean (`true`/`false`).

Here's an example.

```js
// The string
var str = 'Hello universe';

// Check if the string ends with "universe"
// returns true
str.endsWith('universe');
```

The `String.endsWith()` method is case-sensitive. If you checked for `Universe` in the example above, it would return `false` instead of `true`.

```js
// Check if the string ends with "Universe"
// returns false
str.endsWith('Universe');
```

## Checking for a specific end position

You can optionally pass in a second argument, `position`. If you do, the `endsWith()` method will check if that's the index in the string that the substring ends at

```js
// returns false
str.endsWith('uni');

// returns true
str.endsWith('uni', 9);
```

## Browser compatibility

This works in all modern browsers, but not IE. [You can polyfill it back to at least IE6.](https://vanillajstoolkit.com/polyfills/stringendswith/)