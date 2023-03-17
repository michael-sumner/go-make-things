---
title: let, const, and var in vanilla JavaScript
date: 2023-03-16T10:30:00-04:00
draft: false
categories:
- Code
- JavaScript
---

Historically, you created a new variable using the `var` keyword. Modern JS includes two new ways to define variables: `let` and `const`.

Today, we're going to talk about the differences between them and how to pick which one to use. Let's dig in!

## Updating variables

Prefixing a variable with a _variable declaration_ (`var`, `let`, or `const`) defines a new variable. Omitting a _variable declaration_ updates an existing variable.

There's a caveat to this: if a variable isn't currently defined, omitting a _variable declaration_ creates a new variable (you should always use a declaration to define a new variable, though).

```js
// Create a new variable
let wizard = 'Gandalf';

// Update the wizard variable
wizard = 'Radagast';
```

## let

`let` does *almost* the same exact thing as `var`.

The big difference between `let` and `var` is that you can't redeclare a variable set with `let` in the same scope.

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

You can still change the value of `chips`. You just can't declare it as a new variable once it's already been defined *within the current scope* (more on scope in a few chapters).

```js
// The value of `chips` is "Cape Cod"
let chips = 'Cape Cod';

// The value of `chips` is now "Lays"
chips = 'Lays';

// logs "Lays"
console.log(chips);
```

## const

Unlike `var` and `let`, if you define a variable with `const`, it cannot be given a new value. It is, as the term implies, constant.

```js
// The value of sandwich is "tuna"
const sandwich = 'tuna';

// Throws an error: "Uncaught TypeError: Assignment to constant variable."
sandwich = 'chicken';
```

It's a bit misleading, though, because if you have an object or array defined with `const`, you can't redefine it, but you can add and remove items from the object or array.

```js
const sandwiches = ['tuna', 'chicken'];

// Strangely, this is allowed
sandwiches.push('pb&j');
```

## Which variable declaration should you use?

Generally speaking, use `let` for values that will change and `const` for ones that won't or shouldn't. Avoid `var`, since `let` does the same thing but a little bit better.

I personally hate thinking about whether to use `let` or `const`, and have a tendency to just use `let` for everything.