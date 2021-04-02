---
title: "The optional chaining operator in vanilla JS"
date: 2021-04-02T10:30:00-04:00
draft: false
categories:
- Code
- JavaScript
---

Today, we're going to look at the optional chaining operator (`?.`), and how you can use it to prevent errors when accessing nested objected properties.

Let's dig in.

## The challenge with nested or multidimensional objects

If you attempt to get the property of an object that does not exist in a multidimensional object, the browser will throw an error.

For example, imagine you had a `wizard` object, with a collection of `spells`. Each one has a list of required `materials`, and the `phrase` you say to cast it.

```js
let wizard = {
	name: 'Merlin',
	spells: {
		levitate: {
			materials: ['moss', 'a pinch of salt'],
			phrase: 'Levioso!'
		},
		summon: {
			materials: ['diamond dust', 'a drop of water'],
			phrase: 'Abracadabra!'
		}
	}
};
```

To get the `phrase` for the `summon` spell, you would do this.

```js
// returns "Abracadabra!"
let summon = wizard.spells.summon.phrase;
```

But, if you try to get the `phrase` property for a spell that doesn't exit, the browser will throw an error.

```js
// throws an error
// Uncaught TypeError: Cannot read property 'phrase' of undefined
let teacups = wizard.spells.teacup.phrase;
```

## The optional chaining operator

Optional chaining is a browser-native way to chain methods or properties, and conditionally continue down the chain only if the value is not `null` or `undefined`.

To use optional chaining, add a question mark (`?`) before the dot (`.`) in your chain.

```js
// returns "Abracadabra!"
let summonOptional = wizard?.spells?.summon?.phrase;

// returns undefined but does not throw an error
let teacupsOptional = wizard?.spells?.teacup?.phrase;
```

Instead of throwing an error, you'll get back `undefined`.

[Here's a demo.](https://codepen.io/cferdinandi/pen/XWpMOWx)