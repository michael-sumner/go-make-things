---
title: "How to handle immutability in JavaScript"
date: 2018-05-25T10:30:00-04:00
draft: false
categories:
- Code
- JavaScript
---

Yesterday, we looked at [immutability in JavaScript](/immutability-in-javascript/), and its implications when manipulating arrays and objects.

Today, I wanted to cover some strategies for handling immutability. Specifically, we'll look at ways to ensure that the original array or object isn't modified when working with data.

## Strategy 1: Copy the array or object before manipulating it

This approach requires discipline on your part. You can create a copy of the array or object before working with it.

For arrays, you can call `Array.slice()` on the array with no arguments and it will make an exact copy.

```js
var arr1 = ['sandwich', 'soda', 'chips'];
var arr2 = arr1.slice();

// Push an item to array 2
arr2.push('cookie');

// logs ["sandwich", "soda", "chips"]
console.log(arr1);

// logs ["sandwich", "soda", "chips", "cookie"]
console.log(arr2);
```

There are several ways to copy an object, including [my `extend()` helper method](https://vanillajstoolkit.com/helpers/extend/).

The easiest, though, is to run it through `JSON.stringify()` and then back through `JSON.parse()`. This isn't necessarily the most performant approach, but for the typical use case, we're talking milliseconds of performance impact.

```js
var obj1 = {
	sandwich: 'turkey',
	soda: 'Pepsi',
	chips: 'Cape Cod'
};
var obj2 = JSON.parse(JSON.stringify(obj1));

// Add an item to object 2
obj2.cookie = 'chocolate chip';

// logs {sandwich: "turkey", soda: "Pepsi", chips: "Cape Cod"}
console.log(obj1);

// logs {sandwich: "turkey", soda: "Pepsi", chips: "Cape Cod", cookie: "chocolate chip"}
console.log(obj2);
```

[Here's a demo with both of these.](https://jsfiddle.net/cferdinandi/5bu985nh/)

If you find yourself doing this a lot, [here's a helper method you can use](https://vanillajstoolkit.com/helpers/copy/) to make these quicker and easier.

```js
/*!
 * Create an identical clone of an array or object
 * (c) 2018 Chris Ferdinandi, MIT License, https://gomakethings.com
 * @param  {Array|Object} obj The array or object to copy
 * @return {Array|Object}     The clone of the array or object
 */
var copy = function (obj) {
	if (Object.prototype.toString.call(obj) === '[object Array]') {
		return obj.slice();
	}
	return JSON.parse(JSON.stringify(obj));
};

// Make copies
var arr1 = ['sandwich', 'soda', 'chips'];
var arr2 = copy(arr1);

var obj1 = {
	sandwich: 'turkey',
	soda: 'Pepsi',
	chips: 'Cape Cod'
};
var obj2 = copy(obj1);
```

## Strategy 2: Store immutable arrays and objects in functions

The previous strategy requires a lot of discipline on your part, and its easy to forget or mess up.

One way to force immutability on your arrays and objects it to store them in a function that returns the data.

```js
/**
 * Arrays
 */

var arr1 = function () {
	return ['sandwich', 'soda', 'chips'];
};
var arr2 = arr1();

// Push an item to array 2
arr2.push('cookie');

// logs ["sandwich", "soda", "chips"]
console.log(arr1());

// logs ["sandwich", "soda", "chips", "cookie"]
console.log(arr2);


/**
 * Objects
 */

var obj1 = function () {
	return {
		sandwich: 'turkey',
		soda: 'Pepsi',
		chips: 'Cape Cod'
	};
};
var obj2 = obj1();

// Add an item to object 2
obj2.cookie = 'chocolate chip';

// logs {sandwich: "turkey", soda: "Pepsi", chips: "Cape Cod"}
console.log(obj1());

// logs {sandwich: "turkey", soda: "Pepsi", chips: "Cape Cod", cookie: "chocolate chip"}
console.log(obj2);
```

[Here's a live demo for you.](https://jsfiddle.net/cferdinandi/dep0sd05/1/)

This approach can be a little confusing at first, since you need to call a function to get your array or object, but it's less prone to user error, which is nice.

## Strategy 3: Use an immutability library

There are a few libraries that can help with immutability, too, but the gold standard is [immutable.js from Facebook](https://github.com/facebook/immutable-js).

What makes this library nice is that you can set up your initial array or object by passing it to immutable.js, and then call it just like you would a normal array or object after that.

The data you get back is always a copy&mdash;the original is immutable&mdash;but you have access to the full suite of native array and object methods.

```js
var list1 = List([1, 2]);

// This is a unique, cloned copy automatically
var list1Copy = list1;

// These are all unique arrays.
// The original is untouched.
var list2 = list1.push(3, 4, 5);
var list3 = list2.unshift(0);
var list4 = list1.concat(list2, list3);
```

## So which approach should you use?

If you've been reading my articles for a while, it probably won't surprise you to know I like strategy 2&mdash;immutable arrays and objects in functions&mdash;the best.

I can definitely see the appeal of a library like immutable.js, but using functions to return your data gets you all of the same benefits without any of the overhead.