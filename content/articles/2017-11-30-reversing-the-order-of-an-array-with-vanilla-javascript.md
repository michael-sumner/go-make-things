---
categories:
- Code
- JavaScript
date: '2017-11-30'
permalink: /reversing-the-order-of-an-array-with-vanilla-javascript/
title: Reversing the order of an array with vanilla JavaScript
url: /2017/11/30/reversing-the-order-of-an-array-with-vanilla-javascript
---

It's incredibly easy to reverse the order of an array's values with vanilla JavaScript, thanks to the <code>Array.reverse()</code> method.

<pre><code class="lang-js">var sandwiches = ['turkey', 'tuna', 'italian', 'chicken salad'];
sandwiches.reverse();

// returns ["chicken salad", "italian", "tuna", "turkey"]
console.log(sandwiches);
</code></pre>

This works in all moderns browsers and back to at least IE6.