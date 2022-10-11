---
title: How to find the intersecting values of two arrays with vanilla JavaScript
date: 2022-10-12T10:30:00-04:00
draft: false
categories:
- Code
- JavaScript
---

In yesterday's article, we looked at [how to check if an array includes all of the values from another](/how-to-check-if-an-array-includes-all-of-the-values-from-another-with-vanilla-js/).

As I was writing it, I quickly realized that if I were attempting that task with PHP, I might use [the `array_intersect()` function](https://www.php.net/manual/en/function.array-intersect.php), which returns a new array containing the overlapping values between two different arrays.

JavaScript doesn't have an `Array.intersect()` method, so today I thought we'd create one.

First, let's create an `arrayIntersect()` function. We'll accept two arrays, `arr1` and `arr2`, as arguments.

```js
/**
 * Get the intersecting values between two arrays
 * @param  {Array} arr1 The first array
 * @param  {Array} arr2 The second array
 * @return {Array}      The array of overlapping values
 */
function arrayIntersect (arr1, arr2) {
	// ...
}
```

Next, let's use [the `Array.filter()` method](/how-to-filter-items-in-an-array-with-vanilla-javascript/) to create a new array containing just our overlapping values.

We'll run it on the first array, `arr1`.

```js
/**
 * Get the intersecting values between two arrays
 * @param  {Array} arr1 The first array
 * @param  {Array} arr2 The second array
 * @return {Array}      The array of overlapping values
 */
function arrayIntersect (arr1, arr2) {
	return arr1.filter();
}
```

Inside the callback function, we'll check if the current `item` is in the second array, `arr2`, using the `Array.includes()` method. If it does, we'll include it in our new array.

```js
/**
 * Get the intersecting values between two arrays
 * @param  {Array} arr1 The first array
 * @param  {Array} arr2 The second array
 * @return {Array}      The array of overlapping values
 */
function arrayIntersect (arr1, arr2) {
	return arr1.filter(function (item) {
		return arr2.includes(item);
	});
}
```

Now, you can do something like this.

```js
let wizards = ['Merlin', 'Gandalf', 'Ursula'];
let magicalFolk = ['Gandalf', 'Radagast', 'Ursula', 'Morgana'];

// returns ["Gandalf", "Ursula"]
let overlap = arrayIntersect(wizards, magicalFolk);
```

[Here's a demo.](https://codepen.io/cferdinandi/pen/xxjmRwK?editors=0011)