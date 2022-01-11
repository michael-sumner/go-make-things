---
title: What's the best way to loop over an object with JavaScript?
date: 2022-01-11T10:30:00-05:00
draft: false
categories:
- Code
- JavaScript
---

Yesterday, we looked at [different approach to looping over arrays and elements with JavaScript](/whats-the-best-way-to-loop-over-arrays-and-elements-in-javascript/). Today, we're going to look at a few methods for looping over objects.

Let's dig in!

## An example object

For today’s article, let's use an object with the details of a `lunch` order as an example.

```js
let lunch = {
	sandwich: 'turkey',
	chips: 'cape cod',
	drink: 'soda'
};
```

We’ll loop over it and log each item to the console, but in a real site or application, you might want to manipulate the data in some way.

## The `for...in` loop

A `for...in` loop is similar to [the `for...of` loop we looked at yesterday](/whats-the-best-way-to-loop-over-arrays-and-elements-in-javascript/#the-for-of-loop), but used to loop through objects.

In a `for...in` loop, you define a variable to represent the `key` of the current item `in` the object that you’re looping over. Inside the block (the stuff between curly brackets), you can use that variable to reference the current item.

```js
// logs "sandwich", "ham", "snack", "chips", "drink", "soda", "desert", "cookie", "guests", 3, "alcohol", false
for (let key in lunch) {
	console.log(key);        // key
	console.log(lunch[key]); // value
}
```

[Here's a demo.](https://codepen.io/cferdinandi/pen/LYzgjNp?editors=0011)

## Skipping and ending the loop

Just like with a `for` and `for...of` loop, you can use the `continue` and `break` operators in a `for...in` loop.

```js
for (let key in lunch) {
	if (key === 'drink') break;
	console.log(lunch[key]);
}
```

[Here's another demo.](https://codepen.io/cferdinandi/pen/MWEPvyZ?editors=0011)

## The `Object.keys()` method

The `Object.keys()` method returns an array of keys from an object. You pass in the object as an argument.

```js
// logs ["sandwich", "chips", "drink"]
let keys = Object.keys(lunch);
console.log(keys);
```

You can combine it with a `for...of` loop (or any of the other array techniques we looked at yesterday) to loop through the object.

```js
for (let key of Object.keys(lunch)) {
	console.log(key);
	console.log(lunch[key]);
}
```

[Here's a demo of this technique in action.](https://codepen.io/cferdinandi/pen/oNGaezx?editors=0011)

## The `Object.entries()` method

The `Object.entries()` method returns an array of key/value pairs from an object, also represented as arrays. Pass in the object as an argument.

```js
// logs [["sandwich", "turkey"], ["chips", "cape cod"], ["drink", "soda"]]
let entries = Object.entries(lunch);
console.log(entries);
```

You can combine this technique with a `for...of` loop and [array destructuring](/destructuring-in-javascript/#destructuring-arrays-with-vanilla-js) to loop through the object.

```js
for (let [key, item] of Object.entries(lunch)) {
	console.log(key);
	console.log(item);
}
```

[Here's one last demo for you.](https://codepen.io/cferdinandi/pen/QWqZMpV?editors=0011)

## Which method should you use, and why?

This one is pretty straightforward for me: `Object.entries()` with `for...of`. Having a dedicated variable for the `item` in the loop is really nice.