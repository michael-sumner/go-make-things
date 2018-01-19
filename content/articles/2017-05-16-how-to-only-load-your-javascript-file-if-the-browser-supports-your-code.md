---
categories:
- Code
- JavaScript
- Web Performance
date: '2017-05-16'
permalink: /how-to-only-load-your-javascript-file-if-the-browser-supports-your-code/
title: How to only load your JavaScript file if the browser supports your code
url: /2017/05/16/how-to-only-load-your-javascript-file-if-the-browser-supports-your-code
---

Yesterday, I talked about [JavaScript feature detection](/javascript-feature-detection/).

One cool thing you can do to help improve performance (and save some bytes for people on limited data plans and old devices) is to only load your JavaScript file if the device or browser supports your code.

To do that, we'll use [loadJS from Filament Group](https://github.com/filamentgroup/loadJS/).

Include loadJS on your site, and then include a "cut the mustard" test. If the browser passes, use loadJS to load your scripts. If not, do nothing.

```lang-javascript
function loadJS( src ) { ... }
var supports = 'querySelector' in document && 'addEventListener' in window;
if ( supports ) {
    // Load our scripts
    loadJS( 'path/to/your/scripts.js' );
}
```