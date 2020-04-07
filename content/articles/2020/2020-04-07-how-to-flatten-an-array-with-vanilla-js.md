---
title: "How to flatten an array with vanilla JS"
date: 2020-04-07T10:30:00-04:00
draft: false
categories:
- Code
- JavaScript
---

Let's say you had an array like this:

```js
var arr = [1, 2, [3, 4, [5, 6, [7, 8, [9, 10]]]]];
```

You can use the `Array.flat()` method to flatten the nested sub-arrays into the parent.

You call the `Array.flat()` method on the array to flatten, and pass in how many levels deeps it should go as an optional argument. It defaults to `1`.

## Examples

Here are some examples.

```js
// returns [1, 2, 3, 4, [5, 6, [7, 8, [9, 10]]]]
arr.flat();

// also returns [1, 2, 3, 4, [5, 6, [7, 8, [9, 10]]]]
arr.flat(1);

// returns [1, 2, 3, 4, 5, 6, [7, 8, [9, 10]]]
arr.flat(2);
```

You can use `Infinity` as a depth to completely flatten an array regardless of how many sub-arrays it contains.

```js
// returns [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
arr.flat(Infinity);
```

[Here's a demo.](https://codepen.io/cferdinandi/pen/eYNqXGd)

## Browser compatibility

The `Array.flat()` method works in all modern browsers, but not IE. [You can push support back to IE9 with a polyfill.](https://vanillajstoolkit.com/polyfills/arrayflat/)