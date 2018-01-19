---
categories:
- Code
- JavaScript
date: '2017-12-14'
permalink: /defining-and-updating-javascript-variables-in-different-scopes/
title: Defining and updating JavaScript variables in different scopes
url: /2017/12/14/defining-and-updating-javascript-variables-in-different-scopes
---

Yesterday, we learned about [scope in JavaScript](/scope-in-javascript/). Today, let's learn how to update variables across different types of scopes.

Prefixing a variable with `var` defines a new variable. Omitting `var` updates an existing variable.

There are two caveats to this:

1. If a variable is already defined in the current scope, prefixing it with `var` will throw an error.
2. If a variable isn't currently defined, omitting `var` creates a new variable (you should always use `var` to define a new variable, though).

You can define a variable in a function that has the same name as a *global* or *lexical* variable without modifying that variable.

```lang-javascript
var sandwich = 'tuna';

var logSandwich = function () {
	// logs "turkey"
	// Does NOT update the global `sandwich` variable
	var sandwich = 'turkey';
	console.log(sandwich);

};
logSandwich();

// logs "tuna"
console.log(sandwich);
```

If you omit the leading `var`, you can update a variable in the *global* or *lexical* scope from within a function.

```lang-javascript
var sandwich = 'tuna';

// logs "tuna"
console.log(sandwich);

var logSandwich = function () {
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

Tomorrow, we'll learn a few approaches to keeping code out of the global scope (and why you want to).