---
title: "Documenting JavaScript"
date: 2021-03-30T10:30:00-04:00
draft: false
categories:
- Accessibility
- Careers
- Code
- JavaScript
---

[JSDoc](https://jsdoc.app) is a popular approach to inline documentation used in many code bases.

At its simplest, it involves creating a comment with two leading asterisks (`/**`), and a description of what the function does.

```js
/**
 * Add two numbers together
 */
function add (num1, num2) {
	return num1 + num2;
}
```

The JSDoc becomes more meaningful when you add _tags_: additional details about the function, it's parameters, and what it returns.

You can find [a full list on the JSDoc website](https://jsdoc.app/#block-tags), but the most common are `@param`, which describes a function parameter, and `@return`, which describes what's returned.

```js
/**
 * Add two numbers together
 * @param  {Number} num1 The first number to add
 * @param  {Number} num2 The second number to add
 * @return {Number}      The total
 */
function add (num1, num2) {
	return num1 + num2;
}
```

## Why use JSDoc?

JSDoc is the JavaScript implementation of _DocBlock_, a documentation approach used in various programming languages, including PHP, Ruby, and Python.

It provides a consistent and recognizable approach to documentation. There are also several tools that can automatically generate documentation from JSDoc comments.

## Automating JSDoc comments

Your text editor can make it easier for you to author JSDoc comments.

In VS Code, typing `/**` and hitting the `enter` or `return` key creates a JSDoc comment with some information pre-populated for you. This is a feature that's baked-in out-of-the-box.

```js
/**
 * [add description]
 * @param   {[type]}  num1  [num1 description]
 * @param   {[type]}  num2  [num2 description]
 * @return  {[type]}        [return description]
 */
```

In SublimeText, the [DocBlockr package](https://packagecontrol.io/packages/DocBlockr) adds the same functionality, and also works in other languages.

## How much documentation is enough?

A lot of senior developers are _obsessed_ with the idea of "self-documenting code." That is, code whose purpose is so obvious that it doesn't need documentation.

This is a myth.

What's obvious to you may not be obvious to someone else reading your code. Documenting helps them work faster and easier. The _self-documenting code myth_ is a form of gatekeeping.

Good documentation doesn't just describe _what's_ happening, but _why_ you're doing it. That's the kind of stuff you'll forget a year from now when you go to look at code you haven't touched in a while.