---
title: My preferred way to pass arguments into a function with vanilla JavaScript
date: 2021-11-24T10:30:00-05:00
draft: false
categories:
- Code
- JavaScript
---

Today, I want to talk about a way to handle passing arguments into functions when there's more than two or three of them that I think results in a better experience for everyone.

Let's dig in!

## An object of arguments

If I have just two or three parameters, I'll accept them as individual arguments just like you would expect.

```js
function wizard (name, job) {
	// ...
}
```

But once I have more arguments than that, remembering the order of the accepted parameters becomes difficult. 

I've found that it's easier at that point to accept an object of options. Inside the function, you can [use object destructuring](/destructuring-in-javascript/) to get individual parameter values from it.

```js
function wizard (args) {

	// Get the argument values
	let {name, job, spell, isEvil} = args;

}
```

## Default parameters

I like to pair this approach with [the `Object.assign()` method](https://vanillajstoolkit.com/reference/objects/object-assign/) to merge the provided arguments into some smart defaults.

```js
function wizard (args) {

	// Get the argument values
	let {name, job, spell, isEvil} = Object.assign({
		job: 'Wizard',
		spell: null,
		isEvil: false
	}, args);

}
```

This allows users to pass in just the required arguments, and fallback on defaults if desired.

```js
wizard({
	name: 'Merlin',
	spell: 'Dancing teacups'
});
```