---
title: The ins-and-outs of object destructuring with vanilla JS
date: 2023-01-19T10:30:00-04:00
draft: false
categories:
- Code
- JavaScript
---

One of my favorite newer additions to JavaScript is the _destructing syntax_.

Destrucing in JavaScript provides a way to pull array values and object properties into individual variables. Today, we're going to look at how it works with objects, and tomorrow, we'll look at arrays.

Let's dig in!

## The syntax basics

Imagine you had an object with the best movies by movie studio, and you wanted to pull them out into individual variables.

You _could_ use dot notation for that.

```js
let movies = {
	disney: 'Moana',
	pixar: 'Up',
	dreamworks: 'How to Train Your Dragon',
	nickelodeon: 'Wonder Park'
};

let disney = movies.disney;
let pixar = movies.pixar;
let dreamworks = movies.dreamworks;
let nickelodeon = movies.nickelodeon;
```

But destructuring provides a simpler way to do to the same thing.

You define _an object of variables_, and the destructuring syntax will pull the properties at the matching keys out and assign them to the variables.

```js
let {disney, pixar, dreamworks, nickelodeon} = movies;

// logs "Up"
console.log(pixar);
```

## Renaming properties with destructuring

You can also rename a variable to something different than its key in the object. In your object variable, add a colon (`:`) and the new variable name you'd like to use.

For example, let's change `nickelodeon` to `nick`.

```js
let {disney, pixar, dreamworks, nickelodeon: nick} = movies;

// logs "Wonder Park"
console.log(nick);
```

## You don't need to destructure the entire object

You _do not_ need to assign every key in an object to a variable. For example, if you only wanted `pixar` and `dreamworks`, you would do this.

```js
let {pixar, dreamworks} = movies;

// logs "How to Train Your Dragon"
console.log(dreamworks);
```

Only destructured properties are assigned to variables.

```js
// Uncaught ReferenceError: disney is not defined
console.log(disney);
```