---
title: "Writing high-performance JavaScript"
date: 2021-08-31T10:30:00-04:00
draft: false
categories:
- Code
- Design and UX
- JavaScript
- Web Performance
---

Yesterday, we looked at [the web performance metrics that actually matter](/what-are-the-web-performance-metrics-that-actually-matter/). Today, I wanted to discuss how to write high-performance JavaScript.

Let's dig in!

## How do you measure JavaScript performance?

There are three big things I personally care about when writing JavaScript:

1. Render blocking
2. Repaints and reflows
3. Memory allocation

These are the three areas that will have the biggest impact on both real and perceived performance in your site or app. Let's look at each one in a bit more detail.

### Render blocking

JavaScript blocks rendering.

When a JS file is being downloaded, parsed, and run, the browser stops rendering any of the UI. Because JavaScript can and often does change elements on the page, browsers wait until the JS is ready to avoid doing unnecessary work.

To avoid this, load your JS in the footer, or [use `defer` if loading it in the `head`](/when-should-you-add-the-defer-attribute-to-the-script-element/). This will prevent it from blocking initial render.

### Repaints and reflows

When JavaScript updates an element in the DOM, the browser needs to do a _repaint_ of the UI. This often involves calculating the sizes and positions of various elements, and involves a fair bit of work.

Because it's so "labor intensive" for the browser, you want to minimize the number of times a repaint happens. That typically means batching UI changes into a single step.

For example, here, we're injecting a bunch of list items into an unordered list.

```js
let list = document.querySelector('ul');
let wizards = ['Gandalf', 'Radagast', 'Merlin'];

// Add each wizard to the UI
for (let wizard of wizards) {
	list.innerHTML += `<li>${wizard}</li>`;
}
```

On each loop, a new item is injected into the UI, a repaint is triggered, and the browser has to run a bunch of calculations.

If you've ever visited a page that does lots of UI animations and parallax effects on scroll, you may have encountered the jank that can result. This is a direct result of repaint calculations.

A more performant approach would be to create a single string from all of the items, and inject it once the loop is completed.

```js
let list = document.querySelector('ul');
let wizards = ['Gandalf', 'Radagast', 'Merlin'];
let items = '';

// Add each wizard to the items string
for (let wizard of wizards) {
	items += `<li>${wizard}</li>`;
}

// Update the UI
list.innerHTML += items;
```

Because the UI only updates once, only a single repaint is triggered. Alternatively, you could use [document fragments](/two-more-ways-to-create-html-from-an-array-of-data-with-vanilla-js/#creating-a-fragment) for this.

This is also why UI updates in state-based UI libraries are asynchronous. Libraries like Vue, React, and [Reef](https://reefjs.com) batch multiple updates into a single render to avoid costly browser repaints.

### Memory allocation

Browsers have a finite amount of memory.

The exact amount varies by browser and device, and on modern browsers and new devices it can be quite high. But it's not unlimited.

Modern JavaScript applications tend to use _a lot_ of memory, and it shows. After a while, the apps start to get slow and laggy, and sometimes will freeze entirely. This is particularly noticeable in single page apps.

The two biggest offenders:

1. Lots of event listeners attached to individual elements
2. Store huge amounts of data in memory

Modern frameworks encourage the bad practice of attaching event listeners directly on elements.

```html
<button onclick="doSomething()">Click Me</button>
```

A better approach is to [use event delegation](/vanilla-js-event-delegation-with-a-lot-of-event-handlers-on-one-page/), which greatly reduces the amount of listeners in browser memory.

[Using Constructors and prototypal inheritance](/classes-vs.-prototypal-inheritance-in-vanilla-js/) can also reduce the memory load for certain types of JavaScript libraries, particularly ones where the same methods and properties are shared by multiple items.

But large apps also tend to store huge amounts of _state_ in memory.

```js
let appData = {
	// every single detail about the current state of the application...
};
```

Across multiple views in a single-page app, the size of this in-memory data can swell to huge sizes. That's usually when the entire house of cards starts to fall apart.

## What _doesn't_ matter?

I often see students spend a lot of time worry about little performance details that don't really matter much in terms of actual user experience.

For example, you may [read that `document.getElementById()` is more than twice as fast as `document.querySelector()`](/javascript-selector-performance/), and start fretting about which selector method to use when.

It's true, by the way. The `document.getElementById()` method can run about 15 million operations a second, compared to "just" 7 million per second for the `document.querySelector()` method in the latest version of Chrome.

But that also means that the `document.querySelector()` method runs 7,000 operations _a millisecond_. That's really damn fast!

I also similarly see people worry about things like which loop method is faster.

```js
let numbers = [1, 2, 3];

// Should I use this...
let doubled = numbers.map(function (num) {
	return num * 2;
});

// Or this...
let doubledToo = [];
for (let num of numbers) {
	doubledToo.push(num * 2);
}
```

These kinds of things just don't matter in the big picture.

Most native methods are _really fast_. They become performance issues when they block rendering, trigger lots of reflows, or occupy lots of space in memory.

If they're not doing those things, use the approaches that are easiest for you to read and work with, and don't worry about it too much!