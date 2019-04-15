---
title: "Creating unstyled lists"
date: 2019-04-11T10:30:00-04:00
draft: false
categories:
- Accessibility
- Code
- CSS
- Design and UX
- HTML
---

Today, I wanted to pivot away from JavaScript a quick minute and share how I create simple unstyled lists with CSS.

Let's say you have a list of wizards, and want them to display without any bullet points or numbers. We'll give it a class of `.list-unstyled`.

```html
<ul class="list-unstyled">
	<li>Neville</li>
	<li>Hermione</li>
	<li>Harry Potter</li>
	<li>Dumbledore</li>
</ul>
```

## Removing the base styles

First, we'll need to remove the `list-style` from our list.

```css
.list-unstyled {
	list-style: none;
}
```

We also want to remove any margin or padding from the left side of the list.

```css
.list-unstyled {
	list-style: none;
	margin-left: 0;
	padding-left: 0;
}
```

[Here's a demo.](https://codepen.io/cferdinandi/pen/MRwRvw)

<p class="codepen" data-height="265" data-theme-id="0" data-default-tab="css,result" data-user="cferdinandi" data-slug-hash="MRwRvw" style="height: 265px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid black; margin: 1em 0; padding: 1em;" data-pen-title="Unstyled Lists"></p>

## Fixing Semantics

There's a "bug" in webkit ([first discovered by Gerard Cohen](https://unfetteredthoughts.net/2017/09/26/voiceover-and-list-style-type-none/)) that affects semantics for lists styled this way, however. [Scott O'Hara explains:](https://www.scottohara.me/blog/2019/01/12/lists-and-safari.html)

> "This was a purposeful change due to rampant “list”-itis by web developers. … Basically, if you remove all default visible indication of the list, there is no indication to a sighted user or screen reader user that the content is a list. If you want to override this heuristic for accessibility, you can always add an explicit ARIA role=”list”"
>
> I can understand this reasoning. Semantics are hard and people do misuse HTML kinda a lot. The issue that can arise though are legitimate scenarios where one might want to remove the default styling of a list, but retain its semantics. Especially if that list is restyled in a way where it still visually looks like a list.

Scott offers a fix.

By adding content before each list item and moving it off screen, you can force the correct semantics back into the list.

```css
/**
 * @bugfix Prevent webkit from removing list semantics
 * https://www.scottohara.me/blog/2019/01/12/lists-and-safari.html
 * 1. Add a non-breaking space
 * 2. Make sure it doesn't mess up the DOM flow
 */
.list-unstyled > li:before {
	content: "\200B"; /* 1 */
	position: absolute; /* 2 */
}
```