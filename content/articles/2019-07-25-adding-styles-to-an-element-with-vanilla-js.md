---
title: "How to add multiple to an element with vanilla JS"
date: 2019-07-25T10:30:00-04:00
draft: false
categories:
- Code
- CSS
- HTML
- JavaScript
---

Earlier this week, [Tim Kamanin tweeted](https://twitter.com/timonweb/status/1153248445395873792) an article about [how to add multiples styles to an element with JavaScript](https://timonweb.com/tutorials/how-to-add-multiple-css-styles-to-an-element-in-vanilla-javascript/).

At the time, I snarkily commented:

> Use CSS instead?

Despite me being kind of an asshole, Tim engaged in a really sincere conversation with me about his approach. [Tyler Williams](https://twitter.com/tylerwilliamsct/status/1153685916738654209) added some additional commentary that was interesting, too.

Let's dig into Tim's approach, my preferred way of handling this, and a third way that kind of meets in the middle.

## Tim's approach

In jQuery, you can add a bunch of styles at once with the `css()` method. In vanilla JS, you can add styles with the `Element.style` property, but have to add them one-by-one.

Tim has a really clever way of handling this: use the `Object.assign()` method on the `Element.style` property.

```js
// Get the element
var button = document.querySelector('button');

// Setup the styles object
var styles = {
    backgroundColor: 'red',
    color: 'white',
    padding: '20px'
};

// Add the styles to the element
Object.assign(button.style, styles);
```

## My approach

Typically, I'd recommend declaring those styles as CSS in a CSS file, like this.

```css
.btn {
	background-color: "red";
	color: "white";
	padding: "20px";
}
```

Then, I would add that class to the element with the `classList` API.

```js
// Get the element
var button = document.querySelector('button');

// Add the class
button.classList.add('btn');
```

**So, why wouldn't you use this approach?**

Tim and Tyler brought up a few use cases I hadn't considered:

- Bookmarklets, where loading a stylesheet isn't an option
- Client projects where the client does not give you access to their stylesheet

## A third way

I've had to do something like this before with a JS plugin that loaded just a bit of CSS to be used by multiple elements.

Instead of style elements directly, I created a `style` element, injected it into the header, and then used my preferred approach above to add classes to the elements.

First, let's setup our styles as a JavaScript string.

```js
var styles =
	'.btn {' +
		'background-color: "red";' +
		'color: "white";' +
		'padding: "20px";' +
	'}';
```

Then, we get the `head` element, create a `style` element, and add our styles into it.

```js
// Create styles
var styles =
	'.btn {' +
		'background-color: "red";' +
		'color: "white";' +
		'padding: "20px";' +
	'}';

// Get the head element
var head = document.head || document.getElementsByTagName('head')[0];

// Inject styles into the DOM
var div = document.createElement('div');
div.innerHTML = '<p>x</p><style>' + styles + '</style>';
head.appendChild(div.childNodes[1]);
```

Major thanks to Tim and Tyler for pointing out why my snarky position might not always make sense and being really cool about engaging with me.