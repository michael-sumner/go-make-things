---
title: "JavaScript gotcha: global variable assignment"
date: 2020-01-14T10:30:00-05:00
draft: false
categories:
- Code
- JavaScript
---

I've written before about the importance of [keeping your code out of the global](/keeping-your-javascript-out-of-the-global-scope-and-why-you-want-to/), and shared some simple techniques on how to do so.

One gotcha that sometimes catches people by surprise: if you omit the variable definition operator (`var`, `let`, or `const`) and the variable doesn't already exist, it's automatically added to the `window` object, or global scope.

```js
// This is an IIFE, designed to keep code out of the global scope
(function () {

	// This variable is scoped inside the IIFE
	// It cannot be accessed outside of this function
	var lunch = 'turkey sandwich';

	// This variable is automatically added to the global scope
	// It CAN be accessed outside of this function
	dinner = 'pasta and meatballs';

})();

// Logs "pasta and meatballs"
console.log(dinner);

// Throws an error:
// Uncaught ReferenceError: lunch is not defined
console.log(lunch);
```

[Here's a demo of this that you can play with.](https://codepen.io/cferdinandi/pen/PowBZEM)

Make sure you always add `var`, `let`, or `const` before your variable when defining it for the first time. Not sure which to use? [Here's how they're different](/let-var-and-const/), and [why I always use `var`](/why-i-dont-use-let-const-or-fat-arrow-functions-and-you-shouldnt-either/).