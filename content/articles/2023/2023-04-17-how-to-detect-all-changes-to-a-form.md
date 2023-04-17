---
title: How to detect all changes to a form with vanilla JavaScript
date: 2023-04-17T10:30:00-04:00
draft: false
---

Last week, someone wrote me an email asking how to detect whenever the value of any field in a form was changed. They wanted to notify the user that they had unsaved changes, and every solution they found online used jQuery.

Fortunately, this is really easy to do with vanilla JavaScript.

The browser-native `input` event fires whenever the value of a form field is updated. [We can use _event delegation_](/when-should-you-use-event-delegation/) with the `Element.addEventListener()` method to detect all `input` events within a `form` element.

First, we'll use the `document.querySelector()` method to get our `form` and assign it to a variable.

```js
// You probably want to use a better/more specific selector here
let form = document.querySelector('form');
```

Then, we'll listen for `input` events on the `form`.

```js
// You probably want to use a better/more specific selector here
let form = document.querySelector('form');

// Listen for input events on the form
form.addEventListener('input', function (event) {
	// Do something...
});
```

Within the event listener callback function, the `event.target` property is the specific form field that was updated and triggered the listener.

```js
// Listen for input events on the form
form.addEventListener('input', function (event) {

	// The form field that triggered the event
	let field = event.target;
	
});
```