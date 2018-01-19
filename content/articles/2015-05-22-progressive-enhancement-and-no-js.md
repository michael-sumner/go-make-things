---
categories:
- Code
- CSS
- Design &amp; UX
- JavaScript
date: '2015-05-22'
title: Progressive Enhancement and <code>.no-JS</code>
---

Last week, my buddy [David Putney](http://davidputney.com/) asked:

> I was reading your [blog post about progressive enhancement](/writing-your-own-simple-feature-tests/).
>
> It suggests adding a `js` style to the body tag and then keying all my js active state items to that style.
>
> In the past, I’d loaded the page with a `no-js` style on the body tag and then removed it via js. My `no-js` version was keyed to this `no-js` style.
>
> Is there a difference? It seems to work either way, but there might be something that I’m not seeing.

Great question! Here's my response (posted with David's permission, of course).

<!--more-->

## `.js` versus `.no-js`

Practically speaking, both approaches—a `.no-js` class that gets removed by your script and a `.js` class that gets added by it—achieve the same result.

The difference between the two is purely conceptual.

Because I view JavaScript as a progressive enhancement in functionality for browsers that support it, I like to write my CSS based on the assumption that it's not there, and then write "if supported" enhancement styles further in the cascade.

If the `.no-js` approach is easier for you to craft or conceptualize, by all means keep using it. The fact that you're ensuring people can still use your site without JavaScript is more important than the specific implementation.