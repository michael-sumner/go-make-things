---
title: "How to use the URL API with vanilla JS"
date: 2020-03-20T10:30:00-04:00
draft: false
categories:
- Code
- JavaScript
---

The URL API is a browser API that lets you create a *URL object* from a string that you can then parse and manipulate.

Confused? Let's dig in and demystify this a bit.

## Creating a URL from a string with vanilla JS

To create a new URL object, pass the URL as a string into the `new URL()` constructor method.

```js
var url = new URL('https://gomakethings.com/about?num=42&greeting=hello#contact');
```

I'm using a comically complex example above so that you can see all of the cool stuff the URL API lets you do.

## Parsing a URL with the URL API

The `new URL()` constructor returns an object with same properties as a the `window.location` property.

```js
// The hash or anchor link on the URL
// returns "#contact"
url.hash;

// The root domain of the URL
// returns "gomakethings.com"
url.hostname;

// The full URL
// returns "https://gomakethings.com/about?num=42&greeting=hello#contact"
url.href;

// The root domain, including the protocol
// returns "https://gomakethings.com"
url.origin;

// The path on the URL
// returns "/about"
url.pathname;

// The protocol on the URL
// returns "https:"
url.protocol;

// The query strings (as a string) on the URL
// returns "?num=42&greeting=hello"
url.search;
```

[Here's a demo.](https://codepen.io/cferdinandi/pen/vYOarNx)

## Updating values on a URL

You can use those same properties to update the values of a URL.

For example, if you wanted to change the `hash` from `#contact` to `#photo`, you would do this.

```js
url.hash = 'photo';
```

[Here's another demo.](https://codepen.io/cferdinandi/pen/YzXjvwZ)

## Browser support

The URL API works in all modern browsers, but not IE. [You can push support back to IE9 with a polyfill.](https://vanillajstoolkit.com/polyfills/url/)