---
categories:
- Code
- JavaScript
date: '2017-07-14'
title: Getting direct descendants by selector with vanilla JavaScript
---

Last week, we looked at how to <a href="https://gomakethings.com/climbing-down-the-dom-with-vanilla-javascript/">climb down the DOM with vanilla JavaScript</a>.

I mentioned that you can use the <code>.childNodes</code> property to get direct descendant elements.

<a href="https://twitter.com/valuedstandards/status/882694786418978816">David Hund pointed out on Twitter</a> that you can also get direct descendants that match a specific selector (or set of selectors) by using the <code>&gt;</code> selector in <code>querySelector()</code> or <code>querySelectorAll()</code>.

<pre><code class="lang-javascript">var directDescendants = document.querySelectorAll('#some-element &gt; .pick-me');
</code></pre>