---
categories:
- Code
- JavaScript
date: '2017-09-14'
permalink: /a-vanilla-javascript-clock/
title: A vanilla JavaScript clock
url: /2017/09/14/a-vanilla-javascript-clock
---

This week, I'm sharing topics from my next [pocket guide](https://gomakethings.com): Vanilla JS Web Apps.

Let's take what we learned over the last few days and use it to build a clock with vanilla JavaScript.

## The Setup

First, we'll pull in our `render()` function.

```js
var render = function (template, node) {
    if (!node) return;
    node.innerHTML = (typeof template === 'function' ? template() : template);
    var event = new CustomEvent('elementRenders', {
        bubbles: true
    });
    node.dispatchEvent(event);
    return node;
};
```

We'll also create an empty `<div>` with the ID `#clock`.

```html
<div id="clock"></div>
```

Now we're ready to build our clock!

## Setting the time

When the page loads, we'll render the current time using `new Date()` to generate a time string, and `toLocaleTimeString()` to convert it to the user's local time.

We'll inject it with the `render()` function.

```js
render('<h1>The time is ' + new Date().toLocaleTimeString() + '</h1>', document.querySelector('#clock'));
```

[Here's a demo.](https://jsfiddle.net/cferdinandi/r18nLqob/)

## Updating the time

That's a great start, but we want the time to automatically update every second. To do that, we'll use `setInterval` to re-render our content every 1000 milliseconds.

```js
render('<h1>The time is ' + new Date().toLocaleTimeString() + '</h1>', document.querySelector('#clock'));

window.setInterval(function () {
	render('<h1>The time is ' + new Date().toLocaleTimeString() + '</h1>', document.querySelector('#clock'));
}, 1000);
```

[Here's our working clock.](https://jsfiddle.net/cferdinandi/r18nLqob/1/)

## Cleaning things up

Right now, we're repeating ourself by running the same `render()` code in two different spots.

To keep our code more DRY (Don't Repeat Yourself), we should move that to a function we can call as needed.

```js
var tick = function () {
	render('<h1>The time is ' + new Date().toLocaleTimeString() + '</h1>', document.querySelector('#clock'));
};

tick();
window.setInterval(tick, 1000);
```

[And here's our completed projected.](https://jsfiddle.net/cferdinandi/r18nLqob/2/)

If you've already purchased [the complete set of pocket guides](/guides/complete-set/), you'll get "Vanilla JS Web Apps" as a free update when it comes out.

And if you haven't, now's the time to buy! The price will go up when the guide launches.