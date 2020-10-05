---
title: "How to get and set the value of a select menu using an ID"
date: 2020-10-05T10:30:00-04:00
draft: false
categories:
- Code
- JavaScript
---

On Friday, we looked at [how to get and set the value of a select menu with vanilla JS](/how-to-get-and-set-the-value-of-a-select-menu-with-vanilla-js/). But the approach we used only works if the `option` elements have a `value` property on them.

What if you have something like this instead?

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

Today, let's look at how to get and set the value of a select menu using IDs.

## The `selectedIndex` property

The `HTMLSelectElement.selectedIndex` property returns an integer representing the index of the selected `option` for a `select` element. If no item is selected, it returns `-1`.

Using the example above, this would return `0`, since the first item is the one selected by default.

```js
var dnd = document.querySelector('#dnd');

// Returns 0
dnd.selectedIndex;
```

If you selected `Druid` from the list, it would return `2`.

[Here's a demo.](https://codepen.io/cferdinandi/pen/KKMPdWd)

## Getting the selected ID using the `selectedIndex` and `options` properties

The `options` property returns an `HTMLOptionsCollection`, an array-like collection of options for a `select` element. You can pair it with the `selectedIndex` property to get the selected `option`. Then, you can use the `id` property to get its ID.

This would return `"bard"` with the default first item selected.

```js
// Returns "bard"
dnd.options[dnd.selectedIndex].id;
```

[Here's another demo.](https://codepen.io/cferdinandi/pen/qBNWOXx)

## Setting the selected `option` by ID

The `selectedIndex` property isn't just readable. You can use it to set the selected item as well.

Let's say you wanted to select the `option` with an ID of `#rogue`.

First, let's convert the `HTMLOptionsCollection` that `dnd.options` returns into an array [using the `Array.from()` method](/using-array-methods-with-nodelists-in-vanilla-js/#array-from).

```js
// Convert the HTMLOptionsCollection into an array
Array.from(dnd.options);
```

Next, we can loop through each option using [the `Array.forEach()` method](https://vanillajstoolkit.com/reference/loops/array-foreach/).

```js
// Convert the HTMLOptionsCollection into an array
// Then, loop through each option in the array
Array.from(dnd.options).forEach(function (option, index) {
	// Do something...
});
```

Finally, we'll check each `option` to see if it's `id` is `rogue`. if it is, we'll set it's `index` to the `dnd.selectedIndex` property.

```js
// Convert the HTMLOptionsCollection into an array
// Then, loop through each option in the array
Array.from(dnd.options).forEach(function (option, index) {

	// If the ID is "rogue", set this items index as the selectedIndex
	if (option.id === 'rogue') {
		dnd.selectedIndex = index;
	}

});
```

[Here's a demo of it in action.](https://codepen.io/cferdinandi/pen/pobzjZN)

## Browser compatibility

The `selectedIndex` and `options` properties work back to at least IE9.

The limiting factor here is the `Array.from()` method, which works in all modern browsers but has no IE support. [You can add support with a polyfill.](https://vanillajstoolkit.com/polyfills/arrayfrom/)