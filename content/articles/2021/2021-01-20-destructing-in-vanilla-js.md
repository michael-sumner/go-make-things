---
title: "Destructing in vanilla JS"
date: 2021-01-20T10:30:00-05:00
draft: false
categories:
- Code
- JavaScript
---

Yesterday, we looked at [the spread syntax](/the-spread-syntax-operator-in-vanilla-js/). Today, we're going to take a look at another cool modern JS feature: destructuring.

The destructuring syntax provides a way to pull array values and object properties into individual variables.

Let's dig in.

## Array Destructuring

Imagine you had an array of lunch items, and you wanted to pull them out into individual variables for the `entree`, `drink`, `side`, and `desert`.

You _could_ use bracket notation to get those items.

```js
let lunch = ['turkey sandwich', 'soda', 'chips', 'cookie'];

let entree = lunch[0];
let drink = lunch[1];
let side = lunch[2];
let desert = lunch[3];
```

Destructuring provides a simpler way to do to the same thing.

You define _an array of variables_, and the destructuring syntax will pull the values at the matching indexes out and assign them to the variables.

```js
let [entree, drink, side, desert] = lunch;

// logs "turkey sandwich"
console.log(entree);

// logs "chips"
console.log(side);
```

[Here's a demo.](https://codepen.io/cferdinandi/pen/KKgEzVP)

## Object Destructuring

Object destructuring does the same thing as array destructuring, but with object keys instead of array values.

For example, imagine you had an object with the best movies by movie studio, and you wanted to pull them out into individual variables.

You _could_ use dot or bracket notation for that.

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

Again, destructuring provides a simpler way to do to the same thing.

You define _an object of variables_, and the destructuring syntax will pull the properties at the matching keys out and assign them to the variables.

```js
let {disney, pixar, dreamworks, nickelodeon} = movies;

// logs "Up"
console.log(pixar);
```

You can also rename a variable to something different than its key in the object. In your object variable, add a colon (`:`) and the new variable name you'd like to use.

For example, let's change `nickelodeon` to `nick`.

```js
let {disney, pixar, dreamworks, nickelodeon: nick} = movies;

// logs "Wonder Park"
console.log(nick);
```

You _do not_ need to assign every key in an object to a variable. For example, if you only wanted `pixar` and `dreamworks`, you would do this.

```js
let {pixar, dreamworks} = movies;

// logs "How to Train Your Dragon"
console.log(dreamworks);

// Uncaught ReferenceError: disney is not defined
console.log(disney);
```

[Here's another demo for you.](https://codepen.io/cferdinandi/pen/zYKbqqo)

## Browser Compatibility

Destructuring works in all modern browsers, but not IE. It cannot be polyfilled.

However, with [Microsoft dropping support for IE in their own web apps this summer](https://techcommunity.microsoft.com/t5/microsoft-365-blog/microsoft-365-apps-say-farewell-to-internet-explorer-11-and/ba-p/1591666), I'm ready to do that same.