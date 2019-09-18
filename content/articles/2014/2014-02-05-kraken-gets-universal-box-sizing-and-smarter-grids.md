---
categories:
- Code
- Design and UX
date: '2014-02-05'
url: /kraken-gets-universal-box-sizing-and-smarter-grids/
title: Kraken gets universal box-sizing and smarter grids
---

Last night, I released <a href="http://cferdinandi.github.io/kraken/">version 3.3 of Kraken</a>. This latest version includes universal box-sizing, and along with it, a simpler, more flexible grid structure.

<!--more-->

<h2>What is box-sizing?</h2>

Quick quiz: what's the rendered width of this element?

<pre><code class="language-css">.element {
    width: 200px;
    padding-left: 10px;
    padding-right: 10px;
}</code></pre>

The correct answer is 220px. And it's one of the most annoying things about CSS.

The ultimate width of an object isn't just it's width (as you'd expect), but it's width plus it's padding, margins, and border. Every time you adjust padding or add a border, you need to redo your math.

The one exception to this rule, amazingly is Internet Explorer 6. In IE 6, the rendered width of an object is its width. Period.

In CSS3, the <code>box-sizing</code> property causes elements to render width as the specified by the <code>width</code> value. Any padding or borders take away from space inside the element rather than add to its width.

<h2>Universal Box-Sizing</h2>

To make life easier, folks like <a href="http://www.paulirish.com/2012/box-sizing-border-box-ftw/">Paul Irish</a> and <a href="http://css-tricks.com/international-box-sizing-awareness-day/">Chris Coyier</a> recommend just applying the box-sizing property to everything like so:

<pre><code class="language-css">*,
*:before,
*:after {
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
}</code></pre>

I resisted this approach for a long time because I'd heard (often) that the universal selector (<code>*</code>) was bad for performance. <a href="http://www.paulirish.com/2012/box-sizing-border-box-ftw/">Paul Irish is adamant that it's not</a>, and he's a really smart dude!

<h2>A Better Grid</h2>

The nicest thing about applying universal box-sizing in Kraken is that the math for the grids can get a lot simpler.

A quarter width column used to look like this:

<pre><code class="language-css">.grid-fourth {
    width: 21.96969696969%;
    margin-left: 1.515151515152%;
    margin-right: 1.515151515152%;
}</code></pre>

Now it looks like this:

<pre><code class="language-css">.grid-fourth {
    width: 25%;
    padding-left: 1.4%;
    padding-right: 1.4%;
}</code></pre>

And you can adjust the left and right padding to anything you want. Need to add columns that span a fifth of the page? Those aren't included in Kraken, but it's as simple as adding a class:

<pre><code class="language-css">.grid-fifth {
    width: 20%;
}</code></pre>

And for Sass users, the <code>config.scss</code> file now includes a <code>$grid-margins</code> variable that let's you set the grid margins to any value you want.

<a href="http://cferdinandi.github.io/kraken/">Get the latest version of Kraken on GitHub today.</a>