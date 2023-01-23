---
title: The ins-and-outs of array destructuring with vanilla JS
date: 2023-01-23T10:30:00-04:00
draft: false
categories:
- Code
- JavaScript
---

Last week, we learned [how to destructure objects](/the-ins-and-outs-of-object-destructuring-with-vanilla-js/), and [how to combine destructuring with the spread operator](/getting-a-subset-of-properties-from-an-object-with-destructuring-and-the-spread-operator/).

Today, we're going to learn how to destructure arrays. Let's dig in!

Imagine you had an array of lunch items, and you wanted to pull them out into individual variables for the `entree`, `drink`, `side`, and `desert`.

You _could_ use bracket notation to get those items.

```js
let lunch = ['turkey sandwich', 'soda', 'chips', 'cookie'];

let entree = lunch[0];
let drink = lunch[1];
let side = lunch[2];
let desert = lunch[3];
```

Destructuring provides a simpler way to do to the same thing.

You define _an array of variables_, and the destructuring syntax will pull the values at the matching indexes out and assign them to the variables.

```js
let [entree, drink, side, desert] = lunch;

// logs "turkey sandwich"
console.log(entree);

// logs "chips"
console.log(side);
```

[Here's a demo for you to play with.](https://codepen.io/cferdinandi/pen/rNrJwEa?editors=0011)