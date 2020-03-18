---
title: "How to automatically assign a filename when using the HTML download attribute to download a file"
date: 2020-03-18T10:30:00-04:00
draft: false
categories:
- Accessibility
- Art and Science
- Business and Leadership
- Careers
- Code
- CSS
- Design and UX
- HTML
- JavaScript
- Technology
- Web Performance
- WordPress
- Vanilla Framework Demos
---

Last month, we looked at [how to force a file to download instead of open in the browser using only HTML](/how-to-force-a-file-to-download-instead-of-open-in-the-browser-using-only-html/)

It's as simple as adding the `download` attribute to a link that points to the file.

```html
<a href="/path/to/your/receipt.pdf" download>Download Receipt</a>
```

Reader [Belkin Fahri](https://belkinfahri.com/) reminded me of something I neglected to mention: if you assign a value to the `download` attribute, that value becomes the downloaded file's name.

In our example above, instead of `receipt.pdf`, let's say we wanted the PDF to download as `magic-wand-purchase.pdf`. We would use `magic-wand-purchase.pdf` as the value for the `download` attribute.

```html
<a href="/path/to/your/receipt.pdf" download="magic-wand-purchase.pdf">Download Receipt</a>
```

Thanks for the reminder, Belkin!