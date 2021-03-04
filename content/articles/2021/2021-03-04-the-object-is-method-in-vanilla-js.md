---
title: "The Object.is() method in vanilla JS"
date: 2021-03-04T10:30:00-05:00
draft: false
categories:
- Accessibility
- Art and Science
- Business and Leadership
- Careers
- Code
- CSS
- Design and UX
- HTML
- JavaScript
- Technology
- Web Performance
- WordPress
- Vanilla Framework Demos
---

Today, we're going to look at the `Object.is()` method: what it does, how it works, and when you might want to use it. Let's dig in.

## What the `Object.is()` method does

The `Object.is()` method checks if two values are the same, and returns a boolean: `true` if they're the same, and `false` if they're not.

You pass the two values in as arguments.

```js
// returns true
Object.is(42, 42);

// returns false
Object.is('orange', 'blue');
```

## How the `Object.is()` method works

It works _mostly_ like [the _strict equals_ operator](/equals-operators-in-vanilla-js/), but with a few small differences we'll get into in just a bit.

Just like with strict equals, it does not check if two arrays or objects have the same value. It checks if they're the same object.

```js
let wizards = ['Gandalf', 'Radagast', 'Merlin'];
let otherWizards = wizards;

// Since otherWizards is just a reference to wizards
// returns true
Object.is(wizards, otherWizards);

// Because we've created an immutable copy
// returns false
Object.is(wizards, [...wizards]);
```

For strings and numbers, which are always immutable, it checks the value.

```js
let num1 = 42;
let num2 = 42;

// returns true
Object.is(num1, num2);
```

One notable way that it differs from strict equals is in how it handles `NaN` and _signed zeroes_ (a `0` with a `+` or `-` symbol).

```js
// returns false
let n = NaN === NaN;

// returns true
Object.is(NaN, NaN);

// returns true
let z = 0 === -0;

// returns false
Object.is(0, -0);
```

Yea, JavaScript is weird!

## When should you use this?

I see myself continuing to use strict equals for the foreseeable future, simply because it's fewer characters and muscle memory for me to type.

When doing a comparison where `NaN` or a signed zero might be one of the values and you want to the behavior described above, however, `Object.is()` might be a better choice. That feels _very_ situational to me, though.