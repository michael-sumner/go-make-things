---
categories:
- Code
- JavaScript
date: '2017-11-16'
url: /setting-default-arguments-with-javascript-arrow-functions/
title: Setting default arguments with JavaScript arrow functions
---

Yesterday, we looked at [how to set default values for JavaScript function arguments](/setting-default-values-for-a-javascript-function/).

With arrow functions, it's even easier.

You can set a default value for each argument at the time that you give it a name with `= value`.

```javascript
// Setting defaults with a traditional function
var add = function (num1, num2) {

	// If num1 or num2 aren't defined, set them to 0
	num1 = num1 || 0; // conditional operator
	num2 = num2 ? num2 : 0; // ternary operator

	// Add the numbers
	return num1 + num2;

};

// Setting defaults with an arrow function
var add = (num1 = 0, num2 = 0) => num1 + num2;
```

[Arrow functions aren't production-ready](/can-i-use-arrow-functions-in-production-code/) at the moment&mdash;they require a compiler to have good enough browser compatibility&mdash;but this is still a great feature.

If you like this post, you might also enjoy my [vanilla JS pocket guide on variables, functions, and scope](/guides/variables-functions-and-scope/).