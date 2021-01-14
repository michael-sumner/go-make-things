---
title: "Refactoring a vanilla JS app with state based UI"
date: 2019-01-30T10:30:00-05:00
draft: false
categories:
- Accessibility
- Code
- Design and UX
- HTML
- JavaScript
---

About a year ago, [I recorded myself building a simple vanilla JS in real time in under 20 minutes](/who-should-drive-a-vanilla-js-web-app/).

One of my students mentioned that he would like to see a video of me refactoring code live. Today, I put together a video of me refactoring my Who's Driving app to use state-based UI instead of lots of manual DOM manipulation.

*__Note:__ I should have added [a function to sanitize user inputs](https://vanillajstoolkit.com/helpers/sanitizehtml/) to protect against XSS attacks. Totally forgot to!*

[Here's the video.](https://www.youtube.com/watch?v=JrNulEm7GQ0)

<div class="fluid-vids"><iframe width="560" height="315" src="https://www.youtube.com/embed/JrNulEm7GQ0" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>

And here are the related assets:

- Source code on GitHub: https://gist.github.com/cferdinandi/5e0763c686be45ca0a686a1906a841af
- CodePen demo: https://codepen.io/cferdinandi/pen/zeoJqy