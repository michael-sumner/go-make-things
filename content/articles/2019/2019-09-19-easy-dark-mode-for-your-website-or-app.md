---
title: "Easy dark mode for your website or web app"
date: 2019-09-19T10:30:00-04:00
draft: false
categories:
- Accessibility
- Code
- CSS
- Design and UX
- HTML
---

Last week, I added a dark mode to [Go Make Things](https://gomakethings.com/), the [Vanilla JS Toolkit](https://vanillajstoolkit.com/), and the [Lean Web](https://leanweb.dev/).

Today, I want to show you how I did it.

## How dark mode works

Every now and then, you see a site with an option to toggle dark mode on or off. Twitter comes to mind.

Based on the presence of a `.dark-mode` class on the `document`, the styles in the stylesheet will change.

```css
body {
	color: #272727;
}

.dark-mode body {
	background-color: #272727;
	color: #ffffff;
}
```

That approach requires you to...

1. Setup a toggle of some sort&mdash;a checkbox, radio buttons, a dropdown or a select menu.
2. Detect changes to the setting, and add a class to the `document` element.
3. Save the user's preference in `localStorage`.
4. On page load, check for the user's preference in `localStorage` and preload the dark mode class onto the `document`.

I am in many ways a lazy developer, and wanted something a bit more automated.

I like the way many apps will automatically detect if you have *Dark Mode* enabled in your OS and change their color scheme accordingly. Chrome and Firefox do this. Microsoft's To Do app does it. All of Apple's apps do it, too.

## Automatic dark mode

The general approach to automatically turning dark mode on or off based on the user's OS preferences is basically the same.

But instead of using a class, we can use a media query: `prefers-color-scheme: dark`.

```css
body {
	color: #272727;
}

@media (prefers-color-scheme: dark) {
	body {
		background-color: #272727;
		color: #ffffff;
	}
}
```

And that's it. No JavaScript required!

[Here's a demo you can try out on CodePen.](https://codepen.io/cferdinandi/pen/jONQEvr)