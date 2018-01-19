---
categories:
- Design &amp; UX
date: '2013-01-07'
permalink: /responsive-site-size/
title: Responsive Site Size
url: /2013/01/07/responsive-site-size
---

I periodically see posts and tweets comparing the size of websites on the desktop to those same sites viewed on a mobile device. They typically say something to the effect of, "X percentage of sites are the same size or larger on a mobile device than on a desktop."

There's two things I don't like about these kind of blanket statements.
<!--more-->
First, they lump same-sized sites with bigger-on-mobile sites, which positions them as a bad thing. And indeed, they can be for larger sites. But that brings me to my second point.

The relative size of desktop versus mobile is not as important as the absolute size of the site itself. A typical post on Go Make Things requires just 10 HTTP requests, less than 7 kbs of data, and loads in 1.7 seconds. The site has a PageSpeed rating of 96.

And the mobile version is roughly the same size as the desktop version.

In a perfect world, the mobile version would be smaller. But decreasing the overall size of the site and the number of HTTP requests benefits everyone, even the desktop users, and results in better mobile performance, regardless of the relative-to-desktop size.

I'm not saying you shouldn't progressively enhance. And I'm not saying you shouldn't strive to have a mobile site that's more lightweight than the desktop version.

But if you care about mobile performance, you may be better served by first looking at the overall size of your project, not just the mobile size.