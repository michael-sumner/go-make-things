---
categories:
- Code
- CSS
- JavaScript
date: '2017-04-25'
url: /detecting-svg-support-with-javascript/
title: Detecting SVG support with JavaScript
---

<a href="https://modernizr.com/">Modernizr</a> is a very popular browser support detection generator, but sometimes it can be a little heavy-handed when you just need to check one or two things.

Take SVG support, for example. You can reliably test SVG support with one line of code:

<pre><code class="lang-javascript">var svgSupport = !!document.createElementNS &amp;&amp; !!document.createElementNS('http://www.w3.org/2000/svg', 'svg').createSVGRect;
</code></pre>

You can then do things like add a conditional class to your webpage only if SVG is supported:

<pre><code class="lang-javascript">var svgSupport = !!document.createElementNS &amp;&amp; !!document.createElementNS('http://www.w3.org/2000/svg', 'svg').createSVGRect;
if ( svgSupport ) {
    document.documentElement.className += ' svg';
}
</code></pre>

Then, you can hook into that class in your CSS for conditional styling.

<pre><code class="lang-css">svg {
    /* Default styles */
}

.svg svg {
    /* Styles when SVG is supported */
}
</code></pre>