---
title: "What does the Object.getOwnPropertyNames() method do (and how is it different from the Object.keys() method)?"
date: 2020-02-05T10:30:00-05:00
draft: false
categories:
- Code
- JavaScript
---

Yesterday, we looked at [the `Object.keys()` method](/converting-an-object-into-an-array-with-vanilla-js/), which returns an array of keys for an object.

```js
var lunch = {
	sandwich: 'turkey',
	chips: 'cape cod',
	drink: 'soda'
};

// returns ['sandwich', 'chips', 'drink']
var keys = Object.keys(lunch);
```

One of my readers asked how this is different from the `Object.getOwnPropertyNames()` method, which also accepts an object as it's argument and returns and array of property names.

They even have the same browser support!

```js
// returns ['sandwich', 'chips', 'drink']
var props = Object.getOwnPropertyNames(lunch);
```

There's on big difference between the two: `Object.getOwnPropertyNames()` returns both *enumerable* and *non-enumerable* properties, while `Object.keys()` only returns *enumerable* ones.

*Enumerable* properties are ones that show up in a `for...in` loop. *Non-enumerable* properties don't.

With our `lunch` example, all of the properties are *enumerable*, so there's functionally no difference between the two methods. But since [everything is an object in JavaScript](/everything-is-an-object-in-javascript/), we could also pass the `Function.prototype` object into both of these methods to see the difference more clearly.

```js
// returns an empty array: []
Object.keys(Function.prototype);

// returns ["length", "name", "arguments", "caller", "constructor", "apply", "bind", "call", "toString"]
Object.getOwnPropertyNames(Function.prototype);
```

Hopefully that clears things up a little bit. If not, let me know!

[Here's a demo you can play with.](https://codepen.io/cferdinandi/pen/GRJKejq)