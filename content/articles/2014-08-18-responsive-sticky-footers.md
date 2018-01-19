---
categories:
- Code
date: '2014-08-18'
permalink: /responsive-sticky-footers/
title: Responsive sticky footers
url: /2014/08/18/responsive-sticky-footers
---

If you have footer content on a page with little body content, the footer may end up floating in the middle of the page on taller viewports.

Most of the solutions you'll find on the web require you to apply a fixed height to your footer (see [here](http://css-tricks.com/snippets/css/sticky-footer/), [here](http://ryanfait.com/resources/footer-stick-to-bottom-of-page/), and [here](http://ryanfait.com/resources/footer-stick-to-bottom-of-page/)), or apply the `display: table` property [to your content](http://timothy-long.com/responsive-sticky-footer/). Of course, if your site is responsive, the height of the footer will vary by viewport. And telling a table-less layout to behave like a table just feels wrong.

Today, I want to share my simple technique for responsive, sticky footers.

<!--more-->

## StickyFooter.js

I've written [a tiny little script](https://github.com/cferdinandi/sticky-footer) (1.5kb minified and gzipped) that automates the fixed-height footer technique without requiring you to actually have a fixed-height footer.

The markup is really simple. All you need are two simple data attributes: one for your body content, and one for your footer content.

```language-markup
<div data-sticky-wrap>
    Body content
</div>
<div data-sticky-footer>
    Footer content
</div>
```

When you load or resize a page, Sticky Footer subtracts the height of your footer from the total height of the viewport, and assigns that number as a `min-height` value to the body content. This ensures that the main content container will always be tall enough to keep the footer at the bottom of the page.

[Grab Sticky Footer on GitHub.](https://github.com/cferdinandi/sticky-footer)