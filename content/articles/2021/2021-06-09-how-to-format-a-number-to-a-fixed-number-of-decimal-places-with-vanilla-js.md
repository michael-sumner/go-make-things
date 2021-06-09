---
title: "How to format a number to a fixed number of decimal places with vanilla JS"
date: 2021-06-09T10:30:00-04:00
draft: false
categories:
- Code
- JavaScript
---

Let's imagine you have a number, `pi`, with five decimal places.

```js
let pi = 3.14159;
```

You want to display with only two. How would you do that?

The `Number.toFixed()` method formats a number to a fixed number of decimal places. Call it on the number, and pass in the number of decimal places as an argument.

It returns a formatted string.

```js
let pi = 3.14159;

// returns "3.14"
pi.toFixed(2);
```

If you call the `Number.toFixed()` method on a number that has fewer decimal places than the number specified, 0's will be added.

```js
let eleven = 11;

// returns "11.000"
eleven.toFixed(3);
```

[Here's a demo.](https://codepen.io/cferdinandi/pen/ExWprqN)