---
categories:
- Design &amp; UX
date: '2013-08-16'
url: /kraken-goes-vanilla-js/
title: Kraken goes vanilla JS
---

Over the last two weeks, I converted all of the <a href="http://cferdinandi.github.io/kraken/addons.html">interactive Kraken add-ons</a> from jQuery to vanilla JavaScript.

So what's that mean for you? A few things:
<!--more-->
<ol>
<li>Your sites will be faster. Vanilla JS is a <em>lot</em> faster than using a framework.</li>
<li>If you still want or need to use a framework, you can pick any one you want. The add-ons will work with any of them.</li>
<li>The add-ons will only work with modern, HTML5-standards browsers (that means IE 9 and higher). Don't worry - if you need more backwards compatibility, you can still get the old jQuery versions of all the add-ons.</li>
</ol>

<h2>Get the scripts</h2>

The add-ons were designed to integrate with <a href="http://cferdinandi.github.io/kraken/">Kraken</a>, my mobile-first boilerplate, but they work great as standalone scripts, too.

<ul>
<li><a href="http://cferdinandi.github.io/astro/">Astro</a>, a collection of mobile-first navigation patterns.</li>
<li><a href="http://cferdinandi.github.io/drop/">Drop</a>, mobile-friendly dropdown menus.</li>
<li><a href="http://cferdinandi.github.io/houdini/">Houdini</a>, a simple expand-and-collapse widget.</li>
<li><a href="http://cferdinandi.github.io/tabby/">Tabby</a>, lightweight, mobile-first toggle tabs.</li>
<li><a href="http://cferdinandi.github.io/modals/">Modals</a>, simple modal dialogue windows.</li>
<li><a href="http://cferdinandi.github.io/slider/">Slider</a>, a responsive, touch-enabled content slider.</li>
<li><a href="http://cferdinandi.github.io/smooth-scroll/">SmoothScroll.js</a>, simple jQuery script to animate scrolling to anchor links.</li>
</ul>

To learn more about how I made the transition, read <a href="https://gomakethings.com/ditching-jquery-for-vanilla-js/">Ditching jQuery for Vanilla JS</a>.