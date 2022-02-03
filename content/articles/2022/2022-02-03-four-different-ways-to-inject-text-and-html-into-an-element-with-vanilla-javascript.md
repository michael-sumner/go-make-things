---
title: Four different ways to inject text and HTML into an element with vanilla JavaScript
date: 2022-02-03T10:30:00-05:00
draft: false
categories:
- Code
- HTML
- JavaScript
---

Today, we're going to look at four different techniques you can use to get and set text and HTML in DOM elements.

Let's dig in!

## The `Element.innerHTML` property

You can use the `Element.innerHTML` property to get and set the HTML content inside an element as a string.

```html
<div class="greeting">
	<p>Hello world!</p>
</div>
```

```js
let greeting = document.querySelector('.greeting');

// Get HTML content
// returns "<p>Hello world!</p>"
let html = greeting.innerHTML;

// Set HTML content
// This replaces what was in there already
greeting.innerHTML = 'We can dynamically change the HTML. We can even include HTML elements like <a href="#">this link</a>.';

// Add HTML to the end of an element's existing content
greeting.innerHTML += ' Add this after what is already there.';

// Add HTML to the beginning of an element's existing content
greeting.innerHTML = 'We can add this to the beginning. ' + elem.innerHTML;

// You can inject entire elements into other ones, too
greeting.innerHTML += '<p>A new paragraph</p>';
```

[Here's a demo of the `Element.innerHTML` property.](https://codepen.io/cferdinandi/pen/BamzqaX?editors=1010)



## The `Element.outerHTML` property

You can use the `Element.outerHTML` property to get and set the HTML content _including_ an element. This works the same as `Element.innerHTML`, but includes the element itself when getting and updating HTML content.

```html
<div class="greeting">
	<p>Hello world!</p>
</div>
```

```js
let greeting = document.querySelector('.greeting');

// Get HTML content
// returns "<div class="greeting"><p>Hello world!</p></div>"
let html = greeting.outerHTML;

// Set HTML content
// This completely replaces the <div class="greeting"></div> element and all of its content
greeting.outerHTML = '<p class="outro">Goodbye, friend! <a href="exit.html">Click here to leave.</a>';

// Add HTML after the element (and outside of it)
greeting.outerHTML += ' Add this after what is already there.';

// Add HTML before the element (and outside of it)
greeting.outerHTML = 'We can add this to the beginning. ' + greeting.innerHTML;
```

[Here's a demo of the `Element.outerHTML` property.](https://codepen.io/cferdinandi/pen/dyZXgPq?editors=1010)



## The `Node.textContent` property

You can use the `Node.textContent` property to get and set the text of an element (and omit the markup) as a string.

In the example below, you may notice that the `Node.textContent` property gets _all_ of the text content, including CSS properties inside of a `style` element and `hidden` UI elements.

Any HTML elements included in a string when setting content with the `Node.textContent` property are automatically encoded and rendered as-is.

```html
<div class="greeting">
	<style type="text/css">
		p {
			color: rebeccapurple;
		}
	</style>
	<p hidden>This is not rendered.</p>
	<p>Hello world!</p>
</div>
```

```js
let greeting = document.querySelector('.greeting');

// Get text content
// returns "p {color: rebeccapurple;} This is not rendered. Hello world!"
let text = greeting.textContent;

// Set text content
// This completely replaces whats there, including any HTML elements
greeting.textContent = 'We can dynamically change the content.';

// Add text to the end of an element's existing content
greeting.textContent += ' Add this after what is already there.';

// Add text to the beginning of an element's existing content
greeting.textContent = 'We can add this to the beginning. ' + greeting.textContent;

// HTML elements are automatically encoded and rendered as-is
greeting.textContent = '<p>See you later!</p>';
```

[Here's a demo of the `Node.textContent` property.](https://codepen.io/cferdinandi/pen/abVZROE?editors=1010)



## The `Element.innerText` property

The `Element.innerText` property gets and sets the _rendered text_ of an element (and omits the markup).

Unlike the `Node.textContent` property, the `Element.innerText` property returns only rendered text, similar to what a user would be able to select with their cursor or the keyboard when highlighting text.

Like `Node.textContent`, any HTML elements included in a string when setting content are automatically encoded and rendered as-is.

```html
<div class="greeting">
	<style type="text/css">
		p {
			color: rebeccapurple;
		}
	</style>
	<p hidden>This is not rendered.</p>
	<p>Hello world!</p>
</div>
```

```js
let elem = document.querySelector('.greeting');

// Get text content
// returns "Hello world!"
let text = elem.innerText;

// Set text content
// This completely replaces whats there, including any HTML elements
elem.innerText = 'We can dynamically change the content.';

// Add text to the end of an element's existing content
elem.innerText += ' Add this after what is already there.';

// Add text to the beginning of an element's existing content
elem.innerText = 'We can add this to the beginning. ' + elem.innerText;

// HTML elements are automatically encoded and rendered as-is
elem.innerText = '<p>See you later!</p>';
```

[Here's a demo of the `Element.innerText` property.](https://codepen.io/cferdinandi/pen/NWwrOGq?editors=1010)

## Which one should you use?

Generally speaking, if you're only modifying text, using the `Node.textContent` property is your best, safest bet.

For modifying HTML, the `Element.innerHTML` property is very useful, but does have some security concerns that we'll look at in another article.