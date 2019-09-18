---
categories:
- Code
- CSS
- JavaScript
date: '2017-02-13'
url: /css-breakpoints-in-javascript/
title: CSS breakpoints in JavaScript
---

One minor annoyance of front-end development work is syncing breakpoints between CSS and JavaScript (if you're doing any sort of JS work that requires screen resize detection).

Mike Herchel over at Lullabot posted [a really neat technique to automate the process](https://www.lullabot.com/articles/importing-css-breakpoints-into-javascript):

> Many solutions [...] involve declaring your breakpoints in both CSS and JS, or require IE10+. The problem with these solutions is that when you change a breakpoint value, you have to change it twice. However, it doesn't need to be like this.
>
> A quick and easy solution to this problem is to have your JS import the breakpoints directly from the CSS values in the DOM. This solution brings the current breakpoint variable into your JS in a way that's
>
> - Simple & Lightweight
> - DRY
> - Compatible with all browsers that support media queries (IE9+)

[Go check out the post](https://www.lullabot.com/articles/importing-css-breakpoints-into-javascript) to see how it's done. Cool stuff!