---
title: Build things that work, even when parts of it break
date: 2023-02-14T10:30:00-04:00
draft: false
categories:
- Accessibility
- Code
- CSS
- Design and UX
- HTML
- JavaScript
- Web Performance
---

Yesterday, I wrote about how [web development can literally kill people](/web-development-can-literally-kill-people/). At the end of the article, I wrote...

> Build things that work, even when parts of it break.

A reader wrote in to ask how you actually do that, so that's what we're going to talk about today.

Let's dig in!

## Fault tolerance

Years ago, I saw a talk from [Jeremy Keith at Artifact Conf](https://artifactconf.com/) where he talked about building _fault tolerance_ into the web.

Jeremy discussed the importance of building things in layers, with the minimum viable functionality built on the most reliable part of the stack possible. Then, you layer in additional functionality as its supported.

If the most advanced stuff fails, the basic version still works.

In web development, we call this _progressive enhancement_.

## Start with HTML

A few weeks ago, I mentioned that [my best advice to new developers is to start with HTML](/html-first/).

One of the nice things about this approach is that HTML usually provides a good baseline experience, without the need for CSS or JavaScript at all. If you pick the right element for the job, other things failing doesn't matter at all.

Let's look at some examples.

- **Forms.** Most modern forms use JavaScript to submit data, then show a success/error message, without reloading the page. No JS? No form. But you can setup your form to send data to a server/backend with a full page reload, then _enhance it_ with JavaScript to use Ajax.
- **Accordions.** You can create a simple show/hide disclosure component using the `details` and `summary` elements, and [_enhance it_ into an accordion with a few lines of vanilla JS](/creating-a-progressively-enhanced-accordion-with-the-details-and-summary-elements-and-11-lines-of-javascript/).
- **Hamburger Navigation Menus.** Instead of a hidden-by-default menu that only works if JavaScript loads, you can start with an anchor link in the header and an always-visible-in-the-footer list of links. If JavaScript works, you can [_enhance it_ into a hidden menu that expands/collapses or slides in when the link is clicked](/how-to-progressively-enhance-a-nav-menu/).
- **Fallback/Loading Content.** If you’re pulling data in from an API, you can provide alternative content while you’re waiting for it to load. For example, if you get and display a list of repos from a GitHub account, you can start with a link to the account, and replace it once (or if) the API data loads.
- **Scrolling Animations.** Sometimes you can skip JavaScript altogether. [The CSS `scroll-behavior` property lets you animate scrolling to anchor links.](https://gomakethings.com/smooth-scrolling-links-with-only-css/)

## Progressive enhancement is for everyone

Progressive enhancement doesn't have to be more work.

Often, it's as simple as choosing a more approach set of HTML elements or a more resilient approach than what you would do instead. It's actually _less work_ a shocking large amount of the time!

It's not just for people who turn off JavaScript. 

Sometimes JavaScript fails to load, or loads really slowly (because files are large or connections are slow). Sometimes, it fails because you wrote a bug. 

It's not just for older browsers. 

New browsers have issues, too. Even in evergreen browsers, new features are not evenly or universally implemented.

It's not a fringe things.

Big companies use progressive enhancement&mdash;[most notably, GitHub](/no-js-no-problem/).

> With JavaScript disabled, you’re still able to log in, comment on issues and pull requests (although our rich markdown toolbar won’t work), browse source code (with syntax highlighting), search for repositories, and even star, watch, or fork them. Popover menus even work, thanks to the clever use of the HTML `<details>` element.

Build things that work, even when parts of them break.