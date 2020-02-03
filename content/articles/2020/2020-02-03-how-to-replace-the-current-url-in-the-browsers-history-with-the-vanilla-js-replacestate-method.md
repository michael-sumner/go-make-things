---
title: "How to replace the current URL in the browser's history with the vanilla JS replaceState() method"
date: 2020-02-03T10:30:00-05:00
draft: false
categories:
- Code
- JavaScript
---

Last week, we looked at [how to use the `pushState()` method to update the browser's URL without triggering a page reload](/how-to-update-the-browser-url-without-refreshing-the-page-using-the-vanilla-js-history-api/).

Reader [Zoltan Wacha](http://steampeek.hu/) thought it might be a good idea for me to mention the differences between `history.pushState()` and the `history.replaceState()` method, which I didn't mention in the article. He's right!

The two methods use the same conventions and accept the same exact arguments. So, what's the difference between them?

The `pushState()` method creates a new entry in the browser's History. Hitting the browser's back button will update the URL back to what it was before you ran the method. Clicking the forward button after that will restore it to your new URL. It's effectively the same as "visiting a new page," even though you haven't.

The `replaceState()` method instead *replaces* the current item in the browser's History. If you click the back button in the browser, it will take you to whatever page you were looking at before this. Clicking forward again brings you to the page you were just on, with the updated URL.

The two methods serve two different purposes:

- If you have a single-page app, and you want to update the UI to a "new page," use `pushState()`.
- If you have a plugin for something like an image gallery, and want to provide people way a URL directly to the image (but don't want forward/back buttons to toggle through every... single... one), use `replaceState()` instead.