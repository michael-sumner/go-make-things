---
title: "How to encode strings with vanilla JS to reduce the risk of XSS attacks"
date: 2021-08-05T10:30:00-04:00
draft: false
categories:
- Code
- HTML
- JavaScript
---

This week, we learned [how cross-site scripting (or XSS) attacks work](/how-to-reduce-your-risk-of-cross-site-scripting-attacks-with-vanilla-javascript/), and [how injecting text can reduce your risk](/injecting-text-instead-of-html-with-vanilla-js-to-reduce-your-risk-of-xss-attacks/).

Using properties that set plain text values are great if you're _only_ adding text, but if you're adding a lot of markup around it, using `document.createElement()` for every element can get tedious. Properties that inject HTML like `Element.innerHTML` and `Element.outerHTML` properties are so much easier.

Today, we're going too look at a technique that allows you to use HTML string injection while also reducing your risk of XSS attacks: encoding. Let's dig in!

## What is encoding?

To make third-party strings safer to use, you can encode the content before injecting it. Encoding is the process of converting

For our purposes, encoding is the process of converting any characters that aren't letters or numbers into their unicode equivalents. This will cause them to be rendered as plain text rather than markup.

## How to encode your strings

If your third-party code is not allowed to contain any markup, [you can use a helper method](https://vanillajstoolkit.com/helpers/encodehtml/) to encode your string: `encodeHTML()`.

```javascript
/**
 * Encode the HTML in a user-submitted string
 * https://portswigger.net/web-security/cross-site-scripting/preventing
 * @param  {String} str  The user-submitted string
 * @return {String} str  The sanitized string
 */
function encodeHTML (str) {
	return str.replace(/javascript:/gi, '').replace(/[^\w-_. ]/gi, function (c) {
		return `&#${c.charCodeAt(0)};`;
	});
}
```

This works by finding every character that's not whitespace (` `), a dash (`-`), or an underscore (`_`), and replacing it with an encoded HTML string instead. As a result, those characters are rendered as literal text strings rather than as HTML.

It also uses the `String.replace()` method to find and replace all instances of `javascript:`. Otherwise, they could be used to run JS when a link is clicked.

```javascript
let thirdPartyString = `<img src=x onerror="alert('XSS Attack')">`;
let thirdPartyURL = `javascript:alert('Another XSS Attack')`;

// Renders...
// <p>&lt;img src=x onerror="alert('XSS Attack')"&gt;</p>
// <p><a href="alert('Another XSS Attack')">View My Profile</a></p>
div.innerHTML =
	`<p>${encodeHTML(thirdPartyString)}</p>
	<p><a href="${encodeHTML(thirdPartyURL)}">View My Profile</a></p>`;
```

## Drawbacks with this approach

This approach is lightweight, but has two drawbacks:

1. You need to remember to pass every third-party string into it.
2. It will also encode emoji. For example, the waving hand emoji (👋) is returned as `&#55357;&#56395;`.

A savvy reader also pointed out that the `String.replace()` approach to removing `javascript:` can be thwarted by using a string like this: `javajavascript:script:alert(1)`. This hack would require knowing specifically how our sanitizing code works, but it is still a vulnerability.

Tomorrow, we'll look a third approach that we can use instead: sanitizing.