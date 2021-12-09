---
title: Responsive iframes with the CSS aspect-ratio property
date: 2021-12-09T10:30:00-05:00
draft: false
categories:
- Code
- CSS
- Design and UX
- HTML
- JavaScript
---

Today, I want to show you can use a few lines of CSS to make your embedded iframes fully responsive. Let's dig in!

## The challenge with iframes and responsive layouts

Unlike images and the native HTML5 `video` element, iframes do not scale responsively by default.

```css
/**
 * This does NOT work
 */
iframe {
    max-width: 100%;
    height: auto;
}
```

Years back, [Dave Rupert put together a great video](https://vimeo.com/28523422) showing the challenge with responsive iframe videos.

<iframe src="https://player.vimeo.com/video/28523422?h=7755bc3e5f" width="640" height="360" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe>

## The old way to fix this

Historically, making iframes responsive required you to wrap the `iframe` in a container `div`.

```html
<div class="responsive-iframe">
	<iframe src="https://player.vimeo.com/video/28523422?h=7755bc3e5f" width="640" height="360" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe>
</div>
```

Then, you would use CSS to... 

- Position the `iframe` in the top left corner of the `div`.
- Make it `100%` of the `height` and `width` of the `div`.
- Add padding to the top of the div equal to the aspect ratio of the iframe (for HD videos, `56.25%`, or `9 / 16 * 100`).

```css
.responsive-iframe {
	max-width: 100%;
	padding-top: 56.25%;
	position: relative;
	width: 100%;
}

.responsive-iframe iframe {
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
}
```

As you can see, this is obnoxious and complicated.

Chris Coyier and Dave created [a jQuery plugin called FitVids.js](http://fitvidsjs.com/) to automate this for you. Then Todd Motto made [a vanilla JS version, FluidVids.js](https://github.com/toddmotto/fluidvids).

I used FluidVids.js for years, before switching to the manual implementation to reduce the amount of JS I was shipping.

But now, there's a better way!

## The CSS `aspect-ratio` property

The CSS `aspect-ratio` property tells browsers to preserve a specific aspect ratio on an element when scaling the size of it up or down.

We can target `iframe` elements directly with a few lines of CSS to preserve their dimensions in responsive layouts, _without_ the need for a wrapper element.

Set the `height` and `width` of the `iframe` to `100%`. Then assign an `aspect-ratio` property with a value of `width / height`. For our HD videos, we'd use `16 / 9`.

```css
iframe {
	aspect-ratio: 16 / 9;
	height: 100%;
	width: 100%;
}
```

Now, we can include `iframe` elements as-is, and they'll scale up or down with the layout.

```html
<iframe src="https://player.vimeo.com/video/28523422?h=7755bc3e5f" width="640" height="360" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe>
```

[Here's a demo on CodePen that you can play with.](https://codepen.io/cferdinandi/pen/abLZRMw)