---
categories:
- Accessibility
- Code
- Design &amp; UX
date: '2015-05-13'
permalink: /common-responsive-ui-challenges/
title: Common Mobile User Interface Challenges
url: /2015/05/13/common-responsive-ui-challenges
---

There are a handful of small practices&mdash;little nudges and tweaks&mdash;that will make a huge impact on the usability of your site across a wide range of devices.

<!--more-->

## Font Size

For a long time, small fonts&mdash;`10px` to `14px` in size&mdash;were very popular on the web. Fonts at this size are difficult to read on small and high resolution screens.

For body copy, you should aim for `16px` at a minimum. This is actually the default base font size in most browsers. It will seem too big at first if you're not use to building sites that way, but after a few weeks, anything smaller will seem absurd, and your visitors with vision challenges will thank you!

## Relative Sizing

Web browsers set a default `font-size` of `16px`.

If your web developer set the `font-size` to `100%` (or didn’t set it at all), your text would render at `16px`. If the visitor had changed their default font size to `20px`, your text would render at `20px`.

When you set sizes in pixels, though, nothing changes if your visitor adjusts their default font size.

Many web designers like the control this gives them, but relative sizing is better for usability. It gives control to the visitor and allows people who have accessibility needs (for example, someone who’s visually impaired and needs to read at larger font-sizes) the ability to modify the content to fit their needs. Additionally, many non-desktop devices use a larger base font size to improve readability.

You don’t have to worry about this breaking your layout. If all of your sizing uses relative values, then when the default font-size changes in a visitor’s browser, all of the site elements will scale with it. This also ensures that if someone uses their browser's zoom feature, you site [doesn't introduces horizontal scroll bars](http://blog.cloudfour.com/the-ems-have-it-proportional-media-queries-ftw/).

Not sure how to get started? Check out [Working with Relative Sizing](https://gomakethings.com/working-with-relative-sizing/).

## Click Target Size and Spacing

Touch screens can be imprecise, especially for those of us that (ahem) have fat, clumsy fingers. Links and other clickable or tappable elements should have enough size and space around them that they're easily tapped.

How much size and spacing, exactly? [From Google](https://developers.google.com/speed/docs/insights/SizeTapTargetsAppropriately):

> You should ensure that the most important tap targets on your site—the ones users will be using the most often—are large enough to be easy to press, at least 48 CSS pixels tall/wide (assuming you have configured your viewport properly). Less frequently-used links can be smaller, but should still have spacing between them and other links, so that a 10mm finger pad would not accidentally press both links at once. Users should not have to pinch zoom (or rely on other browser UI features for disambiguating finger taps, such as Chrome's popup magnifying glass) in order to easily and reliably press the desired button or link.

Recommendations on the actual pixel size of tap areas vary wildly by device manufacturer, and are impossible to accurately calculate when screen resolution and pixel density differ so greatly. Your best bet? Get your clumsiest friend and have them test your site on a variety of devices.

## Hover Effects on Touch Screens

Don't forget: touch screen users can't hover.

Many devices will register an intial tap as a hover on hover event objects, and then a second tap as a click. On elements that have both hover and click events, this forces your visitor to tap twice to complete their task, which can get be quite frustrating.

Avoid hover effects when you can.

## Contrast

Good color contrast between your text and the background is an accessibility best practice (and in many countries [a legal requirement](http://www.ada.gov/pcatoolkit/chap5toolkit.htm)). It can become even more important on [low powered e-ink devices](https://gomakethings.com/building-websites-that-work-on-an-e-ink-kindle/).

Because e-ink devices leave behind remnants of previous text every few page changes, strong contrast is critical to readable text. You can use the [WebAIM Color Contrast Checker](http://webaim.org/resources/contrastchecker/) to test your design. You should also try switching your monitor to grayscale, and use [Color Oracle](http://colororacle.org/) to simulate color blindness when testing your designs.

## Viewport Scaling

When smart phones first came out, most websites were not designed for mobile devices. To avoid awkward horizontal scrolling on non-optimized sites, most mobile browsers pretend to have a desktop-sized width.

You need to tell mobile browsers that your site is mobile-optimized so that they get the appropriate zooming and scaling. Add this to the `<head>` element of your site:

```lang-html
<meta name="viewport" content="width=device-width, initial-scale=1">
```

Some developers disable user zooming by adding things like `user-scalable=no` or `maximum-scale=1.0`. **Do not do this.**

Zooming is a [critical accessibility feature](http://a11yproject.com/posts/never-use-maximum-scale/), and should not be disabled for any reason (A while ago, iOS had a zooming bug when the phone orientation was changed, but it was fixed in iOS6).