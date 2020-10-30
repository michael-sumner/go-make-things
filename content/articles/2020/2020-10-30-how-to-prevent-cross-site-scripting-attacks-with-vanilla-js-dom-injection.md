---
title: "How to sanitize third-party content with vanilla JS to prevent cross-site scripting (XSS) attacks"
date: 2020-10-30T10:30:00-04:00
draft: false
categories:
- Code
- JavaScript
---

Third-party content (things like data from APIs and user-submitted content from form fields) can expose you to cross-site scripting (XSS) attacks if rendered into the UI as-is.

Today, we'll look at how they work and how to prevent them. Let's dig in.

## How XSS attacks work

XSS attacks work by unexpectedly running JavaScript that does things like scrape cookies or grab data from localStorage and send it off to a remote location.

In the example below, since `x` is an invalid image source, the `onerror` event is triggered and opens up an alert. In a real XSS attack, it would do something more malicious.

```js
var app = document.querySelector('#app');
app.innerHTML = '<img src="x" onerror="alert(1)">';
```

[Here's a demo.](https://codepen.io/cferdinandi/pen/RwRMLwa)

## How to prevent a XSS attack

To prevent a XSS attack, you need to sanitize any third-party content before rendering it into the UI. There are a few ways to do that.

The simplest way is to encode third-party data so that any HTML and CSS in the string renders as a plain string instead of markup and script. In the above example, after encoding the string would look like this.

```js
app.innerHTML = '&#60;img src&#61;&#34;x&#34; onerror&#61;&#34;alert&#40;1&#41;&#34;&#62;';
```

When injected into the UI, it displays the text `<img src="x" onerror="alert(1)">` instead of an actual image element.

This works if third-party content is not allowed to contain markup. If markup *is* allowed, you instead need to create a list of allowed elements and properties, and remove anything that's not part of that list.

Using that approach, the `onerror` function would get removed, leaving you with this.

```html
<img src="x">
```

Let's look at how to implement both of these approaches.

## Sanitizing by encoding

This is the simplest of the approaches, and works with a three-line helper function.

In the past, I recommended a different version of this function that I since learned doesn't properly encode strings for use as properties. The [following function from web security firm PortSwigger](https://portswigger.net/web-security/cross-site-scripting/preventing) handles this properly.

You can also find this on [the Vanilla JS Toolkit](https://vanillajstoolkit.com).

```js
/**
 * Sanitize and encode all HTML in a user-submitted string
 * https://portswigger.net/web-security/cross-site-scripting/preventing
 * @param  {String} str  The user-submitted string
 * @return {String} str  The sanitized string
 */
var sanitizeHTML = function (str) {
	return str.replace(/[^\w. ]/gi, function (c) {
		return '&#' + c.charCodeAt(0) + ';';
	});
};
```

You use it like this.

```js
app.innerHTML = sanitizeHTML('<img src="x" onerror="alert(1)">');
```

[Here's a demo of the encoding technique.](https://codepen.io/cferdinandi/pen/dyXmVpY)

It also works if the third party content is a property and not an entire element. Consider this example, where the third-party content is used for the `src` property value.

```js
// The third-party content
var thirdPartySrc = '" onerror="alert(\'XSS Attack\')"';

// Inject into the UI
app.innerHTML = '<img src="' + sanitizeHTML(thirdPartySrc) + '">';
```

[Here's a demo of encoding a property.](https://codepen.io/cferdinandi/pen/gOMeGeG)

## Sanitizing with an allowlist

Depending on how much markup you're trying to sanitize, you can do this manually or with a library. Let's look at each approach.

### Manually creating markup

With this approach, we'll manually create the element to inject using [the `document.createElement()` method](https://vanillajstoolkit.com/reference/dom-injection/createelement/), selectively add the properties we need, and then inject it with [the `appendChild()` method](https://vanillajstoolkit.com/reference/dom-injection/element-appendchild/).

Here's an example, again using third-party for a property.

```js
// The third-party content
var thirdPartySrc = '" onerror="alert(\'XSS Attack\')"';

// Create the img element
var img = document.createElement('img');

// Add the property
img.src = thirdPartySrc;

// Inject into the DOM
app.appendChild(img);
```

With this approach, an actual `img` element is injected into the DOM, but the `onerror` function becomes a string that's part of the `src`, and never runs.

[Here's a demo with a simple allowlist approach.](https://codepen.io/cferdinandi/pen/JjKLrMd)

### Using a third-party sanitizing library

The manual process is fine for an element or two, but if you're building large UIs with lots of third-party content, it get pretty cumbersome.

If that's the case, *and* if HTML *is allowed* in third-party content, I'd recommend using [DOMPurify](https://github.com/cure53/DOMPurify), a sanitization library.

You would use it like this.

```js
app.innerHTML = DOMPurify.sanitize(thirdPartyContent);
```

## Which approach should you use?

Generally speaking, I prefer to use `sanitizeHTML()` in most cases. If HTML is allowed in third-party content, I reach for DOMPurify.