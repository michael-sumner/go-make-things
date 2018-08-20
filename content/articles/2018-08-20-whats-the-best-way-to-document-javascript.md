---
title: "What's the best way to document JavaScript?"
date: 2018-08-20T10:30:00-04:00
draft: false
categories:
- Code
- JavaScript
---

A few of my students were discussing JS documentation last week, and specifically what the best way to do so is.

There is not single "right" way to document code, but I think there are some approaches that make it easier for both others using your code and "future you" when you come back to code you haven't touched in a ~~months~~ years.

## The myth of self-documenting code

But first, let's clear up a myth I see circulating among some senior developers. It goes like this...

> If you write your code clearly and use appropriate structure and naming conventions, it's self-documenting.

**Self-documenting code is bullshit.**

Smaller, more focused functions and better naming conventions can go a long way in making your code easier to read and work with. You should absolutely do it.

But that doesn't mean it's automagically documented. *Always* document your code.

## How to document your code

There's a standard approach to JS documentation known as JSDoc. It follows a standard format.

```js
/**
 * [someFunction description]
 * @param  {[type]} arg1 [description]
 * @param  {[type]} arg2 [description]
 * @return {[type]}      [description]
 */
var someFunction = function (arg1, arg2) {
	// Do something...
};
```

Here's an example with an actual function, to help make it stick.

```js
/**
 * Add two numbers together
 * @param  {Number} num1 The first number
 * @param  {Number} num2 The second number
 * @return {Number}      The total of the two numbers
 */
var addTwoNumbers = function (num1, num2) {
	return num1 + num2;
};
```

In addition to `@param` and `@return`, there are [useful tags like `@todo`, `@deprecated`, `@license`, and so on](http://usejsdoc.org/index.html#block-tags).

The structure follows a convention used in other languages like PHP. I like it so much, I use it in CSS, too (something [Tim Kadlec tried to get going](https://timkadlec.com/2008/12/manageable-css-with-cssdoc/) that never really took off).

JSDoc *can* also be used to automatically generate `README` style docs, but I prefer to hand-write that kind of documentation. More on that in a minute.

### Adding additional info inside the function

I use JSDoc for the main function overview, and sometimes that's enough. Our `addTwoNumbers()` function above, for example, is fully described by the JSDoc heading.

But for slightly bigger functions, it's useful to add one-line (or sometimes multi-line) comments within to describe what's happening.

This may seem overdone. I've had some more pretentious engineers tell me I over-document.

But future me always thanks past me for doing this when I come back to a project I haven't touched in a while. I'm never sitting there wondering what a line of code does or why I wrote it.

Try working on someone else's "self-documented code" and tell me you wouldn't rather have it over-documented than under-documented.

Here's a sample function. Can you tell me what each line does?

```js
/**
 * Toggle visibility of a content tab
 * @param  {String} selector Selector for the element
 * @param  {Node}   toggle   The element that triggered the tab
 */
var toggleVisibility = function (selector, toggle) {
	if (!selector) return;
	var elem = document.querySelector(selector);
	if (!elem) return;
	elem.classList.add('active');
	if (toggle) {
		toggle.classList.add('active');
	}
	elem.focus()
	if (document.activeElement.matches(selector)) return;
	elem.setAttribute('tabindex', '-1');
	elem.focus();
};
```

Maybe you could. Did it take a little while?

Now, here's an example with proper in-context documentation.

```js
/**
 * Toggle visibility of a content tab
 * @param  {String} selector Selector for the element
 * @param  {Node}   toggle   The element that triggered the tab
 */
var toggleVisibility = function (selector, toggle) {

	// If there's no selector, bail
	if (!selector) return;

	// Get the tab to show
	var elem = document.querySelector(selector);
	if (!elem) return;

	// Show the element
	elem.classList.add('active');

	// If a toggle element was provided, add an .active class for styling
	if (toggle) {
		toggle.classList.add('active');
	}

	// Bring the newly visible element into focus
	elem.focus()

	// If elem.focus() didn't work, add tabindex="-1" and try again
	// (elements that aren't focusable by default need a tabindex)
	if (document.activeElement.matches(selector)) return;
	elem.setAttribute('tabindex', '-1');
	elem.focus();

};
```

Better, right?

## Long-form documentation

For my plugins and JS tools, I prefer to write my long-form documentation instead of letting JSDoc do it for me.

It's more work, but it results in documentation that's more beginner friends and reads like it was written by a human (because it was). I tend to use the same rough format for my docs, but pick whatever works for you.

[Here's an example if you want to follow along.](https://github.com/cferdinandi/smooth-scroll/blob/master/README.md)

1. Description
2. Link to a demo
3. Getting Started
    - How to add any required JS/CSS
    - Required markup structure
    - Instantiation steps, if required
4. Working with source files (for people who want to use the uncompiled code)
5. Options and Settings (since my plugins are usually configurable)
6. Browser Compatibility
7. License

So... that's how I document my code. Do you do anything differently? I'd love to learn more about it. Send me an email or ping me on Twitter and let me know.