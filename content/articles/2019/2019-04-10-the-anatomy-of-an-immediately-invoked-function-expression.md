---
title: "The anatomy of an immediately invoked function expression"
date: 2019-04-10T10:30:00-04:00
draft: false
categories:
- Code
- JavaScript
---

An *Immediately Invoked Function Expression*, or IIFE, is a function that immediately and automatically invokes itself and runs the code inside.

This lets you [keep code out of the global scope](/keeping-your-javascript-out-of-the-global-scope-and-why-you-want-to/) without having to name and call a function.

Let's look at how it works.

## Creating an IIFE

The first thing we need to do is create an anonymous function.

```js
function () {
	console.log('Hi there!');
}
```

Next, we'll wrap it in parentheses.

```js
(function () {
	console.log('Hi there!');
})
```

And finally, we'll add an empty set of parentheses and a closing semicolon at the end.

```js
(function () {
	console.log('Hi there!');
})();
```

Now our code will automatically log to the console but stay out of the global scope. [Here's a demo.](https://codepen.io/cferdinandi/pen/MRwRKg)

## Closing off variables

There's one last thing I like to do with my IIFEs that I get a lot of questions about. I put a leading semicolon *before* the IIFE, too.

```js
;(function () {
	console.log('Hi there!');
})();
```

Why?

Let's say someone doesn't like using semicolons (please use semicolons!) or forgets one by mistake. If the IIFE somehow ends up on the same line as that code&mdash;through minification or by accident&mdash;it can throw an error.

```js
// This will cause an error
var theAnswer = 42(function () {
	console.log('Hi there!');
})();
```

If you include a leading semicolon, it closes off any previously declared variables and prevents errors like this.

```js
// No errors, yay!
var theAnswer = 42;(function () {
	console.log('Hi there!');
})();
```


And if it isn't needed, nothing happens. It's a nice little extra safeguard for your code.

If you ever forget how to write these, I maintain [a boilerplate for it on the Vanilla JS Toolkit](https://vanillajstoolkit.com/boilerplates/iife/).