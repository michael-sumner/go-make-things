---
title: How to get, set, and remove attributes and properties with vanilla JavaScript
date: 2022-01-19T10:30:00-05:00
draft: false
categories:
- Code
- HTML
- JavaScript
---

Today, we're going to look at how to get, set, and remove attributes and properties with vanilla JS. We'll also learn the difference between attributes and properties, and some "gotchas" when working with them.

Let's dig in!

## The `Element.*Attribute()` methods

You can use the `Element.getAttribute()`, `Element.setAttribute()`, `Element.removeAttribute()`, and `Element.hasAttribute()` methods to get, set, remove, and check for the existence of attributes (including data attributes) on an element, respectively.

If an attribute does not exist on an element, the `Element.getAttribute()` method returns `null`.

```js
let elem = document.querySelector('#lunch');

// Get the value of the [data-sandwich] attribute
let sandwich = elem.getAttribute('data-sandwich');

// Set a value for the [data-sandwich] attribute
elem.setAttribute('data-sandwich', 'turkey');

// Remove the [data-chips] attribute
elem.removeAttribute('data-chips');

// Check if an element has the `[data-drink]` attribute
if (elem.hasAttribute('data-drink')) {
	console.log('Add a drink!');
}
```

[Here's a demo.](https://codepen.io/cferdinandi/pen/VwMOjGz?editors=1111)

## Element properties

HTML elements have dozens of properties that you can access directly.

Some of them are _read only_, meaning you can get their value but not set it. Others can be used to both read and set values. [You can find a full list on the Mozilla Developer Network.](https://developer.mozilla.org/en-US/docs/Web/API/element)

```js
let elem = document.querySelector('#main');

// Get the ID of the element
// returns "main"
let id = elem.id;

// Set the ID of the element
elem.id = 'secondary';

// Get the parentNode of the element
// This property is read-only
let parent = elem.parentNode;
```

[Here's another demo.](https://codepen.io/cferdinandi/pen/ExwzydK?editors=1111)

## What's the difference between attributes and properties?

In JavaScript, an element has attributes and properties. The terms are often used interchangeably, but they're actually two separate things.

An _attribute_ is the _initial state_ when rendered in the DOM. A _property_ is the _current state_.

In most cases, attributes and properties are kept in-sync automatically. For example, when you use `Element.setAttribute()` to update an ID attribute, the `id` property is updated as well.

```html
<p>Hello</p>
```

```js
let p = document.querySelector('p');

// Update the ID
p.setAttribute('id', 'first-paragraph');

// These both return "first-paragraph"
let id1 = p.getAttribute('id');
let id2 = p.id;
```

However, user-changeable form properties&mdash;noteably, `value`, `checked`, and `selected`&mdash;are _not_ automatically synced.

```html
<label for="greeting">Greeting</label>
<input type="text" id="greeting">
```

```js
let greeting = document.querySelector('#greeting');

// Update the value
greeting.setAttribute('value', 'Hello there!');

// If you haven't made any updates to the field, these both return "Hello there!"
// If you HAVE updated the field, val1 returns whatever was typed in the field instead
let val1 = greeting.value;
let val2 = greeting.getAttribute('value');
```

If you try to update the `value` property directly, that _will_ update the UI.

```js
greeting.value = 'Hello there!';
```

This allows you to choose different approaches depending on whether you want to overwrite user updates or not.

If you want to update a field, but _only if_ the user hasn't made any changes, use `Element.setAttribute()`. If you want to overwrite anything they've done, use the `value` property.

[Here's one last demo.](https://codepen.io/cferdinandi/pen/abLrZPm?editors=1111)