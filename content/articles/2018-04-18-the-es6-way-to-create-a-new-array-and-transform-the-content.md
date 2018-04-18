---
title: "The ES6 way to create a new array and transform the content with vanilla JavaScript"
date: 2018-04-18T10:30:00-04:00
draft: false
categories:
- Code
- JavaScript
---

ECMAScript 6 (ES6) introduced a ton of super handy methods for manipulating arrays. Today, I wanted to look at the `Array.prototype.map()` method, and how you can use it create a new array *and* manipulate it's content in one swoop.

## Using `Array.map()`

The `Array.map()` iterates through each item in an array, transforms it, and returns a new array.

It accepts a callback function that you use to transform your content. It should return the modified value for your item.

The callback accepts three arguments. The first is the current value in the iteration, the second is the index of the current item in the array, and the third is the array itself. All are optional.

As a simple example, let's say you had an array of numbers, and wanted to create a new array with each number doubled. You *could* use a `forEach()` loop, but the `Array.map()` method makes this easy.

```js
var numbers = [1, 4, 9];
var doubles = numbers.map(function(num) {
	return num * 2;
});

// Logs [2, 8, 18]
console.log(doubles);
```

[Here's a demo.](https://jsfiddle.net/cferdinandi/rfn7cogb/)

## A practical example

Let's say you had a JSON object with some names and occupations.

```js
var data = [
	{
		name: 'Kyle',
		occupation: 'Fashion Designer'
	},
	{
		name: 'Liza',
		occupation: 'Web Developer'
	},
	{
		name: 'Emily',
		occupation: 'Web Designer'
	},
	{
		name: 'Melissa',
		occupation: 'Fashion Designer'
	},
	{
		name: 'Tom',
		occupation: 'Web Developer'
	}
];
```

Let's use `Array.map()` to get a list of just the names.

```js
var names = data.map(function (item) {
	return item.name;
});
```

Great! Now, if we log this in the console, here's what we get.

```js
// Logs ["Kyle", "Liza", "Emily", "Melissa", "Tom"]
console.log(names);
```

Neat, right? [Here's a demo.](https://jsfiddle.net/cferdinandi/rfn7cogb/3/)

## Browser Compatibility

The `Array.map()` method works in all modern browsers, and IE9 and above. You can [use a polyfill to push support all the way back to IE6](https://vanillajstoolkit.com/polyfills/arraymap/).