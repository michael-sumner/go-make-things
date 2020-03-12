---
title: Security and performance issues with target="_blank" on links
date: 2020-03-13T10:30:00-04:00
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

My friend Kieran Barker wrote a great article on [using `target="_blank"` on links, and why it's bad and you shouldn't do it](https://kbarker.dev/2020/02/24/security-and-performance-issues-with-target-blank-on-links).

Chris Coyier did a great job documenting [why you generally shouldn't use `target="_blank"`](https://css-tricks.com/use-target_blank/) a couple of years ago, but Kieran writes about a security issue I didn't know about.

> If a user clicks on one of your links which has `target="_blank"` set, the new page will have access to your page’s `window` object via the [`window.opener`](https://developer.mozilla.org/en-US/docs/Web/API/Window/opener) property. Does that sound like a bad thing? Because it is. The other page could redirect yours to a malicious URL.

[Go read the whole article on Kieran's site](https://kbarker.dev/2020/02/24/security-and-performance-issues-with-target-blank-on-links) to learn more.