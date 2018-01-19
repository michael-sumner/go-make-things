---
categories:
- Code
- Design &amp; UX
date: '2014-02-20'
title: Jellyfish, a better image lazy loader
---

<a href="http://cferdinandi.github.io/jellyfish/">Jellyfish</a> is a new progressively enhanced lazy image loader written in vanilla JS.

<!--more-->

<h2>What is lazy loading?</h2>

Lazy loading is the process of deferring the loading resources until they're needed. In the case of images, that means waiting to load them until they enter the viewport.

This helps speed up initial load times, and saves users unneeded downloads.

<h2>The problem with most lazy loaders</h2>

Most lazy loaders use a placeholder image&mdash;often a white 1px gif or a loading icon&mdash; as the image <code>src</code> variable. The actual image is specified via a data attribute, and javascript replaces the <code>src</code> with the actual image when it comes into view.

This works great, but if a person's browser doesn't support the JavaScript APIs being used, or if (as is quite common on mobile devices) the file fails to download, the image never gets displayed and the user has no way of viewing it.

<h2>How Jellyfish is different</h2>

Jellyfish still uses a data attribute to specify the image source, but allows you to use a link to the photo instead of a loading icon or a blank gif. If the lazy loader ever breaks, users can simply click the link to view the photo.

<pre><code class="language-markup">&lt;a data-lazy-load data-img="img/friends.jpg" href="img/elephant.jpg"&gt;
    View Photo
&lt;/a&gt;</code></pre>

When the page loads, Jellyfish replaces all of the links with loading icons (it's a single file so it's only downloaded once), and then again with the actual image when it enters into the viewport.

You can all add titles, classes and more using additional data attributes.

<a href="http://cferdinandi.github.io/jellyfish/">Check out the demo and download Jellyfish on GitHub.</a>