---
title: "Inlining literally everything for better performance"
date: 2018-07-03T10:30:00-04:00
draft: false
categories:
- Code
- CSS
- HTML
- JavaScript
- Web Performance
---

Surely you must have read the title of this article wrong. I'm not *really* suggesting you inline *everything*, am I?

I am.

## What?

Yesterday, I shared [Mariko Kosaka's wonderful drawings explaining HTTP and how it works](https://twitter.com/kosamari/status/859958929484337152?s=21).

There are a few nuances to how HTTP works that impact web performance.

1. Both CSS and JavaScript are render blocking, so when a browser comes across a file of that type in the HTML, it waits until it's finished before rendering anything else.
2. Downloading multiple smaller files is slower than downloading a single file of the same combined size, because of the lookups, handshakes, and "queuing process" that happens. This isn't true anymore with HTTP2, but older browsers and unencrypted sites don't support it.
3. Data for any particular file is transferred in small chunks of about 14kb. So if you have, for example, a 250kb image, 18 small packets of data will be sent one-at-a-time for it.

Because of these things, if the combined weight of your above-the-fold (not a real thing) CSS, HTML, and JS is 14kb or less (after minifying and gzipping), it's more performant to embed it all into the HTML document.

Why? Because instead of three or more separate trips, the browser gets everything it needs to start rendering the page immediately and can just get to it.

## I tried this on my own site

All of the CSS and JavaScript for [GoMakeThings.com](https://gomakethings.com) is inlined.

For a typical article page on the site, the total HTML weight with this approach is 12kb to 13kb with gzipping. For my longer ones, it's around 16kb, but that still gets all of the above-the-fold stuff over in a single packet.

Before and after making the switch, I ran some tests on [WebPagtest.org](http://www.webpagetest.org/).

My start-render time dropped by 200ms. My complete render time did, too.

I ran some tests on slower networks and locations around the world (farther away from where my server is). It shaved entire seconds off for them.

## Who should do this?

If you're using a huge stylesheet, this won't work well for you.

(And also, we need to talk! You're stylesheet doesn't need to be so damn big!)

My CSS is 15kb minified, *before* gzipping. Gzipping reduces file size by about 70%, bringing it down to 4.5kb. My JavaScript is 10kb pre-gzip, 3kb after. That gives me a total of 7.5kb, and leaves me with about 6.5kb for HTML before I get to 14kb total weight.

If you're using tons of libraries and frameworks, you're going to blow through that budget really quick, and this definitely won't be the right approach for you.

## Automating this with Hugo

I use [Hugo](https://gohugo.io/), a static site generator, for all of my projects.

Its templating system makes it really easy for me to update my CSS and JavaScript as external files, and automatically pull them in and inline them.

Here's how it works: in my `config.yml` file, I have a custom parameter called `minify`.

```
params:
  description: "Vanilla JavaScript for beginners and designers."
  minify: true
```

This let's me easily switch between using the minified and unminified versions of my files for debugging purposes.

In my `header.html` template, I add `style` elements, and use some Hugo/Go logic, `readFile`, to import my file contents. It checks if `minify` is true or not, and pulls in the minified or unminified file accordingly.

```html
<style type="text/css">
	{{ if eq $.Site.Params.minify true }}{{ readFile "/themes/gmt/static/css/main.min.css" | safeCSS }}{{ else }}{{ readFile "/themes/gmt/static/css/main.css" | safeCSS }}{{ end }}
</style>
```

In my `footer.html` template, I do something similar to import my JavaScript.

```html
<script>
	if ('querySelector' in document && 'addEventListener' in window && 'classList' in document.createElement('_')) {
		{{ if eq $.Site.Params.minify true }}{{ readFile "/themes/gmt/static/js/main.min.js" | safeJS }}{{ else }}{{ readFile "/themes/gmt/static/js/main.js" | safeJS }}{{ end }}
	}
</script>
```