---
title: Working with forms with vanilla JavaScript
date: 2022-03-29T10:30:00-04:00
draft: false
categories:
- Accessibility
- Art and Science
- Business and Leadership
- Careers
- Code
- CSS
- Design and UX
- HTML
- JavaScript
- Technology
- Web Performance
- WordPress
- Vanilla Framework Demos
---

Today, we're going to look at some modern JavaScript methods for working with forms and form data. Let's dig in!

## The `FormData` object

The `FormData` object provides an easy way to serialize form fields into key/value pairs.

Use the `new FormData()` constructor to create a new FormData object, passing in the form to serialize as an argument. Form fields must have a `name` attribute to be included in the object. Otherwise, they're skipped. The `id` property doesn't count.

```html
<form id="post">

	<label for="title">Title</label>
	<input type="text" name="title" id="title" value="Go to the beach">

	<label for="body">Body</label>
	<textarea id="body" name="body">Soak up the sun and swim in the ocean.</textarea>

	<input type="hidden" name="userId" value="1">

	<button>Submit</button>

</form>
```

```js
// Get the form
let form = document.querySelector('#post');

// Get all field data from the form
// returns a FormData object
let data = new FormData(form);
```

The `FormData` object is an iterable.

You can loop through it using a `for...of` loop. Each `entry` is an array of key/value pairs.

```js
// logs...
// ["title", "Go to the beach"]
// ["body", "Soak up the sun and swim in the ocean."]
// ["userId", "1"]
for (let entry of data) {
	console.log(entry);
}
```

You can use array destructuring to assign the `key` and `value` to their own variables within the `for...of` loop.

```js
// logs "title", "Go to the beach", etc.
for (let [key, value] of data) {
	console.log(key);
	console.log(value);
}
```

## Getting the value of field with the `FormData` object

The `FormData.get()` method returns the value of the field in a form. Pass in the `name` property for the field as an argument.

```js
// Get the form
let form = document.querySelector('#post');

// Get all field data from the form
// returns a FormData object
let data = new FormData(form);

// Get the value of the "userId" field
let userId = data.get('userId');
```


## Reset all form fields

The `HTMLFormElement.reset()` method resets all of the fields in a form to their default values.

```js
// Get the form
let form = document.querySelector('#post');

// Reset all fields
form.reset();
```

Any user-entered values will be wiped out.

That typically means that the form fields will be empty after the `HTMLFormElement.reset()` method is run. But if any fields had a default value as part of the HTML, they're reset to that instead.

```html
<!-- 
	This field would have a value of "Go to the beach" after running the HTMLFormElement.reset() method
 -->
<label for="title">Title</label>
<input type="text" name="title" id="title" value="Go to the beach">
```