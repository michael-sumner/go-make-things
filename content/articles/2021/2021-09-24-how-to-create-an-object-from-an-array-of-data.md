---
title: How to create an object from an array of data
date: 2021-09-24T10:30:00-04:00
draft: false
categories:
- Code
- JavaScript
---

A few months ago, [I saw someone one Twitter ask](https://twitter.com/Usama62792284/status/1417425337428987926?s=20):

> Can we create an object by looping on some data 🤔

Today, I wanted to write about how to do just that. Let's dig in!

## An example of some data

Let's imagine you got back an array of data from an API service called WizardSchool. It provided you with a list of wizards.

Each wizard in the array is itself an object that contains the wizard's name, and an array of spells that they know how to cast.

```js
let wizards = [
	{
		name: 'Merlin',
		spells: ['dancing teacups', 'talk to animals', 'summon owl', 'teleport']
	},
	{
		name: 'Gandalf',
		spells: ['light', 'you shall not pass', 'teleport']
	},
	{
		name: 'Radagast',
		spells: ['talk to animals', 'summon owl', 'heal']
	}
];
```

You want to create an object from this data, where each key is the name of a spell, and it's value is an array of wizards who can cast it.

```js
// The end result should look something like this...
let spells = {
	'dancing teacups': ['Merlin'],
	'talk to animals': ['Merlin','Radagast'],
	'summon owl': ['Merlin','Radagast'],
	'teleport': ['Merlin','Gandalf'],
	'light': ['Gandalf'],
	'you shall not pass': ['Gandalf'],
	'heal': ['Radagast']
};
```

Let's look at two ways to do that!

## Loop and push

The most straightforward way to do this is by looping over the array, either with [a `for...of` loop](/the-for...of-loop-in-vanilla-js/) or [the `Array.forEach()` method](https://vanillajstoolkit.com/reference/loops/array-foreach/).

```js
for (let wizard of wizards) {
	// Do stuff...
}
```

We'll create an empty object for our `spells`. 

Then, on each loop, we'll loop through each of the `spells` for the `wizard`. If `spells` object does not contain that `spell`, we'll create it, and assign an array with the `wizard.name`. Otherwise, we'll add the `wizard.name` to the array.

```js
// The spells data
let spells = {};

// Loop through each wizard
for (let wizard of wizards) {
	
	// Loop through each spell
	for (let spell of wizard.spells) {

		// If the spell doesn't exist, add it
		// Otherwise, add the wizard
		if (!spells[spell]) {
			spells[spell] = [wizard.name];
		} else {
			spells[spell].push(wizard.name);
		}

	}

}
```

Now, our `spells` object contains all of the spells, and the wizards who can cast them.

[Here's a demo.](https://codepen.io/cferdinandi/pen/wveYvRE)

## Array.reduce()

The `Array.reduce()` method takes the content of an array and returns a single value. That value can be anything: a string, number, object, or even another array.

The `Array.reduce()` method accepts two arguments: a `callback` method to run against each item in the array, and a `starting` value.

The `callback` also accepts two arguments: the `accumulator`, which is the current combined value, and the `current` item in the loop. Whatever you `return` is used as the `accumulator` for the next `item` in the loop. On the very first loop, that `starting` value is used instead.

Let's rewrite our simple loop above using `Array.reduce()`.

```js
let spells = wizards.reduce(function (obj, wizard) {

	// Loop through each spell
	for (let spell of wizard.spells) {

		// If the spell doesn't exist, add it
		// Otherwise, add the wizard
		if (!obj[spell]) {
			obj[spell] = [wizard.name];
		} else {
			obj[spell].push(wizard.name);
		}

	}

	return obj;

}, {});
```

This eliminates the need to create a separate `spells` object and _then_ loop. You can combine both steps into a single method.

[Here's another demo.](https://codepen.io/cferdinandi/pen/zYzmYev)

Personally, though, I find the _loop and push_ approach simpler and easier to read... [and I'm not alone](/revisiting-array.reduce/)! Jake and Surma from Google's [HTTP 203 podcast have shared similar thoughts in the past](https://gomakethings.com/is-array.reduce-bad/).

## Which approach should you use?

Ultimately, whichever one is easier for you to read and maintain.

For me, that's the _loop and push_ options, but it's good to have options if you want them.