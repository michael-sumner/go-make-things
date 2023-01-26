---
title: How to get the last matching item in an array with vanilla JavaScript
date: 2023-02-02T10:30:00-04:00
draft: false
categories:
- Code
- JavaScript
---

Last week, I wrote about [the `Array.prototype.find()` method](/how-to-find-the-first-matching-item-in-an-array-with-javascript/) and [the `Array.prototype.findIndex()` method](/how-to-find-the-index-of-an-item-in-an-array-with-vanilla-javascript/). They find the first item in an array that matches some criteria you specify (or it's index).

Today, I want to talk about some companion methods that find the _last_ matching item instead. Let's dig in!

## The `Array.prototype.findLast()` method

Let's imagine you have an array of `todos`, and at least one of the items has a duplicate `item` property.

```js
let todos = [
	{
		item: 'Wash the dog',
		added: 20180322,
		completed: false
	},
	{
		item: 'Launch a podcast',
		added: 20180305,
		completed: false
	},
	{
		item: 'Wash the dog',
		added: 20180222,
		completed: true
	},
];
```

If you used the `Array.prototype.find()` method to search for the object with `Wash the dog` as its `item`, it would return the first object, `added` on `20180322` and not `completed`.

```js
// returns the first item
let washTheDog = todos.find(function (todo) {
	return todo.item === 'Wash the dog';
});
```

If you instead wanted to find the _last_ matching item, you can use the `Array.prototype.findLast()` method. It works exactly the same way, but returns the last matching item instead of the first. 

This returns the todo that was `added` on `2018022` and _is_ `completed`.

```js
// returns the first item
let washTheDog = todos.findLast(function (todo) {
	return todo.item === 'Wash the dog';
});
```

## The `Array.prototype.findLastIndex()` method

Similarly, the `Array.prototype.findLastIndex()` method works just like the `Array.prototype.findIndex()` method, but finds the index of the _last_ matching item instead of the first.

```js
// returns 2
let washIndex = todos.findLastIndex(function (todo) {
	return todo.item === 'Wash the dog';
});
```