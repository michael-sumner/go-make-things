---
title: "How to check for an item in an array with vanilla JS"
date: 2020-03-10T10:30:00-04:00
draft: false
categories:
- Accessibility
- Art and Science
- Business and Leadership
- Careers
- Code
- CSS
- Design and UX
- HTML
- JavaScript
- Technology
- Web Performance
- WordPress
- Vanilla Framework Demos
---

Let's say you have an array of wizards, like this.

```js
var wizards = ['Hermoine', 'Neville', 'Harry Potter', 'Dumbledore'];
```

You want to check if the array has `Neville` in it. How would you do that?

Today, we're going to look at two ways to check for an item inside an array.

(*If today's article reminds you a lot [of yesterday's](/how-to-check-for-text-in-a-string-with-vanilla-js/), that's on purpose.*)

## The `Array.includes()` method

ES6 introduced a new method for checking for an item inside an array: `Array.includes()`.

Call the `includes()` method on your array, and pass in the item you're looking for as an argument. It returns a boolean (`true`/`false`).

```js
// returns true
wizards.includes('Neville');

// returns false
wizards.includes('Gandalf');
```

[Here's a demo.](https://codepen.io/cferdinandi/pen/oNXpzaP)

*The `Array.includes()` method works in all modern browsers, but not IE. [You can push support back to at least IE9 with a polyfill.](https://vanillajstoolkit.com/polyfills/arrayincludes/)*

## The `Array.indexOf()` method

The `Array.indexOf()` method is an older approach that tells you the index of the first matching item inside an array. If the item doesn't exist, it returns `-1` instead.

```js
// returns 1
wizards.indexOf('Neville');

// returns -1
wizards.indexOf('Gandalf');
```

You can use the `indexOf()` method to check if an item exists or not by checking if the returned value is greater than `-1`.

```js
// This logs to the console
if (wizards.indexOf('Neville') > -1) {
	console.log('The surprise hero');
}

// This does not
if (wizards.indexOf('Gandalf') > -1) {
	console.log('This is not Lord of the Rings, you idiot!');
}
```

[Here's another demo for you.](https://codepen.io/cferdinandi/pen/WNvdGYr)

*The `Array.indexOf()` method works in all modern browsers, and IE9 and above.*

## Which one should you use?

I generally find `Array.indexOf()` more useful. If I'm looking for an item in an array, I typically want to know what its index is so that I can use it for something.