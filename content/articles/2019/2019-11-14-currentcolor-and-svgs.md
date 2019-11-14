---
title: "currentColor and SVGs"
date: 2019-11-14T10:30:00-05:00
draft: false
categories:
- Code
- CSS
- Design and UX
- HTML
---

Yesterday, we looked at [how to use the `currentColor` property to build extensible components](/using-the-currentcolor-css-property-to-build-extensible-components/).

I got a lot of emails mentioning how awesome this CSS property is with SVGs, too. Let's dig in.

## SVGs and fill color

So, let's say you've got an SVG icon that you want to color match to the rest of the text. For example, here's an SVG of a tree (<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 17 17"><path d="M14.755 14.006l-2.536-3.381H13.283a.531.531 0 0 0 .41-.869l-2.536-3.381h1.063a.532.532 0 0 0 .415-.863L8.385.199a.53.53 0 0 0-.83 0l-4.25 5.313a.531.531 0 0 0 .415.863h1.063l-2.55 3.4a.53.53 0 0 0 .425.85h1.063l-2.55 3.4a.53.53 0 0 0 .425.85h4.781v1.594c0 .293.238.531.531.531h2.125a.531.531 0 0 0 .531-.531v-1.594h4.782a.531.531 0 0 0 .41-.869z"/></svg>).

```html
<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 17 17">
	<path d="M14.755 14.006l-2.536-3.381H13.283a.531.531 0 0 0 .41-.869l-2.536-3.381h1.063a.532.532 0 0 0 .415-.863L8.385.199a.53.53 0 0 0-.83 0l-4.25 5.313a.531.531 0 0 0 .415.863h1.063l-2.55 3.4a.53.53 0 0 0 .425.85h1.063l-2.55 3.4a.53.53 0 0 0 .425.85h4.781v1.594c0 .293.238.531.531.531h2.125a.531.531 0 0 0 .531-.531v-1.594h4.782a.531.531 0 0 0 .41-.869z"/>
</svg>
```

If you don't specific a `fill` or `stroke` on your SVG, it defaults to `#000000`, or black.

The current text color on my site is a dark charcoal, `#272727`. If I wanted my SVG icon to match that, I could assign it a `fill` color on the `path`: <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 17 17"><path fill="#272727" d="M14.755 14.006l-2.536-3.381H13.283a.531.531 0 0 0 .41-.869l-2.536-3.381h1.063a.532.532 0 0 0 .415-.863L8.385.199a.53.53 0 0 0-.83 0l-4.25 5.313a.531.531 0 0 0 .415.863h1.063l-2.55 3.4a.53.53 0 0 0 .425.85h1.063l-2.55 3.4a.53.53 0 0 0 .425.85h4.781v1.594c0 .293.238.531.531.531h2.125a.531.531 0 0 0 .531-.531v-1.594h4.782a.531.531 0 0 0 .41-.869z"/></svg>.

```html
<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 17 17">
	<path fill="#272727" d="M14.755 14.006l-2.536-3.381H13.283a.531.531 0 0 0 .41-.869l-2.536-3.381h1.063a.532.532 0 0 0 .415-.863L8.385.199a.53.53 0 0 0-.83 0l-4.25 5.313a.531.531 0 0 0 .415.863h1.063l-2.55 3.4a.53.53 0 0 0 .425.85h1.063l-2.55 3.4a.53.53 0 0 0 .425.85h4.781v1.594c0 .293.238.531.531.531h2.125a.531.531 0 0 0 .531-.531v-1.594h4.782a.531.531 0 0 0 .41-.869z"/>
</svg>
```

## Dynamic SVG colors

That approach works fine, but... what if I wanted to include my SVG icon in a link?

My links have a color of `#0088cc`. Let's update the `fill` color to match.

[<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 17 17"><path fill="#0088cc" d="M14.755 14.006l-2.536-3.381H13.283a.531.531 0 0 0 .41-.869l-2.536-3.381h1.063a.532.532 0 0 0 .415-.863L8.385.199a.53.53 0 0 0-.83 0l-4.25 5.313a.531.531 0 0 0 .415.863h1.063l-2.55 3.4a.53.53 0 0 0 .425.85h1.063l-2.55 3.4a.53.53 0 0 0 .425.85h4.781v1.594c0 .293.238.531.531.531h2.125a.531.531 0 0 0 .531-.531v-1.594h4.782a.531.531 0 0 0 .41-.869z"/></svg> This link doesn't do anything](#)

```html
<a href="#">
	<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 17 17">
		<path fill="#0088cc" d="M14.755 14.006l-2.536-3.381H13.283a.531.531 0 0 0 .41-.869l-2.536-3.381h1.063a.532.532 0 0 0 .415-.863L8.385.199a.53.53 0 0 0-.83 0l-4.25 5.313a.531.531 0 0 0 .415.863h1.063l-2.55 3.4a.53.53 0 0 0 .425.85h1.063l-2.55 3.4a.53.53 0 0 0 .425.85h4.781v1.594c0 .293.238.531.531.531h2.125a.531.531 0 0 0 .531-.531v-1.594h4.782a.531.531 0 0 0 .41-.869z"/>
	</svg>
	This link doesn't do anything
</a>
```

Now the SVG color matches the link... except when you hover. Then, it's too light.

This is where the `currentColor` property shines. We can use it for our `fill` value, and the SVG will pick up whatever the current color of the link is.

[<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 17 17"><path fill="currentColor" d="M14.755 14.006l-2.536-3.381H13.283a.531.531 0 0 0 .41-.869l-2.536-3.381h1.063a.532.532 0 0 0 .415-.863L8.385.199a.53.53 0 0 0-.83 0l-4.25 5.313a.531.531 0 0 0 .415.863h1.063l-2.55 3.4a.53.53 0 0 0 .425.85h1.063l-2.55 3.4a.53.53 0 0 0 .425.85h4.781v1.594c0 .293.238.531.531.531h2.125a.531.531 0 0 0 .531-.531v-1.594h4.782a.531.531 0 0 0 .41-.869z"/></svg> This link doesn't do anything](#)

```html
<a href="#">
	<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 17 17">
		<path fill="currentColor" d="M14.755 14.006l-2.536-3.381H13.283a.531.531 0 0 0 .41-.869l-2.536-3.381h1.063a.532.532 0 0 0 .415-.863L8.385.199a.53.53 0 0 0-.83 0l-4.25 5.313a.531.531 0 0 0 .415.863h1.063l-2.55 3.4a.53.53 0 0 0 .425.85h1.063l-2.55 3.4a.53.53 0 0 0 .425.85h4.781v1.594c0 .293.238.531.531.531h2.125a.531.531 0 0 0 .531-.531v-1.594h4.782a.531.531 0 0 0 .41-.869z"/>
	</svg>
	This link doesn't do anything
</a>
```

I love this trick, and use it constantly.

## When you *wouldn't* want to do this

The only time I don't use `currentColor` for my SVG `fill` is when the icon is supposed to have a specific color and keep it regardless of the context.

For example, with logos or graphics with a specific color palette (like the Slack logo [on my product pages](/resources)), I use a hard-coded `fill` color.