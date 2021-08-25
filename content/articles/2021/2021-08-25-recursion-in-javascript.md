---
title: "Recursion in JavaScript"
date: 2021-08-25T10:30:00-04:00
draft: false
categories:
- Code
- JavaScript
---

In JavaScript, _recursion_ is when you call a function from within itself until or unless a condition is a met. Today, we're going to look at how it works.

Let's dig in!

## Count up by one

Let's say we have a number, and we want to increase its value by `1`. We have a helper function that takes a number, and returns that number plus `1`.

```js
/**
 * Add one to a number
 * @param  {Number} num The number to increase
 * @return {Number}     The new number
 */
function upByOne (num) {
	return num + 1;
}
```

To use it, you can do something like this.

```js
// returns 42
let more = upByOne(41);
```

This is an absurd example, of course. It would be faster and easier to just add `1` to the number.

But it will help illustrate how recursion works, so let's roll with it.

## Adding recursion

Now, let's say you wanted whatever number was returned to have a value of `10` or higher. If you passed in `7`, instead of getting `8` back, you want to get back `10`.

We can use _recursion_ for that!

Inside our `upByOne()` function, we'll add `1` to `num`. Then, we'll check if it's value is less than `10`. If so, we'll pass it back into `upByOne()` and `return` the result. Otherwise, we'll return the new number.

```js
/**
 * Add one to a number
 * @param  {Number} num The number to increase
 * @return {Number}     The new number
 */
function upByOne (num) {
	let bigger = num + 1;
	if (bigger < 10) {
		return upByOne(bigger);
	}
	return bigger;
}
```

If you passed in `7`, for example, `bigger` would have a value of `8`. The `if` statement would return `true`, and `8` would get passed into `upByOne()`.

The number would get increased to `9`, the check would run again, and the process would repeat, until `bigger` had a value of `10`.

```js
// returns 10
let minOfTen = upByOne(7);
```

[Here's a demo.](https://codepen.io/cferdinandi/pen/ExXabaN?editors=1111)