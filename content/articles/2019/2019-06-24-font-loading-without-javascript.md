---
title: "Why use the vanilla JS FontFaceSet.load() method instead of the CSS font-display: swap property?"
date: 2019-06-24T10:30:00-04:00
draft: false
categories:
- Code
- CSS
- Design and UX
- HTML
- JavaScript
- Web Performance
---

On Friday, I wrote about [my font loading strategy using the vanilla JS `FontFaceSet.load()` method](/a-modern-font-loading-strategy-with-the-vanilla-js-fontfaceset.load-method/).

I got back a ton of emails from folks asking:

> Why would you use this approach over the CSS `font-display: swap` property?

Great question!

## How the `font-display: swap` property technique works

With this approach, you define your full font stack, including custom typefaces and system fallbacks, on a single property.

```css
body {
	font-family: "PT Serif", Georgia, serif;
}
```

In your `@font-face` declaration, you add `font-display: swap`, which tells the browser to use a system fallback until the font loads, and then swap it out for the custom one.

```css
@font-face {
	font-family: 'PT Serif';
	font-display: swap;
	src: local('PT Serif'), url(path/to/pt-serif.woff2) format('woff2');
}
```

And that's it. Browser's handle the rest.

The only third-party font repository to support this technique right now is Google Fonts. Add the `display=swap` query to the end of the font path to enable it.

## The biggest reason to *not* use this approach

For me, personally, the biggest reason is browser support.

`FontFaceSet.load()` works across a wide range of desktop and mobile browsers (with the exception of IE/Edge). When it's not supported, users get your fallback system font instead.

The `font-display: swap` property works across the same desktop browsers as `FontFaceSet.load()`, but has much worse mobile browser support. And mobile browsers are the ones hit hardest by custom fonts.

When `font-display: swap` isn't supported, users get the Flash of Invisible Text experience instead of the system font fallback.

In other words, `FontFaceSet.load()` provides more support to the users who need the approach most, and a better experience for users when it's not supported.

## Other reasons

Zach Leatherman wrote a whole article with [a whole bunch of reasons why you'd still want to use the JS solution](https://www.filamentgroup.com/lab/js-web-fonts.html) over the CSS approach.

They include:

1. Better control over repaints when loading multiple custom typefaces.
2. The ability to adapt to user preferences and bandwidth contexts.
3. Better integration with many third-party hosts.

[Go read his post](https://www.filamentgroup.com/lab/js-web-fonts.html) for all of the awesome details.