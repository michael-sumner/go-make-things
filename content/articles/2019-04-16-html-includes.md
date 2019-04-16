---
title: "HTML includes"
date: 2019-04-16T10:30:00-04:00
draft: false
categories:
- Code
- HTML
- JavaScript
- Web Performance
---

Yesterday, Scott Jehl from Filament Group wrote about a really interesting method for [including content from one HTML file in another](https://www.filamentgroup.com/lab/html-includes/).

> This week I was thinking about ways I might be able to achieve this using some of the new `fetch`-related markup patterns, like `rel="preload"`, or HTML imports, but I kept coming back to the same conclusion that none of these give you easy access to the contents of the fetched file. Then I thought, perhaps a good old `iframe` could be a nice primitive for the pattern, assuming the browser would allow me to retrieve the `iframe`'s contents in the parent document. As it turns out, it sure would!

Scott's approach is both brilliant and simple (and to me, brilliant *because* it's so simple).

He uses an `iframe` to embed content the old-fashioned way, but puts a snippet of inline JS on the `iframe` to move it's content into the main DOM and then remove the `iframe` element.

The best part is that if the JS fails for some reason, you can still access all of the content as an iframe.

[Check out the full details over on the Filament Group website.](https://www.filamentgroup.com/lab/html-includes/)