---
title: "How to find an item in an array with vanilla JavaScript"
date: 2018-03-27T10:30:00-04:00
draft: false
categories:
- Code
- JavaScript
---

This week, we've been looking at some of the array methods introduced with ES6. Today, I'm going to show you how to find a matching item in an array.

## The `Array.find()` method

The `Array.find()` method locates the first item in an array that matches a test you pass in as a callback function. The callback accepts an argument that serves as a reference variable for the item in the array.

Here's a simple example that finds the item `'tuna'` in an array of sandwiches.

```js
var sandwiches = ['turkey', 'chicken salad', 'tuna', 'pb&j', 'egg salad'];

var getTuna = sandwiches.find(function (sandwich) {
	return sandwich === 'tuna';
});

// Logs "tuna"
console.log(getTuna);
```

If an item isn't found, it returns `undefined`.

```js
var getHamburger = sandwiches.find(function (sandwich) {
	return sandwich === 'hamburger';
});

// Logs undefined
console.log(getHamburger);
```

## When this is useful

For simple arrays, this probably seems overdone.

When trying to find items in more complex arrays, though, it's super helpful. For example, imagine an API that returns a JSON file with an array of objects, like this:

```js
var todos = [
	{
		item: 'Wash the dog',
		added: 2018-03-22,
		completed: false
	},
	{
		item: 'Plan surprise party for Bailey',
		added: 2018-03-14,
		completed: false
	},
	{
		item: 'Go see Black Panther',
		added: 2018-03-12,
		completed: true
	},
	{
		item: 'Launch a podcast',
		added: 2018-03-05,
		completed: false
	}
];
```

How would you find the todo with the `item` of `Go see Black Panther`?

Without `Array.find()` you would need to loop over each todo, check the `item`, store the result once you find a match, and then end the loop.

```js
var item;
for (var i = 0; i < todos.length; i++) {
	if (todos[i] === 'Go see Black Panther') {
		item = todos[i];
		break;
	}
}
```

With `Array.find()`, you can do this.

```js
var item = todos.find(function (todo) {
	return todo.item === 'Go see Black Panther';
});
```

## Browser Compatibility

The `Array.find()` method works in all modern browsers, but has no IE support. [You can push support back to IE9 with a polyfill.](https://vanillajstoolkit.com/polyfills/arrayfind/)