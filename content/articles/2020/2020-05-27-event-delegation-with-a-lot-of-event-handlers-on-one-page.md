---
title: "Vanilla JS event delegation with a lot of event handlers on one page"
date: 2020-05-27T10:30:00-04:00
draft: false
categories:
- Code
- JavaScript
---

I often write about [how much I love event delegation](/why-event-delegation-is-a-better-way-to-listen-for-events-in-vanilla-js/).

Today, I wanted to talk about how I approach event delegation when I have multiple different event handlers running for the same event type.

## How event delegation works

If you’re not familiar with the approach, here’s how it works. Instead of attaching events to specific elements, you listen for that event on a parent element (often the `document` or `window`).

Any event of that type that happen inside the parent element bubble up, and you can filter out the ones that don’t match the element you’re looking for.

```js
document.addEventListener('click', function (event) {

	// Check for the .click-me class
	// If the clicked element doesn't have it, do nothing
	if (!event.target.matches('.click-me')) return;

	// The code you want to run goes here...

});
```

If you’re listen for events on more than one element with the same selector, this approach is actually better for performance because it uses less memory in the browser.

## This gets messy as projects get better

When I share this approach, I often have students ask me how to implement it when you need to listen for the same type of event for multiple different selectors, and do different things based on which selector the element has.

For example, let’s say you have show/hide content buttons that have a `.show-me` class on them, and another set of buttons with the `.save` class that save the content of a form for reuse later.

How do you parse which actions to run based on the selector? How do you avoid this?

```js
document.addEventListener('click', function (event) {

	// Check for the .show-me class
	// If the clicked element doesn't have it, do nothing
	if (!event.target.matches('.show-me')) return;

	// The code you want to run goes here...

});

document.addEventListener('click', function (event) {

	// Check for the .save class
	// If the clicked element doesn't have it, do nothing
	if (!event.target.matches('.save')) return;

	// The code you want to run goes here...

});
```

## Modular functions

My preferred approach is to use a single event listener for each event type. Then, I move all of my logic into individual handler functions, and pass the `event` object into them.

```js
var handleShowMe = function (event) {

	// Check for the .show-me class
	// If the clicked element doesn't have it, do nothing
	if (!event.target.matches('.show-me')) return;

	// The code you want to run goes here...

};

var handleSaves = function (event) {

	// Check for the .save class
	// If the clicked element doesn't have it, do nothing
	if (!event.target.matches('.save')) return;

	// The code you want to run goes here...

};

document.addEventListener('click', function (event) {
	handleShowMe(event);
	handleSaves(event);
});
```

This let's me run a single event listener for the whole project, which is better for performance.

But, it prevents the event listener callback from becoming cluttered with a mess of `if...else` statements. Every task lives in its own distinct function that I can easily remove if I don't need it later. And adding more is easy, too.