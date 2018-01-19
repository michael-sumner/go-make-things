---
categories:
- Code
- Design &amp; UX
- Web Performance
date: '2015-05-18'
permalink: /lightning-fast-tapping/
title: Lightning fast tapping
url: /2015/05/18/lightning-fast-tapping
---

Many mobile browsers introduce a 300ms delay when a user taps on a link or button. [From Google:](https://developers.google.com/mobile/articles/fast_buttons)

> Mobile browsers will wait approximately 300ms from the time that you tap the button to fire the click event. The reason for this is that the browser is waiting to see if you are actually performing a double tap.

300ms can have a huge impact on performance, and this is one of the reasons why native apps feel so much faster than web apps. Don't believe me? [This video from Microsoft Research](https://www.youtube.com/watch?v=vOvQCPLkPt4) demonstrates how sluggish even 100ms can feel.

Fortunately, there's a fix.

<!--more-->

## FastClick.js

[FastClick.js](https://github.com/ftlabs/fastclick) is script from FT Labs, part of the Financial Times. It removes the delay on touch-screen browsers, making your websites and web apps feel substantially faster.

I use this on every project I work on.

One minor caveat: I ([and a few others](https://github.com/ftlabs/fastclick/issues/86)) have found that if the very edge of a link is tapped, focus is added to the link but a click event is not fired. This is quite rare, and I believe the performance gains more than make up for it, but it is something to be aware of.

## Things are getting better

Chrome for Android [removes the delay](http://updates.html5rocks.com/2013/12/300ms-tap-delay-gone-away) on sites that are mobile optimized, since double tapping to zoom is unnecessary in these cases. And [Apple has a plan for implementing this on iOS as well](https://medium.com/@adactio/delay-a9df9edceef3#.9ogh9srbf), though there's no clear date for when it's going to ship in their products.