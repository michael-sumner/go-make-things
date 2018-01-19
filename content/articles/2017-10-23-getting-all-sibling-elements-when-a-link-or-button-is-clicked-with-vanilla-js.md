---
categories:
- Code
- JavaScript
date: '2017-10-23'
permalink: /getting-all-sibling-elements-when-a-link-or-button-is-clicked-with-vanilla-js/
title: Getting all sibling elements when a link or button is clicked with vanilla JS
url: /2017/10/23/getting-all-sibling-elements-when-a-link-or-button-is-clicked-with-vanilla-js
---

Last week in the private Slack channel that comes with any of my [pocket guides](/guides/), one of my students asked how to get a navigation link's siblings when it's clicked.

For example, imagine you have a nav menu that looks like this.

```lang-html
<ul>
	<li><a class="nav-link" href="#1">Link 1</a></li>
	<li><a class="nav-link" href="#2">Link 2</a></li>
	<li><a class="nav-link" href="#3">Link 3</a></li>
	<li><a class="nav-link" href="#4">Link 4</a></li>
	<li><a class="nav-link" href="#5">Link 5</a></li>
</ul>
```

Whenever someone clicks a link in that menu, you want to give that link an `.active` class, and also remove the `.active` class from any other link that might have it.

Here's how that would work.

```lang-js
// Listen for all clicks on the document
document.addEventListener('click', function () {

	// Bail if it's not a .nav-link
	if (!event.target.classList.contains('nav-link')) return;

	// Add the active class
	event.target.classList.add('active');

	// Get all nav links
	var links = document.querySelectorAll('.nav-link');

	// Loop through each link
	for (var i = 0; i < links.length; i++) {

		// If the link is the one clicked, skip it
		if (links[i] === event.target) continue;

		// Remove the .active class
		links[i].classList.remove('active');

	}

}, false);
```

We're listening to all clicks on the document, a technique known as [event bubbling](/attaching-multiple-elements-to-a-single-event-listener-in-vanilla-js/). If the clicked element (`event.target`) doesn't have the `.nav-link` class, we bail.

Otherwise, use the `classList` API to add our `.active` class.

Next, we get every link with the `.nav-link` class and loop through them with a `for` loop. If the current link in the loop is our `event.target` (which we can compare with `===`), we'll use `continue` to skip to the next item in the loop.

Otherwise, we remove the `.active` class.

Naturally, you can adapt this for whatever your use case. The core parts here are:

1. Get all links or buttons with the appropriate selector.
2. Compare them to `event.target`.
3. If they're not a match, they're a sibling element and you can manipulate them as needed.