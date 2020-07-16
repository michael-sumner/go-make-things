---
title: "How to reorder an item in an array with vanilla JS"
date: 2020-07-16T10:30:00-04:00
draft: false
categories:
- Code
- JavaScript
---

Today, we're going to look at how to reorder an item in an array.

This article comes from a question asked by one of my students, Sam Hibberd (shared with permission).

> Has anyone got a robust helper for moving an item in an array from one index to another?

Let's dig in.

## An example

Let's say you had an array of delicious sandwiches.

```js
var sandwiches = ['ham', 'tuna', 'turkey', 'pb&j'];
```

You want to change the order of the array so that `turkey` is in the first spot.

How would you do it?

## The `Array.splice()` method

The `Array.splice()` method is perfect for this!

It's a swiss army knife method that can add, replace, *or* remove items from an array. It accepts three arguments:

- `start` - the index in the array to start making changes at
- `deleteCount` - how many items to delete (if any, it can also be `0`)
- `items` - the items to add at the index (can be none, one, or more than one)

It returns a new array with the items that were deleted, if any.

Looking at our example from earlier, we would delete `turkey` from index `2` in the `sandwiches` array, and then add it at index `0`.

```js
// Delete 'turkey' from index 2
// start at index 2, remove 1 item
// returns ["turkey"]
sandwiches.splice(2, 1);

// The sandwiches array no longer has 'turkey' in it
// returns ["ham", "tuna", "pb&j"]
sandwiches;

// Add 'turkey' to index 0
// start at index 0, remove 0 items, add 'turkey'
// returns []
sandwiches.splice(0, 0, 'turkey');

// The sandwiches array now has 'turkey' in the first index
// returns ["turkey", "ham", "tuna", "pb&j"]
```

[Here's a demo.](https://codepen.io/cferdinandi/pen/YzwJVgX)

## A helper function

Let's put together a little helper function to make this easier to do.

We'll call it `moveInArray()`. The function will accept three arguments: the array, the current index of the item, and the index to move it to.

```js
var moveInArray = function (arr, from, to) {
	// Do stuff...
};
```

The first order of business is to get the item we want to move.

Since we *also* need to delete it, and the `Array.splice()` method returns the delete item, we can do this is one step.

```js
var moveInArray = function (arr, from, to) {

	// Delete the item from it's current position
	var item = arr.splice(from, 1);

};
```

Then, we can move it to it's new position by grabbing the item at index `0` in the `item` array.

```js
var moveInArray = function (arr, from, to) {

	// Delete the item from it's current position
	var item = arr.splice(from, 1);

	// Move the item to its new position
	arr.splice(to, 0, item[0]);

};
```

The last thing I would want to do with a method like this is add some safety checks and surface errors.

First, let's check that the `arr` is actually an array using [the `Object.prototype.toString.call()` workaround](/true-type-checking-with-vanilla-js/).

```js
var moveInArray = function (arr, from, to) {

	// Make sure a valid array is provided
	if (Object.prototype.toString.call(arr) !== '[object Array]') {
		throw new Error('Please provide a valid array');
	}

	// Delete the item from it's current position
	var item = arr.splice(from, 1);

	// Move the item to its new position
	arr.splice(to, 0, item[0]);

};
```

Next, we should also make sure there's actually an item at the `from` index to move.

We can check to see if the returned array assigned to `item` has a `length`. If not, we'll throw an error.

```js
var moveInArray = function (arr, from, to) {

	// Make sure a valid array is provided
	if (Object.prototype.toString.call(arr) !== '[object Array]') {
		throw new Error('Please provide a valid array');
	}

	// Delete the item from it's current position
	var item = arr.splice(from, 1);

	// Make sure there's an item to move
	if (!item.length) {
		throw new Error('There is no item in the array at index ' + from);
	}

	// Move the item to its new position
	arr.splice(to, 0, item[0]);

};
```

Using our `sandwiches` array example again, we would do this to move `turkey` to the first spot.

```js
moveInArray(sandwiches, 2, 0);
```

[Here's a demo of the helper function.](https://codepen.io/cferdinandi/pen/ExPdXVB)

You can also find the completed `moveInArray()` function at the [Vanilla JS Toolkit](https://vanillajstoolkit.com).