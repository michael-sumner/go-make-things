---
title: "The Element.innerHTML and Element.outerHTML properties in vanilla JS"
date: 2021-04-06T10:30:00-04:00
draft: false
categories:
- Code
- HTML
- JavaScript
---

The `Element.innerHTML` and `Element.outerHTML` properties can be used to get and set HTML as a string on an element. Today, we're going to look at how they're different, and which one you should use.

Let's dig in.

## The `Element.innerHTML` property

You can use the `Element.innerHTML` property to get and set the HTML content inside an element as a string.

For example, lets say you have some HTML, like this.

```html
<div class="greeting">
	<p>Hello world!</p>
</div>
```

You can get the HTML inside the `.greeting` element as a string like this.

```js
let greeting = document.querySelector('.greeting');

// Get HTML content
// returns "<p>Hello world!</p>"
let html = greeting.innerHTML;
```

You can also update the HTML, replacing it entirely or appending to it, with HTML strings.

```js
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

[Here's a demo.](https://codepen.io/cferdinandi/pen/wvgqpmZ)

## The `Element.outerHTML` property

You can use the `Element.outerHTML` property to get and set the HTML content _including_ an element. This works the same as `Element.innerHTML`, but includes the element itself when getting and updating HTML content.

```js
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

[Here's another demo.](https://codepen.io/cferdinandi/pen/XWpaVqp)

## HTML and Cross-Site Scripting

Injecting HTML strings into the DOM with third-party content (provided by users from a form, or from sources like APIs) carries the risk of cross-site scripting (XSS) attacks.

Fortunately, you dramatically reduce this risk by sanitizing and encoding data before injecting it. [You can learn more about how to do that in this article.](/how-to-sanitize-third-party-content-with-vanilla-js-to-prevent-cross-site-scripting-xss-attacks/)

## Which method should you use?

If you want to get, replace, or add content inside an element, use the `Element.innerHTML` property. If you want to replace the element itself, use `Element.outerHTML` instead.