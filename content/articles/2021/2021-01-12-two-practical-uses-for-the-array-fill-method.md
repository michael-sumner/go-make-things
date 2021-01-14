---
title: "Two practical uses for the Array.fill() method"
date: 2021-01-12T10:30:00-05:00
draft: false
categories:
- Code
- JavaScript
---

The `Array.prototype.fill()` method changes all specified items in an array to a fixed value.

```js
var wizards = ['Harry Potter', 'Ron Weasley', 'Severus Snape'];
wizards.fill('Hermione Granger');

// logs ["Hermione Granger", "Hermione Granger", "Hermione Granger"]
console.log(wizards);
```

[Here's a demo.](https://codepen.io/cferdinandi/pen/qBaJqzd)

I've held off on writing about it for a while, because I always struggled to see a practical use for it. But, that's mostly because I'm an idiot.

Today, I want to share two useful things you can do with the `Array.fill()` method.

## Use 1: creating a new array with `n` items

I sometimes want to dynamically generate arrays with a certain number of items in them.

You can create an array of a specific length with the `new Array()` constructor, but the array is empty (despite having a length), so looping methods like `Array.forEach()` and `Array.map()` don't actually do anything.

```js
// Creates a new array with a length of 99
var arr = new Array(99);

// Literally nothing happens
arr.forEach(function (item, index) {
	console.log(index);
});

// Try to create a new array with the index of each item in the array
// This doesn't work either
var bottles = arr.map(function (item, index) {
	return index;
});

// logs: (99) [empty × 99]
console.log(bottles);
```

This is... kind of silly, right? [You can see it in action here.](https://codepen.io/cferdinandi/pen/WNGaRbK)

For years, I've ended up using a `for` loop to handle this instead.

```js
// Create an empty array
var arr = [];

// Run a loop 99 times and push the index into it
for (var i = 0; i < 99; i++) {
	arr.push(i);
}
```

It works, but it's slow and tedious to write. [Here's another demo.](https://codepen.io/cferdinandi/pen/ZEpqLbN)

_But..._ I recently figured out something others have known for years: you can combine `new Array()` with `Array.fill()` to create a new array that actually have values.

```js
// Creates a new array with a length of 99
// Each item in the array has a value of 0
var arr = new Array(99).fill(0);

// Now, this actually logs the indexes
arr.forEach(function (item, index) {
	console.log(index);
});

// And this actually creates a new array with values
var bottles = arr.map(function (item, index) {
	return index;
});

// logs a big old array
console.log(bottles);
```

This is more performant and has a nicer to read syntax. [You can play around with the code here.](https://codepen.io/cferdinandi/pen/JjRmEXG)

## Use 2: replacing items in an array

By default, the `Array.fill()` method replaces every item in an array with the value you pass in.

But, you can specify starting and ending indexes as optional arguments. If you omit the starting index, it will start at `0`, and if you omit the ending index, it will fill to the end of the array.

Looking back at our array of `wizards` for a moment, let's say we wanted to replace just `Harry Potter` with `Hermione Granger`. We can use the `Array.fill()` method for that, specifying a starting index of `0` and an ending index of `1`.

```js
var wizards = ['Harry Potter', 'Ron Weasley', 'Severus Snape'];
wizards.fill('Hermione Granger', 0, 1);

// logs ["Hermione Granger", "Ron Weasley", "Severus Snape"]
console.log(wizards);
```

[Here's yet another demo for you.](https://codepen.io/cferdinandi/pen/PoGyWbQ)

Now, arguably, the `Array.splice()` method is a better and more purpose-built choice for this, but it's nice to have options.

```js
// This does the same thing
wizards.splice(0, 1, 'Hermione Granger');
```

## Browser compatibility

The `Array.fill()` method works in all modern browsers, but not IE. [You can push support back to IE9 with a polyfill.](https://vanillajstoolkit.com/polyfills/arrayfill/)