---
categories:
- Code
- JavaScript
date: '2017-12-22'
title: Scroll-based storytelling
---

Just a quick shoutout to [Scrollama](https://github.com/russellgoldenberg/scrollama), an MIT-licensed open source vanilla JS plugin (did I hit all the buzzwords?) for scroll-based storytelling.

Scrollama uses intersection observers to detect when points on a page enter and leave, and makes it easy to change content, trigger animations, and more. Here are some examples: [basic](https://russellgoldenberg.github.io/scrollama/basic/), [progress](https://russellgoldenberg.github.io/scrollama/progress/), and [sticky](https://russellgoldenberg.github.io/scrollama/sticky-css/).

## Why do I like it?

1. It's vanilla.
2. It provides old-school `<script>` tag instructions in addition to newer module-based loading techniques.
3. It has some helpful demos and samples for getting started.
4. It provides an API you can build on top of.

## Browser Compatibility

Intersection observer doesn't have great browser support yet.

It only works in the newest versions of most browsers, and has no IE support at all. Fortunately, Scrollama includes [an Intersection Observer polyfill](https://github.com/w3c/IntersectionObserver/tree/master/polyfill) by default.

[Check it out on GitHub!](https://github.com/russellgoldenberg/scrollama)