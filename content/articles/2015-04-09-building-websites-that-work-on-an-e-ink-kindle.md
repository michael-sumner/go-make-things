---
categories:
- Accessibility
- Code
- Design &amp; UX
date: '2015-04-09'
title: Building websites that work on an e-ink Kindle
---

Today, Brad Frost wrote about [the importance of providing accessible web experiences on low-powered devices](http://bradfrost.com/blog/post/accessibility-and-low-powered-devices/) (like an e-ink Kindle).

> My wife’s cousin suffers from debilitating migraines. She’s done everything to reduce the migraines’ frequency, from dramatically altering her diet, to trying every available medical treatment, to even moving several times to different climates. Because of her condition, she has to minimize time spent with backlit screens.

Her solution: she uses the experimental web browser on her e-ink Kindle. And she finds that many sites either don't work or crash her browser.

I advocate building sites in a layered, fault-tolerant way, but I don't always test my sites on the worst of the worst devices. Curious, I fired up my wife's five year old, hand-me-down Kindle (version 2.5.2) and pulled up a few sites I've built.

<!--more-->

## What I discovered

**The good news:** the last three major sites I've built work, and work surprisingly well. Even a recent web app I built, which unlike those new hottness single-page apps still uses server-side rendered code, was navigable and displayed all of the key content.

<img src="https://gomakethings.com/wp-content/uploads/2015/04/kindle-browser-basic.jpg" alt="A photo of the Kindle browser" width="832" height="1109" class="aligncenter size-full wp-image-6038" />

However, there are a few gotchas.

### The Kindle completely ignores CSS and JavaScript

A few of my progressively enhanced scripts use CSS to hide JS-dependent elements (ex. toggles for expand-and-collapse widgets) until the JavaScript files are loaded and initialized.

<p class="text-center"><img src="https://gomakethings.com/wp-content/uploads/2015/04/kindle-browser-elements.jpg" alt="A photo of the e-ink Kindle web browser showing redundant elements" width="832" height="1109" class="alignnone size-full wp-image-6040" /><br><span class="text-muted text-small">Elements hidden with CSS are visible, creating redundant, confusing markup.</span></p>

Because the Kindle ignores both CSS and JS, those elements are visible, and this results in some confusing markup. Inline CSS and JavaScript don't appear to be rendered either, so I'm not sure how to address this.

***Update:*** *A few folks&mdash;in the comments here and on Twitter&mdash;have pointed out that my Kindle is old as heck, and newer e-ink models like the Paperwhite have robust CSS and JavaScript support.*

### The Kindle ignores anchor links

As an accessibility best practice, I include a skip navigation link at the top of my documents. This hidden anchor link let's screen reader users skip the navigation and jump right to the body content&mdash;handy when navigating several pages of content using in-document links.

The skip nav link is displayed visibly (again, because CSS is ignored), and I'm ok with that. But clicking the link doesn't actually skip the navigation as it should. That's bad for UX and accessibility (and also means anchor links don't work).

### SVGs and web fonts aren't supported

Not surprisingly, SVGs aren't supported, and neither are custom fonts (even web-safe ones). Everything is rendered in the Kindle's default system font.

### Images display just fine

My sites included both JPGs and PNGs, and both of those rendered without issue (albeit in grayscale).

<img src="https://gomakethings.com/wp-content/uploads/2015/04/kindle-browser-image.jpg" alt="A photo of the e-ink Kindle web browser rendering images" width="832" height="1109" class="aligncenter size-full wp-image-6041" />

### Update: Contrast Is Important

In the comments, [Nico pointed out](#comment-18801) that color contrast is critically important for e-ink displays. They have a tendency to leave remnants of previous text when scrolling, making lighter text harder to read.

Follow [a11y recommendations for color contrast](http://webaim.org/resources/contrastchecker/) and you should be good here.

## Key Takeaways

Generally speaking, if you follow web accessibility best practices, you'll be in great shape. The basics for supporting almost any device:

* Write solid, semantic markup that will logically make sense without CSS or JavaScript.
* Next, layer in visual style with CSS, and ensure that it will work and look decent even if your JavaScript fails to load.
* Finally, add interaction with JavaScript, but know that this is a nice-to-have rather than a need-to-have.

Frankly, this is the first browser I've encountered that flat-out ignores CSS. That introduces some weird markup that I'm not sure how to address. I *could* render my JS toggling elements with JavaScript if and when the file successfully loads and runs, but that's bad for performance.

At this time, I'm thinking that this is such an edge case, having a site that's useable and includes all content (along with some weird markup) is good enough.

***Update:*** *At the recommendation of Brad Frost and a few others on Twitter, I'm leaning towards rendering DOM that only works if JavaScript is loaded via JavaScript, thereby avoiding the weirdly rendered markup.*