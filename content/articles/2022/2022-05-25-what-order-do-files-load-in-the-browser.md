---
title: What order do files load in the browser?
date: 2022-05-25T10:30:00-04:00
draft: false
categories:
- Code
- CSS
- HTML
- JavaScript
- Web Performance
---

The other day, I got an email asking...

> What order do files load in the browser? Does CSS load before JavaScript?

Great question! Here's an over-simplified, handwavy explanation of how browsers load files...

1. The HTML file downloads.
2. The browser starts reading it, and rendering stuff in it in real time as it does.
3. If it finds remote assets, it starts downloading them, two at a time, as it comes across them. Once they're downloaded, they render.

Step 3 is where stuff gets "weird." 

Browsers are optimized to avoid _repainting_ the UI whenever they can. If the browser finds a CSS file, it keeps downloading stuff but stops rendering until the CSS file is downloaded and parsed. 

Because CSS changes how HTML is laid out, the browser wants to know the right way to do that to avoid painting the UI twice.

If the browser finds a JavaScript file, it stops rendering _and_ stops downloading other files. Because JS can add and remove elements from the UI, the browser wants to know what the final layout is before continuing.

JavaScript files can also be loaded with `async` and `defer` attributes. 

```html
<script async src="script1.js"></script>
<script defer src="script1.js"></script>
```

The `defer` attribute tells the browser to download the file, but wait until all of the other stuff is done before running the file. The `async` attribute tells the browser to download this file, but don't stop downloading others while you do. The two can be used together.

**So, the short answer is** files are loaded in the order they appear in the HTML file.<br>
**The longer answer is** ... but it depends!