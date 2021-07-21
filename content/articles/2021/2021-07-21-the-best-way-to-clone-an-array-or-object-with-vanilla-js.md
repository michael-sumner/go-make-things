---
title: "The best way to clone an array or object with vanilla JS"
date: 2021-07-21T10:30:00-04:00
draft: false
categories:
- Accessibility
- Art and Science
- Business and Leadership
- Careers
- Code
- CSS
- Design and UX
- HTML
- JavaScript
- Technology
- Web Performance
- WordPress
- Vanilla Framework Demos
---

I'm the process of updating the [data sanitization engine](/how-to-sanitize-third-party-content-with-vanilla-js-to-prevent-cross-site-scripting-xss-attacks/) for [Reef, my tiny state-based UI library](https://reefjs.com/).

The current version works well, but is _very aggressive_, disallowing any HTML at all in data properties. It even encodes out emoji, which is... too much. In version 10, this won't be a problem anymore.

As part the process, I was playing around with different ways to clone arrays and objects. Today, I wanted to talk about what I learned.

Let's dig in.

## Using `Object.assign()` and `Array.from()`

You can use `Object.assign()` to clone an object, and `Array.from()` to clone an array.

```js
let arr = ['hello', 'world'];
let obj = {
	greeting: 'hi',
	name: 'universe'
};

let arrClone = Array.from(arr);
let objClone = Object.assign({}, obj);
```

This works create for flat arrays and objects, but not for nested or multi-dimensional ones.

The `Object.assign()` and `Array.from()` methods create shallow copies. Nested arrays or objects are _not_ also cloned, and instead create a reference to the original.

```js
let deepArr = [1, 2, ['a', 'b', 'c']];
let deepArrClone = Array.from(deepArr);

// Add an item to the nested array
deepArrClone[2].push('d');

// The change affects the original, too
// logs ['a', 'b', 'c', 'd']
console.log(deepArr[2]);
```

## Using the spread syntax operator

You can also use [the spread syntax operator](/the-spread-syntax-operator-in-vanilla-js/) to create a copy of an array or object.

```js
let arr = ['hello', 'world'];
let obj = {
	greeting: 'hi',
	name: 'universe'
};

let arrClone = [...arr];
let objClone = {...obj};
```

Unfortunately, this runs into the same issues as `Array.from()` and `Object.assign()` with nested or multi-dimensional arrays and objects.

```js
let deepArr = [1, 2, ['a', 'b', 'c']];
let deepArrClone = [...deepArr];

// Add an item to the nested array
deepArrClone[2].push('d');

// The change affects the original, too
// logs ['a', 'b', 'c', 'd']
console.log(deepArr[2]);
```

## Using `JSON.stringify()` and `JSON.parse()`

One commonly recommended way to handle the multi-dimensional challenge is to stringify the array or object with `JSON.stringify()`, then transform it back with `JSON.parse()`.

```js
let deepArr = [1, 2, ['a', 'b', 'c']];
let deepArrClone = JSON.parse(JSON.stringify(deepArr));

// Add an item to the nested array
deepArrClone[2].push('d');

// The original is unaffected!
// logs ['a', 'b', 'c']
console.log(deepArr[2]);
```

This works, but it has its own drawbacks: only valid JSON types are cloned correctly.

Consider an object with a mix of JavaScript object types, like this.

```js
let obj = {
	arr: [1, 2, 3, ['a', 'b', 'c']],
	obj: {
		greeting: 'hi',
		name: 'world',
		nums: [1, 2, 3],
		details: {
			age: 'old',
			letters: ['a', 'b', 'c']
		}
	},
	str: 'hi',
	date: new Date(),
	num: 1,
	fn: function (nm) {
		return `hi ${nm}!`;
	},
	reg: /test/i,
	bool: true,
	nl: null,
	undef: undefined,
	map: new Map([['hi', 'world'], ['hello', 'universe']]),
	set: new Set(['hi', 'world'])
};
```

We clone it with `JSON.stringify()` and `JSON.parse()`.

```js
let objClone = JSON.parse(JSON.stringify(obj));
```

Arrays, objects, strings, numbers, booleans, and `null` all come out the same as they were passed in.

But the `new Date()` constructor, functions, regular expressions, `Map()` and `Set()` have all been modified. The date is a string, while the rest are empty objects (`{}`).

```js
let objClone = {
	arr: [1, 2, 3, ['a', 'b', 'c']],
	bool: true,
	date: "2021-07-21T03:44:15.873Z",
	map: {},
	nl: null,
	num: 1,
	obj: {
		greeting: "hi",
		name: "world",
		nums: [1, 2, 3],
		details: {
			age: 'old',
			letters: ['a', 'b', 'c']
		}
	},
	reg: {},
	set: {},
	str: "hi"
};
```

If you're not using anything but valid JSON, this might be the simplest approach. But if you need to be sure everything you pass in comes out as-is, you need another approach.

## The `copy()` helper function

I created [a helper function, `copy()`](https://vanillajstoolkit.com/helpers/copy/), that loops through each item in an array, object, or other iterable, creates a new object of that type, and pushes each item into it. When it finds nested iterable, it repeats the process with them.

You end up with an exact copy of the original.

```js
/*!
 * Create an immutable clone of data (an array, object, map, set, etc.)
 * (c) 2021 Chris Ferdinandi, MIT License, https://gomakethings.com
 * @param  {*} obj The data object to copy
 * @return {*}     The clone of the array or object
 */
function copy (obj) {
	// ...
}

// Create an exact copy
let objClone = copy(obj);
```

It works _very well_.

But I found myself wondering how performant it was compared to `JSON.stringify()` and `JSON.parse()`. I figured all that looping must be expensive.

So, I setup [a simple performance test](/how-to-test-vanilla-js-performance/).

## Performance test results

For my first test, I used the object with the variety of data types, and used both the `copy()` method and `JSON.stringify()`/`JSON.parse()`.

To account for millisecond rounding errors, I ran each test 10,000 times.

While the specific times varied a little each time I ran it, **`JSON.stringify()` and `JSON.parse()` were roughly _twice as fast_ as the `copy()` helper function.**

Next, I decided to test a really large array. I pulled some data from [the JSON Placeholder API](http://jsonplaceholder.typicode.com/), and stored the 100 items I got back to a variable. Then, I ran my test again.

**This time, the `copy()` method was on average 3x faster than the JSON methods.**

|                 | `copy()`   | JSON methods |
|-----------------|------------|--------------|
| Different Types | 140.01 ms  | 72.99 ms     |
| Large Array     | 643.22 ms  | 1541.07 ms   |

[You can download the tests on GitHub.](https://gist.github.com/cferdinandi/61955eefcbf6f913e4968b6fdcd52080)

Based on this, here's what I would generally recommend...

- Use the `Object.assign()` and `Array.from()` or the spread syntax operator for simple arrays and objects
- Use the `copy()` method for multi-dimensional objects and arrays

While the JSON methods are faster in some situations, `copy()` is far more resilient, and faster as items get larger in size.