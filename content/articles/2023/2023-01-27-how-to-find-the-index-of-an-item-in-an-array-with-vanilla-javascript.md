---
title: How to find the index of an item in an array with vanilla JavaScript
date: 2023-01-27T10:30:00-04:00
draft: false
categories:
- Code
- JavaScript
---

Yesterday, we learned [how to find the first matching item in an array](/how-to-find-the-first-matching-item-in-an-array-with-javascript/). Today, we're going to learn how to find the _index_ of an item in an array instead of the item itself.

Let's dig in!

## The `Array.prototype.indexOf()` method

The `Array.prototype.indexOf()` method accepts the item you want to find as an argument, and returns the index of that item. If no matching item is found, it returns `-1` instead.

```js
let wizards = ['Merlin', 'Gandalf', 'Ursula', 'Radgast'];

// returns 1
let index = wizards.indexOf('Gandalf');

// returns -1
let anotherIndex = wizards.indexOf('Morgana');
```

The `Array.prototype.indexOf()` method is great, but only works for matching primitive array values. It _won't_ match nested arrays or objects inside the array.

For example, imagine if your `wizards` array instead looked like this.

```js
let wizards = [
	{
		name: 'Merlin',
		color: 'blue'
	},
	{
		name: 'Gandalf',
		color: 'gray'
	},
	{
		name: 'Ursula',
		color: 'purple'
	},
	{
		name: 'Radagast',
		color: 'brown'
	}
];
```

You want to find the index for `Gandalf`, so you pass in an object, like this.

```js
// returns -1
let index = wizards.indexOf({
	name: 'Gandalf',
	color: 'gray'
});
```

Here, `index` will have a value of `-1`, because it cannot match against objects.

## The `Array.prototype.findIndex()` method

This is where the `Array.prototype.findIndex()` method comes to the rescue.

It accepts a callback function that tests that current item in the `array`. The callback function accepts an argument that represents the current item in the loop. You return a truthy value when that item matches your criteria, and the method will return that index of that item.

For example, to find the index for `Gandalf` in our complex array, we would do this.

```js
// returns 1
let index = wizards.findIndex(function (wizard) {
	return wizard.name === 'Gandalf';
});
```