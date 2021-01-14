---
title: "Using the currentColor CSS property to build extensible components"
date: 2019-11-13T10:30:00-05:00
draft: false
categories:
- Code
- CSS
- HTML
---

Today, I wanted to share a fun little CSS trick I picked up from [this awesome video from Steve Griffith](https://www.youtube.com/watch?v=DznpOT2T5AY).

<div class="fluid-vids"><iframe width="560" height="315" src="https://www.youtube.com/embed/DznpOT2T5AY" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>

In the video, Steve shares how you can use the `currentColor` CSS property to have any other property that uses a color pick up the current `color` value of the element you're styling. If no `color` is set, it inherits that value from up the DOM tree.

For example, let's say we had two callout elements.

```html
<div class="callout">
	Hi there!
</div>

<div class="callout callout-danger">
	Watch out!
</div>
```

We want the standard `.callout` to have blue text and a blue border, and the `.callout-danger` element to have red text and a red border.

You might style them like this:

```css
.callout {
	border: 1px solid #0074d9;
	color: #0074d9;
	margin-bottom: 1em;
	padding: 1em;
}

.callout-danger {
	border-color: #ff4136;
	color: #ff4136;
}
```

Instead of specifying the same color for the `border`, though, we can instead use `currentColor`.

```css
.callout {
	border: 1px solid currentColor;
	color: #0074d9;
	margin-bottom: 1em;
	padding: 1em;
}
```

Then, in our `.callout-danger` element, we can drop the `border-color` property all together because it will automatically inherit that value from the `color` property.

```css
.callout {
	border: 1px solid currentColor;
	color: #0074d9;
	margin-bottom: 1em;
	padding: 1em;
}

.callout-danger {
	color: #ff4136;
}
```

[Here's a demo on CodePen.](https://codepen.io/cferdinandi/pen/gOOdyNo)