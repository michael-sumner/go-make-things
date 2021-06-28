---
title: "Automatically provided arguments in JavaScript callback functions"
date: 2021-06-28T10:30:00-04:00
draft: false
categories:
- Code
- JavaScript
---

One the things that really confuses many of my beginner students are automatic arguments in JavaScript callback functions.

Today, let's take a look at what they are and how they work.

## What are callback functions?

Many JavaScript methods accept a function as an argument.

- `Array.forEach()` accepts a function that runs on each item in an array
- `Element.addEventListener()` accepts a function that runs whenever the specified event is triggered
- `Promise.then()` accepts a function that runs when the Promise resolves

Each of those callback functions itself accepts arguments.

```js
let wizards = ['Gandalf', 'Radagast', 'Merlin'];

// The callback function for Array.forEach() accepts three arguments
wizards.forEach(function (wizard, index, arr) {
	console.log(wizard);
});
```

## Where do those arguments come from?

What I find typically confuses people is that you're not explicitly running the function, just defining it and naming some parameters. So where do those values actually come from?

With callback functions on JavaScript methods, the arguments are automatically passed in by the method itself.

Using the `Array.forEach()` method as an example, the callback function will always receive the current item, its index, and the array itself as arguments, in that order. You can name the parameters for them anything you want, or even omit them entirely, but the method will always pass them in as arguments.

```js
// You can name the parameters anything you want
wizards.forEach(function (magicDude, number, ohTheseJerksAgain) {
	console.log(magicDude);
});
```

The `Element.addEventListener()` method will always pass in the `event` object that triggered the callback function to run as an argument.

You can call it `event` or `e` or `somethingWeirdHappened` or whatever else you want, but the object will always get passed in.

```js
document.addEventListener('click', function (event) {
	console.log(`A ${event.type} event happened`);
});
```

## You only need to specify the parameters you need

If you don't need one of the arguments, you can leave the parameter for it off in your callback function. You only need to specify the ones that you need.

The order matters, though.

On an `Array.forEach()` method, if you wanted the item and the original array, but _not_ the `index`, you still need to specify a parameter for the index because the array will always be the third parameter.

In the example below, `arr` would log the index of the current item, because it's always the second argument provided to the callback function.

```js
// This would actually log the index
wizards.forEach(function (wizard, arr) {
	console.log(arr);
});
```