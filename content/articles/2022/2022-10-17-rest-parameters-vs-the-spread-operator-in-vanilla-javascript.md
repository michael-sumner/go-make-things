---
title: Rest parameters vs. the spread operator in vanilla JavaScript
date: 2022-10-17T10:30:00-04:00
draft: false
categories:
- Code
- JavaScript
---

One of the more confusing aspects of modern JavaScript development is that both _rest parameters_ and the _spread operator_ use three dots as their operator (`...`).

Today, we're going to look at what they both do, how they're different, and how to tell them apart.

Let's dig in!

## The Spread Operator

The spread syntax operator takes an array or object (or other iterable) and expands its items into their own individual values.

```js
let sandwiches = ['tuna', 'turkey', 'pb&j'];

// logs ["tuna", "turkey", "pb&j"]
console.log(sandwiches);

// logs tuna turkey pb&j
console.log(...sandwiches);
```

The spread operator can only be used inside of functions, arrays and objects. You cannot use it on its own.

This, for example, would throw an error.

```js
// Uncaught SyntaxError: Unexpected token '...'
...sandwiches;
```

[Here's a demo of the spread operator.](https://codepen.io/cferdinandi/pen/gOzyepg?editors=0011)

## Rest Parameters

A _rest parameter_ is a function parameter that gets assigned an array with any arguments that are passed in at or after it when a function is called. You define a rest parameter by prefixing it with three dots (`...`).

In the example below, `...moreArgs` is a rest parameter.

```js
function logStuff (arg1, arg2, ...moreArgs) {

	// Logs arg1
	console.log(arg1);

	// Logs arg2
	console.log(arg2);

	// Logs an array of any other arguments you pass in after arg2
	console.log(moreArgs);

}
```

If you passed in more than two arguments, everything from the third argument and beyond is assigned to `moreArgs` as an array.

```js
// In this example...
// arg1 = 'chicken'
// arg2 = 'tuna'
// moreArgs = ['chips', 'cookie', 'soda', 'delicious']
logStuff('chicken', 'tuna', 'chips', 'cookie', 'soda', 'delicious');
```

[Here's a demo of rest parameters.](https://codepen.io/cferdinandi/pen/mdLgxPO?editors=0011)

## You can use them together

Where things get really confusing is that you can use _rest parameters_ and the _spread operator_ together.

In the `castSpells()` function, we've declared a _rest parameter_, `moreSpells`.

```js
function castSpells (mainSpell, ...moreSpells) {
	console.log(mainSpell);
	console.log(moreSpells);
}
```

Let's imagine that you have an array of spells, like this.

```js
let spells = ['Dancing teacups', 'You shall not pass', 'Talk to animals', 'Disappear', 'Fly'];
```

You _could_ manually pass all of those spells into the `castSpells()` function, like this...

```js
castSpells(spells[0], spells[1], spell[2], spell[3], spell[4]);
```

_Or_, you could use the _spread operator_ to pass them all in as a comma-separated list.

```js
castSpells(...spells);
```

[Here's a demo of spread and rest parameters together.](https://codepen.io/cferdinandi/pen/rNvbdyb?editors=0011)

This can be a bit confusing, because you have a function and a parameter prefixed with three dots. Then, you're calling the function with an argument prefixed with three dots.

## How do you tell them apart?

There's a simple trick for telling _rest parameters_ and the _spread operator_ apart.

If you're _declaring_ a function (either using [a traditional `function` keyword](/function-expressions-vs.-function-declarations-revisisted/) or [an arrow function](/arrow-functions-in-vanilla-js/)), it's a _rest parameter_.

```js
// This is a rest parameter, because you're declaring a function
function castSpells (mainSpell, ...moreSpells) {
	// ...
}
```

In any other context, it's a _spread operator_.

```js
// This is a spread operator, because we're running a function that's already declared
castSpells(...spells);
```