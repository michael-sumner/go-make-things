---
title: "How to use aria-live with dynamic content"
date: 2018-12-14T10:30:00-05:00
draft: false
categories:
- Accessibility
- Code
- Design and UX
- HTML
- JavaScript
---

I first learned about `aria-live` from [Sami Keijonen](https://foxland.fi/), and it's been on my list of things to write about ever since.

Then today, [Ire Aderinokun published an article on it that's so damn perfect](https://bitsofco.de/using-aria-live/) that I would just be repeating whatever she said. So, today, I want you to go over to her site and read it instead of reading something from me.

Not sure what `aria-live` is? Ire explains...

> Many web pages today have their content dynamically changed using Javascript. An example of this is the search page on this blog. When the page is initially loaded, the only content in the `<main>` section of the page is a search form. But, when you type in a query such as "css" and search, several articles related to that term begin to appear on the page.
>
> If you are looking at the page, it is obvious when the articles appear because you can see the content change. However, if you’re using a screen reader, there is no way to tell exactly when this happens. The `aria-live` attribute allows us to tell assistive technology what parts of the page are likely to change. With this information, it can listen for changes to those particular elements and notify the user of any updates made.

[Head over to Ire's site to read more about `aria-live`.](https://bitsofco.de/using-aria-live/)