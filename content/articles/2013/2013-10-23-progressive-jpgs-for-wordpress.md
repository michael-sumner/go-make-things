---
categories:
- Code
- Design and UX
date: '2013-10-23'
url: /progressive-jpgs-for-wordpress/
title: Progressive JPGs for WordPress
---

<p><a href="http://exisweb.net/">James Foster</a> made an awesome addition to my <a href="http://cferdinandi.github.io/image-compress-and-sharpen/">Image Compress &amp; Sharpen plugin</a> for WordPress: progressive JPGs.
<!--more--></p>

<h2>Why progressive JPGs are awesome</h2>

If you're not familiar with the term, there are a few variants of JPG.

The most common on the web is the baseline JPG, which starts rendering at the top of the image and builds down. Progressive JPGs, on the other hand, render the entire image in low resolution, then add a slightly higher resolution layer, and so on, until the entire image is rendered.

Progressive JPGs are often slightly smaller, though not by a lot. What really makes them preferable is that for supporting browsers, content is rendered faster than with baseline JPGs.

<h2>Some things to consider</h2>

The key word here is "supporting."

For IE 8, background images in IE 9, and a few other browsers, progressive JPGs can actually render slower than baseline JPGs. They're still displayed, but non-supporting browsers wait until they're downloaded completely before rendering. You learn more about the pros and cons on <a href="http://calendar.perfplanet.com/2012/progressive-jpegs-a-new-best-practice/">Performance Calendar</a>, <a href="http://blog.patrickmeenan.com/2013/06/progressive-jpegs-ftw.html">Performance Matters</a>, and <a href="http://www.blurbherd.com/2013/01/02/the-not-so-new-best-practice-progressive-jpegs/">Blurb Herd</a>.

I've considered making progressive JPGs the default, but for now, I'll leave the option up to you. <a href="http://cferdinandi.github.io/image-compress-and-sharpen/">Download Image Compress &amp; Sharpen on GitHub.</a>