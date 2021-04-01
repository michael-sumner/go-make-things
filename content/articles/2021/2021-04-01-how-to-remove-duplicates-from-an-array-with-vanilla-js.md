---
title: "How to remove duplicates from an array with vanilla JS"
date: 2021-04-01T10:30:00-04:00
draft: false
categories:
- Code
- JavaScript
---

Today, we're going to learn how to remove duplicates from an array in JavaScript.

Let's imagine you had an array of `sandwiches`, and some of the items in it were listed more than once.

```js
let sandwiches = ['turkey', 'ham', 'turkey', 'tuna', 'pb&j', 'ham', 'turkey', 'tuna'];
```

You want to get an updated list with the duplicates removed, a process called _deduplication_.

This used to require [pairing the `Array.filter()` method with `Array.indexOf()`](/removing-duplicates-from-an-array-with-vanilla-js/). And while that method still works, today, it's a bit simpler to use `Array.from()` with [the `Set()` object](/how-to-use-the-set-object-in-vanilla-js/).

The `new Set()` constructor creates an iterable collection of items, just like an array. But, each item can only be included once.

To remove any duplicates, we can pass our array into the `new Set()` constructor, then convert the returned collection back into an array.

```js
let deduped = Array.from(new Set(sandwiches));
```

[Here's a demo.](https://codepen.io/cferdinandi/pen/oNBZNgw)

If you'd prefer, you can use the spread syntax instead of `Array.from()`.

```js
let deduped = [...new Set(sandwiches)];
```

[I've put together a helper function you can use if you'd like.](https://vanillajstoolkit.com/helpers/dedupe/)