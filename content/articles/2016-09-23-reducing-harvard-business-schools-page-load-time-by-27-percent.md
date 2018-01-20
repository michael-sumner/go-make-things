---
categories:
- Code
- Design &amp; UX
date: '2016-09-23'
url: /reducing-harvard-business-schools-page-load-time-by-27-percent/
title: Reducing Harvard Business School&#8217;s page load time by 27 percent in 15 minutes
---

I just wrapped up another project with [Harvard Business School's Digital Initiative](https://digital.hbs.edu/).

During [my first project with them](/projects/harvard-business-school/), we spent a lot of time focused on performance. Their site, powered by WordPress, had originally taken over 5 seconds to start displaying content to visitors. We got that number down to around a second.

Since last working with them, that number had increased to over 2 seconds.

## The plugin problem

Plugins aren't inherently bad for performance, but many load lots of small scripts and stylesheets. They often also load them all in the header, where they block rendering of your site.

If they require jQuery, that's another large, render-blocking JS file that always gets loaded in the header in WordPress, even if the script that needs it is loaded in the footer.

HBS had installed a handful of super useful plugins that happened to load scripts in a sub-optimal way, including one that required jQuery.

**These more than doubled the start render time for their site.**

## How to fix bad plugin performance

I did two simple things:

1. Installed [MinQueue](https://wordpress.org/plugins/minqueue/), a handy little plugin that minifies and concatenates all of the JavaScript and CSS on your site.
2. Moved all scripts (including jQuery) to the footer. You can use my [Scripts to Footer plugin](https://github.com/cferdinandi/gmt-scripts-to-footer) for this.

The whole process took me less than 15 minutes. Their site now starts rendering content in 1.7 seconds, a 27% improvement.

There's still some work to be done, but you can make a big difference in load time with a few small tweaks.