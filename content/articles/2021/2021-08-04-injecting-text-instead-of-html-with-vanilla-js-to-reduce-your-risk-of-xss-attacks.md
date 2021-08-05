---
title: "Injecting text instead of HTML with vanilla JS to reduce your risk of XSS attacks"
date: 2021-08-04T10:30:00-04:00
draft: false
categories:
- Code
- HTML
- JavaScript
---

Yesterday, we looked at [how cross-site scripting attacks work](/how-to-reduce-your-risk-of-cross-site-scripting-attacks-with-vanilla-javascript/), and outlined three approaches you can use to prevent them from happening. Today, we're going to take a closer look at one of them: injecting plain text instead of HTML.

Let's dig in!

## Injecting plain text

One common approach to minimizing the risk of XSS attacks is to use properties that render plain text instead of HTML, such as `Node.textContent` or `Element.innerText` instead of HTML properties like `Element.innerHTML`.

HTML injected using one of the plain text properties is automatically encoded.

```js
// Get the node to inject your content into
let app = document.querySelector('#app');

// Renders a string with encoded characters
// This would show up in the DOM as an encoded string (&lt;img src=x onerror="alert('XSS Attack')"&gt;) instead of as an image element
app.textContent = `<img src=x onerror="alert('XSS Attack')">`;
```

[Here's a demo.](https://codepen.io/cferdinandi/pen/VwbGmWd)

If you need to add markup around the content, pair `Node.textContent` or `Element.innerText` with the `document.createElement()` method, and inject it using one of the techniques from the previous lesson.

```js
// Create your element
let content = document.createElement('h1');

// Add your content
content.textContent = `<img src=x onerror="alert('XSS Attack')">`;

// Insert the content into the app
app.append(content);
```

[Here's another demo.](https://codepen.io/cferdinandi/pen/wvdEoeL)

If you want to replace what's already there, you can use `Element.innerHTML` to wipe the parent container first.

```js
app.innerHTML = '';
```

## Sanitizing URLs

Injecting text is great for body content, but it does _not_ protect you when using third-party data as the `href` attribute on a link.

For that, you need to remove `javascript:` from the string with the `String.replace()` method.

```js
// A dangerous URL
let url = `javascript:alert('Another XSS Attack')`;

// Create the link
let link = document.createElement('a');

// Add your content
link.textContent = `Click Me`;

// Sanitize and add the URL
link.href = url.replace(/javascript:/gi, '');

// Insert the content into the app
app.append(link);
```

[Here's a demo of this technique.](https://codepen.io/cferdinandi/pen/abWaByy)

_**Note:** A savvy reader also pointed out that the `String.replace()` approach to removing `javascript:` can be thwarted by using a string like this: `javajavascript:script:alert(1)`. This hack would require knowing specifically how our sanitizing code works, but it is still a vulnerability._

## What's next?

Using properties that set plain text values are great if you're _only_ adding text, but if you're adding a lot of markup around it, using `document.createElement()` for every element can get tedious. Properties that inject HTML like `Element.innerHTML` and `Element.outerHTML` properties are so much easier.

Tomorrow, we'll look at another approach you can use to selectively encode strings while still using HTML string properties like `Element.innerHTML`.