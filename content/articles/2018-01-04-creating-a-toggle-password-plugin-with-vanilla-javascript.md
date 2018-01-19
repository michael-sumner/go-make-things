---
categories:
- Code
- Design &amp; UX
- JavaScript
date: '2018-01-04'
permalink: /creating-a-toggle-password-plugin-with-vanilla-javascript/
title: Creating a toggle password plugin with vanilla JavaScript
url: /2018/01/04/creating-a-toggle-password-plugin-with-vanilla-javascript
---

Yesterday, we looked at [how to toggle password visibility with vanilla JS](https://gomakethings.com/how-to-toggle-password-visibility-with-vanilla-javascript/). Today, we're going to convert our script into a plugin that you can reuse across pages and sites.

## Our Script

If you didn't read yesterday's article, here's the markup for our form.

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

And here's our final script.

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

## Abstracting our selectors

The challenge with the script we wrote yesterday is that it requires specific selectors&mdash;`#show_password` and `#password`&mdash;to work.

Ideally, we'd like to use this on different forms that may not use the same field IDs. We might also want to show the contents of multiple password fields in a single form (for example, a change password form that asks you to confirm your new password).

To do that, we need to use a more abstract selector for our checkbox, and dynamically get the password field(s) that we want to show or hide.

### The Markup

To achieve this, we'll use a data attribute, `[data-show-password]`, and use the selector for our password field(s) as it's value.

```lang-html
<label for="password">Password</label>
<input type="password" name="password" id="password">

<label for="show_password">
	<input type="checkbox" name="show_password" id="show_password" data-show-password="#password">
	Show Password
</label>
```

### The JavaScript

In our JavaScript file, we'll change our event listener to check for the `[data-show-password]` attribute using the `hasAttribute()` method.

```lang-js
// Listen for click events
document.addEventListener('click', function (event) {

	// If the clicked element isn't our show password checkbox, bail
	if (!event.target.hasAttribute('data-show-password')) return;

	// ...

}, false);
```

If it's our checkbox, we'll use the attribute value (via the `getAttribute()` method) to get our password field.

```lang-js
// Listen for click events
document.addEventListener('click', function (event) {

	// If the clicked element isn't our show password checkbox, bail
	if (!event.target.hasAttribute('data-show-password')) return;

	// Get the password field
	var password = document.querySelector(event.target.getAttribute('data-show-password'));
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

[Here's a working demo.](https://jsfiddle.net/cferdinandi/pgqL3tzj/7/)

## Toggling multiple password fields

To toggle multiple password fields, we need to make just a few small tweaks.

First, we'll use `querySelectorAll()` to get all all matching selectors instead of just one.

```lang-js
// Listen for click events
document.addEventListener('click', function (event) {

	// If the clicked element isn't our show password checkbox, bail
	if (!event.target.hasAttribute('data-show-password')) return;

	// Get the password field
	var password = document.querySelectorAll(event.target.getAttribute('data-show-password'));
	if (password.length < 1) return;

	// ...

}, false);
```

Next, we need to loop through each result instead of just running our code.

```lang-js
// Listen for click events
document.addEventListener('click', function (event) {

	// If the clicked element isn't our show password checkbox, bail
	if (!event.target.hasAttribute('data-show-password')) return;

	// Get the password field
	var password = document.querySelectorAll(event.target.getAttribute('data-show-password'));
	if (password.length < 1) return;

	// Loop through each field
	for (var i = 0; i < password.length; i++) {

		// Check if the password should be shown or hidden
		if (event.target.checked) {
			// Show the password
			password[i].type = 'text';
		} else {
			// Hide the password
			password[i].type = 'password';
		}

	}

}, false);
```

Now, we can toggle multiple password fields in a form by adding a more generic selector for our password fields (for example, a `.passwords` class).

```lang-html
<label for="password">Password</label>
<input type="password" name="password" id="password" class="password">

<label for="confirm_password">Confirm Password</label>
<input type="password" name="confirm_password" id="confirm_password" class="password">

<label for="show_password">
	<input type="checkbox" name="show_password" id="show_password" data-show-password=".password">
	Show Password
</label>
```

[Here's a demo with multiple password fields.](https://jsfiddle.net/cferdinandi/pgqL3tzj/9/)