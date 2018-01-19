---
categories:
- Code
- JavaScript
date: '2017-08-03'
title: Setting the variables in ES6 forEach() functions
---

Over the last few days, we looked at the new, easier ways ES6 let's us loop through [arrays](/looping-through-arrays-the-es6-way/), [nodelists](/looping-through-nodelists-with-es6/), and [objects](/looping-through-objects-with-es6/).

One of my readers asked (shared with permission):

> The forEach function / method looks cool. I have a question though. How did the ’sandwich’ and ‘index’ parameter automatically get detected and the console understand it to print it out? Could you have used other parameter names? The ‘for’ loop is clearly understandable. Clarification would be great. Thanks.

Ah, yes, sorry about that!

You pass a callback function into `forEach()`, and that callback accepts 3 arguments that automatically get passed into the function itself: `item`, `index` or `key`, and the array/nodelist/object list.

```javascript
someArray.forEach(function (item, index, list) {
    // Code goes here...
});
```

The `item` is the current item in the loop, the `index` is the equivalent of `i` in a `for` loop (or `key` for an object), and `list` is the array, nodelist, or object itself. You can rename these arguments/variables to anything you'd like, though they must be passed in in that order.

For example...

```javascript
// This is our array...
var snacks = [
	'cookies',
	'chips',
	'pretzels',
	'fruit'
];

// We can loop through like this...
snacks.forEach(function (snack, index, snacks)) {
	console.log(snack); // cookies, chips, etc.
	console.log(index); // 0, 1, 2
	console.log(snacks); // The full array
};
```

We could also name our variables something else.

```javascript
snacks.forEach(function (yummyThing, num, desserts)) {
	console.log(yummyThing); // cookies, chips, etc.
	console.log(num); // 0, 1, 2
	console.log(desserts); // The full array
};
```

The arguments must be passed in order, but each one is optional. You often only need the value, which is why that's the first argument passed in.

```javascript
snacks.forEach(function (snack)) {
	console.log(snack); // cookies, chips, etc.
};
```