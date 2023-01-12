---
title: Four ways to chop up arrays (with vanilla JavaScript)
date: 2023-01-13T10:30:00-04:00
draft: false
categories:
- Code
- JavaScript
---

Over the last few days, we've looked at [how to modify](/two-ways-to-modify-arrays-with-vanilla-javascript/) and [filter arrays](/two-ways-to-filter-arrays-with-vanilla-javascript/). Today, we're going to look at how to chop them up into pieces!

Let's dig in!

## A sample array

For this lesson, let's imagine we have a simple array of `wizards`, like this...

```js
let wizards = ['Merlin', 'Gandalf', 'Ursula', 'Morgana', 'Radagast'];
```

We want to add or remove items, split it into multiple arrays, and so on. Let's look at a few ways to do that.

## Getting a subsection of an array

The `Array.prototype.slice()` method creates a copy of subsection of an array, and leaves the original array intact.

Call it on the array to copy. The first argument is the array index to start at, and the second is the index to end on. Both are optional. 

If you omit the start index, it will start at the beginning. If you omit the end index, it will go to the end.

```js
// returns ['Ursula', 'Morgana', 'Radagast']
let fewerWizards = wizards.slice(2);

// returns ['Ursula', 'Morgana']
let evenFewerWizards = wizards.slice(2, 4);
```

[Here's a demo.](https://codepen.io/cferdinandi/pen/oNMWRKd?editors=0011)

## Delete, replace, and add items

The `Array.prototype.splice()` method (with a _p_), deletes, replaces, and adds items to an array. It accepts three arguments: `start`, `delete`, and `items`. The original array _is_ modified.

The first argument, `start`, is the index of the item you want to modify in the array. It’s the only required argument.

The second, `delete`, is the number of items to delete from the array. If you omit this argument, the `Array.prototype.splice()` method will remove every item from the `start` index on. If you set it to `0`, it won’t remove any items.

Finally, if you want to insert one or more items into the array, you can pass them in as additional arguments.

```js
// Removes Ursula
wizards.splice(2, 1);

// Replaces Gandalf with Medusa
wizards.splice(1, 1, 'Medusa');

// Adds Neville between Morgana and Radagast
wizards.splice(3, 0, 'Neville');
```

[Here's another demo.](https://codepen.io/cferdinandi/pen/KKBmjPV?editors=0011)

## Get and remove the first item

The `Array.prototype.shift()` method removes the first item from an array and returns it. The array is modified.

```js
// returns "Merlin"
let firstWizard = wizards.shift();

// logs ['Gandalf', 'Ursula', 'Morgana', 'Radagast']
console.log(wizards);
```

[Here's a demo of this technique.](https://codepen.io/cferdinandi/pen/bGjWPEN?editors=0011)

## Get and remove the last item

The `Array.prototype.pop()` method removes the last item from an array and returns it. The array is modified.

```js
// returns "Radagast"
let lastWizard = wizards.pop();

// logs ['Merlin', 'Gandalf', 'Ursula', 'Morgana']
console.log(wizards);
```

[Here's one last demo.](https://codepen.io/cferdinandi/pen/yLqbdOV?editors=0011)