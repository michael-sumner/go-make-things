---
categories:
- Code
- JavaScript
date: '2017-05-08'
permalink: /prefixing-javascript-selectors-to-avoid-conflicts/
title: Prefixing JavaScript selectors to avoid conflicts
url: /2017/05/08/prefixing-javascript-selectors-to-avoid-conflicts
---

<a href="http://andrewborstein.com">Andrew Boorstein</a>, one of the students in my <a href="https://gomakethings.com/guides/">Vanilla JS Slack channel</a> asked:

<blockquote>
  Do you ever prefix your JavaScript hook classes with <code>js-</code> or something similar, so that changing a class name for styling purposes doesn’t inadvertently break your JS?
</blockquote>

I absolutely do prefer to keep my selectors (as in, the hooks I use to target the elements I use in my scripts in plugins) unique to my script and not used for styling purposes. This frees me (and people who use my plugins) to style elements however the wish without worrying about breaking my scripts.

For a while, many folks recommended prefixing selector classes with <code>.js-</code> so that everyone knew they were used for JavaScript purposes. You'd end up with something like:

<pre><code class="lang-markup">&lt;div class=".collapse .js-collapse"&gt;
    Some content...
&lt;/div&gt;

&lt;script&gt;
    var elem = document.querySelector('.js-collapse');
&lt;/script&gt;
</code></pre>

I actually don’t use classes for JS targets anymore, instead relying on data attributes.

I like them better because their entire purpose is for JS to hook into and grab data from (though they can now be used by CSS too). I might do something like this:

<pre><code class="lang-markup">&lt;div class=".collapse" data-collapse&gt;
    Some content...
&lt;/div&gt;

&lt;script&gt;
    var elem = document.querySelector('[data-collapse]');
&lt;/script&gt;
</code></pre>

This completely separates classes, which are intended from styling, from what I use to target elements with JavaScript.