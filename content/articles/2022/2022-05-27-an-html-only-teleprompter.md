---
title: How to create an HTML teleprompter
date: 2022-05-27T10:30:00-04:00
draft: false
categories:
- Code
- CSS
- Design and UX
- HTML
- JavaScript
---

When I create code tutorials, I don't use a script. I'm typically just sharing my screen and "winging it" off of some rough notes I've created.

But every now and then, I need to put together a "talking head" video. And when I do, I _need_ a script or I'll go completely off the rails in an ADHD-inspired tangent.

In the past, I used to put together slides with really large text and manually click through them all, but... that's kind of PITA.

But sometime last year, I saw multiple people mention that they use the deprecated-but-still-works-in-every-browser `marquee` element as a no-cost teleprompter, and I've never looked back!

Today, I wanted to quickly show you how I have mine setup.

## The HTML

First, the `marquee` element itself.

```html
<marquee direction="up" scrollamount="4" loop="1">
	Content...
</marquee>
```

By default, they scroll left-to-right, but we want ours to scroll up. You can control that with the `direction` attribute. 

I've found the `marquee` element scrolls too fast for me to read. The `scrollamount` attribute specifies how fast to move (in pixels-per-scroll). I set mine to `3` or `4`.

I also don't want it to repeat once I reach the end. The `loop` attribute specifies how many times to loop (with the default `-1` meaning "go on forever").

## The CSS

The `marquee` element is a bit unusable with it's default styling. The text is too small and the page is too wide.

I add some basic styles to give it a more readable style.

```css
body {
	font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
	height: 100vh;
	line-height: 1.2;
	margin: 1em auto;
	overflow: hidden;
	max-width: 40em;
	width: 88%;
}

marquee {
	max-height: 92vh;
	font-size: 2.4em;
}
```

My preference is to use the system font in a large size, and fill up the entire page.

## Adding pause/play functionality with JavaScript

On its own, a styled `marquee` element is a simple, it-just-works teleprompter.

But I also want the ability to pause it if it's going too fast, and start it playing again, while still keeping the recording going. For that, we need some JavaScript!

First, I use the `document.querySelector()` method to get the `marquee` element and assign it to the `prompter` variable.

```js
// Get the prompter element
let prompter = document.querySelector('marquee');
```

I like to use the space bar or a mouse click to pause and play.

I added two event listeners: a `keyup` on the `document`, and a `click` on the `prompter` itself. Both run a `controlPrompter()` callback function.

```js
// Listen for keyup and click events
document.addEventListener('keyup', controlPrompter);
prompter.addEventListener('click', controlPrompter);
```

For `keyup` events, the `event` object has a `code` property that surfaces the key that triggered the event.

If there's an `event.code` property _and_ if it doesn't equal `Space`, I use the `return` operator to end my callback function early.

```js
/**
 * Control the prompter speed and scrolling
 * @param  {Event} event The event object
 */
function controlPrompter (event) {
	if (event.code && event.code !== 'Space') return;
}
```

The `marquee` element has two JavaScript methods&mdash;`start()` and `stop()`&mdash;that you can use to start and stop scrolling, respectively.

I created a `state` variable to store whether the `prompter` is currently playing or paused, and use `start` and `stop` as its values.

```js
// Get the prompter element
let prompter = document.querySelector('marquee');

// Maintain the state of the player
let state = 'start';
```

Inside the `controlPrompter()` function, I use a [ternary operator](/ternary-operators/) to update the `state` variable.

Then, I use bracket notation to run the function for whatever the current `state` is to start or stop the `prompter`.

```js
/**
 * Control the prompter speed and scrolling
 * @param  {Event} event The event object
 */
function controlPrompter (event) {
	if (event.code && event.code !== 'Space') return;
	state = state === 'start' ? 'stop' : 'start';
	prompter[state]();
}
```

Now, I can start and stop my prompter while recording using my keyboard or mouse.

[Here's a demo.](https://codepen.io/cferdinandi/pen/xxYpapK)