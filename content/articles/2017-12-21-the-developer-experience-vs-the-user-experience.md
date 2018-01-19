---
categories:
- Accessibility
- CSS
- Design &amp; UX
- HTML
- JavaScript
- Web Performance
date: '2017-12-21'
permalink: /the-developer-experience-vs-the-user-experience/
title: The Developer Experience vs. The User Experience
url: /2017/12/21/the-developer-experience-vs-the-user-experience
---

This week, [Jason Cowlam tweeted](https://twitter.com/jiveturkeyJason/status/943152129820299265)...

> Current obsession with doing everything in JS is entirely focused on Developer Experience rather than User Experience, we have the tools to build the best websites ever but we are neglecting users for the benefit of developers

The discussion around the tweet has been interesting. It ventures into topics like inaccessible markup, CSS-in-JS, the value of JS frameworks, web performance, and more.

**For me, the takeaway is this:** most of the tools we use (as an industry) attempt to throw more engineering at problems that could be solved more simply using another approach. In the process, they make everything WAY more complicated, fragile, and slow for the end users.

## Some examples

CSS-in-JS is supposed to help scope CSS to avoid class name collisions. That's super easy to do already with properly named classes. This is a people issue, not a technology one.

React and Angular make it easier and faster to build JavaScript-based UIs. In doing so, they make it harder to debug, reinvent a bunch of stuff the browser does for you already, and dramatically increase time to first load.

Preprocessors like Babel let you starting using poorly supported JS features today by compiling the new stuff into old stuff. As a result, they generate old stuff that's more poorly written than if you did it by hand, and serve newer browsers that can handle it the old stuff anyways.

## Use the browser technologies

HTML is HTML. CSS is CSS. JS is JS.

They each have their own strengths and weaknesses. Lean heavily on what the browser already provides for each language, and supplement when you hit a limit.