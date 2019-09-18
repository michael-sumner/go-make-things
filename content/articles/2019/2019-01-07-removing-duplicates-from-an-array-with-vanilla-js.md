---
title: "Removing duplicates from an array with vanilla js"
date: 2019-01-07T10:30:00-05:00
draft: false
categories:
- Code
- JavaScript
---

Last week, we learned [how to merge two or more arrays together with vanilla JS](/merging-two-or-more-arrays-with-vanilla-js/). One potential challenge with this approach is that it can result in duplicates in your array.

Today, let's learn how to remove duplicates from an array.

## The technique

This one is actually *really* simple, thanks to the `Array.filter()` and `Array.indexOf()` methods.

[The `Array.filter()` method](/why-would-you-use-array.some-or-array.every-over-array.filter/) creates a new array from an existing one that contains only items that meet certain criteria. The `Array.indexOf()` method returns the index of the first item in an array whose value matches whatever you pass in as an argument.

So here's how it works:

1. In the `Array.filter()` callback function, we'll use `Array.indexOf()` to get the index of the first matching item in our original array.
2. If that index matches the index of the current item in the loop, we'll add it to our array. If not, it's a duplicate entry and we'll ignore it.

## An example

To make this more tangible, here's an example.

```js
var sandwiches = ['turkey', 'ham', 'turkey', 'tuna', 'pb&j', 'ham', 'turkey', 'tuna'];

var deduped = sandwiches.filter(function (sandwich, index) {
	return sandwiches.indexOf(sandwich) === index;
});

// Logs ["turkey", "ham", "tuna", "pb&j"]
console.log(deduped);
```

Why does this work?

Let's look at the entry `"turkey"`, which shows up three times, at indexes `0`, `2`, and `6` (arrays start at 0). The `sandwiches.indexOf(sandwich)` method will return `0` for each instance of `"turkey"`, because it returns the first matching item.

The first time `"turkey"` shows up, the `indexOf(sandwich)` and `index` values match, so it's added to our new array. The second and third times, they don't (neither `2` nor `6` equal `0`), and it's ignored.

## A helper function

This is also available as [a helper function on the Vanilla JS Toolkit](https://vanillajstoolkit.com/helpers/dedupe/).

```js
var sandwiches = ['turkey', 'ham', 'turkey', 'tuna', 'pb&j', 'ham', 'turkey', 'tuna'];
var uniqueSandwiches = dedupe(sandwiches);
```

## Browser compatibility

Both `Array.filter()` and `Array.indexOf()` work in all modern browsers and IE9 and above.