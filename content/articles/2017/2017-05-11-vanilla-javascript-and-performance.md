---
categories:
- Code
- JavaScript
- Web Performance
date: '2017-05-11'
url: /vanilla-javascript-and-performance/
title: Vanilla JavaScript and Performance
---

Addy Osmani from Google shared <a href="https://twitter.com/addyosmani/status/861166051517620225">this incredible graph on JavaScript performance</a> on Twitter this weekend:

<img src="https://gomakethings.com/wp-content/uploads/2017/05/js-performance.jpg" alt="" width="1600" height="1049" class="aligncenter size-full wp-image-12108" />

This graph shows average JavaScript parse times for various devices. For newer devices (like the iPhone 7), parse times are almost on par with desktop devices. For older devices (which many, <em>many</em> people still use) parse times can be 3-4x slower than desktop.

<a href="https://medium.com/reloading/javascript-start-up-performance-69200f43b201">Addy explains</a>:

<blockquote>
  That said, even a small bundle, written poorly or with poor library choices can result in the main thread being pegged for a long time in compilation or function call times. It’s important to holistically measure and understand where our real bottlenecks are.
</blockquote>

Just using vanilla JavaScript won't solve this problem entirely. You can still write huge JavaScript files or poorly written code without a framework.

But, libraries like jQuery can take quite a long time to parse, particularly on older mobile devices. Vanilla JS, with zero dependencies, still needs to be parsed, but effectively runs as soon as it hits the browser.

In my own experience, switching to vanilla JS from jQuery has had a huge impact on the perceived performance of the sites I build.