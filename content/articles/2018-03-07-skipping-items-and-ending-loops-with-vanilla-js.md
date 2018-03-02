---
title: "Skipping items and ending loops with vanilla JavaScript"
date: 2018-03-07T10:30:00-05:00
draft: false
categories:
- Code
- JavaScript
---

So far this week we've learned about [the `for` loop](/back-to-basics-the-vanilla-javascript-loop/) and [the `for...in` loop](/the-for...in-loop-with-vanilla-javascript/).

Today, we'll look at how to skip items in a loop, and how to end the loop early.

## Skipping items in a JavaScript loop

Inside a `for` or `for...in` loop, `continue` will end the current iteration and skip to the next one.

For example, if we had a list of sandwiches, and wanted to log them all to the console *except* for `turkey`, we would do this.

```js
var sandwiches = [
	'tuna',
	'ham',
	'turkey',
	'pb&j'
];

for (var i = 0; i < sandwiches.length; i++) {

	// Skip turkey
	if (sandwiches[i] === 'turkey') continue;

	// Otherwise, log to the console
	console.log(sandwiches[i]);

}

// Returns "tuna", "ham", "pb&j"
```

## Ending a JavaScript loop early

Use `break` inside a `for` or `for...in` loop to end it early.

For example, if we want to end our loop once we get to the `turkey` sandwich, we would do this.

```js
var sandwiches = [
	'tuna',
	'ham',
	'turkey',
	'pb&j'
];

for (var i = 0; i < sandwiches.length; i++) {

	// Skip turkey
	if (sandwiches[i] === 'turkey') break;

	// Otherwise, log to the console
	console.log(sandwiches[i]);

}

// Returns "tuna", "ham"
```

Tomorrow, we'll look at some handy ES6 methods that make looping through arrays, NodeLists, and objects a lot easier.