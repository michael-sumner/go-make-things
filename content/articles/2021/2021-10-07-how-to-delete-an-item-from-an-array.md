---
title: How to delete an item from an array with vanilla JavaScript
date: 2021-10-07T10:30:00-04:00
draft: false
categories:
- Code
- JavaScript
---

Let's say you have an array of wizards, like this.

```js
let wizards = ['Gandalf', 'Radagast', 'Merlin'];
```

You want to remove the second item, `Radagast`, from the array. How would you do it?

Let's dig in!

## Using the `Array.splice()` method

The `Array.splice()` method accepts three arguments: `start`, `delete`, and `items`.

The first, `start`, is the index of the item you want to modify in the array. It’s the only required argument.

The second, `delete`, is the number of items to delete from the array. If you omit this argument, the `Array.splice()` method will remove every item from the `start` index on. If you set it to `0`, it won’t remove any items.

Finally, if you want to insert one or more `items` into the array, you can pass them in as additional arguments.

We want to delete the second item, so we'll pass in a `start` value of `1` (it's index) and a `delete` value of `1` (since we want to delete just that item).

```js
wizards.splice(1, 1);
```

The `Array.splice()` method modifies the original array. If you want, you can duplicate it before modifying using the `Array.from()` method.

```js
let fewerWizards = Array.from(wizards);
fewerWizards.splice(1, 1);
```

The `Array.splice()` method returns the removed item, so you can't create the new array, splice it, _and_ assign it to a variable in one line.

```js
// This would create an array with only Radagast in it
let fewerWizards = Array.from(wizards).splice(1, 1);
```

## Deleting an item by name instead of index

If you're not sure what the index of the item you want to delete is, you can use the `Array.indexOf()` method to find it first.

```js
let start = wizards.indexOf('Radagast');
wizards.splice(start, 1);
```

## Using the `Array.filter()` method

The `Array.filter()` method creates a new array with only elements that pass a test you include as a callback function. The callback accepts three arguments: the current item in the loop’s value, its index, and the array itself.

We can remove the item in our array by using the `index` like this.

```js
let fewerWizards = wizards.filter(function (wizard, index) {
	return index !== 1;
});
```

You can also remove the item by its value like this.

```js
let fewerWizards = wizards.filter(function (wizard) {
	return wizard !== 'Radagast';
});
```

## Which one should you use?

If you know the index of the item and want to modify the existing array, I would use `Array.splice()`.

If you don't have the index, or if you want to leave the original unmodified, I think `Array.filter()` is the better choice.