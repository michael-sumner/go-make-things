---
title: How to progressively enhance a nav menu
date: 2022-02-01T10:30:00-05:00
draft: false
categories:
- Accessibility
- Code
- Design and UX
- HTML
- JavaScript
- Web Performance
---

In last week's article on [the ideal browser support strategy in 2022](/what-should-your-browser-support-strategy-be-in-2022/), I wrote:

> Things can fail if JS is unsupported if they’re “nice to have” features. Anything critical needs to work without JavaScript.

In response, [reader Caleb Stauffer](https://develop.calebstauffer.com/) asked how I would handle a flyout or drawer nav menu ("think mobile with a hamburger icon" - shared with permission).

I've mostly moved away from that pattern in general, but if I *did* need to use it for something today, I would either...

1. Treat it as a fully expanded and visible navigation, and progressively enhance it into a flyout once the JS loads, or
2. Have the nav in the footer by default, with the hamburger functioning as an anchor link. When the JS loads, I'd progressively enhance it into a flyout.

A lot of folks assume that progressive enhancement means having to write the same code twice, but often, it can be as simple as extending the pattern you already have once the JS loads.