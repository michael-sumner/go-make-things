---
title: "let, const, and block scoping in JavaScript"
date: 2021-02-10T10:30:00-05:00
draft: false
categories:
- Code
- JavaScript
---

On Monday, we looked at [the difference between `let`, `const`, and `var` (and why you should mostly just use `let`)](/the-difference-between-let-var-and-const-for-defining-javascript-variables-and-why-you-should-probably-just-use-let/). Yesterday, we learned [how scope works](/how-scope-works-in-javascript/).

Today, we're going to combine these topics and look at block scoping in JavaScript. Let's dig in!

## What is block scoping?

In JavaScript, a _block_ is anything that appears between a set of _curly brackets_ (`{}`).

```javascript
// This is in the global scope
let answer = null;
let question = false;

// This is a block
if (question === true) {

	// This in a block scope
	let answer = 42;

}
```

## `let` and `const` behave differently than `var` with block scope

The `let` and `const` keywords provide _block-scoping_. The `var` keyword does not.

That means that if you declare a variable with `var`, then use `var` to declare another variable with same name inside a _block scope_, the original variable will be updated. If you use `let` or `const`, a new variable contained within the _block scope_ is created.

```javascript
var sandwich = 'tuna';
let drink = 'soda';

if (true) {

	// drink is in the block scope, but sandwich is not
	var sandwich = 'turkey';
	let drink = 'water';

	// logs "turkey"
	console.log(sandwich);

	// logs "water"
	console.log(drink);

}

// logs "turkey"
console.log(sandwich);

// logs "soda"
console.log(drink);
```

Because `let` and `const` provide _block-scoping_, they are almost always a better choice than `var`.