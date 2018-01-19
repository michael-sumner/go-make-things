---
categories:
- Code
- JavaScript
date: '2017-07-17'
permalink: /how-to-get-the-first-and-last-focusable-elements-in-the-dom/
title: How to get the first and last focusable elements in the DOM
url: /2017/07/17/how-to-get-the-first-and-last-focusable-elements-in-the-dom
---

Heydon shared a neat JavaScript trick on Twitter the other week for <a href="https://twitter.com/heydonworks/status/880773131287359488">getting all focusable elements in the DOM</a>, and narrowing it down to the first or last element.

We can get all focusable elements using <code>querySelectorAll()</code> and a comma-separated list of elements to target. We want to look for buttons, links, form eleements, and anything with a <code>tabindex</code> that's not <code>-1</code>.

<pre><code class="lang-javascript">var focusable = document.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"]');
</code></pre>

This returns a node list from which we can grab the first or last element as needed.

<pre><code class="lang-javascript">var focusable = document.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not(tabindex="-1"]');
var firstFocusable = focusable[0];
var lastFocusable = focusable[focusable.length - 1];
</code></pre>

Thanks Heydon!