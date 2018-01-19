---
categories:
- Code
- CSS
- JavaScript
date: '2017-12-28'
title: Testing for CSS support with vanilla JavaScript
---

In CSS, you can check if a feature is supported using the `@supports()` rule. For example, to check for FlexBox support, you'd do this:

```css
@supports (display: flex) {
	div {
		display: flex;
	}
}
```

Fortunately, there's a vanilla JavaScript way to check for support of CSS features too: `CSS.supports()`.

You pass in the property name (ex. `display`) as the first argument, and the value (ex. `flex`) as the second.

```js
if (CSS.supports('display', 'flex')) {
	// FlexBox is supported...
} else {
	// No FlexBox support...
}
```

This is useful if you want to write JavaScript enhancements/polyfills for CSS features when they're not supported.

## Browser Compatibility

This works in all modern browsers, but has no IE support (the same level of support as `@supports()` in CSS).

You should probably also check that `CSS` is supported first to avoid errors.

```js
if ('CSS' in window && CSS.supports('display', 'flex')) {
	// FlexBox is supported...
} else {
	// No FlexBox support...
}
```