---
categories:
- Code
- JavaScript
date: '2017-12-08'
permalink: /adding-items-to-an-object-with-vanilla-javascript/
title: Adding items to an object with vanilla JavaScript
url: /2017/12/08/adding-items-to-an-object-with-vanilla-javascript
---

Yesterday we looked at [how to add items an array with vanilla JavaScript](/adding-items-to-an-array-with-vanilla-javascript/). Today, you'll learn how to add items to an object.

There are two ways to add items to an object:

1. Dot notation (`obj.something`)
2. Bracket notation (`obj['something']`)

Dot notation is the generally preferred way, but if you're using a key set by a variable, or your key has spaces, you need to use bracket notation.

```lang-javascript
var lunch = {
    sandwich: 'turkey',
    chips: 'cape cod',
    drink: 'soda'
};

// Add items to the object
lunch.alcohol = false;
lunch["dessert"] = 'cookies';

// returns {sandwich: "turkey", chips: "cape cod", drink: "soda", alcohol: false, dessert: "cookies"}
console.log(lunch);
```