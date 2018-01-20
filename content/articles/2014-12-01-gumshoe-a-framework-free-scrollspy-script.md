---
categories:
- Code
date: '2014-12-01'
url: /gumshoe-a-framework-free-scrollspy-script/
title: 'Gumshoe: A framework-free scrollspy script'
---

Last week I release <a href="https://github.com/cferdinandi/gumshoe">Gumshoe</a>, a lightweight, framework-free script that highlights the current content in the navigation area on single-page sites.

I used a few tricks in Gumshoe to make it more performant:

<ol>
<li>Navigation links and their associated content are stored in an array when the script is initialized. This means that the script doesn't have to search the DOM for them on scroll.</li>
<li>I also stored all measurements&mdash;things like how tall the document is and how far from the top sections are&mdash;to variables on initialization so the script doesn't need to do as many calculations on the fly.</li>
<li>Like all of my scripts that use scroll and resize events, I've added <a href="https://gomakethings.com/javascript-resize-performance/">an event throttler</a> to prevent methods from being called an absurd number of times during the course of an event.</li>
</ol>

<a href="https://github.com/cferdinandi/gumshoe">Download Gumshoe (and check out the source code) on GitHub.</a>