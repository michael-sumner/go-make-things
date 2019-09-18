---
title: "Merging two or more arrays with vanilla JS"
date: 2019-01-04T10:30:00-05:00
draft: false
categories:
- Code
- JavaScript
---

The `Array.concat()` method lets you merge two or more arrays together. It returns a new array.

```js
var sandwiches1 = ['turkey', 'tuna', 'blt'];
var sandwiches2 = ['chicken', 'pb&j', 'tuna'];
var allSandwiches = sandwiches1.concat(sandwiches2);
// sandwiches1: ['turkey', 'tuna', 'blt']
// sandwiches2: ['chicken', 'pb&j', 'tuna']
// allSandwiches: ['turkey', 'tuna', 'blt', 'chicken', 'pb&j', 'tuna']
```

[Here's a demo.](https://codepen.io/cferdinandi/pen/ZVxGQo?editors=0012)

One thing you'll notice is that `'tuna'` shows up twice. Next week, we'll look at how to remove duplicates from an array.

`Array.concat()` works in all modern browsers, and at least back to IE6.