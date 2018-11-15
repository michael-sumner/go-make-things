---
title: "Why isn't there an Object.forEach() method?"
date: 2018-11-15T10:30:00-05:00
draft: false
categories:
- Code
- JavaScript
---

One thing that's always seemed like a big miss to me is the lack of methods for iterating over objects.

Arrays can use `forEach()` to loop, `map()` to create a new array based on an existing one, and `filter()` to reduce a set of items down to a smaller set.

Objects have none of these.

Today, let's look at some newer ways to iterate over objects that go beyond the humble `for...in` loop.

## An array of object keys

The `Object.keys()` method returns an array of keys from an object. Pass in the object as an argument.

```js
var lunch = {
	sandwich: 'turkey',
	drink: 'soda',
	chips: true,
	desert: 'cookie'
};

// Returns ["lunch", "drink", "chips", "desert"]
Object.keys(lunch);
```

This method is kind of clunky.

You rarely want only an objects keys by themselves. The real value of an object is the key/value pair relationship.

## Using Array methods on Objects

On the surface, `Object.keys()` feels pretty limited in use. But... you can actually use it to apply Array methods to objects.

Since `Object.keys()` returns an array, we can call any of the Array methods on it. Inside your callback method, you can use the key to get the item's value in the object.

Let's look at some examples.

### Looping through an object

You can kind of fudge your way into an `Object.forEach()` method like this.

```js
var lunch = {
	sandwich: 'turkey',
	drink: 'soda',
	chips: true,
	desert: 'cookie'
};

Object.keys(lunch).forEach(function (key) {
	console.log(key); // The object key
	console.log(lunch[key]); // The object value
});
```

Honestly, a `for...in` loops is about the same amount of work for something like this.

### Filtering

Let's look at a different object for this one.

Imagine you had an object of toppings for a sandwich, with boolean `true`/`false` values for whether or not the sandwich should include them.

```js
var toppings = {
	mustard: false,
	mayo: true,
	tomato: true,
	lettuce: true,
	pickles: false,
	onions: false
};
```

You want to get back an array of just the toppings that should go on the sandwich. `Object.keys()` and `Array.filter()` work great here.

```js
var sandwichToppings = Object.keys(toppings).filter(function (topping) {
	// Only return toppings with a value of true
	return toppings[topping];
});

// Logs ["mayo", "tomato", "lettuce"]
console.log(sandwichToppings);
```

## Browser Compatibility

Your ultimate support depends on the Array methods you're trying to use, but `Object.keys()` works in all modern browsers and back IE9.