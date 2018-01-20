---
categories:
- Code
- JavaScript
date: '2017-04-18'
url: /you-dont-need-to-cache-array-length-except-when-you-do/
title: You don&#8217;t need to cache array length. Except when you do.
---

One often repeated piece of advice to improve JavaScript performance is that you should store the length of your array to a variable before running your loop:

<pre><code class="lang-javascript">var arr = [...];

// Uncached
for (var i = 0; i &lt; arr.length; i++) {
    // Do something...
}

// Cached
for (var i = 0, len = arr.length; i &lt; len; i++) {
    // Do something...
}
</code></pre>

The logic behind this is that calculating the length of the array on each iteration of the loop is computationally demanding. Makes sense.

Browser makers also realized this, so in modern browsers they actually cache the array length behind the scenes for you. In other words, in the uncached version the array length is still cached. Caching makes no difference on performance.

On older browsers&mdash;IE9 and earlier, older versions of Safari, and so on&mdash;caching actually does improve performance quite a bit.

So what you should you do? These days, I leave my loops uncached. If you're doing deep backwards compatibility for IE7 and IE8, I would cache the length.