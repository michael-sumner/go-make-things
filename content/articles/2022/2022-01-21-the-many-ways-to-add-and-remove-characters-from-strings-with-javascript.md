---
title: The many ways to modify leading and trailing characters from strings with JavaScript
date: 2022-01-21T10:30:00-05:00
draft: false
categories:
- Code
- JavaScript
---

JavaScript provides a bunch of methods for adding and removing leading and trailing characters from strings. Today, we're going to look a bunch of them.

Let's dig in!

## The `String.padStart()` method

The `String.padStart()` method adds characters to the beginning of a string if it's less than a certain length. This is particularly useful for numbers that need leading `0`'s (but can do so much more than that).

The `String.padStart()` method accepts two arguments: the length the string should be, and what characters to add if it's not that length. The characters to use is option, and defaults to a space (` `).

```js
// Add a leading zero for hours below 10
let hour3 = '3';
let hour12 = '12';

// returns "03"
hour3.padStart(2, '0');

// returns "12"
hour12.padStart(2, '0');
```

## The `String.padEnd()` method

The `String.padEnd()` method adds characters to the end of a string if it's less than a certain length. This is particularly useful for numbers that need trailing `0`'s.

The `String.padEnd()` method accepts two arguments: the length the string should be, and what characters to add if it's not that length. The characters to use is option, and defaults to a space (` `).

```js
// Add a leading zero for hours below 10
let minutes0 = '0';
let minutes12 = '12';

// returns "00"
minutes0.padEnd(2, '0');

// returns "12"
minutes12.padEnd(2, '0');
```

## The `String.trim()` method

The `String.trim()` method removes leading and trailing whitespace from a string.

```js
let str = '   I love Cape Cod potato chips.   ';

// Returns "I love Cape Cod potato chips."
str.trim();
```

## String concatenation

You can use *string concatenation* to combine two or more strings together. Combine strings using the addition operator (`+`).

```js
/**
 * Strings as variables
 */

let str1 = 'I love Cape Cod potato chips.';
let str2 = 'What about you?';
let concat = str1 + ' ' + str2;

// logs "I love Cape Cod potato chips. What about you?"
console.log(concat);


/**
 * Creating a new variable from two strings
 */

let concat2 =
	'I love Cape Cod potato chips. ' +
	'What about you?';

// logs "I love Cape Cod potato chips. What about you?"
console.log(concat2);
```