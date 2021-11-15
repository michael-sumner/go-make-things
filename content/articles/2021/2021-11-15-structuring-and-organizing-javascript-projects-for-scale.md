---
title: Structuring and organizing JavaScript projects for scale
date: 2021-11-15T10:30:00-04:00
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

One of the most common questions I hear from my students as they transition from beginner to mid-level developers is, "How do you structure code?"

As a code base grows, it can become harder to manage, maintain, and grow. Files become long and unruly. Code snippets get reused in multiple places, so your find yourself copying-and-pasting a lot. As the amount of code grows, your site or app starts to get a little slower.

This January, I'm launching a second Vanilla JS Academy workshop specifically designed to tackle these challenges.

## How to write JavaScript that scales

The new workshop&mdash;_Advanced JS Techniques: Structure and Scale_&mdash;is focused on how to write and organize code that will grow with you and your team.

Here's what you'll be doing as part of the workshop.

### Weight Conversion Library

This is a JavaScript library designed to convert one unit of weight to another (for example, grams to Kilograms).

We'll start by building a simple utility library.

```js
// This would return 2
let kg = weight.gramsToKg(2000);
```

Next, we'll modify the library to support creating unique instances, and modify units of weight saved with chaining methods.

```js
let car = new Weight(1600, 'kg');

// Get back weight in grams
let grams = car.inGrams();

// Modify the weight
car.addKg(20).addGrams(150);
```

Finally, we'll add support for custom events that you can hook into to customize the library without touching the core code.

```js
// If kilograms were added and the weight will be greater than 25kg, prevent it from happening
document.addEventListener('weight:add-before', function (event) {
	if (type === 'kg' && weight.kg > 25) {
		event.preventDefault();
		console.log(`Blocked ${amount}kg from being added to ${weight.kg}kg. Exceeded max allowed weight.`);
	}
});
```

### Time Library

Next, we'll build a library for working with dates and times, inspired by [Day.js](https://day.js.org/) and [date-fns](https://date-fns.org/).

Like with the weight library, we'll build a utility library

```js
// Get the date 4 months from now
let now = new Date();
time.addMonths(now, 4);
```

Then, we'll learn how to structure and modularize a growing code base with ES modules. Instead of loading the whole thing, developers can import just the functions they need.

```js
import {getDay, addMonths} from './time.js';

let now = new Date();
addMonths(now, 4);
```

We'll learn how to support user options and configurations, so that developers can modify the library _without_ having to touch any of the core code.

And we'll learn how to use build tools to compile the library into different formats to support as many different kinds of uses as possible: directly in the browser, using ES imports, and even using Node.js!

### Places

Places is an app that displays locations of interest nearby, and lets you mark the ones you love as favorites.

We'll start by restructuring the code with ES modules. This will make it easier to maintain over time, and produce smaller JS files customized for the different types of pages in the app.

```js
import {loadButtons} from './components/dom.js';
import './components/events.js';

loadButtons();
```

Then, we'll add offline support with Service Workers.

First, we'll create a custom "you're offline" page to show people when they lose internet. Next, we'll save pages to cache as they browse the app, and add the ability to view them even they go offline.

Finally, we'll look at some "housekeeping" activities to keep our service worker from taking up too much space on a visitor's device.

## Academy is getting an overhaul

With the addition of this new workshop, Academy will be getting a bit of overhaul. I'll be talking about that more tomorrow.

Registration for the new workshop (and foundational workshop) open up in just a few weeks. **You can [signup to get notified when that happens (and get exclusive discounts) at VanillJSAcademy.com](https://vanillajsacademy.com).**