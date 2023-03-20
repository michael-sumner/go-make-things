---
title: When should you use arrow functions in vanilla JS?
date: 2023-03-20T10:30:00-04:00
draft: false
categories:
- Code
- JavaScript
---

Last week, I wrote about [three different ways to write functions with JavaScript](/three-different-ways-to-create-a-function-in-javascript/).

I got back a _lot_ of questions about when you should choose one approach versus the other. Today, we're going to talk about that!

Let's dig in!

## A quick caveat

This is like... just my opinion.

If you happen to find a different approach makes more sense for you and your project, by all means use it!

What I'm doing in this article is making a suggestion that balances readability, maintainability, and pragmatism.

## When to choose which way of writing functions

Here's a short and quick decision-making guide...

- Default to _function declarations_.
- Use _arrow functions_ for anonymous callbacks if you prefer code that's a bit more brief/short, _or_ when you're running into issues with the `this` keyword.
- Never use _function expressions_.

To me, _function declarations_ are the easiest and clearest way to write a function. They sacrifice brevity for clarity.

The `function` declaration right up front makes it immediately clear what it is. And because there aren't a variety of ways to handles things like returns, you don't need as much brain energy to parse out what it's doing.

```js
function add (num1, num2) {
	return num1 + num2;
}

// This isn't any more brief
let add = (num1, num2) => {
	return num1 + num2;
};

// And this takes more mental energy to understand
let add = (num1, num2) => num1 + num2;
```

For anonymous callback functions, like the kind you might use in [the various `Array` methods](https://vanillajsguides.com/arrays-and-objects/), arrow functions _can be_ shorter and faster to write.

```js
let wizards = [
	{
		name: 'Merlin',
		tool: 'wand'
	},
	{
		name: 'Gandalf',
		tool: 'staff'
	}
];

// This is a bit easier to write
let wizardNames = wizards.map((wizard) => {
	return wizard.name;
});

// This is slightly more verbose
let wizardNames = wizards.map(function (wizard) {
	return wizard.name;
});
```

Arrow functions also don't have their own bindings to the `this` keyword, which can be useful in certain (in my opinion, narrow) situations.

In this example, `this` in the `calculator.add()` function declaration points to `calculator` object, while in the `calculator.subtract()` arrow function, it points to the `window`.

Depending on your intended use, that may or may not be desirable.

```js
let calculator = {
	add: function (num1, num2) {
		console.log(this);
		return num1 + num2;
	},
	subtract: (num1, num2) => {
		console.log(this);
		return num1 - num2;
	}
};
```