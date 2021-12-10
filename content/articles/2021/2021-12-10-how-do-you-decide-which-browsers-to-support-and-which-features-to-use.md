---
title: How do you decide which browsers to support and which features to use?
date: 2021-12-10T10:30:00-05:00
draft: false
categories:
- Accessibility
- Code
- CSS
- Design and UX
- HTML
- JavaScript
- Technology
- Web Performance
---

Whenever I share more modern browser features, I get asked something like this:

> Should I aim for the most compatibility and forget the new stuff? Or should I use the latest and greatest features and not care about browser support?

Today, I wanted to talk about my approach to browser support.

**I have guidelines, not rules.**

I don't have a magic formula I use to determine when to use a feature or support a browser. I have a series of guidelines I consider, and use to make a decision on a case-by-case basis. 

<div class="list-spaced">
{{%md%}}
- **Does it work in all of the major, modern, auto-updating browsers?** That means MS Edge, Chrome, Firefox, and Safari. Now that [MS had ditched IE in their own products](/its-time-to-drop-ie-support/), I don't worry about it.
- **Does it work in all major mobile browsers?** That includes the mobile versions of Safari, Chrome, and Firefox, as well as WebView Android and Samsung Internet (a mobile browser on many Samsung devices that accounts for up to 6.5% of total mobile browser usage).
- **Is it used for critical functionality or a nice-to-have enhancement?** If a visitor wouldn't be able to access content otherwise, I push for more backwards compatibility (sometimes back into IE). If it's a nice-to-have enhancement (like [auto-scaling iframe videos](/responsive-iframes-with-the-css-aspect-ratio-property/) of a fancy multi-column layout), I'll use modern features with less concern for browser support.
- **Can it be polyfilled?** If new methods and APIs provide significant advantages over old methods but lack good support, [polyfills can help bridge the gap in support](/why-i-love-polyfills/) until support gets better.
{{%/md%}}
</div>

Like pretty much everything in coding, "it depends."