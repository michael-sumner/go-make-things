---
title: "Should accessibility features be optional?"
date: 2019-10-30T10:30:00-04:00
draft: false
categories:
- Accessibility
- Code
- JavaScript
---

**Spoiler alert:** no, they shouldn't.

Yesterday, [Marijn Haverbeke tweeted](https://twitter.com/MarijnJH/status/1189140364214624259):

> If you make accessibility or internationalization in a code library an optional component, you just know half of the people deploying it will ignore it—out of ignorance or as optimization. So taking the side of the end user versus the dev user means just pre-bundling these things

For very similar reasons, I refuse to make accessibility features configurable in [my vanilla JS plugins](https://vanillajstoolkit.com/plugins).

For example, my [Smooth Scroll plugin](https://github.com/cferdinandi/smooth-scroll/) animates scrolling to anchor links. It has two accessibility features baked in:

1. After the scroll completes, it shifts focus to the linked element.
2. If [a user has `prefers-reduced-motions` enabled](https://css-tricks.com/revisiting-prefers-reduced-motion-the-reduced-motion-media-query/), it does a hard jump to the link instead of an animated scroll.

Both of these are intended to respect the rights of users over preferences of the developers.

And I've had developers ask me to make both of them optional. I stubbornly and dogmatically refuse, every time.

I'm sure there are some valid edge cases where focus doesn't shift. The only arguments I've heard for ignoring motion preferences are "I like it better that way" or "I want it to look consistent."

Frankly, your wants and desires don't matter. The user's do. And making something configurable for a small edge case means a bunch of people who think they know better will break an important accessibility feature.

So yea, I don't make accessibility features something you can turn off, and I don't think you should in your scripts, either.

Defaults matter.
