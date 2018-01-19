---
categories:
- Code
- JavaScript
date: '2018-01-16'
permalink: /array-sorting-basics-with-vanilla-javascript/
title: Array sorting basics with vanilla JavaScript
url: /2018/01/16/array-sorting-basics-with-vanilla-javascript
---

One of my students contacted me about [yesterday's article on sorting arrays](https://gomakethings.com/sorting-an-array-by-multiple-criteria-with-vanilla-javascript/), and I realized I didn't do the greatest job explaining the basics of array sorting with vanilla JS.

Today, let's take a step back, look at a simplified example, and get a better understanding of how `Array.sort()` works.

## Looping through the array

Let's say you have a simple array of sandwich choices.

```lang-js
var sandwiches = [
	'turkey',
	'ham',
	'tuna',
	'pb&j'
];
```

When you call the `sort()` method on an array, it looks through each item in the array and compares it to the one immediately after it.

The method uses a callback function that accepts two arguments. The first is the current item, and the second is the one that comes after it. You can name them anything you want.

```lang-js
sandwiches.sort(function (sandwich1, sandwich2) {
	console.log(vote1);
	console.log(vote2);
});
```

On the first loop, the example above would log `turkey` (the first item) and `ham` (the one after it) to the console. On the second loop, it would log `ham` (the new current item) and `tuna` (the new next item) to the console.

This would continue all the way through until it gets to `pb&j`.

## Actually sorting things

You can tell the `Array.sort()` method to reorder those two items by giving it a numeric command.

If you return `-1`, it will place the current item before the next one. If you return `1`, it will move the next item before the current one. If you return `0` (or nothing at all), it will leave them unchanged.

You could sort you sandwiches alphabetically by comparing them and moving the "higher" value down. If the letter comes later in the alphabet, it has a higher value than if it comes earlier. As in, `a` has a lower value than `d`.

```lang-js
// Sort alphabetically
sandwiches.sort(function (sandwich1, sandwich2) {
	if (sandwich1 > sandwich2) {
		return 1;
	} else {
		return -1;
	}
});
```

You could sort them reverse-alphabetically by doing the opposite.

```lang-js
// Sort reverse-alphabetically
sandwiches.sort(function (sandwich1, sandwich2) {
	if (sandwich1 > sandwich2) {
		return -1;
	} else {
		return 1;
	}
});
```

You could order them by the number of letters in the name (fewer letters show up first) by getting the `length` property of each sandwich and comparing it to the sandwich after it.

```lang-js
// Sort by name length
sandwiches.sort(function (sandwich1, sandwich2) {
	if (sandwich1.length > sandwich2.length) {
		return 1;
	} else {
		return -1;
	}
});
```

That last one is weird, but you have options. If I did a bad job explaining any of this, let me know!