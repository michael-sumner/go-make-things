---
title: When do you use a JavaScript library instead of writing your own code?
date: 2022-10-28T10:30:00-04:00
draft: false
categories:
- Code
- JavaScript
---

In my article on [myths about vanilla JS](/myths-about-vanilla-javascript/), I mentioned that vanilla JS _doesn't_ mean you always write everything from scratch yourself...

> I use helper functions and small libraries all the time. A lot of very talented people have done a lot of great work to make the web faster, safer, and easier to build. Stand on their shoulders!

One common question I get whenever I say that is...

> So... when do you choose to use a library? And which libraries do you use?

I tend to reach for libraries for things that are complicated or involve a lot of moving parts. 

For me, that often means "media and animation stuff" like interactive image galleries. I use [PhotoSwipe](https://photoswipe.com/) for that. It also means security stuff like data sanitization. I use [DOMPurify](https://github.com/cure53/DOMPurify) for that. And it means complicated math stuff like currencies. I use [Dinero.js](https://dinerojs.com/) for that.

And if I wrote my own code, but I think it's something I might reuse on other projects, I'll often make it into a library that can be easily customized through options and settings.

I maintain a list of libraries that I use and enjoy over at [the Vanilla JS Toolkit](https://vanillajstoolkit.com).