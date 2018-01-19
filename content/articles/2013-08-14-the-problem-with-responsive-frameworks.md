---
categories:
- Design &amp; UX
date: '2013-08-14'
title: The Problem with Responsive Frameworks
---

In an <a href="http://www.netmagazine.com/advertorial/responsive-web-design-6-experts-4-questions">interview on responsive web design</a> with .net magazine, <a href="http://aaron-gustafson.com/">Aaron Gustafason</a> shared this thought on responsive frameworks:

<blockquote>I find Foundation, Bootstrap, and similar frameworks interesting from an educational standpoint, but I would never use one when building a production site. For prototyping a concept, sure, but to take one of these into production you need to be rigorous in your removal of unused CSS and JavaScript or you end up creating a heavy, slow experience for you users. I also think you need to work twice as hard to break out of the theme of the framework. There are a ton of Bootstrap sites out there that look like Bootstrap sites. Your design should be as unique as your product, not some off the shelf thing you just changed some colors on.</blockquote>

I agree wholeheartedly with Aaron on this.
<!--more-->
I learned quite a bit from digging around in the code of Bootstrap and Foundation, but for production projects, there's just so much bloat and customization that needs to happen. I found myself removing code and wondering what I would break in the process.

And that's <a href="http://cferdinandi.github.io/kraken/">why I built Kraken</a>.

There's a happy medium between using a full-featured framework and starting from scratch on each project. I believe Kraken fits nicely in the middle. I like to think of it as a boilerplate-plus. It's a barebones, style-agnostic starting point, with a bunch of optional pieces you can add in and customize as needed.

Building blocks for developers. A library. A boilerplate. Faster than starting from scratch, but without the bloat of a framework.

<em>Hat tip to <a href="http://www.elezea.com/2013/08/responsive-frameworks/">Rian van der Merwe</a></em>