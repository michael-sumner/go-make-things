---
title: How to find the first matching item in an array with JavaScript
date: 2023-01-26T10:30:00-04:00
draft: false
categories:
- Code
- JavaScript
---

Today, we're going to look at how to find an item in an array. Let's dig in!

## The `Array.prototype.find()` method

The `Array.prototype.find()` methoda locates the first item in an array that matches a test you pass in as a callback function. The callback accepts an argument that serves as a reference variable for the current item in the array.

Here’s a simple example that finds the item `tuna` in an array of `sandwiches`.

```js
let sandwiches = ['turkey', 'chicken salad', 'tuna', 'pb&j', 'egg salad'];

let tuna = sandwiches.find(function (sandwich) {
	return sandwich === 'tuna';
});

// logs "tuna"
console.log(tuna);
```

If an item isn’t found, it returns `undefined`.

```js
let hamburger = sandwiches.find(function (sandwich) {
	return sandwich === 'hamburger';
});

// logs undefined
console.log(hamburger);
```

## Working with more complex arrays

Where the `Array.prototype.find()` method really shines is with complex arrays.

For example, imagine an API that returns a JSON file with an array of todo objects, like this...

```js
let todos = [
	{
		item: 'Wash the dog',
		added: 20180322,
		completed: false
	},
	{
		item: 'Plan surprise party for Bailey',
		added: 20180314,
		completed: false
	},
	{
		item: 'Go see Black Panther',
		added: 20180312,
		completed: true
	},
	{
		item: 'Launch a podcast',
		added: 20180305,
		completed: false
	}
];
```

How would you find the todo with the `item` of `Go see Black Panther`, including when it was `added` and whether or not it was `completed`?

_Without_ the `Array.prototype.find()` method, you need to loop over each todo, check the `item`, store the result once you find a match, and then end the loop.

```js
let item;
for (let todo of todos) {
	if (todo.item === 'Go see Black Panther') {
		item = todo;
		break;
	}
}
```

With the `Array.prototype.find()` method, you can just check if the `todo.item` property is `Go see Black Panther`.

```js
let item = todos.find(function (todo) {
	return todo.item === 'Go see Black Panther';
});
```