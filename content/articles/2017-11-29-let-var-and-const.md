---
categories:
- Code
- JavaScript
date: '2017-11-29'
url: /let-var-and-const/
title: let, var, and const
---

ES6 introduced two new ways to define variables: `let` and `const`.

They've been the source of a fair bit of confusion, particularly around when to use which. Let's clear that up.

## `let`

`let` does the *almost* the same exact thing as `var`.

The big difference between `let` and `var` is that you can't redefine a variable set with `let` in the same scope.

```js
// The value of `sandwich` is "tuna"
var sandwich = 'tuna';

// The value of `sandwich` is now "chicken"
var sandwich = 'chicken';

// The value of `chips` is "Cape Cod"
let chips = 'Cape Cod';

// Throws an error: "Uncaught SyntaxError: Identifier 'chips' has already been declared"
let chips = 'Lays';
```

You can still change the value of `chips`. You just can't define it as a new variable once it's already been defined *within the current scope*.

You *can* use `let` to define a new variable with the same name in a different scope, though.

```js
// The value of `chips` is "Cape Cod"
let chips = 'Cape Cod';

// The value of `chips` is now "Lays"
chips = 'Lays';

var getChips = function () {

    // This works because it's a different scope
    let chips = 'Wise';

    // Returns "Wise"
    return chips;

};

// Logs "Lays" in the console
console.log(chips);
```

## `const`

Unlike `var` and `let`, if you define a variable with `const`, it cannot be given a new value. It is, as the term implies, constant.

```js
// The value of sandwich is "tuna"
const sandwich = 'tuna';

// Throws an error: "Uncaught TypeError: Assignment to constant variable."
sandwich = 'chicken';
```

## Browser Compatibility

`let` and `const` work in all modern browsers, and IE11 and up. They cannot be polyfilled.

To push support back further, you would need to use a compiler like <a href="https://babeljs.io">Babel</a>. Babel does actually have an "in the browser" version you can load with a script tag, *but...* it requires you to inline your entire script, so it's not really a good solution for production sites.