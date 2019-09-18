---
title: "How Array.forEach() works under-the-hood in vanilla JS"
date: 2019-03-11T10:30:00-04:00
draft: false
categories:
- Code
- JavaScript
---

Last week, we looked at a handful of Array methods and how they work behind-the-scenes. To make it easier to understand, I compared using `Array.map()` or `Array.filter()`, for example, to doing the same thing with `Array.forEach()`.

Today, I thought it might make sense to look at how `Array.forEach()` actually works under-the-hood.

## Looping arrays

Before `Array.forEach()`, looping through an array involved using `for` loops.

Let's say I had an array of wizards, and I wanted to log each one to the console. I would do this.

```js
var wizards = ['Hermione Granger', 'Neville Longbottom', 'Harry Potter'];

for (var i = 0; i < wizards.length; i++) {
	console.log(wizards[i]);
}
```

And here's how you do the same thing with `Array.forEach()`.

```js
wizards.forEach(function (wizard) {
	console.log(wizard);
});
```

They're about the same length, but `Array.forEach()` has a much nicer syntax. The use of a variable for the item makes working with array data a lot easier.

So, what's the method actually doing?

## `Array.forEach()` is syntactic sugar on top of a `for` loop

Last week, [I briefly defined *syntactic sugar*](/what-array.map-does-in-vanilla-js/).

> It’s a term that describes syntax (ways of writing code) that provide shortcuts, and make the code easier to write or read. Array methods like `map()`, `filter()`, `find()`, and `reduce()` are considered *syntactic sugar*.

The `Array.forEach()` method is syntactic sugar on top of a `for` loop.

Under-the-hood, it's a method that's attached to the `Array.prototype` object. This makes it accessible to any array.

```js
Array.prototype.forEach = function () {
	// Do stuff...
};
```

The method accepts a single argument: a callback function.

```js
Array.prototype.forEach = function (callback) {
	// Do stuff...
};
```

If you've provided one, it will loop through each item in the array, and pass in the current item in the loop, the current index, and the array itself as arguments to the callback.

Because the method is attached to the prototype, it can use `this` to refer to the array itself.

```js
Array.prototype.forEach = function (callback) {
	if (callback && typeof callback === 'function') {
		for (var i = 0; i < this.length; i++) {
			callback(this[i], i, this);
		}
	}
};
```