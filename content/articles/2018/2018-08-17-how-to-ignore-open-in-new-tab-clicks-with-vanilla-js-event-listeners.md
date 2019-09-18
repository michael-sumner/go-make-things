---
title: 'How to ignore "open in a new tab" clicks with vanilla JS event listeners'
date: 2018-08-17T10:30:00-04:00
draft: false
categories:
- Accessibility
- Art and Science
- Business and Leadership
- Careers
- Code
- CSS
- Design and UX
- HTML
- JavaScript
- Technology
- Web Performance
- WordPress
- Vanilla Framework Demos
---

Imagine you have a set of anchor links, and when someone clicks them, you want to do something scripty (like animate the user down on the page or toggle a tabbed navigation).

```html
<a class="click-me" href="#spiderman">Spiderman</a>
<a class="click-me" href="#wonder-woman">Wonder Woman</a>
<a class="click-me" href="#iron-man">Iron Man</a>
```

You're [listening for all clicks in the document](/you-should-always-attach-your-vanilla-js-click-events-to-the-window/) and ignoring ones that aren't on links with the `.click-me` class.

If the link has the class, you prevent the default link behavior and do your scripty stuff.

```js
document.documentElement.addEventListener('click', function (event) {

	// Ignore clicks that aren't on links with the .click-me class
	if (!event.target.matches('.click-me')) return;

	// Prevent the default link behavior
	event.preventDefault();

	// Do something scripty...

}, false);
```

But what happens when the user actually wants to open that link in a new tab? As written, our scripty stuff will still run ([demo](https://codepen.io/cferdinandi/pen/jpgLbW)).

<p data-height="265" data-theme-id="light" data-slug-hash="jpgLbW" data-default-tab="js,result" data-user="cferdinandi" data-pen-title="command/control + click still runs our script" class="codepen"></p>

Earlier this week we learned [how to ignore right clicks in Firefox](/you-should-always-attach-your-vanilla-js-click-events-to-the-window/) (all other browsers do this automatically).

But what about when someone holds down the command or control button and clicks? This opens a new tab in MacOS and Windows, respectively.

There's actually a really easy way to detect that. The `event.metaKey` property detects if the command button was pressed, and the `event.ctrlKey` detects if the control button was pressed.

We can check for either or those keys, and bail if they were pressed.

```js
document.documentElement.addEventListener('click', function (event) {

	// Ignore clicks that aren't on links with the .click-me class
	if (!event.target.matches('.click-me')) return;

	// Ignore command/control + click
	if (event.metaKey || event.ctrlKey) return;

	// Prevent the default link behavior
	event.preventDefault();

	// Do something scripty...

}, false);
```

[Here's a working demo.](https://codepen.io/cferdinandi/pen/ejqEWE)

<p data-height="265" data-theme-id="light" data-slug-hash="ejqEWE" data-default-tab="js,result" data-user="cferdinandi" data-pen-title="command/control + click doesn't run our script" class="codepen"></p>

Pretty neat, right?