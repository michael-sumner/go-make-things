---
title: "How to use the Set() object in vanilla JS"
date: 2021-01-25T10:30:00-05:00
draft: false
categories:
- Code
- JavaScript
---

The ES6 version of JavaScript introduced a new object for creating iterable lists of items: `Set()`.

Today, we're going to look at how it works, how it's different from a plain old array, and when and why you'd want to use it. Let's dig in.

## What is the `Set()` object?

A `Set()` object is an ordered list of unique items.

To create a `Set()`, use the `new Set()` constructor and pass in an iterable (such as an array) as an argument.

```js
// Create a Set() of wizards
// returns Set(4) {"Gandalf", "Radagast", "Hermione", "Neville"}
let wizards = new Set(['Gandalf', 'Radagast', 'Hermione', 'Neville']);
```

If that sounds a lot like an array, that's because... it is! One of the biggest key differences is that items in a `Set()` are _unique_. If you try to create a `Set()` object with more than one entry with the same value, the duplicates are automatically discarded.

```js
// Create a Set() of wizards with duplicates
// also returns Set(4) {"Gandalf", "Radagast", "Hermione", "Neville"}
let wizards = new Set(['Gandalf', 'Radagast', 'Hermione', 'Radagast', 'Neville', 'Hermione']);
```

## How to iterate over a `Set()`

The `Set()` object has a `Set.forEach()` method that you can use to iterate over each item in the set.

You pass in a callback function to run on each loop. The callback function receives the current item, its key, and the set itself as arguments.

It works a lot like [the `Array.forEach()` method](/how-array.foreach-works-under-the-hood-in-vanilla-js/), but unlike an array, items in a `Set()` do _not_ have an index. Since there's no associated `key` or index, the value itself is passed in as the `key` instead (_which is kind of absurd._).

```js
// logs "Gandalf", "Gandalf", "Radagast", "Radagast", "Hermione", "Hermione", "Neville", "Neville"
wizards.forEach(function (wizard, key) {
	console.log(wizard);
	console.log(key);
});
```

Because a `Set()` is an iterable, you can also [use a `for...of` loop](/the-for...of-loop-in-vanilla-js/) to iterate through its values.

```js
// logs "Gandalf", "Radagast", "Hermione", "Neville"
for (let wizard of wizards) {
	console.log(wizard);
}
```

The `Set.entries()` and `Set.values()` methods return back iterators with the `Set()` object's entries (as an array of key/value pairs) and its values, respectively.

```js
let sandwiches = new Set(['tuna']);

// logs ["tuna", "tuna"]
for (let entry of sandwiches.entries()) {
	console.log(entry);
}

// logs "tuna"
for (let value of sandwiches.values()) {
	console.log(value);
}
```

## Getting, setting, and deleting values from a `Set()`

The `Set()` object has several methods you can use to manipulate its values.

Use the `Set.add()` method to add an item to a `Set()`. Call it on the `Set()` object, and pass in the item to add as an argument.

```js
// Add "turkey" to the sandwiches Set()
sandwiches.add('turkey');
```

Use the `Set.has()` method to check if a set contains an item. Call it on the `Set()` object, and pass in the item to check as an argument.

It returns `true` if the `Set()` has the item, and `false` if it does not.

```js
// returns true
sandwiches.has('tuna');

// returns false
sandwiches.has('pb&j');
```

Use the `Set.delete()` method to delete an item from a `Set()`. Call it on the `Set()` object, and pass in the item to delete as an argument.

```js
// Delete "tuna" from the sandwiches Set()
sandwiches.delete('tuna');
```

You can remove all items from a `Set()` with the `Set.clear()` method.

```js
// Remove all items from sandwiches
sandwiches.clear();
```

`Set()` objects do not have a `length` property. You can check how many items are in them with the `size` property instead.

```js
// returns 0 (because we used the sandwiches.clear() method)
sandwiches.size;
```

## When should you use `Set()` instead of an array

To me, the `Set()` object has some nice benefits, and some serious shortcomings.

For example, the `Set.has()` method does not work with multidimensional entries. Let's say your `Set()` contained objects instead of simple values.

```js
let lotr = new Set([
	{
		name: 'Gandalf',
		color: 'gray'
	},
	{
		name: 'Radagast',
		color: 'brown'
	}
]);
```

You _cannot_ use `Set.has()` to check for an entry in the `lotr` object. There's no `Array.find()` or `Array.findIndex()` equivalent for the `Set()` object.

```js
// returns false
lotr.has({
	name: 'Gandalf',
	color: 'gray'
});
```

The lack of any sort of `key` or `index` means getting specific items from a `Set()` is harder than it needs to be.

A `Set()` object's biggest selling feature is that items have to be unique. If that's something you need, you can pass an array of potentially duplicate values into a `new Set()` constructor, then convert them back into an array.

```js
let duplicates = ['Gandalf', 'Radagast', 'Hermione', 'Radagast', 'Neville', 'Hermione'];

// returns ["Gandalf", "Radagast", "Hermione", "Neville"]
let unique = Array.from(new Set(duplicates));
```