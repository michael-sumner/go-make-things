---
title: "How to reduce your risk of cross-site scripting attacks with vanilla JavaScript"
date: 2021-08-03T10:30:00-04:00
draft: false
categories:
- Code
- HTML
- JavaScript
---

_Cross-site scripting_ (or _XSS_) attacks work by unexpectedly running JavaScript that does things like scrape cookies or grab data from `localStorage` and send it off to a remote location.

Today, we're going to look at how XSS attacks work, and how to help prevent them. Let's dig in.

## How it works

In an XSS attack, malicious code gets injected into your site and then executed. This is possible when injecting strings with properties that render complete markup (like `Element.innerHTML` and `Element.outerHTML`) and not just text (like `Node.textContent` and `Element.innerText`).

There is a built-in safeguard in place, though.

Just injecting a `script` element won't expose you to attacks, because the section of the DOM you're injecting into has already been parsed and run.

```javascript
// This won't execute
let div = document.querySelector('#app');
div.innerHTML = '<script>alert("XSS Attack");</script>';
```

JavaScript that runs at a later time, though, will.

In this example, we attempt to load an image from an invalid source. When it fails, the `onerror` event runs some malicious JavaScript.

```javascript
// This WILL run
div.innerHTML = `<img src=x onerror="alert('XSS Attack')">`;
```

In this case, it's just alerting a message. But in a real world example, the code might scrape sensitive data from our site and send it to a third-party source.

Links are another potential attack vector. If an `href` or `src` attribute is set from third-party data, a user with malicious intent can prefix the URL with `javascript:` or `data:text/html`, and run code when the user clicks the link or the element loads.

```javascript
div.innerHTML = `<a href="javascript:alert('Another XSS Attack')">Click Me</a>`;
```

[Here's a demo.](https://codepen.io/cferdinandi/pen/MWmBXvJ)

## When is this an issue?

If you're injecting your own markup into a page, there's little cause for concern. The danger comes from injecting third-party or user-generated content into the DOM.

**If you're adding content to a page that you didn't write, you should sanitize and encode it to protect yourself from XSS attacks.**

Let's look at how.

## How do you prevent XSS attacks from happening?

There are three different approaches we're going to look at over the next few days:

1. **Plain text properties.** XSS attacks work when we inject markup into the UI. We can use plain text properties (like `Node.textContent`) instead of HTML properties (like `Element.innerHTML`) to prevent them.
2. **Encoding strings.** If you need to use an HTML property but want certain bits of your string to render as plain text, you can _encode_ that bit of string by converting any HTML characters to their plain text equivalents.
3. **Sanitizing.** This is the process of removing any potentially dangerous properties and values from HTML elements before injecting them into the UI.

Over the next few days, I'm going to release a series of articles looking at each of these approaches and how they work.