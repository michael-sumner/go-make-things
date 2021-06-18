---
title: "How to upload and process a JSON file with vanilla JS"
date: 2021-06-18T10:30:00-04:00
draft: false
categories:
- Code
- HTML
- JavaScript
---

This morning, a student of mine asked me how to use JavaScript to import a JSON file and do something with the data in it. I thought I'd write an article about it, because it's a really cool browser feature!

Let's dig in.

## An example

For this article, we're going to look at a `form` element with the `#upload` ID.

It contains a single field, `#file`, with a `type` of `file`. Fields with this type allow you specify an `accept` parameter, with a comma-separated list of accepted file types. For our purposes, we're going to restrict our uploads to only `.json` files.

```html
<form id="upload">
	<label for="file">File to upload</label>
	<input type="file" id="file" accept=".json">

	<button>Upload</button>
</form>
```

I'll be using a simple `wizard.json` file for testing.

```json
{
	"name": "Merlin",
	"age": "old AF",
	"spells": ["Dancing brooms", "Transform into animal"]
}
```

[You can download the source code for today's lesson on GitHub.](https://gist.github.com/cferdinandi/ed2d0b1cf04e6b860e8a70ed21f6b33a)

## Listening for uploads

To get started, we're going to use some [DOM manipulation fundamentals](https://vanillajsguides.com/dom-manipulation/) to detect when the user submits a file.

First, we'll use the `document.querySelector()` method to get the `#upload` and `#file` elements, and save them to the `form` and `file` variables, respectively.

```js
// Get the form and file field
let form = document.querySelector('#upload');
let file = document.querySelector('#file');
```

Then, we'll use the `Element.addEventListener()` method to listen for `submit` events on the `form` element. We'll use a `handleSubmit()` function as the callback function.

```js
// Listen for submit events
form.addEventListener('submit', handleSubmit);
```

Inside the `handleSubmit()` function, the first thing we'll do is use `event.preventDefault()` to stop the form from reloading the page.

```js
/**
 * Handle submit events
 * @param  {Event} event The event object
 */
function handleSubmit (event) {

	// Stop the form from reloading the page
	event.preventDefault();
}
```

Next, we'll check that the `file` field has an actual file to process using the `file.value` property, then checking its `length` property.

If there's no file, we'll use the `return` operator to end the callback function.

```js
/**
 * Handle submit events
 * @param  {Event} event The event object
 */
function handleSubmit (event) {

	// Stop the form from reloading the page
	event.preventDefault();

	// If there's no file, do nothing
	if (!file.value.length) return;

}
```

Now, we're ready to actually upload the file.

## Uploading and processing the JSON file with JavaScript

The FileReader API is an asynchronous set of methods that let you process and read the content of files.

The first thing we're going to do is use the `new FileReader()` constructor to create a new FileReader instance, and assign it to the `reader` variable.

```js
/**
 * Handle submit events
 * @param  {Event} event The event object
 */
function handleSubmit (event) {

	// Stop the form from reloading the page
	event.preventDefault();

	// If there's no file, do nothing
	if (!file.value.length) return;

	// Create a new FileReader() object
	let reader = new FileReader();

}
```

To actually read the file, we can use the `FileReader.readAsText()` method.

We call it on our `reader`, and pass in the file to read as an argument. We can access the file using the `files` property on our `file` field. This returns an array (since `[type="file"]`) inputs can support multiple files.

We'll use bracket notation to grab the first (and in our case, only) file.

```js
/**
 * Handle submit events
 * @param  {Event} event The event object
 */
function handleSubmit (event) {

	// Stop the form from reloading the page
	event.preventDefault();

	// If there's no file, do nothing
	if (!file.value.length) return;

	// Create a new FileReader() object
	let reader = new FileReader();

	// Read the file
	reader.readAsText(file.files[0]);

}
```

This API is asynchronous, so we need to attach an `onload` event handler to the `reader` object. This will run whenever the `reader` reads a file.

This needs to be declared _before_ we actually read the file.

To keep our code a bit more organized, we'll use a named function: `logFile()`. We don't want it to run immediately, so we leave the parentheses (`()`) off of it when assigning it to the event.

```js
/**
 * Handle submit events
 * @param  {Event} event The event object
 */
function handleSubmit (event) {

	// Stop the form from reloading the page
	event.preventDefault();

	// If there's no file, do nothing
	if (!file.value.length) return;

	// Create a new FileReader() object
	let reader = new FileReader();

	// Setup the callback event to run when the file is read
	reader.onload = logFile;

	// Read the file
	reader.readAsText(file.files[0]);

}
```

The `logFile()` function receives an implicit `event` argument from the FileReader object, so we'll add it as a parameter.

The `event.target.result` property will be a stringified version of the uploaded JSON file. We can pass it into the `JSON.parse()` method to get a JSON object form it.

For our purposes, we'll log both the string and parsed JSON. You might want to use properties from the JSON file in your app, save it `localStorage`, or do something else with it (like send it along to an API).

```js
/**
 * Log the uploaded file to the console
 * @param {event} Event The file loaded event
 */
function logFile (event) {
	let str = event.target.result;
	let json = JSON.parse(str);
	console.log('string', str);
	console.log('json', json);
}
```

Now, whenever a user submits a JSON file, our code will read it and log it to the console.