---
title: "How to get and set the value of a select menu with vanilla JS"
date: 2020-10-02T10:30:00-04:00
draft: false
categories:
- Code
- JavaScript
---

Today, we're going to look at how to get and set the value of a `select` menu with vanilla JS.

For example, let's say you have a menu with a list of classes in Dungeon & Dragons, like this.

```html
<label for="dnd">What's the best class in D&D?</label>
<select id="dnd">
	<option value="bard">Bard</option>
	<option value="fighter">Fighter</option>
	<option value="druid">Druid</option>
	<option value="paladin">Paladin</option>
	<option value="rogue">Rogue</option>
	<option value="wizard">Wizard</option>
</select>
```

How would you get and set the value of the menu? Let's dig in.

## Getting the selected option using the `value` property

To do that, you can use the `value` property on the element.

```js
// Get the select menu
var dnd = document.querySelector('#dnd');

// Returns the selected value
dnd.value;
```

[Here's a demo.](https://codepen.io/cferdinandi/pen/wvGLbJQ)

## Selecting an option using the `value` property

You can also use the `value` property to *set* the value of a `select` menu.

```js
// Sets the selected value to 'druid'
dnd.value = 'druid';
```

[Here's another demo.](https://codepen.io/cferdinandi/pen/poyXmeM)

## The JavaScript `value` property requires an HTML `value`

This technique, using the JS `value` property, only works if the `option` elements themselves have a `value` on them.

For example, here we have IDs instead of `value` properties. This would *not* work.

```html
<label for="dnd">What's the best class in D&D?</label>
<select id="dnd">
	<option id="bard">Bard</option>
	<option id="fighter">Fighter</option>
	<option id="druid">Druid</option>
	<option id="paladin">Paladin</option>
	<option id="rogue">Rogue</option>
	<option id="wizard">Wizard</option>
</select>
```

## Advanced approaches

Next week, we'll look at how to get and set values when there's no `value` properties on your `option` elements. We'll also look at how to work with `select` elements that have the `multiple` attribute.

Today's article was inspired by [this video from Steve Griffith](https://www.youtube.com/watch?v=s0c36oh8I-I).