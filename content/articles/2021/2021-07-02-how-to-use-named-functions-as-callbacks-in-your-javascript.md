---
title: "How to use named functions as callbacks in your JavaScript"
date: 2021-07-02T10:30:00-04:00
draft: false
categories:
- Code
- JavaScript
---

Earlier this week, we looked at [automatically provided arguments in JavaScript callback functions](/automatically-provided-arguments-in-javascript-callback-functions/).

Today, we're going to look at how to use named functions as callback methods, and a common "gotcha" that messes up a lot of my students.

Let's dig in.

## An example: modifying some wizards

Let's imagine that you have an array of wizards.

```js
let wizards = ['Gandalf', 'Radagast', 'Merlin'];
```

You want to loop through each one and add "casts spell number {n}" to it, where `{n}` is the wizard's order in the array. Indexes in an array start with `0`, so we'll also want to add `1` to it.

One simple way to do this is with [the `Array.map()` method](/what-array.map-does-in-vanilla-js/).

```js
let doingMagic = wizards.map(function (wizard, index) {
	return `${wizard} casts spell number ${index + 1}.`;
});
```

Cool. Now let's look at how we can use a named function with this.

## Using named functions as callbacks in JavaScript

You can pull any callback function out into its own named function and pass it in as a reference instead of passing an anonymous function in.

This can help add some structure and organization to your code. It also makes it easy to reuse that code elsewhere if needed, without having to repeat yourself.

Let's look at our `wizards` array again.

```js
/**
 * Create the "cast a spell" string
 * @param  {String}  wizard The wizard's name
 * @param  {Integer} index  The wizard's index in the array
 * @return {String}         The spell string
 */
function castSpell (wizard, index) {
	return `${wizard} casts spell number ${index + 1}.`;
}

// An array of wizards
let wizards = ['Gandalf', 'Radagast', 'Merlin'];

// Modify the array
let doingMagic = wizards.map(castSpell);
```

[Here's a demo.](https://codepen.io/cferdinandi/pen/KKmpJxm?editors=1112)

## A common mistake people make with named callback functions in JavaScript

One thing that really trips a lot of folks up when using named callback functions are the parentheses (`()`).

I often see students do something like this:

```js
let doingMagic = wizards.map(castSpell(wizard, index));
```

When you leave the parentheses off of a named function, you're providing a _reference_ to that function. When you include the parentheses, you're _running_ it.

So, in the example above, `castSpell()` immediately runs _before_ any looping through the wizards happens.

To use named callback functions, pass them in _without_ the parentheses. If you do this:

```js
let doingMagic = wizards.map(castSpell);
```

The browser treats it like this under-the-hood:

```js
let doingMagic = wizards.map(function (wizard, index) {
	return `${wizard} casts spell number ${index + 1}.`;
});
```

And as we learned earlier this week, the arguments are automatically passed in when the callback function is run.