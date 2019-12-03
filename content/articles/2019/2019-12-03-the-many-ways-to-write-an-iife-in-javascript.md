---
title: "The many ways to write an Immediately Invoked Function Expression (IIFE) in JavaScript"
date: 2019-12-03T10:30:00-05:00
draft: false
categories:
- Code
- JavaScript
---

An Immediately Invoked Function Expression, or IIFE, is a function that immediately and automatically invokes itself and runs the code inside.

This lets you [keep code out of the global scope](https://gomakethings.com/keeping-your-javascript-out-of-the-global-scope-and-why-you-want-to/) without having to name and call a function.

If you've never heard of an IIFE before, I wrote [a detailed explanation of what it is and how it works here](https://gomakethings.com/the-anatomy-of-an-immediately-invoked-function-expression/).

Something that confuses a lot of my students is that there are several ways to write an IIFE. Today, we're going to look at a few variations on how it's written.

## Leading semicolon

You sometimes see them with a leading semicolon.

```js
;(function () {
	// Code goes here...
})();
```

That's there so that if someone forgets an ending semicolon after a variable definition, and your function ends up on the same line as it, your code won't break.

```js
// This would cause an error
var greeting = 'Hi there!'(function () {
	// Code goes here...
})();

// This will not
var greeting = 'Hi there!';(function () {
	// Code goes here...
})();
```

## Different location for the parentheses

You also sometimes see the second parentheses *inside* the first, instead of after them. This works the same way, and some people prefer the way it looks (I do not).

```js
(function () {
	// Code goes here...
}());
```

## Passing in variables

You might also see people pass in the `document` and `window` elements as named variables. This allows you to easily use shorter variables names for them in your code.

I personally prefer to be more explicit and use the full names for these elements, but this approach is fine, too.

```js
(function (doc, win) {
	// Code goes here...
}(document, window));
```

You'll also sometimes see people include `undefined` as a third argument that doesn't get passed in. This prevents people from overwriting `undefined` as a value outside of your script.

```js
(function (doc, win, undefined) {
	// Code goes here...
}(document, window));
```

## Which one should you use?

I prefer to structure my IIFEs as minimally as possible, with parentheses at the end and a closing semicolon.

```js
(function () {
	// Code goes here...
})();
```

But all of these different ways of writing an IIFE are correct. Pick the one you like best.