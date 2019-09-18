---
title: "When to use new in JavaScript"
date: 2018-10-22T10:30:00-04:00
draft: false
categories:
- Code
- Design and UX
- JavaScript
---

In last week's article on [creating your own vanilla JS DOM manipulation library](/how-to-create-your-own-vanilla-js-dom-manipulation-library-like-jquery/), I wrote...

> In order to instantiate the constructor pattern, we need to use the `new` operator with it.

One of my readers asked *when* you need to use `new`, and why.

**tl;dr:** only with constructor patterns. Let's explore this more.

## Creating a new *instance* of an object

In Friday's article on [the different types of JavaScript data patterns you might use](/constructor-patterns-vs.-plain-objects-vs.-traditional-functions/), I wrote...

> A constructor pattern let’s you create a new *object type*. This object type can be used to create new JavaScript objects that have unique values or data, but share a set of properties.

The reason you include `new` with constructor patterns is that you're not *running* a function when you call the constructor. You're *instantiating* a *new instance* of the *object type* you setup.

```js
// This sets up the constructor
var Lunch = function (sandwich, drink, chips) {
	this.sandwich = sandwich;
	this.drink = drink;
	this.chips = chips;
};

// These create new instances of the Lunch object
var customer1 = new Lunch('turkey', 'soda', true);
var customer2 = new Lunch('tuna', 'water', false);
```

Yes, technically the constructor function runs when you set it up. If you added a `console.log()` to the constructor, it would run every time you created a new instance.

```js
// This sets up the constructor
var Lunch = function (sandwich, drink, chips) {
	this.sandwich = sandwich;
	this.drink = drink;
	this.chips = chips;
	console.log('Order placed!');
};
```

## What happens if you omit `new`?

If you omit `new`, the constructor doesn't set itself up.

```js
var customer1 = Lunch('turkey', 'soda', true);

// Returns "undefined"
customer1;
```

## Constructor properties

You *can* assign properties to a constructor and call those with instantiating a new instance of the object.

```js
Lunch.orderUp = function () {
	alert('Order up!');
};

// Alerts "Order up!"
Lunch.orderUp();
```

You cannot use constructor properties with instantiated instances, though. They only work if attached to the constructor's `prototype`.

```js
// This won't work
var customer1 = new Lunch('turkey', 'soda', true);
customer1.orderUp();

// This will
Lunch.prototype.orderUp = function () {
	alert('Order up!');
}
customer1.orderUp();
```

## Wrapping up

The `new` operator was weird and confusing to me when I was learning JS. Constructor patterns were, too, and so many teachers talked about them as if everyone should just know how they work.

I felt like an idiot!

Hopefully, that clears some things up. And if I didn't do a good job explaining anything, please let me know!