---
title: "Abstracting a vanilla JS autocomplete component"
date: 2021-05-07T10:30:00-04:00
draft: false
categories:
- Code
- HTML
- JavaScript
---

Yesterday, we wrote [a simple progressively enhanced autocomplete component](/creating-an-ajax-autocomplete-component-with-html-and-vanilla-js/) using the `datalist` element and some vanilla JS. Today, I wanted to look at how to abstract it to work with multiple components and endpoints.

Let's dig in!

(_You should go read yesterday's article first, if you haven't already, or this one won't make much sense._)

## Updating the HTML

First, I don't want to hard code the endpoint for my data into the JavaScript.

I'll add a `[data-autocomplete]` attribute to my autocomplete field, and set the endpoint for its data as its value.

```html
<label for="wizards">Who is the best wizard?</label>
<input type="text" id="wizards" data-autocomplete="https://gomakethings.com/demos/wizards.json">
```

## Updating the JavaScript

Instead of getting a specific field, I'll use `document.querySelectorAll()` to get all fields with the `[data-autocomplete]` attribute.

```js
// Get the autocomplete fields
let fields = document.querySelectorAll('[data-autocomplete]');
```

Then, I'll loop through each field, fetch its data, and progressively enhanced it just like we did yesterday. I'll need to also pass the `field` in to `renderDatalist()` as an argument.

```js
// Loop through each field
for (let field of fields) {

	// Get the endpoint
	let endpoint = field.getAttribute('data-autocomplete');

	// Fetch the data and render the datalist element
	fetch(endpoint).then(function (response) {
		if (response.ok) {
			return response.json();
		}
		throw response;
	}).then(function (data) {
		renderDatalist(data, field);
	}).catch(function (error) {
		console.warn(error);
	});

}
```

Inside the `renderDatalist()` method, we need to abstract a few more things.

First, we'll use the `field.id` as part of the `datalist.id` value instead of just hard-coding it as `wizards-data`. We'll also replace the `wizards` field variable with the `field`.

And in the `for...of` loop, we'll change `wizard` to `item`.

```js
/**
 * Create and render the datalist element
 * @param {Array} data  The data to use for the list
 * @param {Node}  field The field to associate the datalist with
 */
function renderDatalist (data, field) {

	// Create the datalist element
	let datalist = document.createElement('datalist');
	datalist.id = `${field.id}-data`;
	field.setAttribute('list', datalist.id);

	// Create fragment for option elements
	let fragment = document.createDocumentFragment();

	// Create list options
	for (let item of data) {
		let option = document.createElement('option');
		option.textContent = item;
		fragment.append(option);
	}

	// Add options to datalist
	datalist.append(fragment);

	// Inject into the DOM
	field.after(datalist);

}
```

Now, we can add multiple elements to the page, and progressively enhance each into its own autocomplete component with its own endpoint.

[Here's a demo.](https://codepen.io/cferdinandi/pen/XWMJeeN)