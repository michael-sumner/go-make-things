---
title: "How to self-host Google fonts"
date: 2020-08-06T10:30:00-04:00
draft: false
categories:
- Code
- CSS
- Design and UX
- Web Performance
---

We're going to dive back in to more service worker stuff soon, but in order to do so, I first need to talk about my new approach to custom typefaces on the web.

Today, we're going to learn how to self-host Google fonts instead of serving them from the Google CDN.

## Why would you want to do this?

Two reasons:

1. It can be more performant.
2. You don't want Google tracking info on your site.

When combined with service workers, self-hosting fonts can result in dramatically faster load times than using Google's CDN. We'll look at service worker integration in a future article.

Earlier this year, I wrote about how [I removed all tracking from my website and newsletter](/i-dont-know-if-youre-reading-this/).

But the brilliant [Laura Kalbag](https://laurakalbag.com/) pointed out a vector I'd missed: Google Fonts. While the data is not as rich as you'd get from a full on analytics script, it still gives Google more information about who your visitors are.

It's minimal, but if you're more privacy focused, it's still something to be aware of.

## How to self-host Google fonts

Self-hosting involves three parts:

1. Download the font files
2. Upload them to your server
3. Load them on your site

### 1. Download the font files

First, you need to get the font files to self-host.

1. Visit the [Google Webfonts Helper](https://google-webfonts-helper.herokuapp.com/fonts/).
2. Search for your typeface.
3. Select the character sets (ex. Latin, Cyrillic) and styles/weights (ex. italic, bold) that you want.
4. Select your browser support option. I'd recommend "Modern" over "Best Support" these days.
5. Click the "Download" button to download your font files

### 2. Upload the fonts to your server

Once you have the files, you need to host them somewhere.

Upload them to your server the same way you would host your CSS or JS files. You might do this through an FTP client, a GUI (like the WordPress file uploader), or by pushing your codebase to GitHub.

Whatever your deployment process is, use it for the font files, too.

### 3. Load the font on your site

Once that's done, you need to load them in your CSS.

With Google's CDN, you would drop in a `link` to their CSS file. When self-hosting, you have to create that file yourself.

Fortunately, the Webfonts Helper provides that code for you, too. Make sure you update the path to your files to point to the correct location.

Here's what the CSS file for the fonts on my site looks like.

```css
/* pt-serif-regular - latin */
@font-face {
  font-family: 'PT Serif';
  font-style: normal;
  font-weight: 400;
  src: local('PT Serif'), local('PTSerif-Regular'), url('/fonts/pt-serif-v11-latin-regular.woff2') format('woff2'), url('/fonts/pt-serif-v11-latin-regular.woff') format('woff');
}

/* pt-serif-700 - latin */
@font-face {
  font-family: 'PT Serif';
  font-style: normal;
  font-weight: 700;
  src: local('PT Serif Bold'), local('PTSerif-Bold'), url('/fonts/pt-serif-v11-latin-700.woff2') format('woff2'), url('/fonts/pt-serif-v11-latin-700.woff') format('woff');
}

/* pt-serif-700italic - latin */
@font-face {
  font-family: 'PT Serif';
  font-style: italic;
  font-weight: 700;
  src: local('PT Serif Bold Italic'), local('PTSerif-BoldItalic'), url('/fonts/pt-serif-v11-latin-700italic.woff2') format('woff2'), url('/fonts/pt-serif-v11-latin-700italic.woff') format('woff');
}

/* pt-serif-italic - latin */
@font-face {
  font-family: 'PT Serif';
  font-style: italic;
  font-weight: 400;
  src: local('PT Serif Italic'), local('PTSerif-Italic'), url('/fonts/pt-serif-v11-latin-italic.woff2') format('woff2'), url('/fonts/pt-serif-v11-latin-italic.woff') format('woff');
}
```

Load that file (I call mine `fonts.css`) the same way you would any other CSS file on your site.

## Nice extras

To avoid a flash of invisible content, I recommend pairing this approach with [a modern font loading strategy](/a-modern-font-loading-strategy-with-the-vanilla-js-fontfaceset.load-method/) that switches over to the new typeface only after it's loaded.

You might also [load the font file asynchronously](https://www.filamentgroup.com/lab/load-css-simpler/) to prevent it from render blocking.