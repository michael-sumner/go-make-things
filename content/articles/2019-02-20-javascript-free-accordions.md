---
title: "JavaScript-free accordions"
date: 2019-02-20T10:30:00-05:00
draft: false
categories:
- Accessibility
- Code
- CSS
- HTML
- JavaScript
- Web Performance
---

Yesterday, one of my students tipped me off to the `details` and `summary` elements, which can be used to create accordions without JavaScript.

```html
<details>
	<summary>Overview</summary>
	<ol>
		<li>Cash on hand: $500.00</li>
		<li>Current invoice: $75.30</li>
		<li>Due date: 5/6/19</li>
	</ol>
</details>
```

[Here's what it looks like in action.](https://codepen.io/cferdinandi/pen/BMEjpL)

<p class="codepen" data-height="265" data-theme-id="0" data-default-tab="result" data-user="cferdinandi" data-slug-hash="BMEjpL" style="height: 265px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid black; margin: 1em 0; padding: 1em;" data-pen-title="Disclosure Element"></p>

If you want the element to be open, you can add the `open` attribute to the `details` element.

```html
<details open>
	<summary>Overview</summary>
	<ol>
		<li>Cash on hand: $500.00</li>
		<li>Current invoice: $75.30</li>
		<li>Due date: 5/6/19</li>
	</ol>
</details>
```

Styling these elements is pretty straightforward, except for the expand/collapse triangle. [My buddy Scott O'Hara also wrote about this technique](https://www.scottohara.me/blog/2018/09/03/details-and-summary.html), and shared some useful styling tips.

```css
/**
 * 1. Styling for Firefox and other non-webkit/blink browsers
 * 2. Styling for webkit and blink
 */
summary, /* 1 */
summary::-webkit-details-marker { /* 2 */
	list-style-image: url('');
}
```

My student was lamenting that this element has no support in IE or Edge. This strikes me as the perfect type of thing to progressively enhance.

Older browsers will treat those elements like `div`'s and leave the content visible and expanded, while supporting browsers get the enhanced accordion functionality.

Edge is moving to webkit, and will therefore add support this in the future. [There's also a polyfill.](https://github.com/javan/details-element-polyfill)

Scott also looked at [how screen readers handle these elements](https://www.scottohara.me/blog/2018/09/03/details-and-summary.html) (tl;dr: quite well), and is worth a read.