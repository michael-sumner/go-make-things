---
title: "Can you copy an array using the JavaScript spread operator?"
date: 2018-03-23T10:30:00-04:00
draft: false
categories:
- Code
- JavaScript
---

In response to my posts on [how to convert a NodeList to an array](/converting-a-nodelist-to-an-array-with-vanilla-javascript/) and [how to copy an array](/how-to-copy-an-array-with-vanilla-javascript/), I had a few folks ask:

> What about using the spread operator?

You *could* use the spread operator to copy an array like this:

```js
var sandwiches = ['turkey', 'tuna', 'chicken salad', 'italian', 'blt', 'grilled cheese'];
var newSandwiches = [...sandwiches];
```

It works, but I don't like it for two reasons:

1. It's less explicit than using something like `array.slice()` or `Array.from(sandwiches)`. Both were made specifically to copy or create arrays, and the latter in particular tells you exactly what it's doing in the name.
2. `Array.slice()` has exceptional backwards compatibility, and [`Array.from()` is polyfillable](https://vanillajstoolkit.com/polyfills/arrayfrom/). The spread operator only works in the latest browsers and can't be polyfilled.

## What about just setting a new variable?

I also had someone ask if you could just do something like this:

```js
var sandwiches = ['turkey', 'tuna', 'chicken salad', 'italian', 'blt', 'grilled cheese'];
var newSandwiches = sandwiches;
```

That *looks* like it should work, but what happens under-the-hood is that the browser creates a references to the original array rather than creating a new one.

[Try this.](https://jsfiddle.net/cferdinandi/5vgjs8a8/4/)

```js
var sandwiches = ['turkey', 'tuna', 'chicken salad', 'italian', 'blt', 'grilled cheese'];
var newSandwiches = sandwiches;

// Add "egg" to the original sandwiches array
sandwiches.push('egg');

// Log the newSandwiches variable to the console
// It contains "egg", too
// ['turkey', 'tuna', 'chicken salad', 'italian', 'blt', 'grilled cheese', 'egg']
console.log(newSandwiches);
```