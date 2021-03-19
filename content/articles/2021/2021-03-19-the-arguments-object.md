---
title: "The arguments object in JavaScript functions"
date: 2021-03-19T10:30:00-04:00
draft: false
categories:
- Code
- JavaScript
---

Within a function, you can use the `arguments` variable to get an array-like list of all of the arguments passed into the function.

You don't need to define it ahead of time. It's a native JavaScript object.

```js
function add (num1, num2) {

	// logs [num1, num2] (with their values)
	console.log(arguments);

	// logs the value of `num1`
	console.log(arguments[0]);

	// logs the value of `num2`
	console.log(arguments[1]);

	// ...

}
```

This is particularly useful if you would rather allow an unlimited number of arguments to be passed in to your function.

Let's say you wanted to be able to pass an unlimited amount of numbers into `add()` and add them together. The `arguments` variable is perfect for this!

Remember, `arguments` is array-like but not actually an array. To use array methods like `Array.forEach()` with it, you need to convert it to an array with the `Array.from()` method.

```js
function add () {

	// Set a starting total
	let total = 0;

	// Add each number to the total
	Array.from(arguments).forEach(function (num) {
		total += num;
	});

	// Return to the total
	return total;

}
```

In the example above, we're defining a default variable `total` with a value `0`. We use `Array.from()` to convert `arguments` to an array, and an `Array.forEach()` loop to iterate over each argument and add it to the `total`. Then we return the `total`.

If someone passes in no arguments, it returns `0`. Otherwise, they can add one or more numbers together.

```js
// returns 0
add();

// returns 4
add(4);

// returns 36
add(4, 2, 11, 19);
```