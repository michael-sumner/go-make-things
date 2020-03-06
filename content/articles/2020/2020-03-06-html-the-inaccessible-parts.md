---
title: "HTML: the inaccessible parts"
date: 2020-03-06T10:30:00-05:00
draft: false
categories:
- Accessibility
- Code
- CSS
- HTML
- JavaScript
---

This week, we've been looking at CSS properties and HTML elements that replace what used to require lots of JavaScript to build.

I thought it was fitting, then, to close out the week with some of the ways that we're still not quite there yet. I recently came across two articles that do a great job of summing up the state of things.

First up is Dave Ruperts [HTML: The Inaccessible Parts](https://daverupert.com/2020/02/html-the-inaccessible-parts/).

> I’ve always abided in the idea that “HTML is accessible by default and then we come along and mess it up.” In a lot places this is very true and by just using a suitable HTML element instead of a generic div or span we can have a big Accessibility impact.
>
> But that’s not always the case. There are some cases where even using plain ol’ HTML causes accessibility problems. I get frustrated and want to quit web development whenever I read about these types of issues. Because if browsers can’t get this right, what hope is there for the rest of us. I’m trying to do the best I can, use the platform, but seems like there’s a dozen “gotchas” lurking in the shadows.

Dave goes on to summarize the many accessibility issues that exist with various HTML elements and properties.

Next up is Hidde de Vries's [More accessible defaults, please!](https://hiddedevries.nl/en/blog/2020-03-01-more-accessible-defaults-please)

> Useful HTML elements like date inputs and `<video>` could make the web a much better place, if browser accessibility bugs in their implementations were prioritised.
>
> I like to claim ‘the web is accessible by default’, a sentence that requires nuance (see below). Yes, the web is accessible by default in many ways. The fact that websites are made of text, structured text in most cases, allows for an amount of accessibility that print never had. We can enlarge it, copy paste it, feed it to translation software, have it read out by screenreaders… this is awesome, and very helpful.
>
> But the web has become more than text, in 2020 it is a lot more than that. Websites and web apps now have videos, complex forms and clickable areas that are usually more than a couple of words to form a link. I would love to tell my clients that they can just use HTML, the language that has accessibility built in. More often, the answer is ‘it depends’, when people ask for solutions.

Hidde explores why these problems exist, and offers some thoughts on how we can fix them.

Do yourself a favor and read both of these articles this weekend.