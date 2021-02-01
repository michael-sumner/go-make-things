---
title: "The Element.style.cssText property in vanilla JS"
date: 2021-02-01T10:30:00-05:00
draft: false
categories:
- Code
- CSS
- JavaScript
---

The `Element.style` property is _supposed to be_ a read-only property that returns a `CSSStyleDeclaration` object: an array of inline style properties the element has, as well as a key/value pair mapping of all available styles you could get or set.

```html
<p id="app" style="background-color: rebeccapurple; color: white;">
	Hello, world!
</p>
```

```js
let app = document.querySelector('#app');

// ["background-color", "color"]
let inlineStyles = app.style;
```

But, you're not supposed to set styles using the property directly.

```js
// DON'T do this
app.style = 'font-size: 2em; font-weight: bold;';
```

I've found most browsers will actually let you do it, but it's not how the property is supposed to work. Instead, you can set individual properties on the `Element.style` property directly, using a camel-case format.

(_You can find a full list of [css-properties and their JS equivalents on MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Properties_Reference)._)

```js
// Add styles for font-size and font-weight
app.style.fontSize = '2em';
app.style.fontWeight = 'bold';
```

But, this weekend, I learned that there's actually an `Element.style.cssText` property that works like `Element.className`, but for inline styles.

You can use it as a _getter_ or _setter_ property.

As a getter, it returns a string with all of the inline styles on an element. When using it to set properties, it will replace all of the styles on the element with whatever you use. It also lets you author styles the way you would plain old CSS.

```js
// returns "background-color: rebeccapurple; color: white;"
let styles = app.style.cssText;

// Wipes out the existing styles and replaces them with this
app.style.cssText = 'font-size: 2em; font-weight: bold;';

// Appends the existing styles with more
app.style.cssText += 'color: rebeccapurple;';
```

[Here's a demo.](https://codepen.io/cferdinandi/pen/mdOyZVe)

If you need more fine-grained control, targeting individual properties is still a good idea. But if you want easily swap out all of the styles on an element, `Element.style.cssText` is quite useful!