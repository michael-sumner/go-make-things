---
title: "Removing duplicates from an array with the vanilla JS Set() object"
date: 2020-07-31T10:30:00-04:00
draft: false
categories:
- Code
- JavaScript
---

Last year, I wrote about [how to remove duplicates from an array in vanilla JS using the `Array.filter()` and `indexOf()` methods](/removing-duplicates-from-an-array-with-vanilla-js/).

```js
var sandwiches = ['turkey', 'ham', 'turkey', 'tuna', 'pb&j', 'ham', 'turkey', 'tuna'];

var deduped = sandwiches.filter(function (sandwich, index) {
	return sandwiches.indexOf(sandwich) === index;
});

// Logs ["turkey", "ham", "tuna", "pb&j"]
console.log(deduped);
```

But last week, [Samantha Ming taught me a really cool way to do the same thing using the new `Set()` constructor](https://www.samanthaming.com/tidbits/43-3-ways-to-remove-array-duplicates/).

> `Set` is a new data object introduced in ES6. Because `Set` only lets you store unique values. When you pass in an array, it will remove any duplicate values.

Looking at our previous example, we would pass the `sandwiches` array into a `Set()` constructor, and then use `Array.from()` to convert it back into an array (Samantha favors the destructuring method: `[...]`).

```js
var sandwiches = ['turkey', 'ham', 'turkey', 'tuna', 'pb&j', 'ham', 'turkey', 'tuna'];
var deduped = Array.from(new Set(sandwiches));

// Logs ["turkey", "ham", "tuna", "pb&j"]
console.log(deduped);
```

[Here's a demo.](https://codepen.io/cferdinandi/pen/oNbKbqa);

It's so neat and clean and simple. I love it!

**What's browser compatibility look like?** This approach works in all modern browsers, but doesn't support IE (both `new Set()` with an array *and* `Array.from()` don't work in IE).

The good news, at least: [polyfill.io](https://polyfill.io/) has a polyfill for it. Just be aware that it's not part of the default build, so you'll need to add it.

[Also, Samantha's website is full of JS goodness.](https://www.samanthaming.com/) Go check it out!