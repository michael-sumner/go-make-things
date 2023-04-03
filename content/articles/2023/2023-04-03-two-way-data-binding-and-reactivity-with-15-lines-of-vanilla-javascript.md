---
title: Two-way data binding and reactivity with 15 lines of vanilla JavaScript
date: 2023-04-03T10:30:00-04:00
draft: false
categories:
- Code
- Design and UX
- HTML
- JavaScript
---

Last week, I had a chat with one of my students in [my private Slack team](https://gomakethings.com/membership/) about how to keep two copies of the same form in sync with each other.

I shared a simple trick that uses JS Proxies and 15 lines of vanilla JS.

Let's dig in!

## The HTML

For this example, let's imagine we have two forms on our page. They both have the same fields in them, but they're in two totally different locations.

The `[name]` attributes for the fields are identical, but we're using unique IDs for the `input` and `textarea` elements, because IDs must be unique and only used once.

Each form also has a `[data-form-sync]` attribute that we'll hook into in our JavaScript.

```html
<form data-form-sync>

	<label for="title-1">Title</label>
	<input type="text" name="title" id="title-1" value="Go to the beach">

	<label for="body-1">Body</label>
	<textarea id="body-1" name="body">Soak up the sun and swim in the ocean.</textarea>

	<button>Submit</button>

</form>

<form data-form-sync>

	<label for="title-2">Title</label>
	<input type="text" name="title" id="title-2" value="Go to the beach">

	<label for="body">Body</label>
	<textarea id="body-2" name="body">Soak up the sun and swim in the ocean.</textarea>

	<button>Submit</button>

</form>
```

## What's two-way data binding?

For this challenge, we want to use _two-way data binding_.

What that means is that whenever one of our form fields is updated, we want to update some data object with its value. _And_, whenever the data object is updated, we want to update all corresponding fields with that value, too.

```js
// Each key in this object matches a field [name] in the form
// This object and the forms should always be in-sync
let data = {
	title: 'Go to the beach',
	body: 'Soak up the sun and swim in the ocean.'
};
```

## Proxies FTW!

To make this work, we can use a JavaScript Proxy. 

A Proxy object is a wrapper around an array or object that watches for changes to the object properties, and lets you run code in response.

We'll create a new Proxy with an empty object (`{}`) by using the `new Proxy()` constructor. We also need to pass in an object of _handler methods_ as a second argument. We'll pass in an empty object (`{}`) for now.

```js
// Create a new Proxy
let data = new Proxy({}, {});
```

Proxies have a handful of _trap methods_ that catch different types of object property changes.

For this challenge, we want to use the `set()` method, which runs whenever a property value is added or updated. For simplicity, we'll use the [object property shorthand syntax](/object-property-shorthand-values-with-vanilla-javascript/).

It receives the object, key to update, and value to use as arguments.

For now, we'll just implement the default object behavior: update the property value and `return true`.

```js
// Create a new Proxy
let data = new Proxy({}, {
	set (obj, key, value) {
		obj[key] = value;
		return true;
	}
});
```

## Binding fields to the data object

To update our fields whenever the data object is updated, we can use the `document.querySelectorAll()` method to find all of the fields whose `[name]` attribute has a value equal to the object `key` we're updating.

Then, we'll loop through each field, and update it's `value` property to match the new object property `value`.

```js
// Create a new Proxy
let data = new Proxy({}, {
	set (obj, key, value) {

		// Update the property
		obj[key] = value;

		// Find the matching fields in the DOM
		let fields = document.querySelectorAll(`[name="${key}"`);
		for (let field of fields) {
			field.value = value;
		}

		return true;

	}
});
```

Now, if we updated our `data` object, our form fields get automatically updated, too.

```js
// These automatically trigger a UI update
data.title = 'Hello, world!';
data.body = 'How are you today?';
```

## Binding the data object to the form fields

To keep both of our forms in sync, we need to update our `data` object whenever one of them is updated.

We can do that with an `input` event listener, which runs whenever a form field value is updated.

```js
// Event listener
document.addEventListener('input', function (event) {
	// A form field was updated...
});
```

Inside our callback function, we'll first use the `Element.prototype.closest()` method to make sure the field (or `event.target`) is inside a form with the `[data-form-sync]` attribute.

If not, we'll `return` early to end the function.

```js
// Event listener
document.addEventListener('input', function (event) {

	// Only run on our forms
	if (!event.target.closest('[data-form-sync]')) return;

});
```

Otherwise, we can update our `data` object. 

We'll use the field `name` property as the key, and the field value as the value. This update triggers our Proxy's handler to run, updating any other fields with the same name.

```js
// Event listener
document.addEventListener('input', function (event) {

	// Only run on our forms
	if (!event.target.closest('[data-form-sync]')) return;

	// Update the data object
	data[event.target.name] = event.target.value;

});
```

## See it in action

[Here's a demo you can play with.](https://codepen.io/cferdinandi/pen/jOvgZQM)

As you type or update fields in one field, the other stays in-sync. The demo code is 28 lines, but once you strip out comments, it's just 15 lines of vanilla JavaScript.