---
title: How to make a deep copy of an array or object with vanilla JavaScript
date: 2022-04-08T10:30:00-04:00
draft: false
categories:
- Code
- JavaScript
---

Vanilla JS provides a handful of approaches for creating unique copies of arrays and objects. 

But one ongoing challenge with all of them is that if an array or object is _multidimensional_&mdash;if it has an array or object nested inside it as an item or property&mdash;_that_ item is _not_ copied, but treated as a reference to the original.

Today, we're going to look at how to create deep, immutable copies of arrays and objects. Let's dig in!

## Some examples

Let's imagine that you have an array and an object. Each one contains a nested array or object inside it.

```js
// A multidimensional array
let wizards = [{
	name: 'Radagast',
	color: 'brown'
}, {
	name: 'Gandalf',
	color: 'gray'
}];

// A multidimensional object
let movies = {
	studio: 'Pixar',
	films: ['Soul', 'Onward', 'Up', 'WALL-E'],
	directors: ['Brad Bird', 'Pete Docter', 'Andrew Stanton'],
	details: {
		founded: '1986',
		founders: ['Edwin Catmull', 'Alvy Ray Smith']
	}
};
```

You want to create a copy of each one so that you can make some modifications without affecting the original. [This is called _immutability_.](/immutability-with-multidimensional-arrays-and-objects-in-vanilla-js/)

## Traditional methods for creating copies of arrays and objects

For the `wizards` array, you could use [the `Array.from()` method](https://vanillajstoolkit.com/reference/arrays/array-from/), [the `Array.slice()` method](https://vanillajstoolkit.com/reference/arrays/array-slice/), or [the spread operator](a-few-neat-things-you-can-do-with-the-vanilla-js-spread-syntax-operator/#combine-or-copy-an-array-or-object) with [array destructuring](/destructuring-in-javascript/).

```js
// These all create copies of the wizards array
let wizardsCopy1 = Array.from(wizards);
let wizardsCopy2 = wizards.slice();
let wizardsCopy3 = [...wizards];
```

For the `movies` object, you could use [the `Object.assign()` method](https://vanillajstoolkit.com/reference/objects/object-assign/) or spread syntax with object destructuring.

```js
let moviesCopy1 = Object.assign({}, movies);
let moviesCopy2 = {...movies};
```

Unfortunately, all of these create _shallow_ copies, not deep ones.

## Shallow cloning in JavaScript

With a shallow copy, the original array or object is a unique copy, but any arrays or objects contained within it are actually just references to the original.

You could, for example, add or delete properties from `wizardsCopy1`, and the original `wizards` array would remain unaffected.

```js
wizardsCopy1.push({
	name: 'Ursula',
	color: 'purple'
});

// No Ursula in the original
console.log(wizards);
```

However, if you update the properties of a nested object _inside_ the `wizardsCopy1` array, that _will_ affect the original.

```js
wizardsCopy1[0].name = 'Merlin';

// Now the first wizard is named "Merlin"
console.log(wizards);
```

[Here's a demo.](https://codepen.io/cferdinandi/pen/YzYLxdv?editors=1011)

## How to create a deep clone with JavaScript

So how do you stop this from happening?

Creating a _deep copy_ of an array or object used to require you to loop through each item, check if its an array or object, and then either push it to a new array or object or loop through its properties and repeat the process. [It was complex.](/a-better-way-to-create-an-immutable-copy-of-an-array-or-object-with-vanilla-js/)

Now, there's a simple native method you can use instead: `structuredClone()`. Pass the array or object you want to clone in as an argument, and it returns a deep copy.

```js
// Create a deep copy
let wizardsCopy = structuredClone(wizards);

// Update the main array
wizardsCopy.push({
	name: 'Ursula',
	color: 'purple'
});

// Update a nested object
wizardsCopy[0].name = 'Merlin';

// The original array remains unchanged
console.log(wizards);
```

[Here's another demo.](https://codepen.io/cferdinandi/pen/jOYxLjP?editors=1011)

This is such an amazing improvement over older methods! While the `structuredClone()` method works in all modern browser, it is a newer edition, and only received support in Chrome and Firefox about two major versions ago, and Safari in the latest minor version.

In other words, while it's universally supported, you're likely to run into errors running it "in the wild" as user browser updates tend to happen in a staggered pattern.

[There is a polyfill you can use](https://github.com/ungap/structured-clone), but it has no CDN hosted or copy/paste version. It requires an import and build step.

I'll likely give this one a few more months before actually using it in my projects.