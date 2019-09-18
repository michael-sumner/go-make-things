---
title: "ES6 forEach() loops with vanilla JavaScript"
date: 2018-03-08T10:30:00-05:00
draft: false
categories:
- Code
- JavaScript
---

On Monday, we looked at [how to use a `for` loop to iterate through arrays and NodeLists](/back-to-basics-the-vanilla-javascript-loop/).

Today, we're going to look at how ES6 `forEach()` methods make it even easier.

## The`Array.forEach()`

ES6 introduced the `Array.forEach()` method for looping through arrays.

You call this method on your array, and pass in a callback function to run on each iteration of the loop. The callback accepts two arguments. The first is the value of the current item in the loop, and the second is the index of that item.

You can name these variables anything you want. Let's look at an example.

```js
var sandwiches = [
	'tuna',
	'ham',
	'turkey',
	'pb&j'
];

sandwiches.forEach(function (sandwich, index) {
	console.log(index);
	console.log(sandwich);
});

// returns 0, "tuna", 1, "ham", 2, "turkey", 3, "pb&j"
```

This method *only* works for arrays, *not* NodeLists. This means you can't use it elements you get using `querySelectorAll()` and other similar selector methods.

Fortunately, there's another `forEach()` method for that.

*__Quick aside:__ Ever wonder what the difference between a NodeList and an array is? One is a JavaScript object. The other is actually part of the Browser API. [Learn more about the difference between the two here.](https://gomakethings.com/nodelists-vs-arrays/)*

## The `NodeList.forEach()` method

The `NodeList.forEach()` method works just like the `Array.ForEach()` method, but on NodeLists.

```js
var sandwiches = document.querySelectorAll('.sandwich');

sandwiches.forEach(function (sandwich, index) {
	console.log(sandwich); // The element
	console.log(index); // The index in the NodeList
});
```

## Skipping Items

In a `for` loop, you can use `continue` to skip the current item and `break` to end the loop altogether.

Because the `forEach()` methods run callback functions, you would use `return` to skip the current item. There is no way to break the loop completely.

For example, if you wanted to log all sandwiches to the console *except* for `turkey`, you would do this.

```js
var sandwiches = [
	'tuna',
	'ham',
	'turkey',
	'pb&j'
];

sandwiches.forEach(function (sandwich, index) {

	// If the sandwich is turkey, skip it
	if (sandwich === 'turkey') return;

	// Otherwise log it to the console
	console.log(sandwich);

});

// Returns "tuna", "ham", "pb&j"
```

## Browser Compatibility

The `Array.forEach()` method works natively in all modern browsers and IE9. [A polyfill lets you push support all the way back to IE6.](https://vanillajstoolkit.com/polyfills/arrayforeach/)

The `NodeList.forEach()` method has super spotty browser support. [A similar polyfill provides you with support back to IE6 as well.](https://vanillajstoolkit.com/polyfills/nodelistforeach/)

Tomorrow, we'll look at the ES6 way to loop through objects.