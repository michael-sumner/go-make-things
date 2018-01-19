---
categories:
- Code
- JavaScript
date: '2017-05-15'
permalink: /javascript-feature-detection/
title: JavaScript feature detection
url: /2017/05/15/javascript-feature-detection
---

In my [Vanilla JS Pocket Guide](/guides/) on browser compatibility, I mention a technique called "cutting the mustard," in which you make sure the most modern functions you're using are supported before running your code.

```lang-javascript
var supports = 'querySelector' in document && 'addEventListener' in window;

if ( supports ) {
	// Codes goes here...
}

// or...

if ( !supports ) return;
```

[Features.js](http://featurejs.com/) is a super lightweight feature detection library. It's a bit like Modernizr, but with less frills.

You *can* include the whole thing in your project, but I actually think it's more interesting to dig into [the Feature.js source code](https://github.com/viljamis/feature.js/blob/master/feature.js) and just grab the features you want to test.

For example, if I wanted to test for Service Worker support, I would do this:

```lang-javascript
if ( 'serviceWorker' in navigator ) {
    // Run my scripts...
}
```

Check out [Feature.js](http://featurejs.com/). It looks awesome!