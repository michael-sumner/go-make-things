---
categories:
- Code
- JavaScript
date: '2017-11-09'
title: Getting an array of all arguments passed into a function with vanilla JavaScript
---

Let's say you had a function that added two numbers together.

```js
var add = function (num1, num2) {
    return num1 + num2;
};

// Returns 7
add(3, 4);
```

What if you wanted to add more than two numbers? You *could* add a bunch of arguments to accommodate more numbers.

```js
var add = function (num1, num2, num3, num4, num5) {
    return num1 + num2 + num3 + num4 + num5;
};
```

That gets unwieldy fast, though. What if you only need to add two numbers? Or three?

What you want is a way to dynamically get all of the arguments passed into a function. Fortunately, JavaScript provides a nice, native way to do that.

## `arguments`

Within any function, you can use the `arguments` variable to get an array-like list of all of the arguments passed into the function.

You don't need to define it ahead of time. It's a native JavaScript object. You can access specific arguments by calling their index.

```javascript
var add = function (num1, num2) {

	// returns the value of `num1`
	console.log(arguments[0]);

	// returns the value of `num2`
	console.log(arguments[1]);

	// ...

};
```

Or, you can use a basic `for` loop to loop through every argument that was passed in. You don't even need to assign them a name.

```javascript
var add = function () {

	// Set a starting total
	var total = 0;

	// Add each number to the total
	for (var i = 0; i < arguments.length; i++) {
		total += arguments[i];
	}

	// Return to the total
	return total;

};
```

**Psst...** This post was adapted from my latest vanilla JS pocket guide, ["Variables, Functions, and Scope."](https://gomakethings.com/guides/variables-functions-and-scope/)