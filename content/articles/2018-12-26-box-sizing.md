---
title: "CSS and Box Sizing"
date: 2018-12-26T10:30:00-05:00
draft: false
categories:
- Code
- CSS
- HTML
---

One of the trickiest things about CSS is the relationship between paddings, margin, and the height and width of things.

One thing that *used* to drive me crazy is what happens when you set width on an element that also had padding. How wide would you expect the `#hi` element to be?

```html
<div id="hi">
	Hello there, universe! How are you today?
</div>
```

```css
#hi {
	background: #f5f5f5;
	border: 1px solid #808080;
	padding: 20px;
	width: 200px;
}
```

I obviously *want* it to be `200px`. It's actually `242px`, though.

The browser takes the `200ox` width, then adds `20px` of padding to each side, followed by `1px` on each side for the border. [Here's a demo.](https://codepen.io/cferdinandi/pen/WLOJja)

Obnoxious, right?

Fortunately, there's a quick and easy fix [courtesy of Paul Irish](https://www.paulirish.com/2012/box-sizing-border-box-ftw/).

```css
/**
 * Add box sizing to everything
 * @link http://www.paulirish.com/2012/box-sizing-border-box-ftw/
 */
*,
*:before,
*:after {
	box-sizing: border-box;
}
```

I add that to all of my style sheets. Now, the true width of the element is `200px`, with the padding and border subtracted from that total width instead of added to it.

[Here's an update demo.](https://codepen.io/cferdinandi/pen/wRejrx)

And isn't using the `*` selector bad? Paul Irish explains:

> You might get up in arms about the universal `*`` selector.
>
> Apparently you’ve heard its slow. Firstly, it’s not. It is as fast as `h1` as a selector. It can be slow when you specifically use it like `.foo > *`, so don’t do that.

Hope this makes your CSS easier to right. It's been super helpful for me!