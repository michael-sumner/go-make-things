---
title: How to get and set a date object from an input with vanilla JavaScript
date: 2022-04-06T10:30:00-04:00
draft: false
categories:
- Code
- HTML
- JavaScript
---

Yesterday, we learned [how to get the value of an input as a number with JavaScript](/how-to-get-the-value-of-an-input-as-a-number-with-vanilla-javascript/). Today, we're going to learn how get a `Date` object instead.

Let's dig in!

## An example

Let's imagine you have an `input` element with a `[type="date"]` attribute. 

This creates a browser-native date picker that works in all modern browsers. The `value` property of the `input` will return the selected date in `YYYY-MM-DD` format.

```html
<label for="date">Pick a date</label>
<input type="date" name="date" id="date">
```

Whenever the user updates the value of the field, you want to get the value of the `field` as a `Date` object.

```js
let field = document.querySelector('#date');

// Handle date changes
date.addEventListener('input', function () {
	// ...
});
```

Let's look at two ways you can do that.

## Using the `new Date()` constructor

The most common way to do this is to pass the `field.value` into a `new Date()` constructor to create a new object.

There's a bit of a trick with this approach though. Let's say you selected April 7, 2022 from the date picker. If you pass the `field.value` into `new Date()`, depending on where in the world you live, the returned `Date` object may actually be for April _6_, 2022.

```js
// Get the date
let date = new Date(field.value);
```

[Here's a demo.](https://codepen.io/cferdinandi/pen/zYpRgLE)

This happens because `YYYY-MM-DD` format date strings use UTC/GMT as their timezone instead of your local timezone. 

To work around this, we need to pass in a _time string_ with the _date string_. We can use midnight, `T00:00`, like this.

```js
// Get the date
let date = new Date(`${field.value}T00:00`);
```

[Here's an updated demo.](https://codepen.io/cferdinandi/pen/xxpYvMW)

There's another, simpler way though!

## The `valueAsDate` property

Just like [the `valueAsNumber` property we learned about yesterday](/how-to-get-the-value-of-an-input-as-a-number-with-vanilla-javascript/#use-the-valueasnumber-property), the `valueAsDate` property gets the value of an `input` as a `Date` object.

```js
let date = field.valueAsDate;
```

Unfortunately, it runs into the same issue that passing the `field.value` without a time string does: the date is often a day earlier. [Here's another demo.](https://codepen.io/cferdinandi/pen/WNdMVBw)

A more reliable use for the `valueAsDate` property is _setting_ the default value of a `[type="date"]` field. For example, this will create a `Date` object for the current moment in local time, and set the `field` value to it.

```js
// Set the field value to the current date
field.valueAsDate = new Date();
```

[Here's one final demo.](https://codepen.io/cferdinandi/pen/MWrQNNo)