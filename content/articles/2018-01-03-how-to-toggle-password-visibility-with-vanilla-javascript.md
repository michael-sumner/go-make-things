---
categories:
- Code
- Design &amp; UX
- JavaScript
date: '2018-01-03'
permalink: /how-to-toggle-password-visibility-with-vanilla-javascript/
title: How to toggle password visibility with vanilla JavaScript
url: /2018/01/03/how-to-toggle-password-visibility-with-vanilla-javascript
---

Hiding passwords visibility in forms helps protect from people looking over your shoulder and reading your password, but greatly increases in the likelihood that someone will enter the wrong one.

Today, I want to show you how to implement a simple show/hide password toggle with vanilla JavaScript.

## The Form

Here's a simple form with a username and password. I've also added a checkbox users can click to reveal or hide their password.

```lang-html
<label for="username">Username</label>
<input type="text" name="username" id="username">

<label for="password">Password</label>
<input type="password" name="password" id="password">

<label for="show_password">
	<input type="checkbox" name="show_password" id="show_password">
	Show Password
</label>
```

## How this is going to work

When a user checks the `show_password` checkbox, we'll get the password field and change it's `type` from `password` to `text`. If they uncheck the box, we'll switch it back to `password`.

Yea, it's really that simple!

## The JavaScript

### Listening for changes

We'll use `addEventListener` to listen for `click` events on our `show_password` input. This will also detect changes submitted with a keyboard (as in, tabbing onto the checkbox and hitting the *enter* key).

We'll listen for all clicks on the document, and check to see if the clicked element was our `show_password` checkbox&mdash;a technique called [event delegation](/checking-event-target-selectors-with-event-bubbling-in-vanilla-javascript/).

Whenever a click event happens, we'll check to see if it has an ID of `show_password`. If not, we'll bail.

```lang-js
// Listen for click events
document.addEventListener('click', function (event) {

	// If the clicked element isn't our show password checkbox, bail
	if (event.target.id !== 'show_password') return;

}, false);
```

### Toggling password visibility

Next, we want to get the password field. If no field is found, we'll bail.

```lang-js
// Listen for click events
document.addEventListener('click', function (event) {

	// If the clicked element isn't our show password checkbox, bail
	if (event.target.id !== 'show_password') return;

	// Get the password field
	var password = document.querySelector('#password');
	if (!password) return;

}, false);
```

Next, we want to see if the checkbox is checked or not. We can do this with the `.checked` property on our `event.target`.

If it's `true`, the checkbox is checked. Otherwise, it's not.

```lang-js
// Listen for click events
document.addEventListener('click', function (event) {

	// If the clicked element isn't our show password checkbox, bail
	if (event.target.id !== 'show_password') return;

	// Get the password field
	var password = document.querySelector('#password');
	if (!password) return;

	// Check if the password should be shown or hidden
	if (event.target.checked) {
		// Checkbox is checked
	} else {
		// Checkbox is not checked
	}

}, false);
```

If it's checked, we'll change the password field input `type` to `text` to show it. Otherwise, we'll set it to `password`.

```lang-js
// Listen for click events
document.addEventListener('click', function (event) {

	// If the clicked element isn't our show password checkbox, bail
	if (event.target.id !== 'show_password') return;

	// Get the password field
	var password = document.querySelector('#password');
	if (!password) return;

	// Check if the password should be shown or hidden
	if (event.target.checked) {
		// Show the password
		password.type = 'text';
	} else {
		// Hide the password
		password.type = 'password';
	}

}, false);
```

[Here's a working demo for you to check out.](https://jsfiddle.net/cferdinandi/pgqL3tzj/2/)

Tomorrow, we'll look at how to toggle multiple password fields and make this code a bit more reusable.