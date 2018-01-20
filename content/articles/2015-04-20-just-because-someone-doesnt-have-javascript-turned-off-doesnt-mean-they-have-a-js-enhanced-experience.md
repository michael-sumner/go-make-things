---
categories:
- Design &amp; UX
date: '2015-04-20'
url: /just-because-someone-doesnt-have-javascript-turned-off-doesnt-mean-they-have-a-js-enhanced-experience/
title: Just because someone doesn&#8217;t have JavaScript turned off doesn&#8217;t mean they have a JS-enhanced experience
---

From [Craig McPheat on Twitter](https://twitter.com/craigmcpheat/status/588335648987308032):

> By default, JS is blocked on our corporate, virtualised Chrome. In the office, the only web I ever see is a progressively enhanced one.

A previous employer of mine had a similar approach to web security. There was a short whitelist of approved JavaScript files, and everything else was blocked. That meant that if your site was dependant on JS in any way, I had a pretty bad (or in some cases, unusable) experience.

[snippet id="8395"]

Not everyone who can't use your JavaScript has JS turned off. Sometimes their employer is blocking the file. Sometimes there's a bad link and the file 404s. Sometimes, you just missed a semicolon and the script breaks (don't lie, you know it's happened).

JavaScript is the most fragile layer in the front-end stack. When the browser sees a CSS selector or property that it doesn't recognize, it skips it and moves on. When it encounters an HTML element it doesn't recognize, it renders the element's content and keeps going. And when it runs into a bug in your script, it stops running.

Start with semantic markup, add CSS for style, and *then* layer in JavaScript for an enhanced experience. Your critical content should always be accessible, even when JS fails to run.

[snippet id="8397"]