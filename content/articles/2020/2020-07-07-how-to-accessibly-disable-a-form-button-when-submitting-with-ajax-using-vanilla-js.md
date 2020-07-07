---
title: "How to accessibly disable a form button when submitting with Ajax using vanilla JS"
date: 2020-07-07T10:30:00-04:00
draft: false
categories:
- Accessibility
- Code
- CSS
- Design and UX
- HTML
- JavaScript
---

If you have a form that gets submitted using a JavaScript Ajax call (via an API or something) instead of a page reload, you might want to disable the submit button so that the user doesn't try to resubmit the form while you're waiting for the API to return a response.

Today, I'm going to show you how to do that without breaking accessibility for people who use assistive technology like screen readers.

_**Hint:** you shouldn't just slap a `[disabled]` attribute on it._

## The problem with the `[disabled]` attribute

I often see people do something like this with their button while the form is submitting.

```html
<button disabled>Join the List</button>
```

This *feels* like the right thing to do, but it's not, for a few reasons.

### Adding a `[disabled]` attribute to a `button` removes focus

This *may* trigger a screen reader announcement as focus shifts to the `document`, which is confusing since you were just in a form trying to submit it.

It also means that if something went wrong with the form, you have to navigate back to it to make your changes.

### The `[disabled]` attribute doesn't announce in most screen readers

The shifting focus to another element might cause an announcement, but the button becoming disabled does not.

There's no announcement for visually impaired users that tells them the button was disabled (or that the form is being submitted).

### Just because a button is disabled doesn't mean the form is submitting

Even if adding the `[disabled]` attribute *did* announce, that doesn't tell a visually impaired user that the form is actually submitting.

All they would know is that the button is now disabled.

### A demo

Here's a video of that experience using VoiceOver on macOS.

If you're *not* visually impaired, close your eyes and try to figure out what's going on from the audio announcements alone.

<iframe src="https://player.vimeo.com/video/436104688?color=0088cc&title=0&byline=0&portrait=0" width="640" height="360" frameborder="0" allow="autoplay; fullscreen" allowfullscreen></iframe>

Could you tell when the form was submitted? Could you tell when it was done? Me neither!

## The accessible way to disable forms while submitting

Here's how to do this accessibly.

1. Add a `.submitting` state class to the form while submitting, and remove it when the API call completes.
2. Ignore any additional form submits if the `.submitting` class is present.
3. Include an element with `[role="status"]`. Update it when the form is submitting, and after the API call has completed. This will cause announcements for screen reader users.

Here's an example form.

```html
<form>

	<label for="email">Your Email</label>
	<input type="email" id="email" value="text@website.com">

	<p role="status"></p>

	<button>Join the List</button>

</form>
```

And here's the JavaScript to implement the three steps above.

```js
// Detect form submit events
document.addEventListener('submit', function (event) {

	// Prevent default form submit
	event.preventDefault();

	// Ignore forms that are actively being submitted
	if (event.target.classList.contains('submitting')) return;

	// Show submitting message
	var status = event.target.querySelector('[role="status"');
	status.textContent = 'Submitting...';

	// Add form .submitting state class for styling
	event.target.classList.add('submitting');

	// Submit form data to an API
	// (we're simulating this here with setTimeout())
	setTimeout(function () {

		// Once API response returns, re-enable the form
		// (again, simulated here)

		// Remove the .submitting state class
		event.target.classList.remove('submitting');

		// Show a success message
		status.textContent = 'Success!';

	}, 3000);

});
```

As a bonus, you can style the button the look visually disabled while the form has the `.submitting` class.

```css
.submitting button {
	opacity: 0.7;
}
```

### Another Demo

Here's another demo, this time using the accessible technique outlined above.

Again, close your eyes and see if you can tell what's happening only from the announcements.

<iframe src="https://player.vimeo.com/video/436104725?color=0088cc&title=0&byline=0&portrait=0" width="640" height="360" frameborder="0" allow="autoplay; fullscreen" allowfullscreen></iframe>

