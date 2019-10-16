---
title: "How to recreate the lodash inRange() method with vanilla JS"
date: 2019-10-17T10:30:00-04:00
draft: false
categories:
- Code
- JavaScript
---

This week, I've been converting lodash methods into vanilla JS (so far, [`_.pull()`](/recreating-the-lodash-pull-method-with-vanilla-js/) and [`_.partition()`](/how-to-recreate-the-lodash-partition-method-with-vanilla-js/)).

Today, let's recreate the `_.inRange()` method with vanilla JS.

## What `_.inRange()` does

The lodash `_.inRange()` method takes a number, and checks to see if it's between two other numbers.

You pass in the `number`, the `start` of the range, and the `end` of the range as arguments.

```js
_.inRange(number, start, end);

// Returns true
_.inRange(2, 1, 4);

// Returns false
_.inRange(2, 3, 5);
```

You can also skip `start` and just pass in `end`. The method will use `0` for `start` by default.

```js
// Returns true
_.inRange(2, 4);
```

If the number is equal to the `start` of the range, it passes. If it's equal to the end, it fails. Personally, that seems weird to me.

```js
// Returns true
_.inRange(2, 2, 4);

// Returns false
// Why?????
_.inRange(4, 2, 4);
```

Alright, let's do this.

## Recreating `_.inRange()` with vanilla JS

First, let's setup our helper function.

```js
var inRange = function (num, start, end) {
	// Do stuff...
};
```

Next, let's check if our number is in the range.

I think the `end` should be inclusive, like the `start` is, so we'll do things a bit differently than lodash here. We'll check that `num` is greater than or equal to `start`, and less than or equal to `end`. Then, we'll return the result.

```js
var inRange = function (num, start, end) {
	return num >= start && num <= end;
};
```

The lodash version lets you drop `start` if you want, and defaults to `0`. Let's add that feature.

We'll check to see if `end` exists. If it doesn't, we'll assign `start` as it's value. Then, we'll set `start` to `0`.

```js
var inRange = function (num, start, end) {

	// If no end number, use start as end
	if (!end) {
		end = start;
		start = 0;
	}

	return num >= start && num <= end;

};
```

One last thing lodash does is flip the values of `start` and `end` if `start` is greater than `end`. This is done to support negative values.

```js
// returns false
inRange(-2, -1, -4);
```

In this example, `-1` is actually greater than `-4`, because they're negative numbers. The number, `-2` is in range, but if the numbers weren't flipped, it would fail.

Personally, I think users should pass these in the right way, so I'm not going to support this feature.

```js
// returns true
inRange(-2, -4, -1);
```

So with that, we're done. [Here's a demo you can play with on CodePen.](https://codepen.io/cferdinandi/pen/oNNLqmP)