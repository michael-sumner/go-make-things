---
title: Function expressions vs. function declarations revisisted
date: 2021-10-12T10:30:00-04:00
draft: false
categories:
- Code
- JavaScript
---

Four years ago, I wrote [the difference between function expressions and function declarations](/function-expressions-vs-function-declarations/). Since writing that article, I've both changed my approach to writing functions and expanded my explanation to capture the nuance of _hoisting_ in JavaScript.

Today, I wanted to share my updated thoughts on writing functions. Lets dig in!

## What's the difference between function expressions and function declarations?

There have historically been two ways to write a function.

```javascript
// Function declaration
function add (num1, num2) {
	return num1 + num2;
}

// Function expression
let add = function (num1, num2) {
	return num1 + num2;
};
```

The first example, `function add () {}`, is called a *function declaration*. The second example, `let add = function () {}`, is called a *function expression*.

They more-or-less do the same thing, but there’s one subtle yet important difference between them.

(_There's now a third way: [ES6 arrow functions](/arrow-functions-in-vanilla-js/). I hate them._)

## Hoisting

When a JavaScript file (or HTML document with JavaScript in it) is loaded, *function declarations* are *hoisted* to the top of the code by the browser before any code is executed.

What does that mean, exactly?

Specifically, all of the functions written with function declarations are "known" before any code is run. This allows you to call a function before you declare it.

```javascript
/**
 * This works!
 */
function add(num1, num2) {
	return num1 + num2;
}
add(3, 3); // returns 7


/**
 * This does, too!
 */
subtract(7, 4); // returns 3
function subtract(num1, num2) {
	return num1 - num2;
}
```

*Function expressions*, however, do **not** hoist. While the browser knows the variable exists, the function has not yet been assigned as its value.

If you try to run a function before you've expressed it, you'll get an error.

```javascript
/**
 * This works!
 */
let add = function(num1, num2) {
	return num1 + num2;
};
add(3, 3); // returns 7


/**
 * This does not =(
 */
substract(7, 4); // returns Uncaught TypeError: subtract is not a function
let subtract = function (num1, num2) {
	return num1 - num2;
};
```

## Which one should you use?

Which one you choose is almost entirely a matter of personal taste.

I think the more important thing is to pick one style of writing functions and stick with it throughout your script. If you *need* to call a function before it's declared, then of course use *function declarations*.

I used to prefer *function expressions*, but have recently switched to using *function declarations* instead, for a few reasons:

1. *Function declarations* are more common, and I like to adhere a bit more to conventions.
2. I think it’s more clear that the thing that’s coming is a function because `function` is the first word you see.
3. My original decision to use *function expressions* was made early in my career and became a strongly held but loosely supported opinion.

Ultimately, though, use whichever one feels more natural for you, and use it consistently.