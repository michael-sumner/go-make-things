---
title: How to check if an array includes all of the values from another with vanilla JS
date: 2022-10-11T10:30:00-04:00
draft: false
categories:
- Code
- JavaScript
---

Today, one of my students asked what the best way was to check if all of the items in one array were included in another.

Today, we're going to look at how to do that. Let's dig in!

## An example problem

Let's say you have an array of wizards who are `enrolled` in Wizard School.

```js
let enrolled = ['Gandalf', 'Radagst', 'Ursula', 'Merlin', 'Morgana'];
```

For one of your classes, you have an array of wizards who are `attending` the class.

```js
let attending = ['Radagast', 'Morgana', 'Bob'];
```

You want to make sure that all of the `attending` wizards are in the `enrolled` array. If not, they haven't enrolled in the school and can't attend.

## Creating an `includesAll()` helper function

First, let's create an `includesAll()` helper function.

We'll accept the `arr` to check within and the `subArr` whose values we want to check as arguments. We'll return a boolean: `true` if all of the items are included, and `false` if they're not.

```js
/**
 * Check if one array includes all of the values in another
 * @param  {Array}   arr    The array to search within
 * @param  {Array}   subArr The sub array to check
 * @return {Boolean}        If true, all items in the subArr are included in the arr
 */
function includesAll (arr, subArr) {
	// ...
}
```

Inside the `includesAll()` function, we'll use [a `for...of` loop](/the-for...of-loop-in-vanilla-js/) to loop through each item in the `subArr`.

In the loop, we can use the `Array.includes()` method to check if the `item` exists in the parent `arr`. If not, we'll `return false`.

If the loop completes, all items are included, and we can `return true`.

```js
/**
 * Check if one array includes all of the values in another
 * @param  {Array}   arr    The array to search within
 * @param  {Array}   subArr The sub array to check
 * @return {Boolean}        If true, all items in the subArr are included in the arr
 */
function includesAll (arr, subArr) {
	for (let item of subArr) {
		if (!arr.includes(item)) return false;
	}
	return true;
}
```

Now, we can do something like this.

```js
let allEnrolled = includesAll(enrolled, attending);
```

In our case, `allEnrolled` would be `false`, since `Bob` is not in the `enrolled` array.

[Here's a demo.](https://codepen.io/cferdinandi/pen/rNvoOXY?editors=0011)

Tomorrow, we'll look at how to find all of the overlapping items in an array.