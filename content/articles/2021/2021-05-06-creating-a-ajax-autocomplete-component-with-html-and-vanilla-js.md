---
title: "Creating an Ajax autocomplete component with HTML and vanilla JS"
date: 2021-05-06T10:30:00-04:00
draft: false
categories:
- Code
- Design and UX
- HTML
- JavaScript
---

Yesterday on Twitter, [Eric Scheid asked me](https://twitter.com/ericscheid/status/1390160356526333952)...

> do you have a sample vanilla js implementation of a type-ahead ajax-driven drop-down menu?
> ...
> (have 15,000 rows of label/value pairs, don't want to hardcode that into a `<datalist>`)

Today, we're going to look at how you can pair a `datalist` element with an ajax `fetch()` call to create a simple, progressively enhanced autocomplete component.

Let's dig in!

## How HTML-native autocomplete components work

HTML provides a native way to create autocomplete components.

Create a label and input like you normally would. Then create a `datalist` element, and add an `option `element for each autocomplete choice.

Give the `datalist` an ID. Add the `list` property to your input with a value equal to your `datalist` ID.

```html
<label for="wizards">Who's the best wizard?</label>
<input type="text" id="wizards" name="wizards" list="wizards-list">
<datalist id="wizards-list">
	<option>Harry Potter</option>
	<option>Hermione</option>
	<option>Dumbledore</option>
	<option>Merlin</option>
	<option>Gandalf</option>
</datalist>
```

[Here's a demo.](https://codepen.io/cferdinandi/pen/BMEVrx)

This works great, but as Eric noted, if you have a lot of data from some external source, hard-coding all of that (and keeping it up-to-date) can be an impossible task.

That's where `fetch()` comes in.

_**Quick aside:** if your site generation tool lets you make API calls and cache the result, I'd recommend generating your datalist on the server that way. For example, [Hugo, my static-site generator of choice](/series/hugo-and-static-site-generators/), lets me make Ajax calls and render markup from them._

## Progressively enhancing an input into an autocomplete component

For this project, let's start with our `label` and `input`.

```html
<label for="wizards">Who is the best wizard?</label>
<input type="text" id="wizards">
```

If our JavaScript fails, we still have a completely usable field, just without any autocomplete functionality.

Next, we can [use the `fetch()` method](/how-to-use-the-fetch-api-with-vanilla-js/) to get a list of autocomplete options from an API or endpoint. For this demo, I have a simple JSON file with an array of wizards.

```json
["Neville", "Hermione", "Harry Potter", "Dumbledore", "Gandalf the Gray", "Radagast", "Merlin"]
```

Once we get data back from the API, we'll pass it into a `renderDatalist()` method that will do the heavy lifting for us.

```js
// Fetch the data and render the datalist element
fetch('https://gomakethings.com/demos/wizards.json').then(function (response) {
	if (response.ok) {
		return response.json();
	}
	throw response;
}).then(function (data) {
	renderDatalist(data);
}).catch(function (error) {
	console.warn(error);
});
```

## Creating a `datalist` element from API data

Insider the `renderDatalist()` function, we'll use [the `document.createElement()` method](/creating-a-new-element-with-vanilla-js/) to create a `datalist`.

We'll add a unique ID to it: `#wizards-data`. Then, we'll add the `list` attribute to the `#wizards` field and assign the newly created `datalist.id` as its value.

```js
/**
 * Create and render the datalist element
 * @param  {Array} data  The data to use for the list
 */
function renderDatalist (data) {

	// Create the datalist element
	let datalist = document.createElement('datalist');
	datalist.id = 'wizards-data';
	wizards.setAttribute('list', datalist.id);

}
```

Now we're ready to create `option` elements from our data.

For performance reasons, let's [create a document fragment](/two-more-ways-to-create-html-from-an-array-of-data-with-vanilla-js/#creating-a-fragment) to add our options to. We _could_ use `innerHTML`, but since we're accessing API data, this [creates a risk of cross-site scripting attacks](/how-to-sanitize-third-party-content-with-vanilla-js-to-prevent-cross-site-scripting-xss-attacks/), so this method will be more secure.

```js
/**
 * Create and render the datalist element
 * @param  {Array} data  The data to use for the list
 */
function renderDatalist (data) {

	// Create the datalist element
	let datalist = document.createElement('datalist');
	datalist.id = 'wizards-data';
	wizards.setAttribute('list', datalist.id);

	// Create fragment for option elements
	let fragment = document.createDocumentFragment();

}
```

Next, we'll use [a `for...of` loop](/the-for...of-loop-in-vanilla-js/) to loop through our array of wizards.

For each one, we'll again use `document.createElement()`, this time to create an `option` element. We'll set the `wizard` as its value using the `textContent` property, and then use [the `ParentNode.append()` method](/adding-elements-to-the-end-of-a-group-with-vanilla-js/) to add it to our `fragment`.

```js
/**
 * Create and render the datalist element
 * @param  {Array} data  The data to use for the list
 */
function renderDatalist (data) {

	// Create the datalist element
	let datalist = document.createElement('datalist');
	datalist.id = 'wizards-data';
	wizards.setAttribute('list', datalist.id);

	// Create fragment for option elements
	let fragment = document.createDocumentFragment();

	// Create list options
	for (let wizard of data) {
		let option = document.createElement('option');
		option.textContent = wizard;
		fragment.append(option);
	}

}
```

## Injecting our elements into the DOM

When we're done, we can `append()` the `fragment` inside our `datalist`, then use [the `Node.after()` method](/injecting-one-element-after-another-with-vanilla-js/) to inject the `datalist` element into the DOM immediately after the `wizards` field.

```js
/**
 * Create and render the datalist element
 * @param  {Array} data  The data to use for the list
 */
function renderDatalist (data) {

	// Create the datalist element
	let datalist = document.createElement('datalist');
	datalist.id = 'wizards-data';
	wizards.setAttribute('list', datalist.id);

	// Create fragment for option elements
	let fragment = document.createDocumentFragment();

	// Create list options
	for (let wizard of data) {
		let option = document.createElement('option');
		option.textContent = wizard;
		fragment.append(option);
	}

	// Add options to datalist
	datalist.append(fragment);

	// Inject into the DOM
	wizards.after(datalist);

}
```

Now, our humble `input` has been progressively enhanced into an autocomplete component with some data we got form an API.

[Here's a demo so you can try it out yourself.](https://codepen.io/cferdinandi/pen/KKWKrKW)

Tomorrow, we'll take a look at how we can abstract this so it can be used multiple times on a page, or across different projects, without having to modify the core code.