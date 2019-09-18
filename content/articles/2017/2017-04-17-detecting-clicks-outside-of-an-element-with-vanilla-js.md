---
categories:
- Code
- JavaScript
date: '2017-04-17'
url: /detecting-clicks-outside-of-an-element-with-vanilla-js/
title: Detecting clicks outside of an element with vanilla JS
---

A few months ago, <a href="https://twitter.com/brad_frost/status/795688675006967808">Brad Frost asked</a>:

<blockquote>
  So @frostyweather is looking for a vanilla JS way to detect "click outside" an element. Any help?
</blockquote>

There are a few ways to handle this, but I find the simplest is by using <a href="https://github.com/cferdinandi/getClosest">my <code>getClosest()</code> helper method</a>. It gets the first parent element of another element that matches a selector.

To answer Brad's question, we can listen to all clicks on the document. We'll give the element we want to check for clicks outside of a unique selector.

Whenever a click happens, we'll check to see if that clicked element has a parent element with the selector. If it does, the click was inside the element. If not, it was outside of it.

<pre><code class="lang-javascript">var getClosest = function (elem, selector) {...};
document.addEventListener('click', function (event) {
    if ( !getClosest(event.target, '.some-selector') ) {
        // Clicked outside the element...
    }
}, false);
</code></pre>

And that's that.