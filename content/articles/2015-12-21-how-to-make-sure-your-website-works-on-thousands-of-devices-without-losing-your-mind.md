---
categories:
- Code
- Design &amp; UX
date: '2015-12-21'
url: /how-to-make-sure-your-website-works-on-thousands-of-devices-without-losing-your-mind/
title: How to make sure your website works on thousands of devices without losing your mind
---

Have you ever been shopping on your phone, and when you click the “Add to Cart” or “Buy Now” button, nothing happens? So you click it again. And again. And again. Still nothing?

Frustrating, right? Today, we'll be looking at how you can make sure that never happens, no matter what device your supporters are using to view your website.

<!--more-->

## Why websites break

Sometimes, the code or files that make things work don’t download properly because of a bad internet connection. Or because the device someone is using doesn't support them. Or they have a bug and stop working. Unfortunately, sometimes these things happen.

But... when part of your website breaks, the user should still be able to complete key tasks, like making a donation or submitting an adoption application.

## Which browsers and devices should you support?

Over the last few years, [PAWS New England](http://pawsnewengland.com/) has been visited by almost 1,000 different devices. These devices range from the very capable (the latest Apple and Android phones and tablets) to the very old and underpowered (a Nintendo DS and my 5 year old Kindle).

Which of these devices does PAWS New England support? All of them.

## Building in layers

Think of your website as a house. The foundation and frame of your website are made out of HTML (short for "hypertext markup language"). This is all of the text (and stuff that gets wrapped around it) that shows up on your site.

CSS (short for "cascading style sheet") is a bit like paint and decor. It controls how the HTML looks: what color it is, where it's placed on the page, and so on. If the CSS failed to download, the HTML would still be there, ugly but readable.

JavaScript is a bit like electricity. It adds interactivity to your site, and powers things like expand-and-collapse menus, image carousels, and so on. And much like electricity, it can stop working very easily. An error or bug in one file can cause all of the other, properly functioning JavaScript to stop working, too.

(Kind of like how an issue down the street will shut off electricity in your house, but has no impact on your foundation or home decor.)

## Ok, my website is house. So what?

The problem is, sometimes web developers use JavaScript to create HTML (your content). When the JavaScript breaks, the content never loads. (Imagine if a power outage caused a wall in your house to disappear. Madness, right?)

Remember, like electricity, JavaScript is fragile. A single bug in the code could break the whole thing. Or the file may be taking too long to load, so your visitor's mobile device just stops downloading it (this is common on slow internet connections). Or maybe they're at work, and their employer blocks JavaScript files out of security concerns (common at bigger corporations).

Remember the "Add to Cart" button that does nothing? You don't want your site to stop functioning&mdash;even though it may visually look fine&mdash;just because one file isn't working properly.

## How do I know if I have this problem?

Testing this is a bit harder than some of the other topics we've covered so far, but it can be done pretty easily if you're comfortable adjusting your web browser settings. (If not, just reply to this email and I'll take a look for you.)

1. Turn off JavaScript in your browser. [Here are instructions on how to do that.](http://www.computerhope.com/issues/ch000891.htm)
2. Visit your website.
3. Resize your browser window so it's small, like a mobile device.
4. Make sure everything that's supposed to be there is visible and works.

Some things to look for: images and buttons in carousels, drop-down menus, lists of adoptable animals, and donation buttons.

If your site breaks with JavaScript turned off, there may be some easy fixes.