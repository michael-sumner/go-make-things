---
title: "How scope works in JavaScript"
date: 2021-02-09T10:30:00-05:00
draft: false
categories:
- Code
- JavaScript
---

As part of back-to-basics series this week, yesterday we looked at [the difference between `var`, `let`, and `const`](/the-difference-between-let-var-and-const-for-defining-javascript-variables-and-why-you-should-probably-just-use-let/). Today, we're going to look at scope in JavaScript.

Let's dig in.

## What is scope?

Scope is the context in which a function or variable is accessible. There are four types of scope: *global*, *local*, *lexical*, and *block*.

At a high level, functions have access to variables and other functions set outside themselves, but not variables set inside other functions.

We're going to learn about _global_, _local_, and _lexical_ scope today, and we'll dig into the _block_ scope tomorrow.

## Global Scope

A variable or function in the *global scope* is accessible inside other functions.

```javascript
// this is in the global scope
let sandwich = 'tuna';

function logSandwich () {
	// Will log `tuna` in the console
	// It can access sandwich because it's in the global scope
	console.log(sandwich);
}
logSandwich();

// Will also log `tuna` in the console
console.log(sandwich);
```

## Local Scope

A variable or function that's only accessible in a part of your code base has *local scope*.

```javascript
function logSandwich () {
	// this has variable local scope
	let sandwich = 'tuna';

	// Will log `tuna` in the console
	// It can access sandwich because it's scope is local to the function
	console.log(sandwich);
}
logSandwich();

// returns "Uncaught ReferenceError: sandwich is not defined"
// `sandwich` is local to the logSandwich() function, and not accessible here
console.log(sandwich);
```

## Lexical Scope

If you nest your functions, variables and other functions defined in the parent function have *lexical scope* and can be accessed by the inner functions.

The parent function cannot access variables or functions defined within the inner functions.

```javascript
function sandwiches () {

	// this is in the lexical scope
	let sandwich = 'tuna';

	function logSandwich () {

		// Will log `tuna` in the console
		// It can access sandwich because it's in the lexical scope
		console.log(sandwich);

	}
	logSandwich();

	// Will also log `tuna` in the console
	console.log(sandwich);

}
sandwiches();

// returns "Uncaught ReferenceError: sandwich is not defined"
// `sandwich` is lexical to the sandwiches() function, and out of scope
console.log(sandwich);
```

## Defining and updating variables in different scopes

You can define a variable in a function that has the same name as a *global* or *lexical* variable without modifying that variable.

```javascript
let sandwich = 'tuna';

function logSandwich () {
	// logs "turkey"
	// Does NOT update the global `sandwich` variable
	let sandwich = 'turkey';
	console.log(sandwich);

}
logSandwich();

// logs "tuna"
console.log(sandwich);
```

If you omit the leading _variable declaration_, you can update a variable in the *global* or *lexical* scope from within a function.

```javascript
let sandwich = 'tuna';

// logs "tuna"
console.log(sandwich);

let logSandwich = function () {

	// logs "tuna"
	console.log(sandwich);

	// Updates `sandwich` in the global scope
	sandwich = 'turkey';

	// logs "turkey"
	console.log(sandwich);

};
logSandwich();

// logs "turkey"
console.log(sandwich);
```

## Keeping code out of the global scope

There are times you may want to expose a function or variable to the *global scope* (for example, a lightweight framework you want other scripts to be able to use).

But generally speaking, you want to keep your functions and variables out of the global scope. Otherwise, if another script or developer defines a variable or function that has the same name as the ones in your script, it will override them or introduce conflicts.

You can move your code into a *lexical scope* by wrapping it in a function.

```javascript
// Wrapper for your code
let myScripts = function () {
	// Your codes goes here...
};

// Run your scripts
myScripts();
```

If you want your code to run immediately when the file runs without having to call your function, you can use something called an [Immediately Invoked Function Expression (or IIFE)](https://vanillajstoolkit.com/boilerplates/iife/). An IIFE is an anonymous (as in, unnamed) function that runs immediately.

```javascript
(function () {
	// Your code goes here...
	// It will be scoped and run immediately
})();
```