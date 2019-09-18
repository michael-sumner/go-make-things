---
title: "How Netflix dramatically improved their front end performance by switching to vanilla JS"
date: 2018-11-20T10:30:00-05:00
draft: false
categories:
- Code
- HTML
- JavaScript
- Web Performance
---

Addy Osmani detailed [how Netflix dramatically improved the performance of their site by switching from React to vanilla JS](https://medium.com/dev-channel/a-netflix-web-performance-case-study-c0bcde26a9d9) on the front end.

> - Loading and Time-to-Interactive decreased by 50% (for the logged-out desktop homepage at Netflix.com)
> - JavaScript bundle size reduced by 200kB by switching from React and other client-side libraries to vanilla JavaScript. React was still used server-side.
> - Prefetching HTML, CSS and JavaScript (React) reduced Time-to-Interactive by 30% for future navigations

Netflix didn't completely ditch React. They still use it on the server to create their initial HTML.

But they did get rid of it in the browser, were it was crippling front end performance.

I think that's a great approach. React as a server-side templating engine. Vanilla JS for interaction and DOM manipulation in the browser.

> This page initially contained 300kB of JavaScript, some of which was React and other client-side code (such as utility libraries like Lodash), and some of which was context data required to hydrate React’s state.

300kb of JS! Yikes!

Regardless, it's great to see a big company like Netflix making the jump to vanilla JS. To dig into the nitty gritty of how they did it, [go read Addy's article](https://medium.com/dev-channel/a-netflix-web-performance-case-study-c0bcde26a9d9).