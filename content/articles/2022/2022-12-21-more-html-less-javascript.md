---
title: More HTML, less JavaScript
date: 2022-12-21T10:30:00-04:00
draft: false
categories:
- Accessibility
- Code
- Design and UX
- HTML
- JavaScript
- Web Performance
---

Yesterday, I mentioned how [a newsletter signup form was loading the entirety of React](/using-a-wrecking-ball-for-a-problem-that-requires-hammer/) just to render a form and submit it to an API. I also provided a tiny vanilla JS alternative.

But as at least one reader pointed out, rendering the form with JavaScript is also completely unnecessary and introduces more fragility into the setup.

Today, I wanted to talk about a ~~better~~ more resilient approach: more HTML, and less JavaScript.

## Load the form as static HTML

To start, the form can be loaded as plain old HTML.

```html
<form>
	<label for="email">Enter your email</label>
	<input type="email" id="email">
	<button>Subscribe</button>
</form>
```

If there's any CSS that goes along with it, you can include that in an external stylesheet, or inline it directly in the HTML.

```html
<!-- This works -->
<link rel="stylesheet" type="text/css" href="path/to/the/styles.css">

<!-- So does this -->
<style type="text/css">
	/* The CSS */
</style>
```

If it was a form built for my own site or app, I'd include it in my main stylesheet. For a third-party plugin, I _might_ inline it on just the page where it was used if there wasn't much of it.

## Submit the form to a server by default

If you're newer to web development, you might not realize this, but... forms don't need JavaScript to work!

Every modern tutorial (including most of the ones I create) using JavaScript to handle form submission. But by default, forms send a `GET` request to whatever URL is included as the value of the `action` attribute, or the current URL if none is provided. If you include a `method` attribute, it will use that method instead.

You know the `event.preventDefault()` method in every ajax form handler? That's to stop the form from doing what it normally does.

A more resilient form would use a server-side endpoint that can receive form data and process it. For our example form, let's add an `action` property. We want to use a `POST` method for this form, so we'll add a `method` attribute, too.

For this to work, each field also needs a `name` property.

```html
<form action="path/to/the/endpoint.php" method="POST">
	<label for="email">Enter your email</label>
	<input type="email" id="email" name="email">
	<button>Subscribe</button>
</form>
```

In this example, I'm pointing to a PHP file that handles form submissions. You could alternatively [use a Cloudflare Worker](https://vanillajsguides.com/serverless) or Node endpoint or some other solution.

In the server-side code, you can check to make sure all of the required data was provided and valid, and then process the signup.

You can then redirect the user to a different URL based on whether they were successful or not. Here's a PHP example.

```php
<?php 

// if the form is valid
if ($valid) {
	header('Location: https://gomakethings.com/newsletter-success/');
	exit;
}

// Otherwise, send them to an error page
header('Location: https://gomakethings.com/newsletter-error/');
exit;
```

## Enhancing with JavaScript

Once you have functional server-side form handling, you can layer in JavaScript _as an enhancement_.

For starters, I would listen for form submissions, stop the form from doing it's default thing, and validate that there are no errors in the form fields.

```js
// Get the form and error message elements
let form = document.querySelector('form');
let announce = form.querySelector('[role="status"]');

// Handle submit events
function submitHandler (event) {

	// Stop the form from reloading the page
	event.preventDefault();

	// Validate the email field
	if (!form.email.value) {
		announce.textContent = 'Please include a valid email address.';
	}

}

// Listen for submit events
form.addEventListener('submit', submitHandler);
```

Assuming everything is good, you can then submit to the same server-side endpoint that the form would normally `POST` to. 

You can use the `form.action` property to get the value of the `action` endpoint from the `form` element itself. Include the fields as a stringified object for the `body` property.

We'll also include a `headers` object, with an `Accept` property of `application/json`.

```js
// Handle submit events
function submitHandler (event) {

	// Stop the form from reloading the page
	event.preventDefault();

	// Validate the email field
	if (!form.email.value) {
		announce.textContent = 'Please include a valid email address.';
	}

	// Submit the form
	fetch(form.action, {
		method: 'POST',
		body: JSON.stringify({email: form.email.value}),
		headers: {
			'Accept': 'application/json'
		}
	});

}
```

The sent data looks the same to the server as if the form had been sent "the old fashioned way." You don't need to make any changes to how you validate or handle the data.

You can check if the data was sent with Ajax or a traditional form submission by looking for that `Accept` header. Here's what that looks like in PHP.

```php
<?php

/**
 * Check if request is Ajax
 * @return boolean If true, request is ajax
 */
function is_ajax () {
	if (empty($_SERVER['HTTP_ACCEPT'])) return false;
	if (strtolower($_SERVER['HTTP_ACCEPT']) === 'application/json') return true;
	return false;
}
```

For an Ajax submission, you would typically send a response object back instead of redirecting. You _could_ include the redirect URL as part of the response, though, if you wanted to.

```php
<?php

// If ajax, respond
if (is_ajax()) {
	http_response_code(200);
	die(json_encode(array(
		'msg' => 'You joined the list!',
		'redirect' => 'https://gomakethings.com/newsletter-success'
	)));
}

// If redirect
header('Location: https://gomakethings.com/newsletter-success');
exit;
```

### Handling API responses

Once you get a response back from the API, you can render the response (in this example, the `msg`) in the UI.

```js
// Submit the form
fetch(form.action, {
	method: 'POST',
	body: JSON.stringify({email: form.email.value}),
	headers: {
		'Accept': 'application/json'
	}
}).then(function (response) {
	return response.json();
}).then(function (data) {
	announce.textContent = data.msg;	
}).catch(function (error) {
	announce.textContent = 'Something went wrong. Please try again.';
});
```

You could also redirect to the `redirect` URL, if you'd prefer.

```js
// Submit the form
fetch(form.action, {
	method: 'POST',
	body: JSON.stringify({email: form.email.value}),
	headers: {
		'Accept': 'application/json'
	}
}).then(function (response) {
	return response.json();
}).then(function (data) {
	announce.textContent = data.msg;
	if (data.redirect) {
		window.location.href = data.redirect;
	}
}).catch(function (error) {
	announce.textContent = 'Something went wrong. Please try again.';
});
```

## Isn't this a bit more work?

Kind of. 

It does require you to build out a little server side code. If you're using a third-party tool, that might not even be an option for you.

But the end result is something that's much more resilient for the end user.