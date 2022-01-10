---
title: What's the best way to loop over arrays and elements in JavaScript?
date: 2022-01-10T10:30:00-05:00
draft: false
categories:
- Code
- JavaScript
---

JavaScript provides a handful of methods and techniques for looping over arrays and elements and doing things with them. So... which approach should you use, and why?

Today, we're going to look at the different ways you can loop over things with vanilla JS, and when and why to choose one over the other.

Let's dig in!

## An example array

For today's article, lets use an array of `sandwiches` as an example.

```js
let sandwiches = ['turkey', 'tuna', 'ham', 'pb&j'];
```

We'll loop over it and log each item to the console, but in a real site or application, you might want to manipulate the data in some way.

## The `for` loop

You can use a `for` loop to iterate over arrays, NodeLists, and other array-like objects. This is the old-school way to loop over things.

```js
// logs 0, "turkey", 1, "tuna", 2, "ham", 3, "pb&j"
for (let i = 0; i < sandwiches.length; i++) {
	console.log(i); // index
	console.log(sandwiches[i]); // value
}
```

- In the first part of the loop, before the first semicolon, we set a counter variable (typically `i`, but it can be anything) to `0`.
- The second part, between the two semicolons, is the test we check against after each iteration of the loop. In this case, we want to make sure the counter value is less than the total number of items in our array. We do this by checking the `.length` of our array.
- Finally, after the second semicolon, we specify what to run after each loop. In this case, we're adding `1` to the value of `i` with `i++`.

We can then use `i` to grab the current item in the loop from our array.

[Here's a demo.](https://codepen.io/cferdinandi/pen/WNZabyL?editors=1011)

## The `for...of` loop

A more modern approach, you can use `for...of` to loop through _iterable objects_. That includes strings, arrays, and other array-like objects such as NodeLists, HTMLCollections, and HTMLFormControlsCollection, but _not_ plain objects (`{}`).

In a `for...of` loop, you define a _variable_ to represent the current item `of` the iterable that you're looping over. Inside the _block_ (the stuff between curly brackets), you can use that variable to reference the current item.

```js
// logs "turkey", "tuna", "ham", "pb&j"
for (let sandwich of sandwiches) {
	console.log(sandwich);
}
```

[Here's another demo.](https://codepen.io/cferdinandi/pen/LYzgEJW?editors=0011)

## Skipping and ending loops

You can skip to the next item in a `for` or `for...of` loop using `continue`, or end the loop altogether with `break`.

```js
// logs "turkey", "tuna", "pb&j"
for (let sandwich of sandwiches) {

	// Skip to the next item in the loop
	if (sandwich === 'ham') continue;

	console.log(sandwich);

}

// Logs "turkey", "tuna"
for (let sandwich of sandwiches) {

	// Skip to the next item in the loop
	if (sandwich === 'ham') break;

	console.log(sandwich);

}
```

[Here's a demo of `continue` and `break`.](https://codepen.io/cferdinandi/pen/eYGPmQN?editors=0011)

## The `Array.forEach()` and `NodeList.forEach()` methods

The `Array.forEach()` and `NodeList.forEach()` methods provide a simpler way to iterate over arrays and NodeLists while still having access to the index.

You pass a callback function into the `forEach()` method. The callback itself accepts three arguments: the current item in the loop, the index of the current item in the loop, and the array itself. All three are optional, and you can name them anything you want.

```js
// logs 0, "turkey", 1, "tuna", 2, "ham", 3, "pb&j"
sandwiches.forEach(function (sandwich, index) {
	console.log(index);    // index
	console.log(sandwich); // value
});
```

[Here's a demo of the `Array.forEach()` method.](https://codepen.io/cferdinandi/pen/wvrYBOR?editors=0011)

Unlike with `for` and `for...of` loops, you can't end a `forEach()` callback function before it's looped through all items. You can `return` to end the current loop (like you would with `continue`), but there's no way to `break` the loop.

```js
// Skip "ham"
// logs "turkey", "tuna", "pb&j"
sandwiches.forEach(function (sandwich, index) {
	if (sandwich === 'ham') return;
	console.log(sandwich);
});
```

[Here's a demo of skipping items in an `Array.forEach()` loop.](https://codepen.io/cferdinandi/pen/ExwdaJg?editors=0011)

## Which method should you use, and why?

In most cases, most of the time, I use a `for...of` loop. It's simple and straightforward, and easy to type.

There are a few situational exceptions to that, however...

1. If I need the index of the item, I'll use the `Array.forEach()` or `NodeList.forEach()` method.
2. If I need the index _and_ want to end the loop early once a condition is met, I'll use a `for` loop.

I try to avoid `for` loops unless there's a compelling reason to use them. They're hard to read. They're hard to write. They're just messy.

The humble `for...of` loop is the real workhorse of my code bases!