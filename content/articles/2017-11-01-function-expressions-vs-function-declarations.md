---
categories:
- Code
- JavaScript
date: '2017-11-01'
permalink: /function-expressions-vs-function-declarations/
title: Function expressions vs. function declarations
url: /2017/11/01/function-expressions-vs-function-declarations
---

I've started working on my next [pocket guide](/guides/), *Variables, Functions, and Scope*.

One of the things I get asked about a fair bit is the difference between these two ways of writing a function.

```js
// Function declaration
function add(num1, num2) {
	return num1 + num2;
}

// Function expression
var add = function (num1, num2) {
	return num1 + num2;
};
```

The first example, `function add() {}`, is called a *function declaration*. The second example, `var add = function () {}`, is called a *function expression*.

They more-or-less do the same example thing, but there's one subtle yet important difference between them.

## Hoisting

When a JavaScript file (or HTML document with JavaScript in it) is loaded, *function declarations* are *hoisted* to the top of the code by the browser before any code is executed.

What does that mean, exactly?

Specifically, all of the functions written with function declarations are "known" before any code is run. This allows you to call a function before you declare.

```js
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
substract(7, 4); // returns 3
function subtract(num1, num2) {
	return num1 - num2;
}
```

*Function expressions*, however, do **not** hoist. If you try to run a function before you've expressed it, you'll get an error.

```js
/**
 * This works!
 */
var add = function(num1, num2) {
	return num1 + num2;
};
add(3, 3); // returns 7


/**
 * This does not =(
 */
substract(7, 4); // returns Uncaught TypeError: subtract is not a function
var subtract = function (num1, num2) {
	return num1 - num2;
};
```

## Which one should you use?

Which one you chose is almost entirely a matter of personal taste. I think the more important thing is to pick one style of writing functions and stick with it throughout your script.

If you *need* to call a function before it's declared, then, of course, use *function declarations*.

I personally prefer *function expressions*, and use them extensively in all of my code. I like them for one reason: they force more structure into the code base.

With *function expressions*, I cannot call a function before I've expressed it, so my code has a nice, neat structure to it. Functions that call other functions are written in a specific order every time, because they won't work otherwise. And any code I run to kick things off happens at the end of the file.

Reading my code is a predictable, structured activity. But again, this is entirely personal preference, and either one works great.