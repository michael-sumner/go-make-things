---
title: Chaining array methods with vanilla JavaScript
date: 2023-01-18T10:30:00-04:00
draft: false
categories:
- Code
- JavaScript
---

Over the last few days, we've looked at various ways to manipulate arrays. If you missed any of them, learn how to [loop](/how-should-you-loop-over-arrays-and-nodelists-with-javascript/), [modify](/two-ways-to-modify-arrays-with-vanilla-javascript/), [filter](/two-ways-to-filter-arrays-with-vanilla-javascript/), [chop](/four-ways-to-chop-up-arrays-with-vanilla-javascript/), and [sort](/how-to-sort-arrays-with-vanilla-javascript/).

Today, we're going to look at how to chain multiple functions together. Let's dig in!

## An example array

For today's article, we'll use an array of objects. Each object in the array is a wizard, and some details about them.

```js
let wizards = [
	{
		name: 'Radagast',
		spells: ['Talk to animals', 'Make plants grow'],
		tool: 'staff'
	},
	{
		name: 'Merlin',
		spells: ['Dancing teacups', 'Turn into fish'],
		tool: 'wand'
	},
	{
		name: 'Gandalf',
		spells: ['You shall not pass', 'Disappear'],
		tool: 'staff'
	}
];
```

Let's imagine that we want to get an array that contains just the names of wizards who use a staff, sorted alphabetically.

## Chaining array methods

You can chain any array method that returns a new array. For what we're trying to do, we might use the `Array.prototype.filter()` method to get an array of just wizards who use a staff, then `Array.prototype.map()` to create an array of just names, then `Array.prototype.sort()` to sort them alphabetically.

Because each method returns an array, we can chain them in sequence.

```js
// returns ["Gandalf", "Radagast"]
let wizardsWithStaffs = wizards.filter(function (wizard) {
	return wizard.tool === 'staff';
}).map(function (wizard) {
	return wizard.name;
}).sort();
```

[Here's a demo.](https://codepen.io/cferdinandi/pen/OJwxarG?editors=0011)

## Looping

Alternatively, you can create your array of names using a `for...of` loop and the `Array.prototype.push()` method, then sort it.

```js
let wizardsWithStaffs = [];

for (let wizard of wizards) {
	if (wizard.tool !=='staff') continue;
	wizardsWithStaffs.push(wizard.name);
}

wizardsWithStaffs.sort();
```

[Here's another demo.](https://codepen.io/cferdinandi/pen/BaPwGMe?editors=0011)

## Which one should you use?

In my opinion, chaining is the clear winner here. It's about the same number of lines, but I think the resulting code is a lot more readable.

As always, though, if looping and pushing feels more natural to you, by all means use it!