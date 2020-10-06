---
title: "How to work with multiselect elements in vanilla JS"
date: 2020-10-06T10:30:00-04:00
draft: false
categories:
- Accessibility
- Code
- JavaScript
---

On Friday, we looked at [how to get and set values in `select` elements](/how-to-get-and-set-the-value-of-a-select-menu-with-vanilla-js/). Then, yesterday, we learned [how to loop through all of the `options` in a select element and look at its properties](/how-to-get-and-set-the-value-of-a-select-menu-using-an-id/).

Today, we're going to learn how to work with multiselect elements. Let's dig in.

## An example

Let's say you have a select element like this.

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

But instead of picking just one option, you want users to be able to select multiple options. You can do that by adding the `multiple` property to your `select` element.

_**Note:** For things like this, checkboxes are typically a better choice. Users often find multi-select elements confusing and unintuitive. They create usability issues._

```html
<label for="dnd">What are the best classes in D&D?</label>
<select id="dnd" multiple>
	<option value="bard">Bard</option>
	<option value="fighter">Fighter</option>
	<option value="druid">Druid</option>
	<option value="paladin">Paladin</option>
	<option value="rogue">Rogue</option>
	<option value="wizard">Wizard</option>
</select>
```

Now, a user can hold the shift button while clicking (touchscreen devices surface a different UI for these) to select multiple items.

[Here's a demo.](https://codepen.io/cferdinandi/pen/oNLvJZV)

## Getting the value of a multi-select element

The problem with a multi-select element (beyond their general usability issues) is that there's no one-line property to get all of the selected values.

The `value` property only returns the first selected value rather than all values.

```js
// Get the select element
var dnd = document.querySelector('#dnd');

// Get it's value
// This returns the first selected value, not all selected values
dnd.value;
```

[Here's an updated demo.](https://codepen.io/cferdinandi/pen/XWKrogY)

To get all selected values, we need to [use the technique we learned yesterday](/how-to-get-and-set-the-value-of-a-select-menu-using-an-id/) to loop through each of the options and check if it's selected.

First, let's get our `HTMLOptionsCollection` and turn it into an array with the `Array.from()` method.

```js
// Convert all of the options to an array
var selected = Array.from(dnd.options);
```

Then, using [the `Array.filter()` method](/what-array.filter-does-in-vanilla-js/) and the `selected` property, we can create a new array containing only the `option` elements that have been selected.

```js
// Convert all of the options to an array
// Then, get an array of only the options that are selected
var selected = Array.from(dnd.options).filter(function (option) {
	return option.selected;
});
```

Finally, we'll use [the `Array.map()` method](/what-array.map-does-in-vanilla-js/) to create an array with the `value` of each selected item. Because `Array.filter()` returns an array, we can chain `Array.map()` to it.

```js
// Convert all of the options to an array
// Then, get an array of only the options that are selected
// Then, get an array of the selected option values
var selected = Array.from(dnd.options).filter(function (option) {
	return option.selected;
}).map(function (option) {
	return option.value;
});
```

[Here's a demo of this approach in action.](https://codepen.io/cferdinandi/pen/MWegZVV)

## Setting or updating the values in a multi-select element

Let's say you had an array of values, and you wanted to update your multi-select with those values.

```js
// Bard and Wizard are the best classes in D&D, obvs
var selected = ['bard', 'wizard'];
```

Like in yesterday's article, we're going to loop through each `option` element with `Array.forEach()`.

We'll check to see if that items `value` is in the `selected` array. If it is, we'll use the `option.selected` property to `true`. Otherwise, we'll set it to `false` to remove any existing selections.

```js
// Get an array of option elements and loop through them
Array.from(dnd.options).forEach(function (option) {

	// If the option's value is in the selected array, select it
	// Otherwise, deselect it
	if (selected.includes(option.value)) {
		option.selected = true;
	} else {
		option.selected = false;
	}

});
```

Because the `Array.includes()` method returns a boolean, you could shorten this by setting the `option.selected` value to whatever the method returns.

```js
// Get an array of option elements and loop through them
Array.from(dnd.options).forEach(function (option) {

	// If the option's value is in the selected array, select it
	// Otherwise, deselect it
	option.selected = selected.includes(option.value);

});
```

[Here's a demo of updating values based on an array of data.](https://codepen.io/cferdinandi/pen/jOrNXxG)

## Browser compatibility

The `Array.from()` method works in all modern browsers, but not IE. [You can polyfill it](https://vanillajstoolkit.com/polyfills/arrayfrom/), or use [the `Array.prototype.slice.call()` hack](/using-array-methods-with-nodelists-in-vanilla-js/).

```js
// Converts an array-like object into an array
Array.prototype.slice.call(dnd.options);
```

The `Array.includes()` method in a newer method that works in all modern browsers, but not IE. [You can polyfill it](https://vanillajstoolkit.com/polyfills/arrayincludes/), or use the `Array.indexOf()` method instead.

```js
// If the option's value is in the selected array, select it
// Otherwise, deselect it
if (selected.indexOf(option.value) > -1) {
	option.selected = true;
} else {
	option.selected = false;
}
```