---
categories:
- Code
- JavaScript
date: '2018-01-09'
url: /javascript-debugging-basics-part-2/
title: 'JavaScript Debugging Basics: Part 2'
---

First off, thanks to everyone who responded to [yesterday's debugging challenge](/javascript-debugging-basics-part-1/). It's always interesting to see how others approach problems and think about code.

Today, I'm going to walk you through how I would debug an issue like this.

## The power of the humble `console.log()`

The `console.log()` let's you, as the name implies, log data into the console tab in your browser's developer tools.

It's incredibly handy for debugging code.

When I encounter a problem like this, I start with the last known working piece of code and work my way through until I find something unexpected.

## Debugging our script

As a quick refresher from yesterday's article, here's our event listener:

```js
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

I started by logging `running!` in the console immediately after the click event was called to make sure it was working properly. Then I clicked the button.

```js
document.addEventListener('click', function (event) {

    console.log('running!');

    // ...

}, false);
```

So far, so good.

Next, I logged the `toggleId` variable to make sure the right element&mdash;the close button&mdash;was being picked up by the listener, and clicked the button again.

```js
document.addEventListener('click', function (event) {

    // Make sure clicked element is our toggle
    // To do this, make sure it has the data-toggle attribute
    var toggleId = event.target.getAttribute('data-toggle');

    console.log(toggleId);

    // ...

}, false);
```

As expected, the close button's `[data-toggle]` attribute value&mdash;`#close`&mdash;was logged. Then, I logged the `content` variable.

```js
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

    console.log(content);

    // ...

}, false);
```

That returned `null`.

I looked back at the logged `toggleId` value again, and realized it was set to the wrong ID. Our content area had an ID of `#example`, and the `toggleId` was set to `#close`. It was targeting an element that doesn't exist.

I changed it to `#example` and [the script started working as expected](https://jsfiddle.net/cferdinandi/yje424xt/20/).

## Debugging isn't glamorous

Debugging is not the most glamour part of writing code. It involves a lot of staring at code trying to figure out what's wrong.

But it's also an essential skill to have a developer.

If you struggle with debugging, I hope this mini series gave you an approach you can use to start debugging your own code more effectively.