---
title: "How to upload and process an image file with vanilla JS"
date: 2021-06-21T10:30:00-04:00
draft: false
categories:
- Code
- HTML
- JavaScript
---

On Friday, we looked at [how to upload and process a JSON file with vanilla JS](/how-to-upload-and-process-a-json-file-with-vanilla-js/). Today, we're going to learn how to upload an image file with JavaScript instead.

Let's dig in!

(_If you haven't yet, [go read Friday's article](/how-to-upload-and-process-a-json-file-with-vanilla-js/) or today's won't make much sense._)

## Updating our form

For this article, we're going to change the type of files our `[type="file"]` input accepts.

We want to upload image files, so we'll use `image/*` as our allowed value. You could, if you prefer, instead specify specific file extensions as a comma-separated list, such as `.png, .jpg`.

```html
<form id="upload">
	<label for="file">File to upload</label>
	<input type="file" id="file" accept="image/*">

	<button>Upload</button>
</form>
```

For the demo, I also want to display the image in the UI, so I'm going to add an `#app` element we can render the image into.

```html
<div id="app"></div>
```

[You can download the source code for this lesson on GitHub.](https://gist.github.com/cferdinandi/69d794fe3ce668d8c89d551d664a0b19)

## Uploading an image with JavaScript

First, we're going to update our `handleSubmit()` function.

Instead of using the `FileReader.readAsText()` method, we'll use the `FileReader.readAsDataURL()` method, again passing in the file. This will process the file as a base64 encoded data URL.

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
	reader.readAsDataURL(file.files[0]);

}
```

Next, we'll use the `document.querySelector()` method to get the `#app` element and save it to a variable.

```js
let app = document.querySelector('#app');
```

In the `logFile()` event handler function, the `event.target.result` is a data URL string for the image file. You could save it to localStorage, send it to a server, and so on.

Because we want to show it in the UI, we'll use the `document.createElement()` method to create an `img` element. Then, we'll set the returned `event.target.result` from the `FileReader.readAsDataURL()` method as the `src` attribute.

Finally, we'll use the `Node.append()` method to inject it into the DOM.

```js
/**
 * Log the uploaded file to the console
 * @param {event} Event The file loaded event
 */
function logFile (event) {
	let str = event.target.result;
	let img = document.createElement('img');
	img.src = str;
	app.append(img);
	console.log(str);
}
```

And that's it!