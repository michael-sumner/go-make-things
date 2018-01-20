---
categories:
- Code
- Design &amp; UX
- Web Performance
date: '2015-05-15'
permalink: /better-responsive-images/
title: Better Responsive Images
url: /2015/05/15/better-responsive-images
---

*The following post was adapted from [Wicked Fast Websites](/wicked-fast-websites/), my free beginner's guide to building fast websites and web apps that work on any device. [Download it here.](/wicked-fast-websites/)*

Why would you send the same image to a five-year old feature phone or a tiny smart watch that you would to a modern laptop attached to 32-inch, high-definition monitor?

Here's a simple, common technique for responsive images:

```css
img {
    max-width: 100%;
    height: auto;
}
```

That's great for resizing the one image you do send, but wouldn't it be great if you could send different images based on things like viewport size and screen density? Well, you can!

Let's look at a few different ways to do that.

<!--more-->

## Background Images

You can load viewport-aware background images using media queries. You can even use [different images based on screen density](https://css-tricks.com/snippets/css/retina-display-media-query/).

```css
.background-img {
    background-image: url("/path/to/the/image-small.jpg");
}

@media (min-width: 30em) {
    .background-img {
        background-image: url("/path/to/the/image-medium.jpg");
    }
}

@media (min-width: 40em) {
    .background-img {
        background-image: url("/path/to/the/image-large.jpg");
    }
}

@media (min-width: 60em) {
    .background-img {
        background-image: url("/path/to/the/image-xlarge.jpg");
    }
}
```

Most browsers will only load the image required for the current viewport size. If a visitor resizes their browser or rotates their device, and this triggers a new break point, a subsequent image download will occur, but the benefits of using smaller sizes outweight the edge case of a potential second download.

Of course, you're not always going to use a background image, which brings use to...

## The `<picture>` element and `srcset`

Being able to specify which version of an image to show at which breakpoint sounds great. And in many cases, it is (think art direction across a variety of viewports).

But it also involves a lot of math and decision making on your part that really should be offloaded to the browser. Rather than figuring which image to send and when, imagine if you could just tell a browser the sizes it has to choose from and let it figure out which image works. This opens up the door for some interesting opportunities:

* Browsers could automatically figure out which image would look best given the device's screen resolution.
* Visitors could choose to prioritize performance over aesthetics, forgoing, for example, the high-resolution images when in low bandwidth conditions or if trying to conserve data.
* Browsers could determine that grabbing the highest required resolution for an image and downsizing on orientation change makes more sense than a second download (or vice-versa).

Today, you as the developer are making decisions that really belong in the hands of the visitor and their browser. Fortunately, a pair of solutions are in the works.

## The `<picture>` element

The `<picture>` element let's you serve different images based on breakpoints:

```html
<picture>
    <source srcset="path/to/image-xlarge.jpg" media="(min-width: 60em)">
    <source srcset="path/to/image-large.jpg" media="(min-width: 40em)">
    <img srcset="path/to/image-standard.jpg">
</picture>
```

## The `srcset` attribute

The `srcset` attribute allows you to provide a few image choices, and share some information with the browser that helps it decide which image to choose. It can be used with a standard `<img>` element, or with the `<picture>` element.

```html
<img src="path/to/image-small.jpg"
     srcset="path/to/image-large.jpg 1024w,
             path/to/image-medium.jpg 640w,
             path/to/image-small.jpg 320w"
     sizes="(min-width: 36em) 33.3vw,
            100vw"
>
```

## Browser Support

Currently, [support for `srcset`](http://caniuse.com/#feat=picture) isn't great, and [support for the `<picture>` element](http://caniuse.com/#feat=picture) is even worse, but support will get better in the near future.

However, the [Picturefill polyfill from Filament Group](http://scottjehl.github.io/picturefill/) let's you use both methods today. When support improves in the future, you can simply remove the polyfill.

To learn more about these approaches and how to use them, check out [Srcset and sizes by Eric Portis](https://ericportis.com/posts/2014/srcset-sizes/)