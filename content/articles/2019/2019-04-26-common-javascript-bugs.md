---
title: "Common JavaScript bugs"
date: 2019-04-26T10:30:00-04:00
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

Last year, I wrote about [my process for debugging JavaScript](/a-process-for-debugging-your-javascript/).

I don't use any fancy developer tools tricks. Just `console.log()` and the Console tab. I know there are a ton of advanced things you can do with dev tools these days, but this staple serves me well.

Today, I wanted to share some of the more common JS bugs I see crop in my students (and my own) code.

## Using a single `=` instead of a comparison operator

One super easy thing to do is use `=` instead of `==` or `===` in a `for` statement.

```js
var sandwich = document.querySelector('.sandwich');

// Wrong
if (sandwich.id = 'tuna') {
	// Do something...
}

// Right
if (sandwich.id === 'tuna') {
	// Do something...
}
```

## Comparing mismatched types

There are two types of "equals" comparison operators in JavaScript: equals (`==`) and strict equals (`===`).

Equals uses something called *type coercion* to compare things. If one item is a number and the other is a string, it will force them to both be strings to do it's comparison.

```js
// This will evaluate as "true"
if (5 == '5') {
	// Do something...
}
```

Strict equals compares items, well, strictly, and requires them to be the same type, not just the same value, to be true.

```js
// This evaluates as "false"
if (5 === '5') {
	// Do something...
}
```

It's really easy to compare a string to a number when getting values from the inputs or the DOM, and get a `false` comparison when you expect `true`.

## Missing brackets and parentheses

It's easy to miss a closing brackets and parentheses, especially when dealing with nested statements.

```js
// This is missing a closing bracket on the second if statement
if (sandwich === 'tuna') {
	if (bread === 'wheat') {
		alert('What a yummy sandwich!');
}

// This is missing a closing parentheses
// Which isn't surprising because this is an absurd example!
if (100 - ((10 - 5) / 2 * (11 + 3) === 42) {
	// Do something...
}
```

## Unescaped quotes in a string

If you include quotes in a string, they need to be escaped with a backslash (`\`) or they'll close out the string.

This applies to quotes that are the same type as the wrapping quotes. So if you use single quotes for your strings, you need to escape any single quotes in the text. If you use double quotes, you need to escape double quotes.

```js
// This will cause an error
var str1 = "She said, "I'm going to get a sandwich." I hope it's tuna!";

// This will not. The backslashes won't show up, either
var str1 = "She said, \"I'm going to get a sandwich.\" I hope it's tuna!";
```

## Typos and capitalization

Another common cause of bugs is mistyped variables.

Sometimes they're misspelled. Variable names are also case-sensitive, though, so if you used all lowercase on a camelCase variable (or vice-versa), you'll get an error.

```js
var mySandwich = 'tuna';

// Wrong
if (mySandiwch === 'tuna') {
	// Do something....
}

// Also wrong
if (mysandwich === 'tuna') {
	// Do something...
}

// Right
if (mySandwich === 'tuna') {
	// Do something...
}
```

## Trying to run methods on things that don't exist.

This is really common when using DOM selectors like `querySelector()`. If you try to use a method like `classList()` or access a property like `.id` on an element that doesn't exist, you'll get an error.

```js
var elem = document.querySelector('#does-not-exist');

// Throws error: "Uncaught TypeError: Cannot read property 'id' of null"
var id = elem.id;

// Throws error:  "Uncaught TypeError: Cannot read property 'closest' of null"
if (elem.closest('tuna-sandwich')) {
	// Do something...
}
```

There are many more little things that might pop up in your code, but this is a good list of places to start when you're not sure what's going on.