---
categories:
- Code
- JavaScript
date: '2017-09-13'
url: /manipulating-elements-after-theyre-rendered-into-the-dom/
title: Manipulating elements after they&#8217;re rendered into the DOM
---

This week, I'm sharing topics from my next [pocket guide](https://gomakethings.com): Vanilla JS Web Apps.

Yesterday we looked at [how to render dynamic and conditional content into the DOM](/rendering-dynamic-and-conditional-templates-with-vanilla-javascript/) with vanilla JavaScript. Today, we're going to learn how to further manipulate an element after it's rendered.

## Returning the element.

The first and easiest way is to return our element after it's rendered. Here's our script so far.

```js
var render = function (template, node) {
	if (!node) return;
	node.innerHTML = (typeof template === 'function' ? template() : template);
};
```

Let's return the `node` element after it runs.

```js
var render = function (template, node) {
	if (!node) return;
	node.innerHTML = (typeof template === 'function' ? template() : template);
	return node;
};
```

Now we can set our `render()` function to a variable and continue to work with it.

```js
// Render the content
var mainContent = render('<h1>Hello world!</h1>', document.querySelector('#main'));

// Add a class
mainContent.classList.add('margin-bottom-large');
```

## Emit a custom event

We may also want to expose our rendered element to other scripts. To do that, we'll emit a custom event after it's rendered using the [CustomEvent API](/custom-events-with-vanilla-javascript/).

We should emit our event on the `node`, but set it to bubble so that you can listen for it further up the DOM.

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

Now you can listen for rendered DOM elements like this.

```js
document.addEventListener('elementRendered', function (event) {
	var elem = event.target; // The rendered element
}, false);
```

[Here's a working demo.](https://jsfiddle.net/cferdinandi/ctmf0gzu/9/)

If you've already purchased [the complete set of pocket guides](/guides/complete-set/), you'll get "Vanilla JS Web Apps" as a free update when it comes out.

And if you haven't, now's the time to buy! The price will go up when the guide launches.