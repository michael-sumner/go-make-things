---
categories:
- Code
- Design &amp; UX
date: '2015-08-26'
permalink: /release-the-kraken-version-7/
title: Release the Kraken! (version 7)
url: /2015/08/26/release-the-kraken-version-7
---

<a href="http://cferdinandi.github.io/kraken/"><img src="https://gomakethings.com/wp-content/uploads/2015/08/kraken-version-7.jpg" alt="A screenshot of Kraken 7" width="960" height="578" class="alignnone size-full wp-image-6374" /></a>

Yesterday, I quietly released [version 7 of Kraken](http://cferdinandi.github.io/kraken/), my lightweight, mobile-first boilerplate for front-end web developers.

So... what's new?

<!--more-->

## What's new in version 7?

<dl>
	<dt>Switched to Normalize.css</dt>
	<dd><a href="http://meyerweb.com/eric/tools/css/reset/">Meyer's CSS reset</a> is great, but it can create styling issues when doing things like <a href="https://gomakethings.com/inlining-critical-css-for-better-web-performance/">inlining critical path CSS</a>. <a href="https://necolas.github.io/normalize.css/">Normalize.css</a> is a lightweight alternative that nudges and tweaks browser styles instead of resetting everything to zero.</dd>
</dl>

<dl>
	<dt>Table Styles</dt>
	<dd>In previous versions of Kraken, table styling was an optional add-on. Now, they're baked right in, and include CSS-only responsive tables for smaller viewports.</dd>
</dl>

<dl>
	<dt>Search Form Styling</dt>
	<dd>Kraken now includes <a href="http://cferdinandi.github.io/kraken/components.html#search-forms">classes for custom search form styles</a>.</dd>
</dl>

<dl>
	<dt>Switched to LibSass</dt>
	<dd>Now that <a href="http://sass-lang.com/libsass">LibSass</a> supports most Sass 3 APIs, it's time to make the switch. This gets you faster builds, and no Ruby dependency.</dd>
</dl>

<dl>
	<dt>Removed directionless space nudge-and-tweak classes</dt>
	<dd>The <code>.no-margin</code> and <code>.no-padding</code> classes are gone. You should use <code>.no-margin-padding</code>, <code>.no-margin-bottom</code>, <a href="http://cferdinandi.github.io/kraken/components.html#alignment-spacing-visibility">and so on</a> to suite your needs.</dd>
</dl>

[Download it today on GitHub.](http://cferdinandi.github.io/kraken/)