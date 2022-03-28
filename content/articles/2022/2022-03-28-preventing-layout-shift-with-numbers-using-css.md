---
title: Preventing layout shift with numbers using CSS
date: 2022-03-28T10:30:00-04:00
draft: false
categories:
- Code
- CSS
- Design and UX
- HTML
---

Today, I wanted to share [a quick tip I just learned from Henry Desroches](https://mobile.twitter.com/xdesro/status/1508172487347036169) on how to prevent the layout shift that occurs with numbers that have different widths.

Let's dig in!

## An example

Imagine you have a counter app you can use to increase a number from 0 to 5, and display it in the UI. The HTML, looks like this.

```html
<button data-count="down">Decrease</button>

<span class="count" aria-live="polite">
	0/5
</div>

<button data-count="up">Increase</button>
```

Whenever someone clicks one of the `[data-count]` buttons, you increase or decrease the count by `1`, and update what's displayed in the UI.

```js
let count = document.querySelector('.count');
let total = 0;

// Listen for click events
document.addEventListener('click', function (event) {

	// Only run on [data-count] buttons
	let direction = event.target.getAttribute('data-count');
	if (!direction) return;

	// If counting up and total is less than 5, increase the count
	if (direction === 'up' && total < 5) {
		total++;
		count.textContent = `${total}/5`;
		return;
	}

	// If counting down and total is greater than 0, decrease count
	if (direction === 'down' && total > 0) {
		total--;
		count.textContent = `${total}/5`;
	}

});
```

[Here's a demo.](https://codepen.io/cferdinandi/pen/eYyWPjW)

Notice how as the number jumps from `0` to `1`, the _Increase_ button shifts left, because `1` is narrower than `0`. Then, as you increase from `1` to `2`, it shifts right again, because `2` through `5` are wider.

Let's fix that!

## The `font-variant-numeric: tabular-nums` property

The `font-variant-numeric: tabular-nums` CSS property is an Open Type feature that tells the browser to render numbers with a consistent width.

It's not available in all fonts, but for those that support it, it prevents that layout shift from happening.

```css
.count {
	font-variant-numeric: tabular-nums;
}
```

[Here's an updated demo.](https://codepen.io/cferdinandi/pen/ZEvKmWv) Now, there's no more layout shift as the numbers increase and decrease.

If you want to learn more about other Open Type features, [my friend Jason Pamental goes into a lot of detail on over at Responsive Web Typography](https://rwt.io/typography-tips/facts-about-figures-numeric-styles-opentype-features).