---
title: "Automatically setting the fill for SVGs"
date: 2019-11-15T10:30:00-05:00
draft: false
categories:
- Code
- CSS
- Design and UX
- HTML
---

Yesterday, we looked at [how to use the `currentColor` property to dynamically set the color of an SVG](/currentcolor-and-svgs/).

In the article, I mentioned that if you don't specify a `fill` color on an SVG, it will default to black (`#000000`).

Reader [Johann Schopplich](https://johanns.blog/) shared this little CSS snippet that will automatically set `fill` to `currentColor` for any SVG that doesn't have a `fill` attribute (shared with permission).

```css
svg:not([fill]) {
	fill: currentColor;
}
```

Pretty neat. Thanks Johann!

**Update:**

Twitter user [1076 pointed out that this will miss nested elements in an SVG that also don't have `fill` properties](https://twitter.com/1076/status/1195414712667779072).

He recommended an addition for nested items, like this.

```css
svg:not([fill]),
svg *:not([fill]) {
	fill: currentColor;
}
```