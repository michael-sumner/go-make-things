---
title: "How to recreate the lodash delay() method in vanilla JS"
date: 2019-10-18T10:30:00-04:00
draft: false
categories:
- Code
- JavaScript
---

Over the last few days, we've looked at how to recreate a few lodash methods in vanilla JS. So far, we've covered `_.pull()`, [`_.partition()`](/how-to-recreate-the-lodash-partition-method-with-vanilla-js/), and [`_.inRange()`](/how-to-recreate-the-lodash-inrange-method-with-vanilla-js/).

Today, I wanted to look at one last lodash method: `_.delay()`.

## What `_.delay()` does

The lodash `_.delay()` method runs a function after a specific number of milliseconds have passed. You can optionally provide arguments to pass into the function.

```js
_.delay(fn, delay, ...args);

// An example
// logs "Hello, friend!" after 2000 milliseconds (2 seconds) have passed
_.delay(function (message) {
	console.log(message);
}, 2000, 'Hello, friend!');
```

## Recreating `_.delay()` in vanilla JS

Here's the thing with this method... **it literally already exists as a native JavaScript method!**

[The `setTimeout()` method](https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/setTimeout) does the same exact thing. It's not new, either. It's been around since IE 4. IE 4!

```js
// logs "Hello, friend!" after 2000 milliseconds (2 seconds) have passed
setTimeout(function (message) {
	console.log(message);
}, 2000, 'Hello, friend!');
```

[Here's a demo for you.](https://codepen.io/cferdinandi/pen/dyyXqjb)

Seriously, why does this lodash method even exist?

When I rally against libraries, it's often because of stuff like this. Vanilla JS is very capable, and so much of what they offer is easily replicable (or in this case, already baked right in) to what the browser gives you out-of-the-box.