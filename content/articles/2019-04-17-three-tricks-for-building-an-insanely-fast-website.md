---
title: "Three tricks for building an insanely fast website"
date: 2019-04-17T10:30:00-04:00
draft: false
categories:
- Code
- CSS
- HTML
- JavaScript
- Web Performance
---

Last week, someone sent me an email commenting on how fast every single page of my website loads.

Most pages on my site are fully loaded in less than a second (typically around 500-700ms) on a high speed internet connection, and less than 3 seconds on 3G. So how do I make that happen?

Here are my three tricks for building an insanely fast website.

1. **Fast hosting.** Good hosting can make a big difference, but it doesn't have to be expensive. My site is served from an SSD drive by [Digital Ocean](https://www.digitalocean.com/). Every single site runs on a single $5/month droplet.
2. **Static HTML.** Instead of having to dynamically create HTML files whenever someone visits, my site is precompiled static HTML files [built with Hugo](/static-websites/). As as a result, there's virtually no latency on the server.
3. **Inline all the things!** I keep my CSS and JavaScript so small that I can inline their entire contents directly into the markup. Why? The resulting completed HTML file is often smaller than 14kb, which is about how much data gets sent with a single HTTP request. Most pages have everything they need to render with a single round-trip from the browser.

There are plenty of other things you can do to improve performance of your site (optimizing images, CSS methodologies, and so on), but these three things have had the biggest impact for me on actual render times.