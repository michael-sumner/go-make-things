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