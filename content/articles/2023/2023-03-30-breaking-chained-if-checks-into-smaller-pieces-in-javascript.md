---
title: Breaking chained if checks into smaller pieces in JavaScript
date: 2023-03-30T10:30:00-04:00
draft: false
categories:
- Code
- JavaScript
---

This week in the [Frontend Horse Discord](https://frontend.horse/), my friend [Ben Myers](https://benmyers.dev/) shared a really neat technique for making complex `if` checks more readable that I liked quite a bit, and wanted to share with you today.

Let's dig in!

## A complex check

Let's imagine you have some function that checks if a creature `isMagical()`.

Certain types of creatures (unicorns and elves) are inherently magical. Others, like humans and gnomes aren't generally magical but can be if they have certain tools.

Our function looks like this.

```js
/**
 * Is a creature magical?
 * @param  {String}  creature The type of creature
 * @param  {String}  tool     The magical tool they have, if any
 * @return {Boolean}          If true, they're magical
 */
function isMagical (creature, tool) {

	// If the creature is inherently magical
	// OR if they're not but use a magical item
	// return true
	if (creature === 'unicorn' || creature === 'elf' || (creature === 'gnome' && tool === 'alchemy') || (creature === 'human' && tool === 'wand')) {
		return true;
	}

	// Otherwise return false
	return false;

}
```

As you can see, that's not particularly easy to read and reason about because of all the _or operators_ (`||`) inside the `if` statement. Some also include an _and operator_ (`&&`), making things more confusing.

## A common way to rewrite this

One easy fix is to break each check into it's own line, like this...

```js
/**
 * Is a creature magical?
 * @param  {String}  creature The type of creature
 * @param  {String}  tool     The magical tool they have, if any
 * @return {Boolean}          If true, they're magical
 */
function isMagical (creature, tool) {

	// If the creature is inherently magical
	// OR if they're not but use a magical item
	// return true
	if (
		creature === 'unicorn' || 
		creature === 'elf' || 
		(creature === 'gnome' && tool === 'alchemy') || 
		(creature === 'human' && tool === 'wand')
	) {
		return true;
	}

	// Otherwise return false
	return false;

}
```

Already, that's much more readable. There's still an opportunity to mess something up, like forgetting one of the _or operators_ or a parentheses, but it's much easier to glance at and see your checks.

## Assigning checks to variables

Ben's suggestion, which I quite rather liked, was to assign each check to it's own unique variable. Then, you can use those in your `if` statement instead.

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

As you can see, this makes it far easier to read each unique check, _and_ to see how they all work together as part of the broader functional logic.

It also makes it far easier to update your checks in the future.

## Bonus points: naming things

One of the other things that came up in the discussion on the Frontend Horse Discord was around naming things.

As a good rule of thumb, things that return a boolean (`true`/`false`) value should start with `is*` or `*has`. Functions that do things should start with a verb that describes what they do, like `get*()` or `add*()`.

If you want to learn more about my approach to naming things, [I've written a full article on it here](/naming-things-in-javascript/).