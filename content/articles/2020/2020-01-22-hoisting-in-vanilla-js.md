---
title: "What is hoisting in vanilla JavaScript?"
date: 2020-01-22T10:30:00-05:00
draft: false
categories:
- Code
- JavaScript
---

One topic a lot of people told me they find confusing is *hoisting*.

To explain what it is, we need to first quickly look at the two different ways you can create a function.

## Function expressions vs. function declarations

There are two ways to create a function: *function expressions* and *function declarations*.

With a *function declaration*, you start with the `function` operator, then assign it a name. With a *function expression*, you create a variable, and assign an anonymous function to it.

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

They more-or-less do the same thing, with one important caveat: *function declarations* are *hoisted*, while *function expressions* are not.

## So... what is hoisting, exactly?

When a JavaScript file is *compiled* by the browser, but *before* it's actually executed, *function declarations* are stored in memory but left exactly where they are in your code.

When the JS file actually runs, the browser is *already aware* of those functions before it gets to them in the code.

It's *like* they've been *hoisted* to the top of the file (even though they actually remain exactly where they were).

```js
// This was hoisted, so it works
// returns 6
add(3, 3);
function add(num1, num2) {
	return num1 + num2;
};


// This was not, so it doesn't
// returns Uncaught TypeError: subtract is not a function
substract(7, 4);
var subtract = function (num1, num2) {
	return num1 - num2;
};
```

[Here's a demo you can play with.](https://codepen.io/cferdinandi/pen/wvBRVor)

## Is hoisting good or bad?

Like many things in coding, it depends.

Personally, I think it can result in sloppier and less structured code. But it doesn't have to. Many people like that it allows them to author their code top down in a way that they find more readable.

I personally prefer *function expressions*, as I feel it creates a bit more rigid of a code structure.