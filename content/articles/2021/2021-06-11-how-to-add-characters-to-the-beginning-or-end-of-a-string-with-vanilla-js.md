---
title: "How to add characters to the beginning or end of a string if it's less than a certain length with vanilla JS"
date: 2021-06-11T10:30:00-04:00
draft: false
categories:
- Code
- JavaScript
---

Today, we're going to look at two JavaScript methods you can use to add characters to the beginning and end of a string when it's less than a certain length.

Let's dig in!

## `String.padStart()`

You can use the `String.padStart()` method to add characters to the beginning of a string if it's less than a certain length. This is particularly useful for numbers that need leading `0`'s (but can do so much more than that).

The `String.padStart()` method accepts two arguments: the length the string should be, and what characters to add if it's not that length. The characters to use is option, and defaults to a space (` `).

```js
// Add a leading zero for hours below 10
let hour3 = '3';
let hour12 = '12';

// returns "03"
hour3.padStart(2, '0');

// returns "12"
hour12.padStart(2, '0');
```

[Here's a demo.](https://codepen.io/cferdinandi/pen/jOBervO)

## `String.padEnd()`

You can use the `String.padEnd()` method to add characters to the end of a string if it's less than a certain length. This is particularly useful for numbers that need trailing 0's (but can do so much more than that).

The `String.padEnd()` method accepts two arguments: the length the string should be, and what characters to add if it's not that length. The characters to use is option, and defaults to a space (` `).

```js
// Add a leading zero for hours below 10
let minutes0 = '0';
let minutes12 = '12';

// returns "00"
minutes0.padEnd(2, '0');

// returns "12"
minutes12.padEnd(2, '0');
```

[Here's another demo.](https://codepen.io/cferdinandi/pen/ExWdyem)