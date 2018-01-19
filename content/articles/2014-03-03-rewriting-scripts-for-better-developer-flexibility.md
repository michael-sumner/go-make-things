---
categories:
- Code
date: '2014-03-03'
permalink: /rewriting-scripts-for-better-developer-flexibility/
title: Rewriting scripts for better developer flexibility
url: /2014/03/03/rewriting-scripts-for-better-developer-flexibility
---

Last week, the full suite of <a href="http://cferdinandi.github.io/kraken/addons.html#interactive">JavaScript add-ons for Kraken</a> got a few updates that provide much greater flexibility for developers (while still being easy to use right out-of-the-box).

<!--more-->

<strong>What's new?</strong>

<ol>
<li>The old versions self-initialized. You have to initialize them now, which means you can concatenate them all into a single file and only call them when needed. It also means you can reinitialize them if the DOM gets modified.</li>
<li>You can pass in your own options and callbacks into the scripts via the <code>init()</code> function, which gives you more control.</li>
<li>On scripts where it makes sense (<a href="http://cferdinandi.github.io/smooth-scroll/">Smooth Scroll</a>, for example), you can set overrides on individual elements.</li>
<li>Key functions in the scripts can now be used in your own scripts, which allows you to extend and build upon the scripts without messing with the core code.</li>
</ol>

I'll be writing up a tutorial on the approach soon, but in the meantime, check out the <a href="http://cferdinandi.github.io/kraken/addons.html#interactive">full set of scripts on GitHub</a>.