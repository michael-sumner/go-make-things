---
title: "Building an accessible show/hide disclosure component with vanilla JS"
date: 2019-12-10T10:30:00-05:00
draft: false
categories:
- Accessibility
- Code
- Design and UX
- HTML
- JavaScript
---

A *disclosure component* is the formal name for the pattern where you click a button to reveal or hide content.

This includes things like a "show more/show less" interaction for some descriptive text below a YouTube video, or a hamburger menu that reveals and hides when you click it.

In the past, I've written about [HTML-only/JavaScript-free accordions](/javascript-free-accordions/).

Today, we're going to look at a way to build disclosure components accessibly when the HTML-only version doesn't meet your needs.

## The starting HTML

Let's start with some basic HTML.

We'll include a `div` for our content, with an ID of `#now-you-see-me`. We'll also add a button we can use to toggle the content visibility.

```html
<button>Show More</button>

<div id="now-you-see-me">
	Now you don't.
</div>
```

For semantic reasons, the toggle should *always* be a `button`.

Links imply to assistive devices that clicking it will take you some where, while buttons imply that some interactivity is triggered. [Marcy Sutton has an fantastic explanation of the differences between links and buttons](https://marcysutton.com/links-vs-buttons-in-modern-web-applications), and when you should use which one.

## Adding interactivity

The first thing we need to do is listen for when the `button` is clicked, so that we can toggle visibility of our content.

To get started, let's use [event delegation](/why-event-delegation-is-a-better-way-to-listen-for-events-in-vanilla-js/) to listen for `click` events.

```js
document.addEventListener('click', function (event) {
	// Do stuff...
});
```

To help us build this accessibly, we're going to consult [Dave Rupert's amazing A11Y Nutrition Cards](https://davatron5000.github.io/a11y-nutrition-cards/#disclosure-show-hide).

One thing you'll notice under *Keyboard Expectations* is that the `enter` and `space` keys should toggle the content.

Using a `button` element makes this infinitely easier. Clicking a `button`, pressing the `enter` key while focused on it, and pressing the `space` bar while focused on it *all* trigger a `click` event.

## Only run on disclosure buttons

Right now, we're detecting *all* clicks on the document. We need a way to filter out any clicks that aren't on our toggle button.

Let's add the `data-disclosure` attribute to our button, and filter out clicks on any element that doesn't have that attribute.

```html
<button data-disclosure>Show More</button>
```

```js
document.addEventListener('click', function (event) {

	// Only run on elements that have the [data-disclosure] attribute
	// If the event.target doesn't have the attribute, return ends the callback function
	if (!event.target.hasAttribute('data-disclosure')) return;

	console.log('it matches!');

});
```

[Here's a demo.](https://codepen.io/cferdinandi/pen/zYxrPRO) Open up the console to see it working.

## Getting our content

We also need a way to associate our button with the matching content. We can use the `[aria-controls]` attribute for that.

The `[aria-controls]` attribute tells screen readers that a `button` controls the behavior of another piece of content. You assign the ID of that content as the value of the attribute.

```html
<button data-disclosure aria-controls="now-you-see-me">Show More</button>
```

In our event listener, we can get the value of the `aria-controls` attribute and pass it into `document.querySelector()` to get our content.

We'll need to prefix it with a `#` because it's an ID selector.

```js
document.addEventListener('click', function (event) {

	// Only run on elements that have the [data-disclosure] attribute
	// If the event.target doesn't have the attribute, return ends the callback function
	if (!event.target.hasAttribute('data-disclosure')) return;

	// Get the content to toggle
	// If no matching content is found, end the function with return
	var content = document.querySelector('#' + event.target.getAttribute('aria-controls'));
	if (!content) return;

	console.log(content);

});
```

[Here's an updated demo that logs the content to the console.](https://codepen.io/cferdinandi/pen/povgdVG)

## Toggling content visibility

The last accessibility consideration is that the `button` should also have an `[aria-expanded]` attribute on it. This tells screen readers what the current state of the content is.

If the `[aria-expanded]` attribute has a value of `true`, the content is expanded. If it has a value of `false`, the content is collapsed.

```html
<button data-disclosure aria-controls="now-you-see-me" aria-expanded="true">Show More</button>
```

In our script, we'll check to see what the value of the `[aria-expanded]` attribute is.

If it's `true`, we'll add the change it to `false` and add the `[hidden]` attribute to our content to hide it. Otherwise, we'll change it to `true` and remove the `[hidden]` attribute to reveal it.

Even though `true` and `false` are booleans, the `getAttribute()` method returns it as a string. We'll need to check for `'true'` as a string in our code.

```js
document.addEventListener('click', function (event) {

	// Only run on elements that have the [data-disclosure] attribute
	// If the event.target doesn't have the attribute, return ends the callback function
	if (!event.target.hasAttribute('data-disclosure')) return;

	// Get the content to toggle
	// If no matching content is found, end the function with return
	var content = document.querySelector('#' + event.target.getAttribute('aria-controls'));
	if (!content) return;

	// If the content is visible, hide it
	// Otherwise, show it
	if (event.target.getAttribute('aria-expanded') === 'true') {
		event.target.setAttribute('aria-expanded', false);
		content.setAttribute('hidden', '');
	} else {
		event.target.setAttribute('aria-expanded', true);
		content.removeAttribute('hidden');
	}

});
```

Now our content will actually show and hide when clicked!

[Here's a demo with the show/hide functionality.](https://codepen.io/cferdinandi/pen/gObPXQo)

## Hiding content by default

Currently, our content is visible to start with. In a real application, we would probably want these hidden by default and revealed when the button is clicked.

We can change the `[aria-expanded]` value to `false` and add the `[hidden]` attribute to all of our content by default to have everything collapsed from the start.

```html
<button data-disclosure aria-controls="now-you-see-me" aria-expanded="false">Show More</button>

<div id="now-you-see-me" hidden>
	Now you don't.
</div>
```

[Here's a demo with the content hidden by default.](https://codepen.io/cferdinandi/pen/bGNEYym)

*But*... before the JavaScript loads and runs, users will not be able to expand the content.

The can click the button, but nothing will happen, which is confusing. And if the JS file fails for some reason, they can *never* view the content.

## Progressive enhancement

A little dash of progressive enhancement will fix that.

First, we'll remove the `[hidden]` attribute from our content, but we'll add it to the `button` elements and *keep* the `[aria-expanded]` attribute set to `false`.

```html
<button data-disclosure aria-controls="now-you-see-me" aria-expanded="false" hidden>Show More</button>

<div id="now-you-see-me">
	Now you don't.
</div>
```

Now, by default, the content will be visible but the button will be hidden.

When the JavaScript loads, we want to show all of the buttons and hide all of the content. We'll use `document.querySelectorAll()` to get all of our `button` elements, find their matching content, and hide it.

For better browser support, we should [convert our NodeList to an array before using the `Array.forEach()` method](/using-array-methods-with-nodelists-in-vanilla-js/).

```js
// Get the disclosure buttons
var disclosures = Array.prototype.slice.call(document.querySelectorAll('[data-disclosure]'));

// Loop through them with Array.forEach()
disclosures.forEach(function (disclosure) {

	// Get the content associated with the button
	var content = document.querySelector('#' + disclosure.getAttribute('aria-controls'));

	// If there's no content, don't show the button
	if (!content) return;

	// Show the button and hide the content
	disclosure.removeAttribute('hidden');
	content.setAttribute('hidden', '');

});
```

[Here's a demo with the progressive enhancements added.](https://codepen.io/cferdinandi/pen/ZEYQvEE)

And with that, we have an accessible, progressively enhanced disclosure component.