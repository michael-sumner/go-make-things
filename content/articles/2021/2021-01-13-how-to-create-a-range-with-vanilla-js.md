---
title: "How to create a range of numbers with vanilla JS"
date: 2021-01-13T10:30:00-05:00
draft: false
categories:
- Code
- JavaScript
---

Yesterday, we looked at [two practical uses for the `Array.fill()` method](/two-practical-uses-for-the-array.fill-method/). In it, I shared how you can use `Array.fill()` with the `Array.map()` method to create an array of sequential numbers.

Reader Darren Jones, author of the upcoming book _[Learn to Code with JavaScript](https://www.amazon.com/Learn-Code-JavaScript-Darren-Jones/dp/1925836401)_, wrote back to share another approach that I like even better, and I wanted to share that with you today.

Let's take a look!

## The `Array.keys()` method

Darren's trick relies on the `Array.prototype.keys()` method, which returns [an iterator object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Iterators_and_Generators) that contains the key, or index, for each item in an array.

You can create a `new Array()`, use the `Array.keys()` method, and then create a new array from returned iterator to get an array of sequential numbers.

```js
// Darren favors using the spread operator
// returns [0, 1, 2, 3, 4, 5, 6]
[...new Array(7).keys()];

// I prefer to use Array.from(), which I find more explicit
// also returns [0, 1, 2, 3, 4, 5, 6]
Array.from(new Array(7).keys());
```

As you can see, this is a lot more concise than my `Array.fill()` solution yesterday.

## Creating a `range()` helper function

The above approach is great if you want your array to start at `0` but what if you want a range that starts with a different number?

Darren shared this super useful helper function. I want to recreate it in my style and explain what each part does.

```js
function Range(a,b){
	// if only one argument supplied then return random number between 1 and argument
	if (b === undefined) {
		b = a;
		a = 1;
	}
	return [...Array(b-a+1).keys()].map(x => x+a);
}

// returns [0, 1, 2, 3, 4, 5, 6]
Range(7);

// returns [4, 5, 6, 7, 8, 9, 10, 11, 12]
Range(4, 11);
```

## Deconstructing and recreating the `range()` helper function

The first thing I'm going to do is use lowercase naming for my helper function. I generally reserve uppercase function names for [constructor patterns](/an-introduction-to-the-javascript-constructor-pattern/). Also, `Range` is already a web API, so it's a good idea not to use the same name.

I'm also going to rename `a` and `b` to `min` and `max` so that I can keep them sorted in my head more easily (this is 100% a personal preference thing).

```js
var range = function (min, max) {
	// Code goes here...
};
```

Next, we use the `Array.from(new Array().keys())` trick we talked about earlier to create a range of numbers.

Following Darren's original code, we subtract the `min` from the `max`, then add `1`, to get the length of the array.

```js
var range = function (min, max) {

	// Create a ranged array
	return Array.from(new Array(max - min + 1).keys());

};
```

At this point, we have a helper function that will always return an array that starts with `0`, and will be the length of the difference between the `min` and `max`.

Darren used the `map()` function to add the `min` to each number, shifting the starting and ending numbers. We'll do the same thing, but using a traditional function instead of an arrow function, because I find arrow functions harder to read (again, a personal preference thing).

```js
var range = function (min, max) {

	// Create a ranged array
	return Array.from(new Array(max - min + 1).keys()).map(function (num) {
		return num + min;
	});

};
```

Darren's last trick, and it's _super clever_, to allow users to provide just one number if they want a range of numbers that starts at `1`.

We can copy his code as-is for this. In it, if no `max` is provided, Darren reassigns the `min` argument to `max`, and sets `min` to `1`.

```js
var range = function (min, max) {

	// If only one number is provided, start at one
	if (max === undefined) {
		max = min;
		min = 1;
	}

	// Create a ranged array
	return Array.from(new Array(max - min + 1).keys()).map(function (num) {
		return num + min;
	});

};
```

## Wrapping up

I put a copy of this helper method on the [Vanilla JS Toolkit](https://vanillajstoolkit.com). You can [play a demo on CodePen](https://codepen.io/cferdinandi/pen/MWjPdZq).

The `range()` helper method will work in all modern browsers, but the `Array.from()` and `Array.keys()` methods don't work in IE and would require polyfills.