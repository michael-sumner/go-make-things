---
categories:
- Code
date: '2014-03-27'
title: Kraken gets icon font tools
---

<a href="http://cferdinandi.github.io/kraken/">Kraken</a> picked up two new tools for working with icon fonts:

<ol>
<li>A lightweight feature test to check for browser support.</li>
<li>A class for fallback text for non-supporting browsers and screen readers.</li>
</ol>

<!--more-->

<h2>Feature Test</h2>

The feature test includes scripts by the <a href="https://github.com/filamentgroup/face-off">Filament Group</a> and <a href="ttps://gist.github.com/paulirish/441842">Paul Irish</a> that check for <code>@font-face</code> and pseudo selector support.

When supported, the test adds the <code>.font-face</code> class to the <code>&lt;html&gt;</code> element. You can hook into this class in your CSS to display fallback text and avoid weird characters on non-supporting browsers.

<h2>Fallback Text</h2>

The Sass version of Kraken also includes a placeholder file for working with icon fonts. This file picked up a new class, <code>.icon-fallback-text</code>, that you can use to add fallback text for non-supporting browsers and screen readers.

<a href="http://cferdinandi.github.io/kraken/">Get Kraken on GitHub.</a>