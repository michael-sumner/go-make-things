---
title: "Issues with looping over an object, the Object.hasOwnProperty() method, and the Object.create() method in vanilla JS"
date: 2021-03-01T10:30:00-05:00
draft: false
categories:
- Code
- JavaScript
---

Last week, [Pablo Marques pointed out an issue with my `freeze()` helper function](https://github.com/cferdinandi/vanilla-js-toolkit/issues/14) caused by looping over objects created with `Object.create(null)`.

Today, I wanted to look at the issue, the cause, and how to avoid it. Let's dig in.

## The `for...in` loop, prototypal inheritance, and the `Object.hasOwnProperty()` method

Let's say we have a `Wizard()` [constructor function](/constructor-patterns-vs.-plain-objects-vs.-traditional-functions/) that we can use to create a new wizard object.

```js
// Create a prototype
function Wizard (name) {
	this.name = name;
}

// Add properties to the prototype
Wizard.prototype = {
	summon: 'Accio',
	vanish: `Now you see me, now you don't`,
	appear: 'Abracadabra'
};

// Create a new instance
var merlin = new Wizard('Merlin');
```

If we loop through our `merlin` object with a `for...in` loop and log each `key` into the console, `name`, `summon`, `vanish`, and `appear` will all log.

```js
for (var key in merlin) {
	console.log(key);
}
```

[Here's a demo.](https://codepen.io/cferdinandi/pen/bGBMGym)

The keys `summon`, `vanish`, and `appear` are part of the prototype, not the actual `wizard` object itself. What if we only wanted direct properties of our object and not ones that were inherited?

For that, we can use the `Object.hasOwnProperty()` method, which checks that the key is a property of the object itself and not just its prototype.

```js
for (var key in merlin) {
	if (!merlin.hasOwnProperty(key)) continue;
	console.log(key);
}
```

Now, only `name` shows up. [Here's an updated demo.](https://codepen.io/cferdinandi/pen/NWbMWQE)

## `Object.hasOwnProperty()` and `Object.create(null)`

The `Object.hasOwnProperty()` method is very useful for ensuring you don't loop through any inherited properties. But, there's an edge case where it can cause an error.

The `Object.create()` method creates a new object, using an object you pass in as the prototype.

If someone creates an object with it but passes in `null` as the argument, the resulting object will have none of the methods on the `Object` prototype, including `Object.hasOwnProperty()`.

This causes an error.

```js
let gandalf = Object.create(null);
gandalf.name = 'Gandalf';

for (var key in gandalf) {
	// Uncaught TypeError: gandalf.hasOwnProperty is not a function
	if (!gandalf.hasOwnProperty(key)) continue;
	console.log(key);
}
```

[You can see the error here.](https://codepen.io/cferdinandi/pen/eYBrmBJ)

To prevent this error, we can use the `Function.call()` method to access the `Object.prototype.hasOwnProperty()` method directly, even if the current object doesn't have it.

```js
// No error
for (var key in gandalf) {
	if (!Object.prototype.hasOwnProperty.call(gandalf, key)) continue;
	console.log(key);
}
```

[Here's a final demo.](https://codepen.io/cferdinandi/pen/eYBrmKB)