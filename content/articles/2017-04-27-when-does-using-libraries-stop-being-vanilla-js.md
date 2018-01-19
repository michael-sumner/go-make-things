---
categories:
- Code
- JavaScript
date: '2017-04-27'
title: When does using libraries stop being vanilla JS?
---

The other day on Twitter, <a href="https://twitter.com/markgdyr/status/853257694844727298">Mark Goodyear asked</a>:

<blockquote>
  Serious question, at what point do you call something no longer "vanilla"? The point when any lib is included?
</blockquote>

Helper libraries are great. I use them all the time! Small helper functions and plugins are even better.

To me, vanilla JavaScript stops being vanilla when ripping out a library requires you to rewrite large amounts of code.

For example, <a href="http://blissfuljs.com/docs.html">Bliss.js</a>, while lightweight, extends vanilla JS with the <code>$</code> object and chained functions. If you build a site with it, removing it means removing the entire codebase.

Contrast that with helper functions like <a href="https://github.com/cferdinandi/ready">ready.js</a> or <a href="https://github.com/cferdinandi/extend">extend.js</a>. Yes, you have to modify any scripts that use those. But you don't have to rewrite every selector and function.

To me, the danger zone is when you start trying to make vanilla JS more like jQuery. It starts with <code>$</code>. Then chaining. Suddenly, you're basically recreating jQuery (which is itself written in vanilla JS).

***Update:*** *After some discussion in my [Vanilla JS Slack Channel](https://gomakethings.com/guides/), I added a bit more nuance to my perspective. You can [read about it here](https://gomakethings.com/what-makes-vanilla-js-vanilla/).*