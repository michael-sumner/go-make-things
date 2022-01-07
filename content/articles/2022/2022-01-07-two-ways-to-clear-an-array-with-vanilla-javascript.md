---
title: Two ways to clear an array with vanilla JavaScript
date: 2022-01-07T10:30:00-05:00
draft: false
categories:
- Code
- JavaScript
---

Today, we're going to look at two different ways to empty an array with JavaScript. Let's dig in!

## Reassigning the variable

Let's say you have an array of wizards, like this.

```js
let wizards = ['Gandalf', 'Radagast', 'Merlin'];
```

You want to completely wipe it out. The most common way to do this is to reassign the value of the `wizards` variable to an empty array (`[]`).

```js
wizards = [];
```

[Here's a demo.](https://codepen.io/cferdinandi/pen/NWaBMqE?editors=0011)

## Setting the `length` to `0`

Another way to clear an array is to set the array's `length` property to `0`.

```js
wizards.length = 0;
```

[Here's another demo.](https://codepen.io/cferdinandi/pen/PoJBeNa?editors=0011)

(_[Thanks to Kitty Giraudel for this tip.](https://twitter.com/KittyGiraudel/status/1479393765844520960?s=20)_)

## Why would you set the `length` instead of reassigning the variable?

In most situations, reassigning the variable to an empty array is the better choice. It's shorter and more explicit than adjusting the `length` property.

But sometimes, you have an array that's _assigned by reference_, and you want to keep them linked.

Here, I have my array of `wizards`. I also have an `alsoWizards` variable, and I set its value to the `wizards` array. The `alsoWizards` array is _not_ a copy of `wizards`. It references the original array.

```js
let wizards = ['Gandalf', 'Radagast', 'Merlin'];
let alsoWizards = wizards;
```

If I reassign the value of `wizards`, the `alsoWizards` variable still points to the original array that was assigned to it.

```js
// Clear the array
wizards = [];

// logs []
console.log(wizards);

// logs ["Gandalf", "Radagast", "Merlin"]
console.log(alsoWizards);
```

[You can see it in action here.](https://codepen.io/cferdinandi/pen/QWqBryY?editors=0011)

If I instead set the `length` of `wizards` to `0`, the `alsoWizards` variable is also an empty array, because the array that `wizards` points to has not changed.

```js
// Clear the array
wizards.length = 0;

// logs []
console.log(wizards);

// logs []
console.log(alsoWizards);
```

[Here's one last demo.](https://codepen.io/cferdinandi/pen/RwLBypQ?editors=0011)