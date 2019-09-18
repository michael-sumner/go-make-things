---
title: "The for...in loop with vanilla JavaScript"
date: 2018-03-06T10:30:00-05:00
draft: false
categories:
- Code
- JavaScript
---

This week, we're going back to basics with JavaScript loops. Yesterday, we looked at [the `for` loop](/back-to-basics-the-vanilla-javascript-loop/).

Today, we'll be looking at a variant of it: the `for...in` loop.

## How the `for...in` loop works

The `for...in` loop is used to loop through objects.

```js
for (key in object) {
	// Things to do in the loop
}
```

The first part, the `key`, is the name of the variable to assign to the current object key in the loop. The second part, the `object`, is the actual object you're looping through.

You can use the `key` to get the value of the current item in the loop from the object.

Here's an example.

```js
var lunch = {
	sandwich: 'ham',
	snack: 'chips',
	drink: 'soda',
	desert: 'cookie',
	guests: 3,
	alcohol: false,
};

for (var key in lunch) {
	console.log(key); // key
	console.log(lunch[key]); // value
}
```

## Safer Looping

Objects in JavaScript can have a bunch of properties on them that are inherited from object prototypes.

Here's an example from the Mozilla Developer Network.

```js
// Create a prototype
function ColoredTriangle() {
	this.color = 'red';
}

ColoredTriangle.prototype = {
	a: 1,
	b: 2,
	c: 3
};

var obj = new ColoredTriangle();
```

In the example above, our standard `for...in` loop would work like this:

```js
for (var key in obj) {
	console.log(obj[key]);
}

// Returns "red", 1, 2, 3
```

The values `1`, `2`, and `3` are part of the prototype, not the actual object, but are returned anyways. We can avoid this by using the `hasOwnProperty()` method to check that the key is a property of the object itself and not just it's prototype.

```js
for (var key in obj) {
	if (obj.hasOwnProperty(key)) {
		console.log(obj[key]);
	}
}
```

Unless you explicitly *want* to grab inherited prototype values, use `hasOwnProperty()` in all of your `for...in` loops.

## Browser Compatibility

The `for...in` loop works in all modern browsers, and at least back to IE6.

Tomorrow, we'll look at how to skip items in a loop and end them early.