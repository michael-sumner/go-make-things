---
title: "Smooth scrolling links with only CSS"
date: 2019-01-25T10:30:00-05:00
draft: false
categories:
- Accessibility
- Code
- CSS
- Design and UX
- HTML
- JavaScript
---

My most popular open source project is [Smooth Scroll](https://github.com/cferdinandi/smooth-scroll), a script that lets you animate scrolling with anchor links.

Today, I want to show you how to achieve the same effect with only CSS. I'll also talk about when and why you might want to use a JavaScript version anyways.

## Scroll Behavior

The `scroll-behavior` CSS property tells the browser how to handle scrolling triggered by anchor links and such.

The default behavior, `auto`, is the jump-to-location you're used to seeing. If you set it to `smooth`, the browser animates scrolling down the page.

If you only want this behavior inside a container, apply it to that element. Otherwise, apply it to the whole document.

```css
/**
 * Smooth scrolling inside an element
 */
#my-element {
	scroll-behavior: smooth;
}

/**
 * Smooth scrolling on the whole document
 */
html {
	scroll-behavior: smooth;
}
```

For people prone to motion sickness, this effect can be really jarring, though.

Fortunately, users in some browsers/operating systems can express their preference for reduced motion effects with the Reduce Motion API. We can listen for that setting in our CSS, and turn off smooth scrolling for them.

```css
@media screen and (prefers-reduced-motion: reduce) {
	html {
		scroll-behavior: auto;
	}
}
```

[Here's a demo.](https://codepen.io/cferdinandi/pen/LqGZrb)

## Browser Compatibility

At the time of writing this, the `scroll-behavior` property works in Chrome and Firefox, but *not* in Edge, IE, or Safari (desktop or mobile).

I'm 100% comfortable with this being a progressively enhanced feature for browsers that support it, though. It feels like a great fit for that.

## Why you might still want to use a JavaScript solution

I actually expect to use this approach more and more, my [Smooth Scroll plugin](https://github.com/cferdinandi/smooth-scroll) less and less.

However, there are times when a JS solution might still be preferable.

<div class="list-spaced">
{{%md%}}
1. I've found that, for long scrolls, the animation with `scroll-behavior` can be janky. This is surprising. I would have expected the CSS to tie into the browser's frame refresh rate to prevent that from happening.
2. The `scroll-behavior` property has no easing or timing support. If you want to control how fast the animation runs, or the easing pattern in which it animates, you need JavaScript.
3. You always want to it work across browsers. A JavaScript solution can get you more broad browser support.
{{%/md%}}
</div>

Smooth Scroll uses the `requestAnimationFrame()` method to animate on refresh-rates and avoid jank, and gives you control over easing and timing. It also works back to IE9.

Despite its limitations, the `scroll-behavior` property is a great solution for a lot of projects.