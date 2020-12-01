---
title: "How to define a default export with vanilla JS ES modules"
date: 2020-12-01T10:30:00-05:00
draft: false
categories:
- Code
- JavaScript
---

Yesterday, we learned how to use `import` and `export` with ES modules. Today, we're going to learn about another `export` pattern: default exports.

Let's dig in.

## A quick recap

In our simple helper library yesterday, we exported an object of helper functions, like this.

```js
export {add, subtract};
```

Alternatively, we could also add the `export` operator before each function, like this.

```js
export var add = function (num1, num2) {
	return num1 + num2;
};
```

When we go to use any of those methods, we import them as keys in an object, like this.

```js
import {add, subtract} from './modules/helpers.js';
```

This makes sense in a script with several exported functions, but what about when there's only one?

## The `default` export

Let's imagine that instead of several helper functions, we had a script with just one: `getTheAnswer()`, that returns `42`.

```js
var getTheAnswer = function () {
	return 42;
};
```

We _could_ `export` it the way we always have, like this.

```js
export {getTheAnswer};
```

But, we can also export it as a default export, like this.

```js
export default getTheAnswer;
```

With this approach, we can skip the object when importing it into our script.

```js
import getTheAnswer from './modules/helpers.js';

// Get the answer
var answer = getTheAnswer();

// Tell them the total
alert('The answer is ' + answer);
```

## Exporting multiple functions with a `default`

What if you have a script with multiple functions, but you want one of them to be the default, with the rest as optional exports?

```js
var getTheAnswer = function () {
	return 42;
};

var add = function (num1, num2) {
	return num1 + num2;
};

var subtract = function (num1, num2) {
	return num1 - num2;
};
```

In this case, you would export an object, but add `as default` to the default export.

```js
export {getTheAnswer as default, add, subtract};
```

When you go to import, you can import _just_ the default, like this.

```js
import getTheAnswer from './modules/helpers.js';
```

_Or_, you can import just the others, like this.

```js
import {add, subtract} from './modules/helpers.js';
```

_Or_, you can import both, like this.

```js
import getTheAnswer, {add, subtract} from './modules/helpers-alt.js';
```

## Some demos

[You can download demos from what we talked about today on GitHub.](https://github.com/cferdinandi/es-modules-default)

Don't forget that you'll need to run a server for these to work, either [in command line](https://gist.github.com/willurd/5720255) or [using a GUI tool like MAMP](https://www.mamp.info/en/windows/).

In a future lesson, we'll be looking at how to add a build step.