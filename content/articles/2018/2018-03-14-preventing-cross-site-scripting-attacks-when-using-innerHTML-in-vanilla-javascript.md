---
title: "Preventing cross-site scripting attacks when using innerHTML in vanilla JavaScript"
date: 2018-03-14T10:30:00-04:00
draft: false
categories:
- Code
- JavaScript
---

_**IMPORTANT:** some of the information in this article is out-of-date. [Please read this update article instead.](/how-to-sanitize-third-party-content-with-vanilla-js-to-prevent-cross-site-scripting-xss-attacks/)_

I generally use `innerHTML` to [inject HTML into an element with vanilla JavaScript](/adding-markup-to-an-element-with-vanilla-js/).

Yesterday, one of my students asked me about the danger of cross-site scripting (XSS) when using this property. He had been told that it's insecure and to never use it.

Today, let's unpack that and learn how to prevent XSS attacks with `innerHTML`.

## How it works

The idea behind an XSS attack with `innerHTML` is that malicious code would get injected into your site and then execute. This is possible because `innerHTML` renders complete markup and not just text.

There is one built-in safeguard in place, though. Just injecting a `script` element won't expose you to attacks, because the section of the DOM you're injecting into has already been parsed and run.

```js
// This won't execute
var div = document.querySelector('#some-div');
div.innerHTML = '<script>alert("XSS Attack");</script>';
```

JavaScript that runs at a later time, though, will.

```js
// This WILL run
div.innerHTML = '<script deferred>alert("XSS Attack");</script>';

// This will, too
div.innerHTML = '<img src=x onerror="alert(\'XSS Attack\')">';
```

## When is this an issue

If you're inject your own markup into a page, there's little cause for concern. The danger comes from injecting user and third-party markup into the DOM.

**If you're adding content to a page that you didn't write, you should sanitize it to protect yourself from XSS attacks.**

Let's look at how.

## A safe alternative to `innerHTML`

One super easy approach: use `textContent` instead of `innerHTML`. This gets and injects only text content, not markup, from and into a DOM node.

```js
// Renders a string with escaped characters
// This would show up in the DOM as <img src=x onerror="alert('XSS Attack')"> instead of as an image element
div.textContent = '<img src=x onerror="alert(\'XSS Attack\')">';
```

The `textContent` property works in all modern browsers, and IE9 and up.

## Sanitizing content before adding it to the DOM

The `textContent` property is great if you're *only* adding text, but if you're adding some third-party content as part of some additional markup, you'll still want to use `innerHTML`.

To make it safe, you'll need to sanitize the content (that is, remove disallowed markup) before injecting it.

If the third-party code is not allowed to contain any markup, you can use [a helper method](https://vanillajstoolkit.com/helpers/sanitizehtml/) to remove markup from the code.

```js
/*!
 * Sanitize and encode all HTML in a user-submitted string
 * (c) 2018 Chris Ferdinandi, MIT License, https://gomakethings.com
 * @param  {String} str  The user-submitted string
 * @return {String} str  The sanitized string
 */
var sanitizeHTML = function (str) {
	var temp = document.createElement('div');
	temp.textContent = str;
	return temp.innerHTML;
};
```

This works by creating a temporary `div` and adding the content with `textContent` to escape any characters. It then returns them using `innerHTML` to prevent those escaped characters from transforming back into unescaped markup.

```js
// Renders <h1>&lt;img src=x onerror="alert('XSS Attack')"&gt;</h1>
div.innerHTML = '<h1>' + sanitizeHTML('<img src=x onerror="alert(\'XSS Attack\')">') + '</h1>';
```

If the third-party content *is* allowed to contain markup, a [helper library like DOMPurify](https://github.com/cure53/DOMPurify) will remove any markup that's not part of a secure whitelist before injecting it.