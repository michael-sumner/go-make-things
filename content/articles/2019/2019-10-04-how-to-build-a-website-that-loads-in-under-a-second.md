---
title: "How to build a website that loads in under a second"
date: 2019-10-04T10:30:00-04:00
draft: false
categories:
- Code
- CSS
- HTML
- JavaScript
- Web Performance
---

I periodically have people ask me how my site is so damn fast. Today, I'm going to show you how.

## What makes a site fast (or slow)?

There are many things that contribute to how fast your site or app is.

Three things I've found have the biggest impact on both actual and *perceived* performance are:

<div class="list-spaced">
{{%md%}}
1. How fast the server responds to a request for an HTML document (aka a webpage). The faster a server starts sending stuff back after someone types in a URL, the faster the browser can start rendering that content.
2. How many HTTP roundtrips are needed to get all of the "stuff" associated with the webpage. This is literally the size of your site. The bigger it is, the more roundtrips are needed to get all of the data. Each roundtrip can contain about 14kb of data.
3. How much of the code in your webpage is render-blocking. HTML can start rendering right away. CSS parse pretty fast, but blocks rendering until it's been parsed. JavaScript is the literal worst, blocking rendering *and* taking a while to compile and parse.
{{%/md%}}
</div>

## My secret to a really fast site

Based on the items that have the biggest impacts on performance, I do the following.

<div class="list-spaced">
{{%md%}}
1. I use [DigitalOcean](https://www.digitalocean.com/) for hosting, because their SSD servers are dirt cheap and really performant. They send data back to the browser at least twice as fast as similarly priced shared hosting from other vendors. I also [use static HTML](/static-websites/) instead of a database rendered site, so the files are returned immediately.
2. I try to use mostly HTML, and minimize the amount of overall CSS and JavaScript I need. A typical page on my site includes less than 14kb of HTML, CSS, and JavaScript combined (after gzipping and minifying). Because of this, I [inline literally everything](/inlining-literally-everything-for-better-performance/). The whole webpage comes over in a single HTTP request and can immediately start rendering.
3. I put my JavaScript in the footer so that it doesn't delay rendering as the browser reads through the HTML document.
{{%/md%}}
</div>

There's not a ton of magic here. Just some basic principles based on how browsers work. You can totally do this, too!