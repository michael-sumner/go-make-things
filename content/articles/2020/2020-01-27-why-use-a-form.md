---
title: "Why use a form element when submitting fields with JavaScript?"
date: 2020-01-27T10:30:00-05:00
draft: false
categories:
- Accessibility
- Code
- CSS
- HTML
- JavaScript
---

Last week on Twitter, [Coding Journey asked](https://twitter.com/CodingJrney/status/1220194852454961155):

> Question: If we are preventing default behavior of form submission and manually handle it (e.g. with Fetch API), is there a reason to use the `<form>` tag? (other than form submission with enter/return key...)

When I first started my journey to web development, I had the same question.

*__Quick side note:__ I love when people ask questions that you're worried are obvious to everyone else. Often, there's other people who are wondering the same thing but they're just too afraid to ask.*

There are two reasons why you should still use a `form` element:

1. It makes your life easier.
2. Semantics (and the accessibility that happens as a result).

## Using a `form` element makes your life easier

Consider a set of fields *without* a `form` element.

```html
<label for="username">Username</label>
<input type="text" id="username">

<label for="password">Password</label>
<input type="password" id="password">

<button id="signin">Sign In</button>
```

You can listen for clicks on the `#signin` button.

But that's not the only way someone can submit a form. They could focus on the `button` and hit the space bar. They could press the `enter` key from any field in the form.

Now you're looking at at least three different event listeners to properly listen for form submissions.

### One event listener to rule them all

Let's wrap the fields in a `form` element with the `#signin` ID instead.

```html
<form id="signin">
	<label for="username">Username</label>
	<input type="text" id="username">

	<label for="password">Password</label>
	<input type="password" id="password">

	<button>Sign In</button>
</form>
```

With this setup, you can attach a `submit` event to the `#signin` form, and it will fire in any of those situations.

Whether users click the button, use the space bar to press it, or hit the `enter` key from one of the fields, a single event listener will capture the user behavior so that you can hook into it and run your JavaScript.

## Semantics and accessibility

The second reason is semantics.

If something is a form, use a `form` element. This helps assistive devices like screen readers better understand the content of the page and give the person using them more meaningful information.

There's really not much else to say here. If something is a form, use the `form` element.