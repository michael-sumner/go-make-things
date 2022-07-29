---
title: How to filter items in an array with vanilla JavaScript
date: 2022-07-29T10:30:00-04:00
draft: false
categories:
- Code
- JavaScript
---

Today, we’re going to look at the `Array.filter()` method, and how you can use it to filter items in array and create a new one. Let’s dig in!

## An example

Let's imagine you have an array of numbers.

```js
let numbers = [1, 42, 7, 3, 99, 101, 4];
```

You want to create a new array that contains only the `numbers` that are bigger than `10`.

Traditionally, you might use a `for...of` loop and the `Array.push()` method to handle this for you.

```js
// Create a new array
let biggerThanTen = [];

// Push numbers bigger than 10 into it
for (let num of numbers) {
	if (num > 10) {
		biggerThanTen.push(num);
	}
}
```

[Here's a demo.](https://codepen.io/cferdinandi/pen/zYWPpNZ?editors=1011)

The `Array.filter()` method simplifies this.

## How the `Array.filter()` method works

You call the `Array.filter()` method on an array, and pass in a callback function that accepts three arguments: the current item in the loop, its index, and the array itself. All three are optional.

Inside the callback function, you can test the current item against whatever conditions you'd like to filter against.

If you `return true`, the item is included in the new array. If you `return` a falsy response, it's not.

```javascript
// Create a new array with only numbers greater than 10
let biggerThanTen = numbers.filter(function (item) {
	return item > 10;
});
```

[Here's another demo.](https://codepen.io/cferdinandi/pen/QWmOapW?editors=1011)

## A use case for the optional `array` parameter

My buddy [Kieran Barker](https://barker.codes/) pointed out a good use case for the optional array parameter on the callback function: running the same callback function on multiple arrays.

For example, let's imagine you're using the `Array.filter()` method to remove duplicates from an array.

```js
let wizards = ['Gandalf', 'Merlin', 'Radagast', 'Merlin', 'Gandalf'];
```

Here, Gandalf and Merlin are both in the array of `wizards` twice. We want a new array with each entry only in there once.

We can use the `Array.filter()` method to compare the current `index` to the `indexOf()` property. If they don't match, the item is a duplicate and we can ignore it.

```js
let uniqueWizards = wizards.filter(function (wizard, index) {
	return index === wizards.indexOf(wizard);
});
```

With one array, we can just point to the existing array. But what if you want to do this with multiple arrays?

```js
let wizards = ['Gandalf', 'Merlin', 'Radagast', 'Merlin', 'Gandalf'];
let pirates = ['Blackbeard', 'Blackbeard', 'Calico Jack'];
```

We can create a named callback function, and use the third `array` parameter instead of referencing a named array.

```js
function removeDuplicates (item, index, array) {
	return index === array.indexOf(item);
}

// Remove duplicates
let uniqueWizards = wizards.filter(removeDuplicates);
let uniquePirates = pirates.filter(removeDuplicates);
```

Now, our code is DRY.

[Here's one last demo.](https://codepen.io/cferdinandi/pen/qBoVpjp?editors=1011)