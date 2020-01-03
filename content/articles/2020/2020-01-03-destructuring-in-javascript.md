---
title: "Destructuring in JavaScript"
date: 2020-01-03T10:30:00-05:00
draft: false
categories:
- Code
- JavaScript
---

*Destructuring* is an ES6 addition to JavaScript that lets you more easily assign individual items in arrays and objects to variables.

Today, let's look at how it works.

## Destructuring arrays with vanilla JS

Imagine you have an array of wizards.

```js
var arr = ['Hermione', 'Ron', 'Harry', 'Dumbledore'];
```

You want to assign a few of them to variables. Traditionally, you might do something like this.

```js
var arr = ['Hermione', 'Ron', 'Harry', 'Dumbledore'];

// Get the first item
var best = arr[0];

// Get the second item
var worst = arr[1];

// Cut the first two items out of the array
var others = arr.slice(2);
```

Destructuring provides a simpler way to do the same thing.

With destructuring, you create a variable declaration (`var`, `let`, or `const`). Instead of defining a variable name, you create an *array of variable names*.

Each variable name's index corresponds to the index of the item in the array you want it to map to. You can use the *rest operator* (a variable name prefixed with three dots) as a catchall for any remaining items (it will create a new array with just those items).

```js
var arr = ['Hermione', 'Ron', 'Harry', 'Dumbledore'];

// Destructuring the array
var [best, worst, ...others] = arr;
```

In this example, `best` is `Hermione`, `worst` is `Ron` (obviously), and `others` is `['Harry', 'Dumbledore']`.

[Here's a demo you can play with.](https://codepen.io/cferdinandi/pen/GRgOOVm)

## Destructuring objects with vanilla JS

Destructuring objects works more-or-less the same way. For example, here's an object with a few details about Hermione.

```js
var obj = {
	name: 'Hermione',
	house: 'Gryffindor',
	points: 9640
};
```

Let's say you wanted to pull `obj.name` and `obj.house` out as their own variables.

You would create a variable declaration, and use an object where the variable name would otherwise be. For each item you want to pull out, include it's key. You can use the rest operator to create an object of all the "left over" keys.

```js
var obj = {
	name: 'Hermione',
	house: 'Gryffindor',
	points: 9640
};

// Destructuring an object
var {name, house, ...otherDetails} = obj;
```

Here, `name` would be `Hermione`, `house` would be `Gryffindor`, and `otherDetails` would be `{points: 9640}`.

[Here's another demo you can play with.](https://codepen.io/cferdinandi/pen/mdyqpdW)

## Browser compatibility

The basic destructuring syntax works in all modern browsers, including mobile browsers, but has no IE support.

The rest operator does *not* work in Edge or Safari (though Edge will support it when the Beta with Chromium goes general release later this month).

Destructuring *cannot* be polyfilled.

## Should you use JavaScript destructuring

I personally find the traditional way of declaring variables for clear and obvious. I think it's more readable, and as I've written about before, I think [readability is more important than brevity](/readability-is-more-important-than-brevity/).

I also generally prefer to point directly to an item in an array or object over declaring a new variable for it.

But that's just my opinion, so feel free to do whatever works better for you. Just remember to transpile your code with Babel is you use this approach.