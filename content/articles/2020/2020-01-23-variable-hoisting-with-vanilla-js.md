---
title: "Variable hoisting in JavaScript"
date: 2020-01-23T10:30:00-05:00
draft: false
categories:
- Accessibility
- Art and Science
- Business and Leadership
- Careers
- Code
- CSS
- Design and UX
- HTML
- JavaScript
- Technology
- Web Performance
- WordPress
- Vanilla Framework Demos
---

Yesterday, we looked at [hoisting in JavaScript](/what-is-hoisting-in-vanilla-javascript/).

A few folks were quick to point out that variables are hoisted, too. Let's dig into that a bit.

## Variables are hoisted, but their values are not

Yesterday, I wrote:

> When a JavaScript file is compiled by the browser, but before it’s actually executed, function declarations are stored in memory but left exactly where they are in your code.

What I didn't mention is that variables are, too, but *not* their values.

For example, here, `num1` logs `undefined`, because while the browser knows the `num1` variable exists when `console.log()` runs (because it was hoisted), no value has been assigned to it yet.

Trying to log `num2` throws an error, because the variable has not been defined anywhere.

```js
console.log(num1);
var num1 = 42;
console.log(num2);
```

[See it for yourself with this demo.](https://codepen.io/cferdinandi/pen/rNaPZVZ)

## Some nuance around function hoisting

Yesterday, while discussing *function declarations* versus *function expressions*, I also wrote:

> They more-or-less do the same thing, with one important caveat: function declarations are hoisted, while function expressions are not.

There's a bit of a nuance here I didn't mention.

In the function expression below, because of variable hoisting the browser already knowns `subtract` exists as a variable when you try to run it. But because the value (in this case, a function) has not been assigned to that variable yet, the browser does not yet know it's a function that can be executed.

```js
// The browser knowns subtract is a variable, but doesn't know it's a function yet
// returns Uncaught TypeError: subtract is not a function
subtract(7, 4);
var subtract = function (num1, num2) {
	return num1 - num2;
};
```

With *function declarations*, the function itself gets hoisted.

```js
// Here, the entire function is hoisted, so this still runs
// returns 6
add(3, 3);
function add(num1, num2) {
	return num1 + num2;
};
```

I hope that clears things up a bit! If I didn't explain anything clearly, though, let me know and I'll to do a better job.