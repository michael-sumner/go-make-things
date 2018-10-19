---
title: "Constructor patterns vs. plain objects vs. traditional functions"
date: 2018-10-19T10:30:00-04:00
draft: false
categories:
- Code
- Design and UX
- JavaScript
---

In yesterday's article on [creating your own vanilla JS DOM manipulation library](/how-to-create-your-own-vanilla-js-dom-manipulation-library-like-jquery/), I wrote...

> With a DOM manipulation, we want to get elements from the DOM and call methods on them. To make that work, instead of returning an object we want to return a [constructor pattern](/an-introduction-to-the-javascript-constructor-pattern/).

One of my readers wanted to know *when* and *why* you would use a constructor pattern vs. a plain object vs. a function.

Let's dig in!

## Plain Objects

Plain objects (sets of key/value pairs wrapped in `{}`) are great for storing simple data sets.

```js
var lunch = {
	sandwich: 'turkey',
	drink: 'soda',
	chips: true
};

var party = {
	theme: 'pirates',
	snacks: ['chips', 'cookies', 'ice cream'],
	drinks: ['soda', 'water', 'juice']
};

// Returns "pirates"
party.theme;
```

Most of the time, this is a great choice. [Here's a demo.](https://codepen.io/cferdinandi/pen/PyexYQ)

## Functions with properties

Because [everything is an object in JavaScript](/everything-is-an-object-in-javascript/), you could also assign named properties to a function instead of using a plain object.

(*This is why `{}` objects are called "plain objects." It differentiates them from every other object type in JavaScript. Yea, it's confusing!*)

```js
var lunch = function () {
	return 'I would like a ' + lunch.sandwich + ' sandwich, with ' + lunch.drink + ' to drink.' + (lunch.chips ? 'Also, chips please.' : '');
};
lunch.sandwich = 'turkey';
lunch.drink = 'soda';
lunch.chips = true;

// Returns "I would like a turkey sandwich, with soda to drink. Also, chips please."
lunch();
```

This type of pattern let's you attach data to a function, and then run it to do something with that data. It's a simple way to setup one-off state-based components.

[Here's a demo of this in action.](https://codepen.io/cferdinandi/pen/MPGzgM)

## Constructor patterns

A constructor pattern let's you create a new *object type*. This object type can be used to create new JavaScript objects that have unique values or data, but share a set of properties.

For example, let's say you had a restaurant app and wanted to submit multiple lunch orders. You might create a `Lunch` constructor (constructor names are title-cased) that holds the order details.

```js
var Lunch = function (sandwich, drink, chips) {
	this.sandwich = sandwich;
	this.drink = drink;
	this.chips = chips;
};
```

Then, you can create new orders by instantiating new instances of `Lunch()` with the unique data for each lunch order.

```js
var customer1 = new Lunch('turkey', 'soda', true);
var customer2 = new Lunch('tuna', 'water', false);

// Returns "soda"
customer1.drink;

// Returns "tuna"
customer2.sandwich;
```

You can also attach functions to the constructor's `prototype`. It can access the unique properties for each instance using `this`.

```js
Lunch.prototype.getOrder = function () {
	return 'I would like a ' + this.sandwich + ' sandwich, with ' + this.drink + ' to drink.' + (this.chips ? 'Also, chips please.' : '');
};

// Returns "I would like a turkey sandwich, with soda to drink. Also, chips please."
customer1.getOrder();

// Returns "I would like a tuna sandwich, with water to drink."
customer2.getOrder();
```

[Here's the constructor pattern in action.](https://codepen.io/cferdinandi/pen/XxqyJJ)

## Different patterns for different use cases

Each pattern has it's own set of situations where its useful, and a whole bunch where it's not.

If you don't need to hold unique data or create multiple items with the same properties (but different values), then the constructor pattern is over-engineered and adds no value, for example.