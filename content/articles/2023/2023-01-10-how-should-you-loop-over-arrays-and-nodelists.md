---
title: How should you loop over arrays and NodeLists with JavaScript?
date: 2023-01-10T10:30:00-04:00
draft: false
categories:
- Code
- JavaScript
---

JavaScript provides a handful of ways to loop over arrays, NodeLists, and other array-like objects. Today, I want to talk about how I decide which one to use.

Let's dig in!

## The `for` loop

A `for` loop is the original way to loop over things. 

In the first part of the loop, before the first semicolon (`;`), you define a counter variable (typically `i`, but it can be anything) to `0`. The second part, between the two semicolons, is the test we check against after each iteration of the loop. In this case, we want to make sure the counter value is less than the total number of items in our array. We do this by checking the `.length` of our array.

Finally, after the second semicolon, we specify what to run after each loop. In this case, we're adding `1` to the value of `i` with `i++`. We can then use `i` to grab the current item in the loop from our array.

```js
let sandwiches = ['turkey', 'tuna', 'ham', 'pb&j'];

// logs 0, "tuna", 1, "ham", 2, "turkey", 3, "pb&j"
for (let i = 0; i < sandwiches.length; i++) {
	console.log(i); // index
	console.log(sandwiches[i]); // value
}
```

You can also use a `for` loop to loop through your array in reverse. 

Define `i` as the `length` of your array minus one, keep looping as long as `i` is greater than `-1`, and reduce the value of `i` by one on each loop (`i--`).

```js
for (let i = sandwiches.length - 1; i > -1; i--) {
	console.log(i); // index
	console.log(sandwiches[i]); // value
}
```

## `Array.forEach()` and `NodeList.forEach()`

A notable improvement over a `for` loop!

The `Array.forEach()` and `NodeList.forEach()` methods provide a simpler way to iterate over arrays and NodeLists while still having access to the index.

You pass a callback function into the `forEach()` method. The callback itself accepts three arguments: the current item in the loop, the index of the current item in the loop, and the array itself. All three are optional, and you can name them anything you want.

```javascript
let sandwiches = ['turkey', 'tuna', 'ham', 'pb&j'];

// logs 0, "tuna", 1, "ham", 2, "turkey", 3, "pb&j"
sandwiches.forEach(function (sandwich, index) {
	console.log(index); // index
	console.log(sandwich); // value
});
```

## The `for...of` loop

A more recent addition to JavaScript, a `for...of` loop can be used to loop through _iterable objects_. That includes strings, arrays, and other array-like objects such as NodeLists, HTMLCollections, and HTMLFormControlsCollection, but _not_ plain objects (`{}`).

In a `for...of` loop, you define a _variable_ to represent the current item `of` the iterable that you're looping through. Inside the _block_ (the stuff between curly brackets), you can use that variable to reference the current item.

```javascript
let sandwiches = ['turkey', 'tuna', 'ham', 'pb&j'];

// logs "tuna", "ham", "turkey", "pb&j"
for (let sandwich of sandwiches) {
	console.log(sandwich);
}
```

## Skipping and ending loops

Inside the `for` and `for...of` loop, you can use the `continue` operator to skip the current item and move on to the next, and the `break` operator to end the loop entirely.

```js
/**
 * Skipping a loop
 */
let sandwiches = ['turkey', 'tuna', 'ham', 'pb&j'];

// logs "turkey", "tuna", "turkey", "pb&j"
for (let sandwich of sandwiches) {

	// Skip to the next item in the loop
	if (sandwich === 'tuna') continue;

	// Stop if the item is hame
	if (sandwich === 'ham') break;

	console.log(sandwich);

}
```

Neither of those operators work with the `forEach()` method. Because the loop runs a callback function, though, you can use the `return` operator to end the current function skip to the next item.

```js
// Skip "ham"
// logs 0, "tuna", 2, "turkey", 3, "pb&j"
sandwiches.forEach(function (sandwich, index) {
	if (sandwich === 'ham') return;
	console.log(index); // index
	console.log(sandwich); // value
});
```

## How do you decide which looping method to use?

Here's my decision tree...

- By default, I reach for a `for...of` loop because it's short, sweet, and simple.
- If I need the index inside the loop, I'll instead use a `forEach()` loop.
- I avoid `for` loops unless I both need the index _and_ the ability to `break`, _or_ I need to loop through the array in reverse.