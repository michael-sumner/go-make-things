---
categories:
- Code
- JavaScript
date: '2015-07-01'
permalink: /a-native-javascript-equivalent-of-jquerys-ready-method/
title: A native JavaScript equivalent of jQuery&#8217;s .ready() method
url: /2015/07/01/a-native-javascript-equivalent-of-jquerys-ready-method
---

Modern web browsers&mdash;including IE9 and above&mdash;provide an easy way to run scripts once DOM content is fully loaded:

```lang-javascript
document.addEventListener( 'DOMContentLoaded', function () {
	// Do stuff...
}, false );
```

However, this isn't a true analog for jQuery's `$( document ).ready(function()` method. If you use `addEventListener` *after* the DOM content has already loaded, the event that it's listening for has already happened, so the event never triggers.

Fortunately, there's a really easy, lightweight helper method you can use instead:

[snippet id="8395"]

```lang-javascript
var ready = function ( fn ) {

    // Sanity check
    if ( typeof fn !== 'function' ) return;

    // If document is already loaded, run method
    if ( document.readyState === 'complete'  ) {
        return fn();
    }

    // Otherwise, wait until document is loaded
    document.addEventListener( 'DOMContentLoaded', fn, false );

};

// Example
ready(function() {
    // Do stuff...
});
```

This runs immediately if the document is already loaded, and if not, waits until it is.