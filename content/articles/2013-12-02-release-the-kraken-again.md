---
categories:
- Code
- Design &amp; UX
date: '2013-12-02'
url: /release-the-kraken-again/
title: Release the Kraken (again)
---

Over the long weekend, I released <a href="http://cferdinandi.github.io/kraken/">version 3 of Kraken</a>, my mobile-first boilerplate for front-end web developers.

Kraken 3 includes some awesome updates, including a better grid, smarter namespacing, and the power of Sass.

<!--more-->

<h2>What's new?</h2>

<p><strong>Powered by Sass</strong>
Kraken is now <a href="http://sass-lang.com/">powered by Sass</a>, so customizing it for your project is easier than ever.</p>

<p><strong>Naming Conventions</strong>
Color-based naming conventions like <code>.btn-blue</code> have been dropped in favor of more abstracted, function driven ones like <code>.btn-secondary</code>. This allows for markup that's reusable even if the color palette changes.</p>

<p><strong>A New Typographic Scale</strong>
The typographic scale is now based on a 16 pixel base, which allows for much cleaner math than the previous scale.</p>

<p><strong>A Better Grid</strong>
Kraken 3 drops the number-based grid in favor of fraction-based naming (<code>.grid-third</code> instead of <code>.grid-2</code>). This provides more layout options, including four-column layouts, which previously required nested grids. Two new classes allow you to activate the grid on small screens, giving you more control.</p>

<p><strong>Buttons</strong>
Buttons picked up two new classes: <code>.active</code> and <code>.disabled</code>. These are great for web apps.</p>

<p><strong>Squared-Off Corners</strong>
Buttons, forms, and other elements lost their rounded corners in favor of more squared off ones.</p>

<a href="http://cferdinandi.github.io/kraken/">Download Kraken 3 today</a> on GitHub.