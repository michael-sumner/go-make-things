---
title: "A simple CSS trick for catching inaccessible images"
date: 2018-07-30T10:30:00-04:00
draft: false
categories:
- Accessibility
- Code
- CSS
- HTML
---

Last week, [Juan Herrera tweeted this simple trick for catching inaccessible images in your HTML](https://twitter.com/jdjuan/status/1022301088651853824?s=21).

```css
/**
 * Easily find images without an alt tag
 * source: https://twitter.com/jdjuan/status/1022301088651853824?s=21
 */
img:not([alt]) {
	filter: grayscale(100%);
}
```

[Here it is in action.](https://codepen.io/cferdinandi/pen/wxpqYO)

## What does this do, exactly?

It finds any images that don't have an `alt` attribute on them (`img:not([alt])`), and sets them to grayscale. You could alternatively make them really dark, if you use a lot of black and white images on your site.

```css
/**
 * Easily find images without an alt tag
 * source: https://twitter.com/jdjuan/status/1022301088651853824?s=21
 */
img:not([alt]) {
	filter: grayscale(100%) brightness(40%);
}
```

And in case you were wondering, yes, you *always* need an `alt` attribute.

## Are there any exceptions or edge cases?

Sort of.

First, a decorative image that doesn't add anything at all to the content. An example that jumps to mind is a hero image behind some text and calls to action.

```html
<div class="hero">
	<!-- This image might be purely decorative -->
	<img class="hero-img" src="/some-image.jpg">
	<h1>Buy our awesome product today!</h1>
	<p>It's 100% guaranteed awesome or your money back!</p>
	<p><a href="/purchase">Buy it now!</a></p>
</div>
```

The second is images with a caption that describes it, making `alt` text redundant.

In this example, the caption describes the image and if you had `alt` text, people using screen readers would get the same info twice.

```html
<figure>
	<img src="/a-crab.jpg">
	<caption>A picture of an adorable hermit crab.</caption>
</figure>
```

**You still need an `alt` attribute for both of these examples.** You just don't need actual `alt` text.

What do I mean? You want to include an empty `alt` attribute.

```html
<figure>
	<img alt="" src="/a-crab.jpg">
	<caption>A picture of an adorable hermit crab.</caption>
</figure>
```

If you don't use one... I'm actually not sure what happens. I've done a lot of Googling and can't seem to find a clear answer on this one.

All accessibility experts agree they should *always* be uses, but no one seems to be able to share what happens if they're not.