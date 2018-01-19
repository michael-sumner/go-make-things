---
categories:
- Design &amp; UX
date: '2013-11-22'
title: Kraken, Sass, and Open Source
---

I've started planning version 3 of <a href="http://cferdinandi.github.io/kraken/">Kraken</a>. I think it should use Sass. And that's creating some challenges with the way the project is currently structured and my desire to keep it open and accessible to everyone.

<!--more-->

<h2>Lightweight &amp; Modular</h2>

What makes Kraken different from frameworks like Foundation and Bootstrap is scope.

Other frameworks&mdash;I actually consider Kraken more of a boilerplate than framework&mdash;try to include everything you'll need for a project. Kraken is just a starting point.

I've built a ton of <a href="http://cferdinandi.github.io/kraken/addons.html">handy little add-ons</a> that are designed to integrate with Kraken, but they're not included. You have to download them separately and drop the code into your project.

This has two practical benefits:

<ol>
<li>You're not removing a bunch of unused code when you move a project into production.</li>
<li>You can (and a lot of people do) use the add-ons as standalone components in other projects that aren't using Kraken.</li>
</ol>

<h2>Sass &amp; Modularity</h2>

Sass makes modularity really easy.

You can keep a library of modular code, and include just what you need into each build using <code>@import</code>. Need to update colors? Change a few variables in your <code>variables.scss</code> file and they populate throughout your CSS.

But that approach is really different from how Kraken is structured today, with separate code bases that you manually pull in. It also makes using add-ons as standalone products a lot harder. And the last thing web workers need is another "everything you'll ever need and a ton of stuff you don't" framework.

I'm currently working through how to merge these use cases and development approaches that are a bit at-odds with each other.

<h2>A possible solution</h2>

The solution I'm currently leaning towards combines some of the best things about Sass with the Kraken approach to web development.

Today, add-ons for Kraken all share the same typographic scale, color palette, and coding conventions. It's what makes them easy to just drop into a project and go.

In version 3, they can instead share the same variables and mixins, while still being standalone projects. I'll simply include a common <code>variables.scss</code> file with all of them that can be omitted when dropping them into a project built on Kraken.

While this will involve a bit more manual work than an all-in-one framework, I think it maintains what makes Kraken so awesome and allows for greater flexibility. And for folks who still work in CSS, it allows them to keep using Kraken the way they always have. I'll still include a compiled version as part of the download package.

Are there any big things I'm missing with this approach, or other ways I might balance multiple concerns that I'm not thinking of?