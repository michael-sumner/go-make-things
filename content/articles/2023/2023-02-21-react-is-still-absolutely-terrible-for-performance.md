---
title: React is still absolutely terrible for web performance
date: 2023-02-21T10:30:00-04:00
draft: false
categories:
- Code
- JavaScript
- Web Performance
---

One of the oft-repeated myths I hear from framework evangelists is that tools like React are better for performance because "they use a virtual DOM instead of the real DOM."

First, that's objectively false.

In certain situations (like UIs with comically large amounts of `div` nesting) moving DOM diffing to a virtual layer can improve the performance of that specific step. But eventually, they have to touch the real DOM. That's how you manipulate and update elements.

I've been talking about how terrible React is for performance for years. 

In 2018, [Netflix famously dropped client-side React for vanilla JS](/how-netflix-dramatically-improved-their-front-end-performance-by-switching-to-vanilla-js/) and dramatically improved performance. A few years ago, my friend [Jeremy Wagner ran some tests showing that React is orders-of-magnitude slower than both vanilla JS and Preact](/just-how-much-faster-is-vanilla-js-than-frameworks/), which uses the same API. And last year, I looked at some new browser usage data and [how libraries make the web nearly unusable for certain groups of people](/vanilla-javascript-and-old-school-ssgs-are-the-best-choices-for-web-performance/).

It probably won't surprise you that I found my friend [Zach Leatherman's article on the history of React performance issues](https://www.zachleat.com/web/react-criticism/) incredibly interesting. The icing on the cake...

> An analysis of Core Web Vitals across 9.3 million web sites as of February 6, 2023 shows that Core Web Vitals for both React and Next.js shows that both perform worse than the aggregation of all other sites in the archive for both mobile and desktop.

React was, is, and probably always will be a worse choice for performance than other options.