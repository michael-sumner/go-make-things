---
title: "How to check for text in a string with vanilla JS"
date: 2020-03-09T10:30:00-04:00
draft: false
categories:
- Code
- JavaScript
---

Let's say you have a string, like this.

```js
var hitchhiker = 'The answer to the ultimate question of life, the universe, and everything';
```

You want to check if the string has the word `question` in it. How would you do that?

Today, we're going to look at two ways to check for a string inside another string.

## The `String.includes()` method

ES6 introduced a new method for checking for a string inside another string: `String.includes()`.

Call the `includes()` method on your string, and pass in the substring you're looking for inside it as an argument. It returns a boolean (`true`/`false`).

```js
// returns true
hitchiker.includes('question');

// returns false
hitchiker.includes('Neville');
```

[Here's a demo.](https://codepen.io/cferdinandi/pen/oNXpLBL)

*The `String.includes()` method works in all modern browsers, but not IE. [You can push support back to at least IE6 with a polyfill.](https://vanillajstoolkit.com/polyfills/stringincludes/)*

## The `String.indexOf()` method

The `String.indexOf()` method is an older approach that tells you the starting index of a substring inside a string. If the substring doesn't exist, it returns `-1` instead.

```js
// returns 27
hitchhiker.indexOf('question');

// returns -1
hitchhiker.indexOf('Neville');
```

You can use the `indexOf()` method to check if a substring exists or not by checking if the returned value is greater than `-1`.

```js
// This logs to the console
if (hitchhiker.indexOf('question') > -1) {
	console.log(42);
}

// This does not
if (hitchhiker.indexOf('Neville') > -1) {
	console.log('This is not Harry Potter, you idiot!');
}
```

[Here's another demo for you.](https://codepen.io/cferdinandi/pen/xxGpOXZ)

*The `String.indexOf()` method works in all modern browsers, and back to at least IE6.*

## A "gotcha" with both of these

Neither the `String.includes()` method nor `String.indexOf()` method check if the substring is a complete/standalone word.

For example, let's check for the word `quest`. It's not a word in our sentence, but it *is* part of the word `question`.

It return `true` with the `includes()` method, and `27` (just like `question` does) with the `indexOf()` method.

```js
// returns true
hitchiker.includes('quest');

// returns 27
hitchhiker.indexOf('quest');
```

Checking for complete words requires the use of regular expressions, and [that's an entirely separate article](/regex-with-javascript/).