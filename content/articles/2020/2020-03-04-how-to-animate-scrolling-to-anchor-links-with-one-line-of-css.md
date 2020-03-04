---
title: "How to animate scrolling to anchor links with one line of CSS"
date: 2020-03-04T10:30:00-05:00
draft: false
categories:
- Accessibility
- Code
- CSS
- Design and UX
---

This week, we've been looking at how to use modern CSS to do things that used to require a bunch of custom JavaScript.

On Monday, we learned [how to make a sticky header with the `position: sticky` property](/how-to-create-a-sticky-navigation-with-only-css/). And yesterday, we looked at [how to prevent anchor links from scrolling behind it with the `scroll-margin-top` property](/how-to-prevent-anchor-links-from-scrolling-behind-a-sticky-header-with-one-line-of-css/).

Today, we're going to learn how to animate scrolling to anchor links with one line of CSS.

## The `scroll-behavior` property

The `scroll-behavior` property tells the browser how to handle scrolling to anchor links within an element.

The default value, `auto`, does a hard jump like you're used to. A value of `scroll` tells the browser to animate scrolling. There's no way to specify easing, but it ties into the browser's refresh rate to give you silky smooth animations.

```css
/**
 * Enable smooth scrolling on the whole document
 */
html {
	scroll-behavior: smooth;
}
```

**[Here's a demo.](https://codepen.io/cferdinandi/pen/MWwvPJZ)**

I typically enable it on the whole `html` document, but you can restrict it to specific elements if you want.

```css
/**
 * Enable smooth scrolling on the #be-cool element
 */
#be-cool {
	scroll-behavior: smooth;
}
```

## Accessibility concerns

Animations can cause issues for users who suffer from motion sickness and other conditions.

Fortunately, Windows, macOs, iOS, and Android all provide a way for users to specify that they prefer reduced motion. And all modern browsers (but not IE) provide a way to check for that setting in both CSS and JavaScript.

When using `scroll-behavior`, you should add a `@media` check for `preders-reduced-motion: reduce`, and revert to the default `auto`.

```css
/**
 * Disable smooth scrolling when users have prefers-reduced-motion enabled
 */
@media screen and (prefers-reduced-motion: reduce) {
	html {
		scroll-behavior: auto;
	}
}
```

This prevents animated scrolling when users have specified that they'd prefer reduced motion.

## Browser support

The `scroll-behavior` property works in most modern browsers. It does *not* work in Safari or mobile Safari. It also has no IE support.

This is a great progressively-enhanced feature, though.