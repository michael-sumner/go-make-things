---
categories:
- Code
- JavaScript
date: '2017-11-10'
title: ES6 arrow function rest parameters
---

Yesterday, I showed you a technique for [getting an array of all of the arguments passed into a function](https://gomakethings.com/getting-an-array-of-all-arguments-passed-into-a-function-with-vanilla-javascript/).

Unfortunately, this technique does not work for [ES6 arrow functions](https://gomakethings.com/an-introduction-to-es6-arrow-functions/), which don't have an `arguments` variable natively assigned like traditional functions do.

Instead, they have something called *rest parameters*.

## Rest Parameters

Rest parameters work a lot like `arguments`, but with two notable advantages.

1. You can assign them to any variable name you'd like.
2. You can start at any argument you want.

You define *rest parameters* by passing in an argument prefixed with `...`.

```javascript
var logStuff = (arg1, arg2, ...moreArgs) => {

	// Logs arg1
	console.log(arg1);

	// Logs arg2
	console.log(arg2);

	// Logs an array of any other arguments you pass in after arg2
	console.log(moreArgs);

};

// In this example...
// arg1 = 'chicken'
// arg2 = 'tuna'
// moreArgs = ['chips', 'cookie', 'soda', 'delicious']
logStuff('chicken', 'tuna', 'chips', 'cookie', 'soda', 'delicious');
```

That `add()` function we created yesterday? Here it is as an arrow function.

```javascript
var add = (...args) => {

	// Set a starting total
	var total = 0;

	// Add each number to the total
	for (var i = 0; i < args.length; i++) {
		total += args[i];
	}

	// Return to the total
	return total;

};
```

**Psst...** This post was adapted from my latest vanilla JS pocket guide, ["Variables, Functions, and Scope."](https://gomakethings.com/guides/variables-functions-and-scope/)