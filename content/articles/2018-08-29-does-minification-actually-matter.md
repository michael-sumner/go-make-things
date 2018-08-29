---
title: "Does minification actually matter?"
date: 2018-08-29T10:30:00-04:00
draft: false
categories:
- Code
- JavaScript
- Web Performance
---

_**tl;dr:** yes._<br>
_**The longer version:** it's nuanced._

Last week, [Kyle Simpson (aka Getify) tweeted](https://twitter.com/getify/status/1032857003675340800):

> confession: i don't minify js. gzip is enough.

Kyle and I had [a little bit of a conversation](https://twitter.com/ChrisFerdinandi/status/1032995871556857856) around why he feels that way.

> **Me:** I'm 100% with you on source maps. And that gzipping does way more heavy lifting than minification.
>
> BUT... if your code has ample white space and lengthy comments, minification can still make a meaningful difference.
>
> **Kyle:** the way gzip works, i don't think the amount of whitespace (or not) has any measurable impact. gzip collapses all that whitespace to very small amounts of info.
>
> i've tested this in the past... take a 25k file (with whitespace), and gzip it. then take that same file and simply strip all whitespace (but not minification), and gzip again. the two result files will be very close in size.

And so, I decided to test this for myself.

## The test

I have gzip enabled on my server.

I uploaded two versions of [my Smooth Scroll plugin](https://github.com/cferdinandi/smooth-scroll): an [unminified file](https://gomakethings.com/_test/smooth-scroll.polyfills.js) and a [minified file](https://gomakethings.com/_test/smooth-scroll.polyfills.min.js). Then, I opened them up in a browser with the network tab in developer tools open.

Here's the result.

|                | no gzip | gzip  | Δ      |
|----------------|---------|-------|--------|
| **unminified** | 21.5kb  | 6.6kb | 14.9kb |
| **minified**   | 6.4kb   | 2.8kb | 3.6kb  |
| **Δ**          | 15.1kb  | 3.8kb | 17.9kb |

So... interesting stuff!

In my case, minification actually had *more* of an impact than gzipping did. My server has gzip set to the default value of 6. Kyle uses a more aggressive compression level of 9 (the highest you can go), so his results may be better than mine.

Of course, the best result comes from minifying *and* gzipping.

## Some thoughts

I showed this data to Kyle. [His take on the whole thing:](https://twitter.com/getify/status/1033078184303120386)

> cool. that's like one http packet... so i don't think it will have much impact... but maybe some.

And that's kind of an interesting way to think about it.

A typical HTTP request includes about 14kb of data, so any difference smaller than that probably won't have a big impact.

**Or will it?**

For users on high speed connections, probably not. For folks on bad connections, it might. That 3.8kb could be the difference between one HTTP trip or two. It's a little bit more data sent with every page load.

For folks in developing areas where every byte matters, every byte has a significant and real monetary cost, 3kb is significant.

In this case, the minified version is a scant 3.8kb smaller. But it's also less than half the size of the unminified version after gzipping. On a larger or more JS-dependent project, that can make a *huge* difference.

**My takeaway from this:** always gzip, always minify.