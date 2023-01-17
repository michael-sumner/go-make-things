---
title: How to sort arrays with vanilla JavaScript
date: 2023-01-17T10:30:00-04:00
draft: false
categories:
- Code
- JavaScript
---

Today, we're going to look at how you can sort and reorder items in an array using vanilla JavaScript. Let's dig in!

## Sorting with the `Array.prototype.sort()` method

You can use the `Array.prototype.sort()` method to sort and reorder the items in an array. 

It modifies the original array, and by default will order the items alphanumerically.

```js
let wizards = ['Merlin', 42, 'Gandalf', 2022, 'Radagast'];

// Sort the wizard array
// [2022, 42, "Gandalf", "Merlin", "Radagast"]
wizards.sort();
```

[Here's a demo.](https://codepen.io/cferdinandi/pen/poZWvqa?editors=0011)

## How to control how items in the array are sorted

You can optionally pass in a callback function that will modify the default sorting behavior.

The `Array.prototype.sort()` method loops through each item, and passes two items at a time as arguments into the callback function. You can compare those two items, and return an integer telling `Array.sort()` what to do with them. 

If you return `-1`, it will place the first item before the second one. If you return `1`, it will move the second item before the current one. If you return `0` (or nothing at all), it will leave them unchanged.

For example, let's say you have an array of trees. Each item in the array is an object with the `type` of tree, and the number `pineCones` it has.

```js
let trees = [
	{
		type: 'White pine',
		pineCones: 4
	},
	{
		type: 'Blue spruce',
		pineCones: 3
	},
	{
		type: 'Douglas fir',
		pineCones: 7
	}
];
```

You want to sort the array so that the tree with the most pine cones is first, and the one with the least pine cones is last.

In your callback function, you would compare `tree1.pineCones` to `tree2.pineCones`. If `tree1` has more `pineCones`, you would return `-1` to put it before `tree2`. Otherwise, you'd return `1` to put `tree2` before `tree1`.

```js
trees.sort(function (tree1, tree2) {

	// If the tree1 has more pine cones, put it before tree2
	if (tree1.pineCones > tree2.pineCones) {
		return -1;
	}

	// Otherwise, put tree2 before tree1
	return 1;

});
```

[Here's another demo.](https://codepen.io/cferdinandi/pen/YzjrPBP?editors=0011)