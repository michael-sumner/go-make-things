---
categories:
- Code
- JavaScript
date: '2017-12-15'
url: /keeping-your-javascript-out-of-the-global-scope-and-why-you-want-to/
title: Keeping your JavaScript out of the global scope (and why you want to)
---

This week, we learned about [JavaScript scope](/scope-in-javascript/), and [how to define and update variables across different types of scope](/defining-and-updating-javascript-variables-in-different-scopes/).

There are times you may want to expose a function or variable to the *global scope* (for example, a lightweight framework you want other scripts to be able to use).

But generally speaking, you want to keep your functions and variables out of the global scope. Otherwise, if another script or developer defines a variable or function that has the same name as the ones in your script, it will override them or introduce conflicts.

You can move your code into a *lexical scope* by wrapping it in a function.

```javascript
// Wrapper for your code
var myScripts = function () {
	// Your codes goes here...
};

// Run your scripts
myScripts();
```

If you want your code to run immediately when the file runs without having to call your function, you can use something called an Immediately Invoked Function Expression (or IIFE). An IIFE is an anonymous (as in, unnamed) function that runs immediately.

```javascript
;(function (window, document, undefined) {
	// Your code goes here...
})(window, document);
```

Use one of these two techniques to make your code less fragile.