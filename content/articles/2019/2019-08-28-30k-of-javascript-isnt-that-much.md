---
title: "30k of JavasScript isn't that much"
date: 2019-08-28T10:30:00-04:00
draft: false
categories:
- Accessibility
- Art and Science
- Business and Leadership
- Careers
- Code
- CSS
- Design and UX
- HTML
- JavaScript
- Technology
- Web Performance
- WordPress
- Vanilla Framework Demos
---

This week, I was exchanging emails with someone around using frameworks to handle rendering.

I mentioned that, for certain types of apps, I like them, but prefer to use [smaller libraries like Reef](https://github.com/cferdinandi/reef) over the extra bloat that 30kb of JS framework brings.

They responded:

> I don't get the "bloat" argument. 30kb isn't that much.

And to be fair, it's not.

30kb is small relative to your computer's overall storage space. A 30kb JPG is tiny. It's a trivial amount of data to send on a fast internet connection.

**That said...**

A good amount of web traffic is now mobile, and a good amount of mobile web access is on midrange smart phones with ok-ish/flaky/bad internet connections.

JavaScript is a very different beast than a JPG, or even CSS.

It blocks rendering, and it blocks other files from downloading. It needs to parsed and interpreted after it's downloaded, and triggers a bunch of repaints that negatively affect performance. [Byte-for-byte, JS is the single most expensive resource we send down the wire.](https://medium.com/@addyosmani/the-cost-of-javascript-in-2018-7d8950fbb5d4)

So, 30kb isn't a lot in the absolute sense, but in terms of a performance budget, 30kb of JS is orders of magnitude more impactful than the same amount of any other file type.