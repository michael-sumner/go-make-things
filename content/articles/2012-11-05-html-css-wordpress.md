---
categories:
- Code
date: '2012-11-05'
excerpt: Part of a series of tutorials on the free Go Mobile First WordPress theme.
permalink: /html-css-wordpress/
title: A Brief Intro to HTML, CSS &#038; WordPress
url: /2012/11/05/html-css-wordpress
---

A few weeks ago, I released a free mobile-first starter theme for WordPress called <a href="http://cferdinandi.github.com/go-mobile-first/">Go Mobile First</a>. To help you use it, I'm writing a series of tutorials on how to make some common changes.

For people who are new to web development (or just new to WordPress), I thought I'd start with a brief intro to HTML, CSS and WordPress.
<!--more-->
<h2>A Brief Intro to HTML</h2>

HTML is like the materials that go into a building.

It's the content that makes up a webpage, but by itself, it's mostly without shape or form. You can build a webpage with just HTML and it will be entirely usable... though not necessarily all that nice to look at.

Simply put, HTML is the content.

<h2>A Brief Intro to CSS</h2>

CSS is like the blueprints that tell the construction team (in this case, the web browser) how to assemble the building materials.

How big should the letters be? What about headings? What color are the links? What do they do when you hover over them? Where should this section of content be located, relative to the other pieces of content?

In the earlier days of the web, these instructions were added directly to the content on the page. If you wanted a header to be orange, you would type <code class="language-css">color="orange"</code>. As you could imagine, on sites with a lot of content, this was an unrealistic amount of work.>

Today, we use CSS, or cascading style sheets.

<h3>Using Stylesheets</h3>

The "blueprints" for a site are kept in a separate file, and referenced in the header of each page by including something like <code class="language-markup">&lt;link rel="stylesheet" type="text/css" href="http://your-website.com/assets/stylesheet.css"&gt;</code>.

In the stylesheet, you can apply styles to elements directly, for example:

<pre><code class="language-css">h2 {
    color: orange;
}</code></pre>

You can also specify classes that get used by multiple HTML elements, such as:

<pre><code class="language-css">.orange {
    color: orange;
}</code></pre>

Any element tagged as <code class="language-css">class="orange"</code> in your HTML will be orange. You can change <code class="language-css">.orange</code> to <code class="language-css">color: blue;</code> in your CSS, and everything with that class in your HTML will now be blue.

IDs work similarly, but are applied to just one element, and cannot be reused. For example:

<pre><code class="language-css">#logo {
     font-size: 24px;
}</code></pre>

Would make <code class="language-markup">&lt;h2 id="logo"&gt;My Blog&lt;/h2&gt;</code> 24 pixels in size. You would not be able to use <code class="language-markup">id="logo"</code> on any other HTML element.

<h3>Specificity & the Cascade</h3>

As the name implies, the styles in a stylesheet cascade. That means that if you write:

<pre><code class="language-css">h2 {
   color: orange;
}

h2 {
   color: blue;
}</code></pre>

Your <code class="language-markup">h2</code> elements will be blue. The last specified style takes precedence.

To complicate this slightly, styles that are more specific take precedence, even if they happen earlier in the stylesheet. General elements, like <code class="language-markup">h2</code> and <code class="language-markup">a</code>, are the least specific, then classes, then IDs.

So this code:

<pre><code class="language-css">.orange {
    color: orange;
}

h2 {
    color: blue;
}</code></pre>

Would cause <code class="language-markup">&lt;h2 class="orange"&gt;</code> to be orange, because classes are more specific than general elements.

To further complicate things, you can nest elements, classes and IDs (<code class="language-css">#logo .orange</code>, for example) to provide more specificity. This can cause a world of hurt when things don't work right and you can't figure out why, so you should try to write your stylesheets with the least amount of specificity possible.

In Go Mobile First, I only use general HTML elements and classes.

<h2>A Brief Intro to WordPress</h2>

If you're writing a basic HTML webpage, you need to manually code the content on each page.

For content that shared across pages, like navigation links, this is a bit annoying. And if you make an update - for example, adding a new page to your site - you need to manually update the navigation links on every page.

<a href="http://wordpress.org/">WordPress</a> (and other content management systems) provide templates for commonly shared content - the header, footer, blog posts, and so on. Using a programming language called PHP, WordPress pulls page content from a database, adds it to the templates, and compiles it into HTML dynamically when someone tries to access it.

This lets you update shared content once instead of repeatedly.

<h2>What Now?</h2>

This article is by no means a comprehensive look at HTML, CSS and WordPress. Hopefully, the general concepts here will bring a little clarity to some of the topics and exercises we'll explore in future tutorials.

If you're still a little unsure, or would just like to learn more, here are some great resources you should check out:

<ol>
<li><a href="http://www.dontfeartheinternet.com/">Don't Fear the Internet</a></li>
<li><a href="http://teamtreehouse.com/library">Team Tree House</a></li>
<li><a href="http://diveintohtml5.info/">Dive Into HTML5</a></li>
</ol>