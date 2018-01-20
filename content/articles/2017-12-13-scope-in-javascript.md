---
categories:
- Code
- JavaScript
date: '2017-12-13'
url: /scope-in-javascript/
title: Scope in JavaScript
---

Scope is the context in which a function or variable is accessible. There are three types of scope: *global*, *local*, and *lexical*.

At a high level, functions have access to variables and other functions set outside themselves, but not variables set inside other functions.

## Global Scope

A variable or function in the *global scope* is accessible inside other functions.

```javascript
// this is in the global scope
var sandwich = 'tuna';

var logSandwich = function () {
	// Will log `tuna` in the console
	// It can access sandwich because it's in the global scope
	console.log(sandwich);
};
logSandwich();

// Will also log `tuna` in the console
console.log(sandwich);
```

## Local Scope

A variable or function that's only accessible in a part of your code base has *local scope*.

```javascript
var logSandwich = function () {
	// this has variable local scope
	var sandwich = 'tuna';

	// Will log `tuna` in the console
	// It can access sandwich because it's scope is local to the function
	console.log(sandwich);
};
logSandwich();

// returns "Uncaught ReferenceError: sandwich is not defined"
// `sandwich` is local to the logSandwich() function, and not accessible here
console.log(sandwich);
```

## Lexical Scope

If you nest your functions, variables and other functions defined in the parent function have *lexical scope* and can be accessed by the inner funtions. The parent function cannot access variables or functions defined within the inner functions.

```javascript
var sandwiches = function () {

	// this is in the lexical scope
	var sandwich = 'tuna';

	var logSandwich = function () {

		// Will log `tuna` in the console
		// It can access sandwich because it's in the lexical scope
		console.log(sandwich);

		// Will log `chips` because it's in the local scope
		var snack = 'chips';
		console.log(snack);

	};
	logSandwich();

	// Will also log `tuna` in the console
	console.log(sandwich);

	// returns "Uncaught ReferenceError: snack is not defined"
	// `snack` is local to the logSandwich() function, and out of the lexical scope
	console.log(snack);

};
sandwiches();
```

Tomorrow, we'll look at how to define and update variables within different scopes.