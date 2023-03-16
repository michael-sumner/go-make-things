---
title: Three different ways to create a function in JavaScript
date: 2023-03-16T10:30:00-04:00
draft: false
categories:
- Code
- JavaScript
---

In JavaScript, there are multiple ways to create a function. Today, we're going to look at the three most common ways, and the differences between them.

Let's dig in!

## Function Declarations

With a _function declaration_, you use the `function` keyword followed by the function name, parentheses, and curly brackets.

Any function parameters go between the parentheses, comma-separated. The stuff the function does happens between the curly brackets.

```js
// Function declaration
function add (num1, num2) {
	return num1 + num2;
}
```

This is one of the most common ways to write a function.

## Function Expressions

With a _function expression_, you first declare a variable. Then, you assign an anonymous function to it.

```js
let add = function (num1, num2) {
	return num1 + num2;
};
```

This works more-or-less the same as a _function declaration_, with one notable difference.

## Hoisting

When a JavaScript file (or HTML document with JavaScript in it) is loaded and compiled, the browser reads through the JavaScript in its entirety before running it. 

When this happens, _function declarations_ are _hoisted_, meaning that their values are already known before any code runs. Variable names are hoisted as well, but their assigned values are not.

That means that with a _function expression_, the name is known, but the function that goes with it is not.

As a result, you can run a _function declaration_ before it appears in the code, but you _cannot_ do that with a _function expression_.

```js
// This runs just fine
add(4, 2);

function add (num1, num2) {
	return num1 + num2;
}

// This throws an error
// Uncaught TypeError: subtract is not a function
subtract(4, 2);

let subtract = function (num1, num2) {
	return num1 - num2;
};
```

## Arrow Functions

Arrow functions were introduced to JavaScript in ES6.

A basic arrow function isn't all that different from a traditional function. The word `function` gets dropped, and a fat arrow (`=>`) is added between the parentheses and brackets (`()` and `{}`, respectively).

Named arrow functions have to be written as a function expression. There's no way to write one as a function declaration.

```javascript
let add = (num1, num2) => {
	return num1 + num2;
};
```

If your function is only returning a value, as is the case with our `add()` function, you can simplify the function even further by dropping the curly brackets (`{}`) and `return` operator.

```javascript
// returns the value of `num1 + num2`
let add = (num1, num2) => num1 + num2;
```

This only works if the only thing you're doing is returning a value. If you need to do more stuff with your function, you have to include curly brackets.