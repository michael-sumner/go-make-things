---
categories:
- Code
- JavaScript
date: '2017-11-30'
title: Reversing the order of an array with vanilla JavaScript
---

It's incredibly easy to reverse the order of an array's values with vanilla JavaScript, thanks to the <code>Array.reverse()</code> method.

<pre><code class="lang-js">var sandwiches = ['turkey', 'tuna', 'italian', 'chicken salad'];
sandwiches.reverse();

// returns ["chicken salad", "italian", "tuna", "turkey"]
console.log(sandwiches);
</code></pre>

This works in all moderns browsers and back to at least IE6.