---
title: The early return pattern and the JavaScript void operator
date: 2022-10-06T10:30:00-04:00
draft: false
categories:
- Code
- JavaScript
---

Earlier this year, I wrote about [my love of the early return pattern](/the-early-return-pattern-in-javascript/).

This week, [my friend Kieran Barker](https://barker.codes/) taught me about the `void` operator, and how it can be paired with the early return pattern.

Let's dig in!

## An example of the early return pattern

With the _early return pattern_, you use the `return` operator to end a function early instead of an `if...else` statement. In code that involves a lot of checks, it can make your code a bit cleaner and easier to read.

For example, here's a function that toggles password visibility.

```js
/**
 * Toggle the visibility of a password field
 * @param  {Node} field The field
 */
function toggleVisibility (field) {

	// If the field is hidden, show it
	// Otherwise, hide it
	if (field.type === 'password') {
		field.type = 'text';
	} else {
		field.type = 'password';	
	}

}
```

And here's that same function using the _early return pattern_.

```js
/**
 * Toggle the visibility of a password field
 * @param  {Node} field The field
 */
function toggleVisibility (field) {

	// If the field is hidden, show it
	if (field.type === 'password') {
		field.type = 'text';
		return;
	}

	// Otherwise, hide it
	field.type = 'password';

}
```

## Using the `void` operator with the early return pattern

In the _early return pattern_, we run our `return` on its own line, with no value after it. The returned value from the function when you do this is `undefined`.

```js
// returns undefined
let toggled = toggleVisibility(field);
```

If you wanted to save space, you could `return` the last operation that runs.

```js
/**
 * Toggle the visibility of a password field
 * @param  {Node} field The field
 */
function toggleVisibility (field) {

	// If the field is hidden, show it
	if (field.type === 'password') {
		return (field.type = 'text');
	}

	// Otherwise, hide it
	field.type = 'password';

}
```

But doing this means that sometimes `text` will get returned out of the function. We don't want that.

The `void` operator runs the operation, but returns `undefined`.

```js
/**
 * Toggle the visibility of a password field
 * @param  {Node} field The field
 */
function toggleVisibility (field) {

	// If the field is hidden, show it
	if (field.type === 'password') {
		return void (field.type = 'text');
	}

	// Otherwise, hide it
	field.type = 'password';

}
```

## Should you use this?

Personally, [I favor readability over brevity](/readability-is-more-important-than-brevity/), and think `return` on its own line is more readable. 

But it's nice to have options!