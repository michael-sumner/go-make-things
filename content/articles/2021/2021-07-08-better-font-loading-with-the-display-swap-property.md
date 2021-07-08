---
title: "Better font loading with the font-display:swap property"
date: 2021-07-08T10:30:00-04:00
draft: false
categories:
- Accessibility
- Code
- CSS
- Design and UX
- HTML
- JavaScript
- Web Performance
---

About a year ago, I wrote about [how I use the `fonts.load()` method to prevent _FOIT, flashes of invisible text_](/preventing-foit-with-web-fonts-using-the-vanilla-js-fonts.load-method/), on my sites.

> In many browsers, if a custom web font (as in, a font that’s not already on your computer) is declared but hasn’t finished downloading and parsing yet, browsers will leave space for the text but not render it until the file is ready...
>
> This can result in a big gap between when your content is ready and when it can actually be read by your visitors.

I recently switched from using the `fonts.load()` method to a CSS-only approach that's simpler and often even more performant. Let's dig in!

## The `font-display: swap` property

The CSS to load the custom typefaces on my site looks like this.

```css
@font-face {
  font-display: swap;
  font-family: 'PT Sans';
  font-style: normal;
  font-weight: 400;
  src: local('PT Sans'), local('PTSerif-Regular'), url('path/to/my/fonts/pt-sans-regular.woff2') format('woff2'), url('path/to/my/fonts/pt-sans-regular.woff') format('woff');
}

/* The rest of the declarations look similar... */
```

There are two main _phases_ or _periods_ in a font's loading process:

1. **Block Phase.** If the font isn't loaded yet, show invisible text.
2. **Swap Phase.** If the font isn't loaded yet, use a fallback font until it's ready.


The `font-display` property tells the browser what to do with a particular font file and how to display it. It has five values:

- `auto` - The browser uses the default behavior.
- `block` - Short block phase, infinite swap phase.
- `swap` - Extremely small block phase, infinite swap phase.
- `fallback` - Extremely small block phase, short swap phase.
- `optional` - Extremely small block phase, no swap phase.

A value of `auto` is the same as omitting the `font-display` property altogether.

The `block` and `swap` values will show a fallback font until custom typeface is ready. Of the two, `swap` is preferable, because it results in a shorter FOIT period.

With a value of `fallback`, if the font takes too long to load, it may never get displayed as the browser will just keep using the fallback font. And a value of `optional` only shows the custom font if its available right away.

## How to use this with your fonts

If you're [self-hosting your own web fonts](/how-to-self-host-google-fonts/), you can just add `font-display: swap` to the `@font-face` declaration like my example above.

If you're using Google's Web Font CDN, you can add `display=swap` to the URL query string (which is the default behavior their now). Here's an example.

```html
<link href="https://fonts.googleapis.com/css2?family=PT+Sans:ital,wght@0,400;0,700;1,400;1,700&display=swap" rel="stylesheet">
```

Either way, in your stylesheet, you can then declare your font-family just like you normally would. Here's mine.

```css
body {
	font-family: "PT Sans", sans-serif;
}
```

In this case, my site shows PT Sans immediately if it's available.

If not, it falls back to the system sans-serif font, and then switches over to PT Sans as soon as its available.

## What if you use a CDN that doesn't support `font-display: swap`?

Not all CDNs support the `font-display: swap` property.

If that's the case for you, [the `fonts.loaded()` method](/preventing-foit-with-web-fonts-using-the-vanilla-js-fonts.load-method/) is still a fantastic option that will create a better experience for your users.