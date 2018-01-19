---
categories:
- Code
- JavaScript
date: '2018-01-08'
event_details:
- ''
event_end_date:
- ''
event_start_date:
- ''
mailchimp_details:
- ''
permalink: /javascript-debugging-basics-part-1/
title: 'JavaScript Debugging Basics: Part 1'
url: /2018/01/08/javascript-debugging-basics-part-1
---

One of the biggest things people who buy my [pocket guides](/guides/) and [courses](/courses/) ask me about is debugging.

Today, I wanted to help you learn how to debug your code, and I thought the best way to do that would be with a practical example sent in by an actual reader.

## The Problem

You run an animal rescue, and you want users to select the types of adoptable animals they're interested in&mdash;dogs, cats, lizards, and so on.

Clicking a "Filter" button shows the list of available pets. When the list opens, there's also a "Close" button users can click to hide the list.

**The close button currently does not work. Why not?**

## The Code

[You can view a working demo of the code here.](https://jsfiddle.net/cferdinandi/yje424xt/9/)

It builds on an article I wrote on [how to show and hide content with vanilla JS](/how-to-show-and-hide-elements-with-vanilla-javascript/), and [how to use event bubbling and delegation](/checking-event-target-selectors-with-event-bubbling-in-vanilla-javascript/).

### The HTML

Our buttons have a `[data-toggle]` attribute on them. This attribute contains the ID of the element to show or hide, and is used by our script to toggle visibility.

```lang-html
<button class="btn" data-toggle="#example">
	Filter
</button>

<br><br>

<div class="toggle-content" id="example">
	<button class="btn btn-secondary" data-toggle="#close">
		Close
	</button>

	<h2>Pet Types</h2>

	<label>
		<input type="checkbox" name="dogs">
		Dogs
	</label>
	<br>

	<label>
		<input type="checkbox" name="cats">
		Cats
	</label>
	<br>

	<label>
		<input type="checkbox" name="birds">
		Birds
	</label>
	<br>

	<label>
		<input type="checkbox" name="snakes">
		Snakes
	</label>
	<br>

	<label>
		<input type="checkbox" name="lizards">
		Lizards
	</label>
</div>
```

### CSS

By default, content with the `.toggle-content` class is hidden. When it also has the `.is-visible` class, we'll show it.

This class is added dynamically with JavaScript.

```lang-css
/**
 * Hide toggled content by default
 */
.toggle-content {
	display: none;
}

/**
 * Show toggled content when the .is-visible class is added
 */
.toggle-content.is-visible {
	display: block;
}

/**
 * Style the buttons
 */
.btn {
	background-color: #0088cc;
	border: 1px solid #0088cc;
	color: #ffffff;
	display: inline-block;
	padding: 0.5em 0.6875em;
}

.btn-secondary {
	background-color: #808080;
	border-color: #808080;
}
```

### The JavaScript

The script includes [three helper methods](/how-to-show-and-hide-elements-with-vanilla-javascript/) to show, hide, and toggle visibility on content.

It also includes an event listener to listen for clicks on the document. If the clicked element has a `[data-toggle]` attribute, we'll use it to find our content area and toggle visibility.

```lang-js
/**
 * Helper methods
 * https://gomakethings.com/how-to-show-and-hide-elements-with-vanilla-javascript/
 */

// Show an element
var show = function (elem) {
	elem.classList.add('is-visible');
};

// Hide an element
var hide = function (elem) {
	elem.classList.remove('is-visible');
};

// Toggle element visibility
var toggle = function (elem) {
	elem.classList.toggle('is-visible');
};

/**
 * Listen for all clicks on the document
 * https://gomakethings.com/checking-event-target-selectors-with-event-bubbling-in-vanilla-javascript/
 */
document.addEventListener('click', function (event) {

	// Make sure clicked element is our toggle
	// To do this, make sure it has the data-toggle attribute
	var toggleId = event.target.getAttribute('data-toggle');

	// If the clicked element doesn't have a data-toggle attribute, bail
	if (!toggleId) return;

	// Prevent default link behavior
	event.preventDefault();

	// Get the content that has the same ID as the data-toggle value
	var content = document.querySelector(toggleId);

	// If no matching element is found, bail
	if (!content) return;

	// Toggle the content
	toggle(content);

}, false);
```

## Your challenge

So... what's wrong with this script? Why isn't the "Close" button working as expected?

I'll walk through how I would debug this script and show you what's wrong tomorrow. But first, Why don't you give it a shot?

Email me with your answer, what you tried, anything that has you tripped up, or event unsuccessful attempts at solving it. <del>I've got a special surprise for those of you who do (this offer ends when the next article goes live tomorrow).</del> ([The offer has expired.](/javascript-debugging-basics-part-2/))