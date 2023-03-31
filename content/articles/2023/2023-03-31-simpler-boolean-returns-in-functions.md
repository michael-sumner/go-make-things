---
title: Simpler boolean returns in functions with JavaScript
date: 2023-03-31T10:30:00-04:00
draft: false
categories:
- Code
- JavaScript
---

Yesterday, I wrote about [how to simplify complex `if` statements by breaking them into smaller pieces](/breaking-chained-if-checks-into-smaller-pieces-in-javascript/)

We ended up with a function that looked like this...

```js
/**
 * Is a creature magical?
 * @param  {String}  creature The type of creature
 * @param  {String}  tool     The magical tool they have, if any
 * @return {Boolean}          If true, they're magical
 */
function isMagical (creature, tool) {

	// Checks
	let isUnicorn = creature === 'unicorn';
	let isElf = creature === 'elf';
	let isMagicGnome = creature === 'gnome' && tool === 'alchemy';
	let isMagicHuman = creature === 'human' && tool === 'wand';

	// If the creature is magical return true
	// Otherwise return false
	if (isUnicorn || isElf || isMagicGnome || isMagicHuman) return true;
	return false;

}
```

But as one astute reader pointed out, all of the `is*` variables are boolean values: either `true` or `false`.

As a result, we can return the variables themselves, with _or operators_ (`||`), and skip the `if () return` entirely.

```js
/**
 * Is a creature magical?
 * @param  {String}  creature The type of creature
 * @param  {String}  tool     The magical tool they have, if any
 * @return {Boolean}          If true, they're magical
 */
function isMagical (creature, tool) {

	// Checks
	let isUnicorn = creature === 'unicorn';
	let isElf = creature === 'elf';
	let isMagicGnome = creature === 'gnome' && tool === 'alchemy';
	let isMagicHuman = creature === 'human' && tool === 'wand';

	// If the creature is magical return true
	// Otherwise return false
	return isUnicorn || isElf || isMagicGnome || isMagicHuman;

}
```

This is a great pattern to use in functions that do simple checks, as well.

Instead of doing this...

```js
/**
 * Check if an expiration date is after the current date
 * @param  {Integer}  expires The expiration date as a timestamp
 * @return {Boolean}          If true, date is still valid
 */
function isValid (expires) {
	if (expires < Date.now()) {
		return true;
	} else {
		return false;
	}
}
```

You could do this...

```js
/**
 * Check if an expiration date is after the current date
 * @param  {Integer}  expires The expiration date as a timestamp
 * @return {Boolean}          If true, date is still valid
 */
function isValid (expires) {
	return expires < Date.now();
}
```

Another reader pointed out that the `isMagical()` function could use [the early return pattern](/the-early-return-pattern-in-javascript/).

Here, we check each condition, and `return true` if its met. If we get to the end and haven't returned anything yet, we `return false`.

```js
/**
 * Is a creature magical?
 * @param  {String}  creature The type of creature
 * @param  {String}  tool     The magical tool they have, if any
 * @return {Boolean}          If true, they're magical
 */
function isMagical (creature, tool) {
	if (creature === 'unicorn') return true;
	if (creature === 'elf') return true;
	if (creature === 'gnome' && tool === 'alchemy') return true;
	if (creature === 'human' && tool === 'wand') return true;
	return false;
}
```

So which one should you use? Whichever one you find the easiest to read and understand.