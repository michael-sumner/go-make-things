---
title: The many ways to mutate arrays (with JavaScript)
date: 2022-01-12T10:30:00-05:00
draft: false
categories:
- Code
- JavaScript
---

This week, we've looked at various techniques for [looping over arrays](/whats-the-best-way-to-loop-over-arrays-and-elements-in-javascript/) and [objects](/whats-the-best-way-to-loop-over-an-object-with-javascript/).

In both articles I noted:

> in a real site or application, you might want to manipulate the data in some way.

Today, we're going to look at how to mutate and transform arrays. Let's dig in!

## An example array

For today’s article, lets use an array of `wizards` as an example. Each item in the array is an object with the wizard's `name` and signature `spell`.

```js
let wizards = [
	{
		name: 'Merlin',
		spell: 'Dancing teacups'
	},
	{
		name: 'Gandalf',
		spell: 'You shall not pass!'
	},
	{
		name: 'Radagast',
		spell: 'Talk to animals'
	}
];
```

We'll transform it in various ways to create a new array.

## The `Array.map()` method

You can use the `Array.map()` method to loop through each item in an array, transform it, and return a new array. Pass in a callback function that accepts three arguments: the current item in the loop, its index, and the array itself. All three are optional.

Whatever you `return` inside the callback function becomes the new value at that index in the new array.

In this example, we're creating a new array that contains just the wizard's names.

```javascript
// returns ["Merlin", "Gandalf", "Radagast"]
let names = wizards.map(function (wizard) {
	return wizard.name;
});
```

[Here's a demo of the `Array.map()` method.](https://codepen.io/pen/?editors=0011)

## The `Array.filter()` method

You can use the `Array.filter()` method to create a new array with only elements that pass a test you include as a callback function. The callback accepts three arguments: the current item in the loop's value, its index, and the array itself. All three are optional.

In this example, we're creating a new array that contains only wizards whose spell does not include an exclamation mark (`!`).

```javascript
// includes Merlin and Radagast, but not Gandalf
let quiet = wizards.filter(function (wizard) {
	return !wizard.spell.includes('!');
});
```

[Here's a demo of the `Array.filter()` method.](https://codepen.io/cferdinandi/pen/eYGQZZN?editors=0011)

## The `Array.reduce()` method

The `Array.reduce()` method takes the content of an array and returns a single value. That value can be anything: a string, number, object, or even another array.

The `Array.reduce()` method accepts two arguments: a callback method to run against each item in the array, and a starting value. Both are required.

The callback also accepts two arguments: the `accumulator`, which is the current combined value, and the `current` item in the loop. Whatever you return is used as the accumulator for the next item in the loop. On the very first loop, that starting value is used instead.

In this example, we're going to group our `wizards` into an object, organized by the number of characters in their `spell`. We'll pass in an empty object (`{}`) as the starting value.

```javascript
// returns {15: ["Merlin", "Radagast"], 19: ["Gandalf"]}
let spellLengths = wizards.reduce(function (obj, wizard) {

	// Get the spell length
	let length = wizard.spell.length;

	// if there's no property yet, create one
	if (!obj[length]) {
		obj[length] = [];
	}

	// Add the wizard to the object
	obj[length].push(wizard.name);

}, {});
```

[Here's a demo of the `Array.reduce()` method.](https://codepen.io/cferdinandi/pen/OJxaNRB?editors=0011)

_**A quick note about the `Array.reduce()` method:** using a more verbose method (or combination of methods) [typically results in more readable code](/revisiting-array.reduce/). I tend to avoid this one now._

## The `Array.reverse()` method

You can use the `Array.reverse()` method to reverse the order of items in an array.

```javascript
// Now Radagast is first and Merlin is last
wizards.reverse();
```

[Here's a demo of the `Array.reverse()` method.](https://codepen.io/cferdinandi/pen/xxXQVqq?editors=0011)

## The `Array.join()` method

You can use the `Array.join()` method to combine all items in an array into a string, separated by a delimiter that you can pass in as an argument. By default, it will use a comma (`,`) as the delimiter if one is not provided.

In this example, we're using the `Array.map()` method to create an array of wizard names, and then joining them together, separated by a dash (`-`).

```javascript
// returns "Merlin - Gandalf - Radagast"
let wizardList = wizards.map(function (wizard) {
	return wizard.name;
}).join(' - ');
```

[Here's a demo of the `Array.join()` method.](https://codepen.io/cferdinandi/pen/ExwOKmN?editors=0011)

## Using a loop

You can replicate any of the features of the dedicated methods above using [an array loop](/whats-the-best-way-to-loop-over-arrays-and-elements-in-javascript/).

For example, we can replicate the `Array.map()` method by first creating an empty array, and then looping through the `wizards` array and pushing items into the new one.

```js
let names = [];

for (let wizard of wizards) {
	names.push(wizard.name);
}
```

[Here's a demo of this technique.](https://codepen.io/cferdinandi/pen/abLQNwJ?editors=0011)

A lot of people who are learning JavaScript find this approach easier to read and understand because what you're doing is more explicit. Ultimately, it doesn't matter, so choose whatever approach you personally find most readable.