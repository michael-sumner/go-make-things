---
categories:
- Accessibility
- Code
date: '2012-10-24'
excerpt: A simple technique to make your javascript accessible on unsupported devices.
url: /accessible-javascript/
title: Accessible Javascript
---

Javascript is like magic pixie dust for the internet. It can do amazing things.

As the mobile revolution and browser diversity continue to grow, though, your content will increasingly be accessed by devices that have varying levels of support for things like javascript.

If aspects of your site break without javascript support, that's a problem.

One common example is a collapse widget, often used to hide and expand navigation on smaller screens. These are great, but on browsers without javascript support, a visitor to your site will have no way to access the navigation.

Fortunately, there's a simple technique that can fix this.

[snippet id="8395"]

<h2>Javascript Conditional Styling</h2>

In my <a href="https://gomakethings.com/go-mobile-first/">Go Mobile First theme</a>, I employ a really simple technique that I learned from <a href="http://bradfrost.github.com/this-is-responsive/">Brad Frost</a>.

If you're using jQuery, at the end of your javascript file, add this snippet of code...

<pre><code class="language-javascript">/* =============================================================
 * accessibility-styles.js v1.0.0
 * Adds 'js' class to body to allow for javascript conditional styling
 * Ensures accessibility of collapsing menu, etc. on all devices
 * =============================================================
 * Copyright 2012 Brad Frost
 * http://codepen.io/bradfrost
 * ============================================================= */

$(function () {
	$('body').addClass('js');
});
</code></pre>

This simply adds the class "js" to the body of every page on your site when jQuery is loaded. The genius in this is that it allows you to make your styling conditional on the presence of javascript.

<h2>Modifying Your CSS</h2>

Let's use the collapse widget from <a href="http://twitter.github.com/bootstrap/javascript.html#collapse">Twitter Bootstrap</a> is an example. Here's what the CSS for that widget normally looks like...

<pre><code class="language-css">.collapse {
    position: relative;
    height: 0;
    overflow: hidden;
    -webkit-transition: height 0.35s ease;
    -moz-transition: height 0.35s ease;
    -ms-transition: height 0.35s ease;
    -o-transition: height 0.35s ease;
    transition: height 0.35s ease;
}

.collapse .in {
    height: auto;
}</code></pre>

In addition to setting some CSS transitions for when the widget expands and collapses, it also says that by default, the collapsed element should have a height of 0 pixels and no overflow of the contents within. When the collapse widget is activated, the class "in" is added to the div, which sets the height back to auto, so the widget expands.

If javascript isn't working or supported by the browser, that content's height stays set to 0 pixels and visitors can't access it.

Here's the fix...

<pre><code class="language-css">.js .collapse {
    position: relative;
    height: 0;
    overflow: hidden;
    -webkit-transition: height 0.35s ease;
    -moz-transition: height 0.35s ease;
    -ms-transition: height 0.35s ease;
    -o-transition: height 0.35s ease;
    transition: height 0.35s ease;
}

.collapse .in {
    height: auto;
}</code></pre>

This says that when the class "js" is present, set the height to 0 pixels with no overflow. Since the "js" class is applied by javascript, it can only exist if javascript is supported.

By simply adding three characters to your CSS file, you prevent collapse content from being hidden when javascript isn't available.

<h2>Applying This Elsewhere</h2>

This is just one simple example.

I use this trick to change the styling of my navigation. When javascript is available, not only do I offer a collapsing menu, but the menu items go from an inline list to stacked block elements. If there's no javascript, they stay inline.

There's many ways you can use this. Have fun!

[snippet id="8397"]