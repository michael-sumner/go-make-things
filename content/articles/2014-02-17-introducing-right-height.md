---
categories:
- Code
- Design &amp; UX
date: '2014-02-17'
title: Introducing Right Height
---

<a href="http://cferdinandi.github.io/right-height/">Right Height</a> is a lightweight script that dynamically sets content areas of varying lengths to the same height.

<!--more-->

<h2>The Height Problem</h2>

Creating equal height columns used to be pretty easy. When we used tables to create layouts, heights took care of themselves. When we moved to using <code>divs</code> and CSS for desktop-based designs, we simply set a <code>height</code> value and called it a day.

Responsive Web Design complicates things a bit.

As fluid-width containers scale and adapt to different screen-sizes, the length of the content within them becomes unpredictable. On narrow viewports, it adds a lot of vertical height. On wider viewports, content containers can be shorter. Setting a fixed <code>height</code> attribute becomes impossible.

Enter Right Height.

<h2>How it works</h2>

You identify the content areas that you want to be the same height with a few simple data attributes. Right Height measures the height of each element, and then sets the height of all of them to match the tallest one.

Every time a user resizes their screen, Right Height runs again. And when elements are stacked vertically on smaller screens, it let's them scale to their natural height to avoid any unneeded whitespace.

<a href="http://cferdinandi.github.io/right-height/">See a demo and download Right Height on GitHub.</a>