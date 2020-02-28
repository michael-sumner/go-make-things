---
title: "Third-party libraries and security issues"
date: 2020-02-28T10:30:00-05:00
draft: false
categories:
- Careers
- Code
- JavaScript
---

Earlier this week, I wrote about [why you should still use vanilla JS when so many amazing third-party libraries exist](/why-write-vanilla-js-when-you-can-just-use-insert-library-or-framework-here/).

A few folks wrote to me to mention something I missed: security.

When you use code you didn't author, you're taking a risk. You're trusting that the third-party code does not have security issues, that the author has good intent.

Even when the author themself is well-intentioned, our overuse of deep third-party dependencies means that their library could have been built with someone else's code that uses someone else's code that uses yet another person's code that *does* have security issues.

Open source projects change hands. New owners can mismanage projects or act deliberately with bad intent.

When you didn't write code yourself, and worse, don't know how to read it&mdash;or simply aren't able to because of how deep the dependency tree is&mdash;security issues can slip under the radar.

Standing on the shoulders of those who came before you is great. It's literally the only reason I have a career in this industry.

But it's not without risk, and the way we build things for the web today acutely increases that risk.