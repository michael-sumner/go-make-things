---
categories:
- Code
- CSS
date: '2016-04-06'
title: Relative sizing FTW!
---

As I get older, my disdain for small typography grows.

(*It's not just me. [As you age, your pupils reduce in size](http://www.allaboutvision.com/over60/vision-changes.htm), letting in less light and making it harder to see.*)

This week, I decided to bump up the font-size on my site from 17px to 18px.

Because my entire site uses [relative sizing](/working-with-relative-sizing/), all I had to do was change a single value&mdash;the `font-size` percentage on the `body` tag&mdash;in my stylesheet.

<!--more-->

The rest of the size uses `em` values, so as the font size increased, the breakpoints and the font sizes on all of the other elements scaled up to match. Everything maintains an appropriate relative scale and sense of balance.

Why percentage for that `body` value instead of `em` or `px`? It makes it really easy for a visitor to change the default font size in their browser (from medium to, say, large). My base font size will be a percentage of their default size.

For example: at `100%`, if they set their font size to `18px`, my base font size becomes `18px`. If I bump up my base font size to `112.5%`, at `18px` my base font size becomes `20.25px` (18 * 1.125 = 20.25).

What makes this system so beautiful is that it puts control with the users&mdash;where it belongs&mdash;while still maintaining the harmony and balance of the design system you put in place.