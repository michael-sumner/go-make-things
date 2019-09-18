---
title: "JavaScript frameworks are better for accessibility (and other myths)"
date: 2019-07-17T10:30:00-04:00
draft: false
categories:
- Accessibility
- Code
- JavaScript
- Web Performance
---

The other day, I saw someone on Twitter say (I'm not linking to the original tweet because I don't want to pile-on the author):

> I don't bother with frameworks, I just use vanilla JS.
>
> Roughly translated:
>
>I'm smarter than the thousands of people who tried to solve the problems I'm about to solve. I’m an expert on security, a11y, browser support, and perf. I don't care about ROI, I just want to code.

Here's the thing: frameworks don't really help you with this stuff.

Earlier this year, [WebAIM conducted a survey of the top million sites on the web](https://webaim.org/projects/million/) and found those that use frameworks are actually *more* likely to have accessibility issues.

In his article on the [Cost of JavaScript](https://medium.com/@addyosmani/the-cost-of-javascript-in-2018-7d8950fbb5d4), Google Engineer and performance expert Addy Osmani documents the impact JavaScript has on performance relative to other parts of the stack. He wrote:

> As much as I love JavaScript, it’s *always* the most expensive part of your site... Byte-for-byte, JavaScript is still the most expensive resource we send to mobile phones, because it can delay interactivity in large ways.

And yes, frameworks used by thousands of developers at hundreds or thousands of organizations can include a lot more bug fixes than your vanilla JS does.

But many of those bug fixes are for problems you don't have, and never will.

And this isn't even a fair comparison. Because the code *you* write on top of a framework can still have bugs. The issue isn't with native browser methods and APIs&mdash;it's with developer-written code. That's a danger regardless of the platform you build on top of.

To be fair, frameeworks *do* give you some security benefits. Many frameworks sanitize markup before rendering it. You can do the same thing with [DOMPurify](https://github.com/cure53/DOMPurify/) or [a helper function](/preventing-cross-site-scripting-attacks-when-using-innerhtml-in-vanilla-javascript/), at a fraction of the size.

You can use vanilla JS and still lean on the expertise of others. You don't have to know everything.