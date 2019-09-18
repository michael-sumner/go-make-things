---
categories:
- Code
- JavaScript
- Web Performance
date: '2017-05-12'
url: /how-to-find-bottlenecks-in-your-javascript/
title: How to find bottlenecks in your JavaScript
---

Yesterday, I shared this quote from <a href="https://medium.com/reloading/javascript-start-up-performance-69200f43b201">Addy Osmani</a> (emphasis mine):

<blockquote>
  That said, even a small bundle, written poorly or with poor library choices can result in the main thread being pegged for a long time in compilation or function call times. <strong>It’s important to holistically measure and understand where our real bottlenecks are.</strong>
</blockquote>

But how exactly do you find those bottlenecks? Sam Saccone (also of Google) shared <a href="https://twitter.com/samccone/status/858753027036950528">this awesome little feature in Google Chrome</a> that actually shows you the bottlenecks in your code:

<img src="https://gomakethings.com/wp-content/uploads/2017/05/js-bottlenecks.jpg" alt="" width="453" height="205" class="aligncenter size-full wp-image-12111" />

To see this:

<ol>
<li>Open up Chrome Developer Tools.</li>
<li>Click on the Network tab.</li>
<li>Click "Record" and reload your site.</li>
<li>Click the Sources tab and open up your JavaScript file.</li>
</ol>

I did this on my own site, and the JavaScript for my site loads and parses in 1.7ms, even if I throttle my network to simulate 3g.

Vanilla JS FTW!