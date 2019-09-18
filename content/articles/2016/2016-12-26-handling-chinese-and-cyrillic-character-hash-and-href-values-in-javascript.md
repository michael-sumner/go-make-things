---
categories:
- Code
- JavaScript
date: '2016-12-26'
url: /handling-chinese-and-cyrillic-character-hash-and-href-values-in-javascript/
title: Handling Chinese and Cyrillic character hash and href values in JavaScript
---

Last week, I got a bug report on [Smooth Scroll](https://github.com/cferdinandi/smooth-scroll/) that content with Chinese and Cyrillic characters in the ID weren't working in Safari and Firefox. The problem seemed to extend to any valid, non-ASCII characters.

I eventually discovered that when calling the `hash` or `href` of an element in JavaScript, Chrome handles non-ASCII characters quite differently (I'd argue, more correctly) than Firefox or Safari do.

In a click listener, I have this code:

```javascript
// Get the clicked anchor link's hash value
var hash = event.target.hash;
```

If this is the clicked link...

```javascript
<a href="#中文">Click Me!</a>
```

Chrome returns `#中文`, while Safari and Firefox return an encoded version of that, `#%E4%B8%AD%E6%96%87`. (I didn't have access to IE or Edge to test.)

The fix to this was actually really simple. Decode the hash using `decodeURIComponent()`.

```javascript
// Get the clicked anchor link's hash value
var hash = decodeURIComponent( event.target.hash );
```

However, some elements have characters that `decodeURIComponent()` doesn't like, so you have to do some error catching.

```javascript
// Get the clicked anchor link's hash value
var hash;
try {
	hash = decodeURIComponent( event.target.hash );
} catch(e) {
	hash = event.target.hash;
}
```

Problem solved!