---
categories:
- Code
date: '2013-11-29'
permalink: /smooth-scroll-with-easing/
title: Smooth Scroll with easing
url: /2013/11/29/smooth-scroll-with-easing
---

<a href="http://cferdinandi.github.io/smooth-scroll/">Smooth Scroll</a> is a lightweight script that animates scrolling to anchor links. Last week it got an awesome new feature courtesy of <a href="https://github.com/willemliu">Willem Liu</a> and <a href="https://gist.github.com/gre/1650294">Gaëtan Renaudeau</a>: easing support.

<!--more-->

<h2>What's easing?</h2>

Andrey Sitnik explains it best on his <a href="http://easings.net/">Easing Cheat Sheet demo...</a>

<blockquote>
  Objects in real life don’t just start and stop instantly, and almost never move at a constant speed. When we open a drawer, we first move it quickly, and slow it down as it comes out. Drop something on the floor, and it will first accelerate downwards, and then bounce back up after hitting the floor.
</blockquote>

Easing functions add a more natural motion to animations.

<h2>Multiple easing options</h2>

Smooth Scroll now has four easing styles:

<ul>
<li><strong>Linear.</strong> Moves at the same speed from start to finish (the default style).</li>
<li><strong>Ease-In.</strong> Gradually increases in speed.</li>
<li><strong>Ease-In-Out.</strong> Gradually increases in speed, peaks, and then gradually slows down.</li>
<li><strong>Ease-Out.</strong> Gradually decreases in speed.</li>
</ul>

For all styles except linear, there are also four animation patterns, in order from most subtle to most extreme. Learn more about them at <a href="http://easings.net/">easings.net</a>.

<ul>
<li>Quad</li>
<li>Cubic</li>
<li>Quart</li>
<li>Quint</li>
</ul>

<h2>How it works</h2>

Adding an easing style to an anchor link is as simple as adding a <code>data-easing</code> attribute. Again, major kudos to <a href="https://github.com/willemliu">Willem Liu</a> and <a href="https://gist.github.com/gre/1650294">Gaëtan Renaudeau</a> for providing the code to make this happen!

<a href="http://cferdinandi.github.io/smooth-scroll/">Download Smooth Scroll</a> on GitHub.