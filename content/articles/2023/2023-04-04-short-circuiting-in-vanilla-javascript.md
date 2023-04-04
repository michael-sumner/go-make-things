---
title: Short-circuiting in vanilla JavaScript
date: 2023-04-04T10:30:00-04:00
draft: false
categories:
- Code
- JavaScript
---

Today, we're going to learn about short-circuiting in JavaScript.

When evaluating a _logical operator_ (`&&` or `||`), JavaScript will quit and return a truthy or falsy value (depending on the type of operator) as soon as it finds a match, and skip the rest of the checks.

- With an _and operator_ (`&&`), it returns falsy after one falsy check.
- With an _or operator_ (`||`), it returns truth after one truthy check.

Let's look at some examples.

## Short-circuiting and the _or operator_ (`||`)

Here, we have an `isMagicalCreature()` function. 

It accepts a string, and checks if the string has a value of `unicorn`, `elf`, or `gnome`. If so, the creature is magical.

```js
/**
 * Check if the creature is innately magical
 * @param  {String}  creature The creature type
 * @return {Boolean}          If true, the creature is magical
 */
function isMagicalCreature (creature) {
	return creature === 'unicorn' || creature === 'elf' || creature === 'gnome';
}
```

If we passed in `elf` as an argument, the `creature === 'unicorn'` and `creature === 'elf'` checks would be run, but `creature === 'gnome'` would never run.

As soon as JavaScript gets a _truthy_ evaluation (`creature === 'elf'`), it returns `true`. That's short-circuiting.

```js
// returns true
let isMagic = isMagicalCreature('elf');
```

This only happens with _truthy_ evaluations. If we ran this same function with `human` as the argument, all three checks would run and return a _falsy_ value.

```js
// returns false
let isNotMagic = isMagicalCreature('human');
```

### Short-circuiting and the _and operator_ (`&&`)

Here, we have a `hasMagicPowers()` function.

It accepts an object as an argument, with `tool`, `age`, and `spells` properties. It checks each of those properties to see if the creature meets the minimum requirements to have magic powers.

The `tool` must be a wand, the creature must be at least `42` years old, and it must have at least one spell in its `spells` array.

```js
/**
 * Check if a creature has magical powers
 * @param  {Object}  creature         The creature details
 * @param  {String}  creature.tool    The creature's tool
 * @param  {Integer} creature.age     The creature's age
 * @param  {Array}   creature.spells  An array of spells the creature knows, if any
 * @return {Boolean}                  If true, the creature has magic powers
 */
function hasMagicalPowers (creature) {
	return creature.tool === 'wand' && creature.age > 42 && creature.spells.length > 0;
}
```

Let's imagine we have a young wizard, `krull`. They have a wand and spells, but are only 37 years old.

```js
let krull = {
	tool: 'wand',
	age: 37,
	spells: ['Levitate', 'Turn into a frog']
};
```

If we pass the `krull` object into our `hasMagicalPowers()` function, the `creature.tool === 'wand'` check and `creature.age > 42` check would run, but `creature.spells.length > 0` never would.

As soon as JavaScript gets a _falsy_ evaluation (`creature.age > 42`), it returns `false`. That's also short-circuiting.

```js
// returns false
let hasNoMagic = hasMagicalPowers(krull);
```

This only happens with _falsy_ evaluations. If we ran this same function with an object that matched all of the criteria, all three checks would run and return _truthy_ values.

```js
let fin = {
	tool: 'wand',
	age: 172,
	spells: ['Talk to animals', 'Create storm', 'Bark skin']
};

// returns true
let doesHaveMagic = hasMagicalPowers(fin);
```

## Why does this matter?

Short-circuiting is a performance feature that prevents JavaScript from running needless checks. 

It let's an evaluation return a value as soon as it running additional checks wouldn't change the result. For example, you don't have to write code like this, because that's how the _or_ operator works out-of-the-box.

```js
/**
 * Check if the creature is innately magical
 * @param  {String}  creature The creature type
 * @return {Boolean}          If true, the creature is magical
 */
function isMagicalCreature (creature) {
	if (creature === 'unicorn') return true;
	if (creature === 'elf') return true;
	if (creature === 'gnome') return true;
	return false;
}
```

Similarly, you don't have to write functions like this, because that's how the _and operator_ works by default.

```js
/**
 * Check if a creature has magical powers
 * @param  {Object}  creature         The creature details
 * @param  {String}  creature.tool    The creature's tool
 * @param  {Integer} creature.age     The creature's age
 * @param  {Array}   creature.spells  An array of spells the creature knows, if any
 * @return {Boolean}                  If true, the creature has magic powers
 */
function hasMagicalPowers (creature) {
	if (creature.tool !== 'wand') return false;
	if (creature.age < 43) return false;
	if (creature.spells.length < 1) return false;
	return true;
}
```