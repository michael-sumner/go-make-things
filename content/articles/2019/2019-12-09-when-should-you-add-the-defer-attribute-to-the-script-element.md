---
title: "When should you add the defer attribute to the script element?"
date: 2019-12-09T10:30:00-05:00
draft: false
categories:
- Code
- HTML
- JavaScript
- Web Performance
---

Last week, I wrote how [you probably don't need a DOMContentLoaded event](/you-probably-dont-need-a-domcontentloaded-event-in-your-javascript/) in your JavaScript.

> The thing is… if you’re going to wait until the DOM is loaded before running the script, why not just put it in the footer in the first place?
>
> JavaScript in the header can also cause massive bottlenecks and rendering delays, so moving your script to the footer is better for performance, too!

In response, I had a ton of people reply back telling me that adding the `defer` attribute on a `script` element in the `head` will do the same thing *and* provide *better* performance gains.

```html
<script defer src="path/to/my/script"></script>
```

I was a bit confused by this.

## How `defer` works

From what I understood, `defer` told the browser to wait until the DOM content was loaded until before downloading and parsing a script.

Turns out, I was wrong.

Many thanks to the wonderful [Katie Sylor-Miller](https://twitter.com/ksylor/status/1202978748406095873) (the creator of [Oh Shit, Git!?!](https://ohshitgit.com/)) and [Aaron Peters](https://twitter.com/aaronpeters/status/1202977667361976320) for explaining what actually happens to me.

Katie wrote...

> With defer the browser can find the script slightly sooner than the preload scanner would, and then it can prioritize/download it in parallel while the DOM is parsing.
>
> This means that the DOM can be completely parsed & domInteractive fires while the JS could still be getting downloaded, rather than waiting till after the JS comes back and gets parsed & executed.

In short: with `defer` on a script in the `head`, the JavaScript file will download in the background while the rest of the DOM is parsed and rendered. When you get to the bottom of the page, the JS file is already downloaded and ready to run.

## So when should you use `defer`?

If you have any noncritical JavaScript file, or any code that depends on the DOM being rendered to run, load it in the `head` with the `defer` attribute.

This will result in the best performance on most browsers.

That is, of course, unless your entire document is less than 14kb minified and gzipped. In that case, [you're better off inlining everything](/inlining-literally-everything-for-better-performance/).

*__Note:__ you can only use the `defer` attribute with external scripts. Do not use it with inlined JavaScript.*

## What's browser support like?

The `defer` attribute works in all modern browsers, and IE 10 and up.

If you need to support IE9, you probably *should* use the `DOMContentLoaded` event listener with your code, too.

## Learn more

[Flavio wrote a great article on this topic.](https://flaviocopes.com/javascript-async-defer/)

> When loading a script on an HTML page, you need to be careful not to harm the loading performance of the page. Depending on where and how you add your scripts to an HTML page will influence the loading time.

And the amazing [Steve Griffith put together a super helpful video on the subject](https://www.youtube.com/watch?v=OKi3MX5N2mU), too.

<div class="fluid-vids"><iframe width="560" height="315" src="https://www.youtube.com/embed/OKi3MX5N2mU" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>