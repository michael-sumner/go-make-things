---
title: "Don't disable buttons while submitting forms with ajax"
date: 2019-07-05T10:30:00-04:00
draft: false
categories:
- Accessibility
- Code
- CSS
- Design and UX
- HTML
- JavaScript
---

Something I've always done that [my buddy Scott O'Hara](https://www.scottohara.me/) recently told me was a really bad idea is disable buttons while submitting them with ajax.

Let's explore why, and what you can do instead.

## The approach

Let's say you have a newsletter signup form.

```html
<form id="newsletter">
	<label for="email">Your Email Address</label>
	<input type="email" name="email" id="email">
	<button>Sign Up!</button>
</form>
```

Instead of letting it submit directly to the server, you intercept it with JS, validate the fields, and make an API call to submit the form data.

If everything checkout out, you display a success message. Otherwise, you let the user know what went wrong.

While you're submitting to the API, you don't want the user to keep clicking the button or submitting the form, so you disable the button by adding the `[disabled]` attribute to it.

```js
var btn = document.querySelector('#newsletter btn');
btn.setAttribute('disabled', true);
```

Makes sense, right?

Unfortunately, it causes accessibility issues.

## The problem

When a button picks up the `[disabled]` attribute, focus shifts from the button to the `document`.

For screen reader users, this triggers an announcement. For people who use the keyboard to navigate (both screen reader users and sighted users), they're now no longer in the field they were working in and might be disoriented.

Fortunately, there's a relative easy, better approach.

## The fix

There's a simple, three-part fix:

1. Use a `.disabled` class instead of the `[disabled]` attribute. This gives you same styling without the loss of focus.
2. Update the button text to indicate that the form is submitting and should not be clicked again.
3. Ignore any additional submits until the previous submission is finished.

Let's look at each of these.

### Adding a `.disabled` class.

This one is pretty straightforward. In your JavaScript:

```js
var btn = document.querySelector('#newsletter btn');
btn.classList.add('disabled');
```

And in your CSS (update this to match your preferred style, of course):

```css
/**
 * Disabled state
 */
button.disabled,
button[disabled] {
	box-shadow: none;
	cursor: not-allowed;
	opacity: 0.5;
	pointer-events: none;
}
```

### Updating the button text

I use something simple, like `Submitting...` or `Signing up...`. I also store the old text to a data attribute so I can easily restore it later.

```js
var btn = document.querySelector('#newsletter btn');

// Add the .disabled class
btn.classList.add('disabled');

// Store the original text to a data attribute
btn.setAttribute('data-original', btn.textContent);

// Update the button text
btn.textContent = 'Signing up...';
```

Once your ajax/API call is completed, you can revert the button text back.

```js
// Restore the button text
btn.textContent = btn.getAttribute('data-original');

// Remove the data attribute
btn.removeAttribute('data-original');
```

### Ignoring additional submissions until the current one is complete

One great thing about the `[data-original]` attribute is that it gives a nice way to check if the form is currently mid-submission.

```js
// If the form is NOT currently submitting
if (!btn.hasAttribute('data-original')) {
	// Go ahead and submit your API request
}
```

This is why I remove it after a successful call. When it's present, we know an API request is currently happening.

Just make sure you also remove it if the API throws an error.