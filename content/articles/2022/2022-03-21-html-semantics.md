---
title: HTML semantics
date: 2022-03-21T10:30:00-04:00
draft: false
categories:
- Accessibility
- Code
- CSS
- Design and UX
- HTML
- JavaScript
---

_Today's article is an excerpt from [a new course and book](https://vanillajsguides.com) on Accessible Components with vanilla JS that I'm working on. It's not for sale yet, but will be part of the [complete set](https://vanillajsguides.com/complete-set/) and [expert bundle](https://vanillajsguides.com/expert-bundle/) when it's released._

The HTML elements that you use often convey information to people who use screen readers, and provide critical functionality to people who navigate the web with a keyboard.

## If an element should be interactive, use something focusable

People who navigate the web with a keyboard can jump from one focusable element to the next by hitting the `Tab` key on their keyboard. They can then interact with that element with the `Enter` or `Return` key or the `Space` bar.

Not all elements are focusable.

Developers often use a `div` or `span` elements with a `click` event listener. These should be `button` or `a` elements, which can be focused. With a `div`, a screen reader user might not know the element is interactive, and a keyboard user couldn't interact with it at all (without some additional hacking).

```css
.btn {
	background-color: #e5e5e5;
	border: 1px solid #808080;
	border-radius: 0.25em;
	color: #272727;
	font: inherit;
	margin-right: 0.5em;
	padding: 0.5em 0.85em;
}

.btn:hover {
	background-color: #0088cc;
	border-color: #0088cc;
	color: #ffffff;
}
```

```html
<!-- This is good -->
<button class="btn">Click me</button>

<!-- 
	This is bad 
	A span element cannot be focused or accessed with a keyboard
-->
<span class="btn">Click me, too</span>
```

## Buttons and links do different things

Even if you use a focusable element, it might not be the right one. I often see people use links as buttons.

```html
<!-- Avoid this -->
<a class="btn" href="#">Click Me</a>
```

Links and buttons convey unique semantic meaning to screen readers.

A link implies that clicking it will take you to a different location&mdash;either another page, or a different spot on the current one. Buttons imply interactivity&mdash;showing and hiding content, submitting a form, and so on.

```html
<!-- This is a link. It takes you somewhere. -->
<a href="/merlin">Learn about Merlin</a>

<!-- This is a button. It adds interactivity to the current page. -->
<button>Cast a Spell</button>
```

[Marcy Sutton wrote a fantastic article about this.](https://marcysutton.com/links-vs-buttons-in-modern-web-applications)

Sometimes, you might have a valid link that you progressively enhance into a button after your JavaScript loads. In that case, you can add `[role="button"]` to the link element with your JavaScript.

This is a common pattern with progressively enhanced links and async HTML loading.

By default, you might have a link that points to another webpage. When your JavaScript loads, you may instead have it fetch HTML and load it into the current page instead. In that case, you would add `[role="button"]` to the link in the JavaScript file.

```html
<!-- Default -->
<a id="js-async" href="/all-about-merlin">Learn more about Merlin</a>

<!-- After JavaScript Loads -->
<a role="button" id="js-async" href="/all-about-merlin">Learn more about Merlin</a>
```

```javascript
// Add the [role="button"] attribute to the link
let link = document.querySelector('#js-async');
link.setAttribute('role', 'button');
```

But as a general rule, if it takes you to another page, use a link. If its just for on-page interactivity, use a button.

## ARIA

ARIA (_Accessible Rich Internet Applications_) is a set of attributes that are part of the HTML specification.

They’re used to provide additional details to screen readers and other assistive technology when HTML alone doesn’t convey enough information on its own.

It includes the `[role]` attribute, with an assortment values for things like a `dropdown` menu, toggle `tab`, and `tooltip`. It also includes special attributes, usually prefixed with `[aria-*]`.

Generally speaking, you should only use ARIA when the semantics of the HTML element alone are not enough to convey all of the information about the UI.

For example, you _do not_ need to to include the `[role="button"]` attribute with a `button` element. The semantics of the element already convey that it's a `button` to assistive technology.

```html
<!-- Do NOT do this -->
<button role="button">Sign Up</button>
```

We'll explore specific ARIA attributes, when they're needed, and what they do, throughout the rest of this guide.