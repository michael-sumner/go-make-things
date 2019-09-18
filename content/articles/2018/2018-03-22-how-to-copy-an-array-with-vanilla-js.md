---
title: "How to copy an array with vanilla JavaScript"
date: 2018-03-22T10:30:00-04:00
draft: false
categories:
- Code
- JavaScript
---

Yesterday, we looked at [how to transform a NodeList into an array](/converting-a-nodelist-to-an-array-with-vanilla-javascript/). Today, let's look at how to copy an array into a new one.

## The old school way

The `Array.slice()` method creates a new array from an existing one.

It accepts two optional arguments. The first is the index of the item in the array to start copying from, and the second is the index to end on. If you omit the start index, it will start at the beginning. If you omit the end index, it will go to the end.

The original array is not be modified.

```js
var sandwiches = ['turkey', 'tuna', 'chicken salad', 'italian', 'blt', 'grilled cheese'];

// ['chicken salad', 'italian', 'blt', 'grilled cheese']
var fewerSandwiches = sandwiches.slice(2);

// ['chicken salad', 'italian', 'blt']
var fewerSandwiches2 = sandwiches.slice(2, 4);
```

You can start at the end and work backward by passing in a negative integer as the start index.

```js
// ['italian', 'blt', 'grilled cheese']
var sandwichesFromTheEnd = sandwiches.slice(-3);
```

To create a brand new copy of an array in its entirety, you can use `Array.slice()` with no arguments.

```js
var sandwichesCopy = sandwiches.slice();
```

## The fancy new ES6 way

If you only need to copy an array, you can use the `Array.from()` method we talked about yesterday.

```js
var sandwiches = ['turkey', 'tuna', 'chicken salad', 'italian', 'blt', 'grilled cheese'];

// ['turkey', 'tuna', 'chicken salad', 'italian', 'blt', 'grilled cheese']
var sandwichesCopy = Array.from(sandwiches);
```

The `Array.from()` method also lets you optionally pass in a modifier function you can use to transform the items in the array.

Create a callback function, and pass in a variable for the individual items in the original array. In your callback, return a modified value for the new array.

For example, let's say I wanted every sandwich to be in uppercase. I could do this.

```js
// (6) ['TURKEY', 'TUNA', 'CHICKEN SALAD', 'ITALIAN', 'BLT', 'GRILLED CHEESE']
var sandwichesUppercase = Array.from(sandwiches, function (sandwich) {
	return sandwich.toUpperCase();
});
```

## Browser Compatibility

The `Array.slice()` method works in all modern browsers, and IE6 and up.

The `Array.from()` method works in all modern browsers, too, but has no IE support (only Edge). You can [push support back to at least IE9 with a polyfill](https://vanillajstoolkit.com/polyfills/arrayfrom/), though.

## Which one should you use?

Personally, I think applications for `Array.from()` are pretty limited. I would only really use it to convert things into arrays that aren't already.

`Array.slice()` has much better browser support and does more stuff. The one benefit of `Array.from()`&mdash;being able to modify items&mdash;is better handled by `Array.map()` (more on that in a future post).