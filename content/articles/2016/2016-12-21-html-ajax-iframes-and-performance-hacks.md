---
categories:
- Code
- Design and UX
- JavaScript
- Web Performance
date: '2016-12-21'
url: /html-ajax-iframes-and-performance-hacks/
title: HTML, ajax, iframes, and performance hacks
---

Jake Archibald recently noticed that [loading a page on GitHub was faster if starting from scratch than if already on GitHub](https://jakearchibald.com/2016/fun-hacks-faster-content/).

<iframe width="560" height="315" src="https://www.youtube.com/embed/4zG0AZRZD6Q?rel=0" frameborder="0" allowfullscreen></iframe>

That kind of makes no sense, right?

What Jake found was that the really intricate JavaScript page loading they're doing on subsequent page loads is removing a ton of optimizations the browser does for you, slowing the site quite noticeably on slower internet connections.

Jake gets into [a whole ton of tips, tricks, and hacks](https://jakearchibald.com/2016/fun-hacks-faster-content/) (including using iframes, gasp!) to get around this and gain that speed advantage that ajax page loading is supposed to give you. Check it out!