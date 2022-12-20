---
title: Using a wrecking ball for a problem that requires hammer
date: 2022-12-20T10:30:00-04:00
draft: false
categories:
- Accessibility
- Code
- CSS
- HTML
- JavaScript
- Web Performance
---

The other day, a student of mine was trying to modify a script that embeds a custom newsletter signup form.

You include an empty `div` and a link to the script, like this...

```html
<div id="custom-newsletter-embed"></div>
<script src="https://url-for-newsletter-embed.js"></script>
```

It injects some styles and a form that looks like this, and makes an API call to sign the user up when the form is submitted.

```html
<style>
	/* Inline CSS... */
</style>
<form>
	<input type="email" id="email">
	<button>Subscribe</button>
</form>
```

You might have already noticed the issue with this form: it doesn't have a label for the `#email` field. 

My student wanted to add one. Pretty reasonable! But... they couldn't make sense of what the script was doing, so I took a look for them.

**THE SCRIPT WAS LOADING THE ENTIRE REACT AND REACT DOM PRODUCTION LIBRARIES!** TO INJECT A FORM AND SUBMIT IT TO AN API!!!

I've been a web developer for a decade now, and I'm still shocked when people use a wrecking ball to solve a tool that requires a hammer. This is basic DOM manipulation. You don't need React (or any state-based UI library) for this!

The whole script could have been written like this with vanilla JS and DOM manipulation basics...

```js
(function () {

	// Get the element to embed into
	let embed = document.querySelector('#custom-newsletter-embed');
	if (!embed) return;

	// Inject the form and styles
	embed.innerHTML =
		`<style>
			/* Inline CSS... */
		</style>
		<form>
			<label for="email">Enter your email</label>
			<input type="email" id="email">
			<button>Subscribe</button>
		</form>
		<div role="status"></div>`;

	// Get newly created form elements
	let form = embed.querySelector('form');
	let announce = embed.querySelector('[role="status"]');

	// Handle submit events
	async function submitHandler (event) {

		// Stop the form from reloading
		event.preventDefault();

		// Make sure an email address was provided
		if (!form.email.value) {
			announce.textContent = 'Please enter a valid email address.';
			return;
		}

		try {

			// Call the API
			let request = await fetch('https://newsletter-api-endpoint.com', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({email: form.email.value})
			});

			// Get the response and show the message in the UI
			let response = await request.json();
			announce.textContent = response.msg;

		} catch (error) {

			// If something went wrong, show the error instead
			announce.textContent = error.msg;

		}

	}

	// Listen for submit events
	form.addEventListener('submit', submitHandler);

})();
```

That's 62 lines of code, including white space and comments. It minifies down to less than one 1 kb.

I'm a big believer that when you're learning how to code, whatever helps you get from idea to working thing faster is good. Learning momentum is really important.

But at some point, developers _need_ to backfill those fundamental skills. Without them, we end up shipping 150 kb of needless complexity to do less 1 kb worth of work.