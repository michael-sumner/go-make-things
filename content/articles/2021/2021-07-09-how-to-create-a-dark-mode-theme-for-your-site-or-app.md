---
title: "How to create a dark mode theme for your site or app"
date: 2021-07-09T10:30:00-04:00
draft: false
categories:
- Accessibility
- Code
- CSS
- Design and UX
- HTML
---

Last week, I released an updated dark mode for all of my websites that's a bit more subtle and "on brand."

Instead of an almost-black background with white text, it now uses a palette of dark blues, with lighter shades of existing colors for things like buttons, links, and code highlighting.

Today, I wanted to quickly show you how you can build your own dark mode theme. Let's dig in!

## Enabling dark mode

Back in 2019, I shared [my preferred way to toggle dark mode on or off](/easy-dark-mode-for-your-website-or-web-app/): using a visitor's OS settings.

CSS provides a media query you can use to detect if the user has dark mode enabled on their operating system, and update your styling to match.

```css
/**
 * Default styles
 */
body {
	color: #272727;
}

/**
 * If dark mode is enabled, do this instead
 */
@media (prefers-color-scheme: dark) {
	body {
		background-color: #272727;
		color: #ffffff;
	}
}
```

So, that's how you _implement_ a dark mode. But how do you actually create a theme?

## How to create a dark mode theme

I wanted my dark mode theme to stylistically match my regular theme.

I started by choosing a very dark color from my palette&mdash;in my case, a dark blue hover color for one of my button styles&mdash;as the background color.

Next, I dropped it into [the WebAIM contrast checker](https://webaim.org/resources/contrastchecker/) as a background color, used white for the text (`#ffffff`), and adjusted the lightness/darkness of a the background a little until it provided more "pop" or contrast for the white text foreground.

I wanted it dark enough that reading is easy, but not so dark that it looks black on a dim screen. I also wanted to maintain WCAG AAA passing contrast in all categories.

Then, I repeated that process for things like buttons, link colors, and syntax highlighting. I'd add each color as the foreground against my blue background, and then adjust the lightness until it passed.

And that was basically it.