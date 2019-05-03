---
title: "Automating Slack invites with vanilla JavaScript"
date: 2019-05-03T10:30:00-04:00
draft: false
categories:
- Code
- HTML
- JavaScript
- WordPress
---

Yesterday, I wrote about [the tech behind my education platform](/the-tech-behind-my-javascript-education-platform/), but I forgot to mention one big and very important piece: [Slack](https://slack.com/).

Anyone who purchases one of my [pocket guides or video courses](https://vanillajsguides.com), joins my [Academy training program](https://vanillajsacademy.com), or subscribes to my [Vanilla JS Projects video series](https://vanillajsprojects.com) gets access to my private Slack channel. Academy and Projects members also get their own dedicated channels just for them.

I'm routinely told it's one of the biggest perks of purchasing my products.

But Slack doesn't provide any sort of simple, native way to invite people to a channel. Out-of-the-box, you have to manually invite people to join.

Today, I want to show you how I use the Slack API and some vanilla JS to invite people to my Slack channels.

## The Slack API

Unfortunately, the Slack API doesn't have a publicly documented method for inviting people to a channel.

There is an undocumented endpoint for doing that, though. Slack's official position is that this endpoint could change in the future and is only used internally, which is why it's not documented.

For now, it works, and has been stable for a couple of years. So I (and various other people) use it to help automate things.

## Creating a middleman API

The Slack API requires a token to work. This is unique to you, and shouldn't be stored in JavaScript where anyone can find it and use it.

As a result, we need to create a middleman API that you can call with your JavaScript. This API uses your private token (stored somewhere on the server) to call the Slack API directly.

I mentioned in my article yesterday that I use a [headless instance of WordPress](/headless-wordpress-with-static-website-generators/). I wrote [a Slack API WordPress plugin](https://github.com/cferdinandi/gmt-slack-wp-rest-api) for this.

<img alt="The Slack API for WordPress plugin dashboard" src="/img/articles/slack-api.jpg">

Once installed, you can add your team name and private token in the dashboard. You can also set a key/secret combo to include as a hidden field in the invite form for extra protection.

I also included an option to specify approved domains that can call the API. Calls from any domains besides these are rejected.

## Creating an invite form

In my learning portal, I have a form users can submit to generate their own Slack invite.

```html
<form id="slack-invite">

	<label for="email">Email Address</label>
	<input type="email" id="email" name="email">

	<input type="hidden" name="{FORM_KEY}" value="{FORM_SECRET}">
	<input type="hidden" name="channels" value="12345, abcdef">

	<div id="slack-status"></div>

	<button>Get Your Invite</button>

</form>
```

The hidden `{FORM_KEY}` field includes the key and secret I set in the WordPress plugin Dashboard. These can be anything at all. I used my password manager app to generate some random strings.

If you want to invite the user to any channels besides the default public ones, you can add those as a field to the form, comma-separated.

And of course, you need an email address to send the invite to.

The empty `#slack-status` element is where we can add error messages if something goes wrong.

## Using the API with vanilla JavaScript

First, we need to listen for submissions from the invite form with `addEventListener()`.

We'll prevent the default form submission from happening. Then, we'll call a `submitForm()` helper method.

```js
var form = document.querySelector('#slack-invite');
form.addEventListener('submit', function (event) {
	event.preventDefault();
	submitForm();
}, true);
```

### Serializing form data

In order to submit to the API, we need to serialize the data from our form into a string of key/value pairs (aka a query string).

```
email=hi@gomakethings.com&channels=1234&randomString=randomValue
```

I have [a helper function for serializing form data](https://vanillajstoolkit.com/helpers/serialize/). If you're interested in how it works, [I wrote about it last year](/how-to-serialize-form-data-with-vanilla-js/).

I drop that into my code. Then, in my `submitForm()` function, I use it to serialize the form data and append it to the endpoint for my middleman API.

```js
var submitForm = function () {

	// The endpoint URL
	var url = 'https://my-headless-wordpress.com/wp-json/gmt-slack/v1/invite?' + serialize(form);

};
```

### Calling the API

Next, we need to make the actual API call. If you've never worked with XHR before, or need a primer, [here's an introduction article I wrote](/ajax-and-apis-with-vanilla-javascript/).

Since we're adding a new user to the channel, this is a `POST` request.

```js
var submitForm = function () {

	// The endpoint URL
	var url = 'https://my-headless-wordpress.com/wp-json/gmt-slack/v1/invite?' + serialize(form);

	// Set up our HTTP request
	var xhr = new XMLHttpRequest();

	// Setup our listener to process request state changes
	xhr.onreadystatechange = function () {

		// Only run if the request is complete
		if (xhr.readyState !== 4) return;

		// Process our return data
		if (xhr.status >= 200 && xhr.status < 300) {
			// This will run when the request is successful
			// It checks to make sure the status code is in the 200 range
			console.log('success!', xhr);
		} else {
			// This will run when it's not
			console.log('The request failed!');
		}

	};

	// Create and send a POST request
	xhr.open('POST', url);
	xhr.send();

};
```

## Handling responses

After we call the API, we need to handle whatever responses we get back. The middleman API sends back responses in this format:

```js
var response = {
	code: 200,
	status: 'success',
	message: 'An invitation to join the Slack workspace has been sent.'
};
```

Each response includes a status code, a status ID, and a message.

Let's use two helper functions to handle successful and failed responses, respectively: `inviteSuccess()` and `inviteFail()`.

The data we get back is in string form. [We'll use `JSON.parse()` to convert the `xhr.responseText` into a JSON object.](/working-with-xhr-response-data-in-vanilla-js/) Then, we'll pass it into our helper functions.

```js
// Setup our listener to process request state changes
xhr.onreadystatechange = function () {

	// Only run if the request is complete
	if (xhr.readyState !== 4) return;

	// Get the data
	var data = JSON.parse(xhr.responseText);

	// Process our return data
	if (xhr.status >= 200 && xhr.status < 300) {
		// This will run when the request is successful
		// It checks to make sure the status code is in the 200 range
		inviteSuccess(data);
	} else {
		// This will run when it's not
		inviteFail(data);
	}

};
```

### Successful responses

If the invite was successfully sent, we can show a success message. First, let's get the `#slack-status` element to show our message in.

```js
var inviteSuccess = function (data) {

	// Get the message element
	var msg = document.querySelector('#slack-status');
	if (!msg) return;

};
```

Then, we'll user `textContent` to show our message.

I'm adding a unique class to the message for styling purposes, but this is optional.

```js
var inviteSuccess = function (data) {

	// Get the message element
	var msg = document.querySelector('#slack-status');
	if (!msg) return;

	// Show the message
	msg.textContent = data.message;

	// Update the class
	msg.classList.add('success');

};
```

### Failed responses

Handling failed responses works pretty much the same way.

```js
var inviteFail = function (data) {

	// Get the message element
	var msg = document.querySelector('#slack-status');
	if (!msg) return;

	// Show the message
	msg.textContent = data.message;

	// Update the class
	msg.classList.add('error');

};
```

### Clearing the response message on submit

One last detail: when a user submits the form, we should clear the message and class. We'll add a `clearStatus()` helper function to the event handler.

```js
form.addEventListener('submit', function (event) {
	event.preventDefault();
	submitForm();
	clearStatus();
}, true);
```

In our `clearStatus()` helper, we'll get the `#slack-status` element. Then we'll wipe out it's content and remove any classes.

```js
var clearStatus = function () {

	// Get the message element
	var msg = document.querySelector('#slack-status');
	if (!msg) return;

	// Wipe out the status message
	msg.innerHTML = '';

	// Remove the classes
	msg.classList.remove('success');
	msg.classList.remove('error');

};
```

## Putting it all together

Here's the complete script.

```js

// The form
var form = document.querySelector('#slack-invite');

/*!
 * Serialize all form data into a query string
 * (c) 2018 Chris Ferdinandi, MIT License, https://gomakethings.com
 * @param  {Node}   form The form to serialize
 * @return {String}      The serialized form data
 */
var serialize = function (form) {

	// Setup our serialized data
	var serialized = [];

	// Loop through each field in the form
	for (var i = 0; i < form.elements.length; i++) {

		var field = form.elements[i];

		// Don't serialize fields without a name, submits, buttons, file and reset inputs, and disabled fields
		if (!field.name || field.disabled || field.type === 'file' || field.type === 'reset' || field.type === 'submit' || field.type === 'button') continue;

		// If a multi-select, get all selections
		if (field.type === 'select-multiple') {
			for (var n = 0; n < field.options.length; n++) {
				if (!field.options[n].selected) continue;
				serialized.push(encodeURIComponent(field.name) + "=" + encodeURIComponent(field.options[n].value));
			}
		}

		// Convert field data to a query string
		else if ((field.type !== 'checkbox' && field.type !== 'radio') || field.checked) {
			serialized.push(encodeURIComponent(field.name) + "=" + encodeURIComponent(field.value));
		}
	}

	return serialized.join('&');

};

// Show a message for successful invites
var inviteSuccess = function (data) {

	// Get the message element
	var msg = document.querySelector('#slack-status');
	if (!msg) return;

	// Show the message
	msg.textContent = data.message;

	// Update the class
	msg.classList.add('success');

};

// Show a message for failed invites
var inviteFail = function (data) {

	// Get the message element
	var msg = document.querySelector('#slack-status');
	if (!msg) return;

	// Show the message
	msg.textContent = data.message;

	// Update the class
	msg.classList.add('error');

};

// Submit the form to the API
var submitForm = function () {

	// The endpoint URL
	var url = 'https://my-headless-wordpress.com/wp-json/gmt-slack/v1/invite?' + serialize(form);

	// Set up our HTTP request
	var xhr = new XMLHttpRequest();

	// Setup our listener to process request state changes
	xhr.onreadystatechange = function () {

		// Only run if the request is complete
		if (xhr.readyState !== 4) return;

		// Get the data
		var data = JSON.parse(xhr.responseText);

		// Process our return data
		if (xhr.status >= 200 && xhr.status < 300) {
			// This will run when the request is successful
			// It checks to make sure the status code is in the 200 range
			inviteSuccess(data);
		} else {
			// This will run when it's not
			inviteFail(data);
		}

	};

	// Create and send a POST request
	xhr.open('POST', url);
	xhr.send();

};

// Clear the status message on form submit
var clearStatus = function () {

	// Get the message element
	var msg = document.querySelector('#slack-status');
	if (!msg) return;

	// Wipe out the status message
	msg.innerHTML = '';

	// Remove the classes
	msg.classList.remove('success');
	msg.classList.remove('error');

};

// Listen for submit events on the form
form.addEventListener('submit', function (event) {
	event.preventDefault();
	submitForm();
	clearStatus();
}, true);
```

Let me know if you have any questions or if I did a bad job explaining something.