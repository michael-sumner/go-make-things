---
title: "Scoping with vanilla JS ES modules"
date: 2020-12-02T10:30:00-05:00
draft: false
categories:
- Code
- JavaScript
---

Over the last few days, we've been [learning about ES modules](/series/es-modules/). One of the biggest benefits of ES modules is that they let you modularize your code, making large code bases a bit easier to work with.

But, they provide another big benefit, too: built-in scoping.

## What is scope?

_Scope_ is a word to describe the context in which a function or variable is accessible.

If you can access from any function, in any script, anywhere in your site or app, it's in the _global scope_. If it's only available inside a function (and it's child functions), it's in the _local_ or _lexical_ scope. [You learn more about how that works here.](/scope-in-javascript/)

Generally speaking, you want to [keep your code out of the global scope](/keeping-your-javascript-out-of-the-global-scope-and-why-you-want-to/).

And here's where ES modules are super awesome. They do that for you automatically.

## How to keep your code out of the global scope

With traditional scripts (as in, _not_ ES modules), scoping your code requires you to wrap it in a function.

That might mean a named function that you explicitly call, or [something called an _Immediately Invoked Function Expression_ (or IIFE)](/the-many-ways-to-write-an-immediately-invoked-function-expression-iife-in-javascript/).

```js
// answer is scoped to the run() function
var run = function () {
	var answer = 42;
	console.log(answer);
};

// name is scoped to the IIFE
(function () {
	var name = 'Radagast';
	console.log(name);
})();

// Because they're scoped to their functions, both of these will throw an error
// Uncaught ReferenceError: answer is not defined
// Uncaught ReferenceError: name is not defined
console.log(answer);
console.log(name);
```

## ES modules are scoped by default

With ES modules, you _don't_ need to wrap your code in a function.

Code isn't a script loaded with the `type="module"` attribute _or_ imported into another module is automatically scoped to only that module.

For example, let's say you have a file called `helpers.js`, that has a variable named `answer`. It also has a function called `getTheAnswer()` that returns the value of the `answer` variable.

You export `getTheAnswer()` as the `default`.

```js
var answer = 42;

var getTheAnswer = function () {
	return answer;
};

export default getTheAnswer;
```

In another file, `index.js`, you `import getTheAnswer` and `alert()` the result. You also define another variable, `name`.

```js
import getTheAnswer from './modules/helpers.js';

var name = 'Radagast';

alert('The answer is ' + getTheAnswer());
```

Inside `index.js`, you _cannot_ access the `answer` variable directly. It's scoped to the `helpers.js` module and is _not_ exported out.

You can get it's value from `getTheAnswer()`, but you cannot do anything with the variable itself. Inside the `index.js` file, the variable doesn't exist.

```js
// index.js

// This will throw an error:
// Uncaught ReferenceError: answer is not defined
console.log(answer);
```

Similarly, you cannot access the `name` variable inside `helpers.js`. It's scoped to `index.js`, and is not exported out.

[Here's a demo you can play with.](https://github.com/cferdinandi/es-module-scoping)