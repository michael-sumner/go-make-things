---
categories:
- Code
- CSS
- JavaScript
date: '2017-08-22'
permalink: /getting-an-elements-css-attributes-with-vanilla-javascript/
title: Getting an element&#8217;s CSS attributes with vanilla JavaScript
url: /2017/08/22/getting-an-elements-css-attributes-with-vanilla-javascript
---

Vanilla JavaScript offers the `style` property, which can be used to both set and get styles on attribute.

```javascript
var elem = document.querySelector('#some-element');

// Set a background color
elem.style.backgroundColor = 'purple';

// Get the color
var color = elem.style.color;
```

However, this approach only works for inline styles. If the element like this, the approach above would work:

```markup
<div id="some-element" style="color: white;">Hello, World!</div>
```

But if it was a typical element without any inline styles, `elem.style.color` would return `null`.

## Getting the browser-rendered style

We want a way to get the styles that the browser is rendering on the element.

That could be an inline style. It could also be in an external stylesheet, or just the browser default for an element. Whatever the case, we want to the true CSS properties that the browser is using for the element.

For that, we use `getComputedStyle()`.

`getComputedStyle()` is always called on the `window`, and the element is passed in as an argument. You get back an object of properties.

```javascript
var styles = window.getComputedStyle(elem);
```

You can access any of those properties directly just like you would any other object property. For example, to get an element's color, you'd do this:

```javascript
var color = window.getComputedStyle(elem).color;
```

To get the rendered height of the element (regardless of whether or not it's specified in a stylesheet), you'd do this:

```javascript
var height = window.getComputedStyle(elem).height;
```

`getComputedStyle()` works in all modern browsers, plus IE9 and up. This is a super handy method to have in your toolbelt!

***Note:*** *I should have mentioned in this post but didn't: `getComputedStyle()` can only be used for getting styles, not setting them.*