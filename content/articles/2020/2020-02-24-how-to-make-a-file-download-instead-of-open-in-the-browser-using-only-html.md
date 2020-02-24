---
title: "How to force a file to download instead of open in the browser using only HTML"
date: 2020-02-24T10:30:00-05:00
draft: false
categories:
- Code
- HTML
---

One of the questions I get asked relatively often is how to force a file to download instead of opening directly in the browser.

For example, let's say you have a PDF receipt or an MP3 file that you want to let people download. You might point that to that file with a link.

```html
<a href="/path/to/your/receipt.pdf">Download Receipt</a>
```

In most browsers, clicking on the link will open the file directly in the browser.

But, if you add the `download` attribute to the link, it will tell the browser to download the file instead.

```html
<a href="/path/to/your/receipt.pdf" download>Download Receipt</a>
```

The `download` attribute works in all modern browsers, including MS Edge, but not Internet Explorer.

In the latest versions of Chrome, you cannot download cross-origin files (they have to be hosted on the same domain).