---
categories:
- Code
- JavaScript
date: '2016-12-14'
permalink: /a-vanilla-js-equivalent-to-jquerys-is-api/
title: A vanilla JS equivalent to jQuery&#8217;s .is() API
url: /2016/12/14/a-vanilla-js-equivalent-to-jquerys-is-api
---

In jQuery, you can match any element against any valid CSS selector using the `.is()` API.

Here's an example with an absurdly unrealistic and complicated selector to match against.

```javascript
if ( $( '.some-element' ).is( 'a[href^="#"].another-class[data-something-else]' ) ) {
    // Do something...
}
```

This is just as easy to do without jQuery, though, using the vanilla JS `.matches()` API. This works in all modern browsers, plus IE9 and up.

```javascript
var elem = document.querySelector( '.some-element' );
if ( elem.matches( 'a[href^="#"].another-class[data-something-else]' ) ) {
    // Do something...
}
```

The one "gotcha": some browsers initially implemented this using browser prefixes (and others---cough cough IE---still do). You can get around that issue with a really simple polyfill:

```javascript
if (!Element.prototype.matches) {
    Element.prototype.matches =
        Element.prototype.matchesSelector ||
        Element.prototype.mozMatchesSelector ||
        Element.prototype.msMatchesSelector ||
        Element.prototype.oMatchesSelector ||
        Element.prototype.webkitMatchesSelector ||
        function(s) {
            var matches = (this.document || this.ownerDocument).querySelectorAll(s),
                i = matches.length;
            while (--i >= 0 && matches.item(i) !== this) {}
            return i > -1;
        };
}
```