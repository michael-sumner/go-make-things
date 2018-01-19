---
categories:
- Code
- Design &amp; UX
date: '2014-01-16'
title: FOUC vs. Progressive Enhancement
---

In his recent post on <a href="http://www.zeldman.com/2014/01/06/its-2014-is-web-design-dead/">web standards and progressive enhancement</a>, Zeldman notes:

<blockquote>
  When a site like Facebook stops functioning when a script forgets to load, that is a failure of education and understanding on the part of those who created the site.
</blockquote>

This has me rethinking the way I've approached progressive enhancement.

<!--more-->

<h2>How I do progressive enhancement</h2>

I use modern JavaScript API’s in my scripts that don’t work in older and less capable browsers.

When I write scripts that hide or manipulate content on a page, I make all content visible by default, and use a feature test to add a <code>.js</code> class to the <code>&lt;body&gt;</code> element. I only hide and manipulate content when that class is present, esnuring that no one is ever prevented from seeing the content. (<a href="https://gomakethings.com/writing-your-own-simple-feature-tests/">Learn more about how I use feature tests.</a>)

Unfortunately, this can cause FOUC.

<h2>Fixing FOUC</h2>

FOUC, or flashes of unstyled content, happen when markup is loaded before the styles of scripts that style it.

I load my scripts in the footer for better performance. Because no content is hidden or manipulated before those scripts load (progressive enhancement), visitors will often see the page build before them, with all of the drop-down navigation elements visible and tab content stacked on top of each other. Once the script loads, everything looks normal.

A simple way to avoid this is by putting the feature test up in the <code>&lt;head&gt;</code> element, which is what I now do on all of the sites that build. Since it loads before any of the markup is painted, there's no FOUC.

So we're good, right? Well, not exactly...

<h2>Failure to Load</h2>

The Zeldman quote at the beginning of this piece identifies a giant hole in this approach. If a browser supports the appropriate API's but fails to load a JS file, the content is hidden, but the script that would allow a user to manipulate and view it isn't there.

I've encountered this countless times, especially on mobile devices where things just time out because they take too long. Not being able to view the content you want is a terribly frustrating user experience&mdash;one far worse than a momentary flash of unstyled content.

<a href="http://jakearchibald.com/2013/progressive-enhancement-still-important/">As Jake Archibald says</a>:

<blockquote>
  Progressive enhancement has never been about users who've turned JavaScript off, or least it wasn't for me... Basically, when an elevator fails, it's useless. When an escalator fails, it becomes stairs. We should be building escalators, not elevators.
</blockquote>

<h2>On Building Escalators</h2>

Unfotunately, it feels like progressive ehancement and FOUC are a bit at odds with each other. You <em>could</em> just load all of your scripts in the <code>&lt;head&gt;</code>, but then your left with flashes of <em>no</em> content, which is even worse.

For now, I plan on updating all of my scripts to run the feature test as part of the JS file itself. It will introduce some FOUC, but if the file doesn't download, users can still access the content. If anyone can come up with a better solution&mdash;one that removes FOUC and ensures users always have access to the content&mdash;let me know!