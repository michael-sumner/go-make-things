---
title: "let, hoisting, and the temporal dead zone with vanilla JS"
date: 2020-02-18T10:30:00-05:00
draft: false
categories:
- Code
- JavaScript
---

Yesterday, we looked at [how variables declared with `let` treat scope a bit differently than variables declared with `var`](/using-let-to-declare-variables/). Today, we're going to look at how they treat hoisting different.

If you don't know what *hoisting* is yet, start with [this article on variable hoisting in JavaScript](/variable-hoisting-in-javascript/).

## Traditional hoisting with `var`

When a JavaScript file first loads, the browser does any initial pass and stores any variable names it finds to memory. This is called *hoisting*.

When the browser goes to actually execute the file, it already knows what the variable names are, but does not know what their values are.

In the example below, `v` was *hoisted*. Trying to log its value before it's declared logs `undefined`, but doesn't throw an error. The browser knows it exists, but it gets a temporary value of `undefined` until the declaration happens.

```js
// The variable name is hoisted, but the value is undefined until it's declared
// logs undefined
console.log(v);

// The value gets defined
var v = 'declare with var';

// logs "declare with var"
console.log(v);
```

## Hoisting with `let`

Variables declared with `let` are still hoisted, but they don't automatically receive a value of `undefined` the way variables declared with `var` do.

The browser knows they exist, but has no value at all for them. Trying to log a variable declared with `let` before it's actually declared throws an error.

```js
// While the name was hoisted, it has no defined value and throws an error
// Uncaught ReferenceError: l is not defined
console.log(l);

// The value gets defined
let l = 'declare with let';

// logs "declare with var"
console.log(l);
```

This gap between when a variable declared with `let` is hoisted and when it actually gets declared is known as the *temporal dead zone*.

[Steve Griffith has a great video on this](https://www.youtube.com/watch?v=cHyydUnsaWI) if you want to learn more.

<iframe width="560" height="315" src="https://www.youtube.com/embed/cHyydUnsaWI" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

## This is actually a good thing

In [yesterday's article](/using-let-to-declare-variables/), I wrote that I like the more strict behavior that `let` introduces, and this is another example.

The `let` operator forces you to declare a variable before trying to use it, and I think that's a good thing.