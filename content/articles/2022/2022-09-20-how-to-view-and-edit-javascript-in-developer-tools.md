---
title: How to view and edit JavaScript in your browser's developer tools
date: 2022-09-20T10:30:00-04:00
draft: false
categories:
- Code
- JavaScript
- Technology
---

In your browser's developer tools, HTML and CSS are relatively easy to find and adjust. Today, we're going to look at how you can do the same thing with JavaScript.

Let's dig in!

## A sample script

We'll be using a small sample script for today's lesson. [The code is available on GitHub.](https://gist.github.com/cferdinandi/3fea0c4576e98ea84b1d06faf3a10b86)

It includes an HTML file with a `button` element.

```html
<p>
	<button>Activate Me</button>
</p>
```

Inside the script itself, there are a few event listeners set on the `button`.

When it's clicked, a message is logged to the console. On hover, we're scaling the `button` up to twice it's normal size. When the mouse leaves, we scale it back down to normal size.

(_This is better done with CSS, but this is just for teaching purposes._)

```js
// Get the button
let btn = document.querySelector('button');

// Do some events
btn.addEventListener('click', function () {
	console.log('Activated');
});

btn.addEventListener('mouseenter', function () {
	btn.style.transform = 'scale(2)';
});

btn.addEventListener('mouseleave', function () {
	btn.style.transform = '';
});
```

## In Chromium browsers

In Chromium browsers like MS Edge and Google Chrome, right click on the button element and select "Inspect Element" to pull up the Inspector in dev tools.

By default, the CSS _Styles_ are shown. 

But one of the menu options is _Event Listeners_. Click on it to view all of the listeners set on that event (including [ones covered by event delegation](https://gomakethings.com/listening-for-events-on-multiple-elements-using-javascript-event-delegation/)).

<img alt="A screenshot of the Chromium dev tools window, with the Event Listeners tab selected. There are three event listeners: click, mouseenter, and mouseleave. Each one has a link to view the source code or remove the event." src="/img/articles/js-dev-tools-1-chrome.png">

Each event can be expanded to show a list of affected elements.

You can click the "Remove" button to remove the event listener from that element, or click the link to the source code to view the full script in context.

If the script is an external file (as in, not inline JS), you can actually modify it and save your changes for the current session.

Click a line number next to the code, or right click and select "Add breakpoint," to add a breakpoint to the code. This will pause code execution on that line until you click the play button to continue.

This can be useful for debugging code.

<img alt="A screenshot of the Chromium dev tools window, with the source code for the script open, a breakpoint set, and the current script paused at the breakpoint." src="/img/articles/js-dev-tools-2-chrome.png">

## In Firefox

In Firefox, right click on the button element and select "Inspect Element" to pull up the Inspector in dev tools.

If the element is affected by any JavaScript events, you'll see an "Event" button next to it. Click that button to bring up a tooltip window with a list of events. Each event can be expanded to show its source code.

<img alt="A screenshot of the Firefox dev tools window, with the Event tooltip displayed. There are three event listeners: click, mouseenter, and mouseleave. The click event is expanded to show its source code." src="/img/articles/js-dev-tools-1-ff.png">

Deselecting the checkbox next to the event will remove the event from the element. You can click the button that looks like a curved arrow next to a list to view the source code.

Click a line number next to the code, or right click and select "Add breakpoint," to add a breakpoint to the code. This will pause code execution on that line until you click the play button to continue.

You _cannot_ edit the script in the Source panel in Firefox like you can with Chromium browsers.