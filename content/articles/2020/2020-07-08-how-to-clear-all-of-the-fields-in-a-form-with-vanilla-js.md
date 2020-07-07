---
title: "How to clear all of the fields in a form with vanilla JS"
date: 2020-07-08T10:30:00-04:00
draft: false
categories:
- Code
- HTML
- JavaScript
---

Yesterday, we looked at [how to disable a form when submitting it with Ajax or an API](/how-to-accessibly-disable-a-form-button-when-submitting-with-ajax-using-vanilla-js/).

Once the form is successfully submitted, there's a good chance you'll want to clear all of the fields in the form.

Fortunately, vanilla JS has a handy little method for doing just that: `HTMLFormElement.reset()`.

```js
document.addEventListener('submit', function (event) {

	// Prevent default form submit
	event.preventDefault();

	// Clear the form fields
	// event.target is the thing that triggered the event, in this case, the form
	event.target.reset();

});
```

The `HTMLFormElement.reset()` method resets all fields in a form back to their default values. This means that if you had a specified `value` property on a field, and the user changed it, it would revert to the original instead of emptying completely.

[Here's a demo.](https://codepen.io/cferdinandi/pen/yLeKjRQ)

The `HTMLFormElement.reset()` method works in all modern browsers, and IE9 and above.