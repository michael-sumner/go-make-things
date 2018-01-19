---
categories:
- Code
- JavaScript
date: '2017-09-11'
permalink: /rendering-content-with-vanilla-javascript/
title: Rendering content with vanilla JavaScript
url: /2017/09/11/rendering-content-with-vanilla-javascript
---

I've started writing my next [pocket guide](https://gomakethings.com): Vanilla JS Web Apps.

Over the next few weeks, I'll be sharing some of the topics from the guide here. Today, we're going to look at how to render content with vanilla JavaScript.

Let's get to it!

## The `render()` method

React has a function called `render()` that let's you pass in a template and the element to render it into, and it handles the rest.

We can create something similar with just a few lines of vanilla JavaScript. First, let's set up our `render()` method.

```lang-js
var render = function (template, node) {
	// Codes goes here...
};
```

This follows the same structure as React, where you pass in a template and the node to render it into.

To render content, we'll use `innerHTML`, a property that let's you set the inner HTML of an element.

```lang-js
var render = function (template, node) {
	node.innerHTML = template;
};
```

Now, we can render content like this:

```lang-js
var template = '<h1>Hello world!</h1>';
render(template, document.querySelector('#main'));
```

[Here's a working demo.](https://jsfiddle.net/cferdinandi/ctmf0gzu/)

## Checking that the node exists

One thing we should do is make sure a node exists before trying to set it's `innerHTML`. Otherwise, we might throw an error.

We'll simply check that node was provided and exists, and if not, `return` to end our function.

```lang-js
var render = function (template, node) {
	if (!node) return;
	node.innerHTML = template;
};
```

### Why a node instead of a selector?

I originally thought of passing in a selector instead of a node, and using `querySelector()` to get the node inside our `render()` function. That would certainly be easier.

```lang-js
var render = function (template, selector) {
	var node = document.querySelector(selector);
	if (!node) return;
	node.innerHTML = template;
};
render(template, '#main');
```

There are two reasons you wouldn't want to do this.

1. If you've already gotten the node (to add a class or data attribute, for example), there's no reason to re-query it in the DOM.
2. You may want to render content into an element you created but haven't [injected into the DOM](https://gomakethings.com/adding-a-new-element-to-the-dom-with-vanilla-js/) yet.

## What now?

That's a basic `render()` function. Tomorrow, we'll look at how to support dynamic and conditional templates.

If you've already purchased [the complete set of pocket guides](https://gomakethings.com/guides/complete-set/), you'll get "Vanilla JS Web Apps" as a free update when it comes out.

And if you haven't, now's the time to buy! The price will go up when the guide launches.