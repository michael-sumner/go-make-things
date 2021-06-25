---
title: "Images and screen reader users"
date: 2021-06-25T10:30:00-04:00
draft: false
categories:
- Accessibility
- Code
- CSS
- Design and UX
- HTML
---

The `alt` attribute is used with `img` elements to provide descriptive text that can be read aloud by screen readers and other assistive technology.

For example, here's a photo of a crab.

<img alt="A crab standing in wet, packed sand, waving as the tide gently laps the shore behind him" src="/img/articles/edgar-the-crab.jpg">

```html
<img src="/imgs/edgar-the-crab.jpg">
```

By default, a screen reader would announce, "/imgs/edgar-the-crab.jpg" for this image.

If we add an `alt` attribute with a description of the image, that will be read aloud instead.

```html
<img
	alt="A crab standing in wet, packed sand, waving as the tide gently laps the shore behind him"
	src="/imgs/edgar-the-crab.jpg"
>
```

Now, a screen reader would announce, "A crab standing in wet, packed sand, waving as the tide gently laps the shore behind him." This allows visually impaired users to get the same information from the image that someone who doesn't need assistive technology would.

## Writing good `alt` text

When writing `alt` text, try to describe the details of the image rather than simply stating what it is.

Using the photo of Edgar the crab as an example, "The crab I met on my vacation" would be bad `alt` text. While it's descriptive, it doesn't actually describe the content of the image itself.

```html
<!-- This is bad alt text -->
<img
	alt="The crab I met on my vacation"
	src="/imgs/edgar-the-crab.jpg"
>
```

## What about the `title` attribute?

The `title` attribute is also often read aloud by screen readers, and many people incorrectly assume that you can use `title` and `alt` interchangeably.

```html
<!-- Do not use the title attribute to provide alt text -->
<img
	title="A crab standing in wet, packed sand, waving as the tide gently laps the shore behind him"
	src="/imgs/edgar-the-crab.jpg"
>
```

Similarly, do not use the same text for both the `title` and `alt` attributes, as it will be read aloud twice by many screen readers.

```html
<!-- A better use of the title attribute -->
<img
	alt="A crab standing in wet, packed sand, waving as the tide gently laps the shore behind him"
	title="A crab standing in wet, packed sand, waving as the tide gently laps the shore behind him"
	src="/imgs/edgar-the-crab.jpg"
>
```

The `title` attribute is supposed to provide the kind of information you might find in a caption. For example, "The crab I met on my vacation" would be more appropriate for a `title`.

```html
<!-- A better use of the title attribute -->
<img
	title="The crab I met on my vacation"
	alt="A crab standing in wet, packed sand, waving as the tide gently laps the shore behind him"
	src="/imgs/edgar-the-crab.jpg"
>
```

That said, in most situations, wrapping an image in a `figure` element, adding that text as a `figcaption`, and _not_ including a `title` attribute is typically a better option, since its both exposed visually _and_ read aloud by screen readers.

<figure>
	<img alt="A crab standing in wet, packed sand, waving as the tide gently laps the shore behind him" src="/img/articles/edgar-the-crab.jpg">
	<figcaption>The crab I met on my vacation</figcaption>
</figure>

```html
<!-- This is generally better than using the title attribute -->
<figure>
	<img
		alt="A crab standing in wet, packed sand, waving as the tide gently laps the shore behind him"
		src="/imgs/edgar-the-crab.jpg"
	>
	<figcaption>The crab I met on my vacation</figcaption>
</figure>
```

## Decorative images

Every now and then you might have an image that's purely decorative in nature.

_**Aside:** images are "just decorative" far less often than you might think._

When that's the case, [it's better to use an empty string for your `alt` text rather than omit the attribute entirely](https://alistapart.com/blog/post/on-alt-text/).

```html
<!-- Use only for decorative images -->
<img alt="" src="/imgs/my-decorative-image.jpg">
```

Without the attribute, screen readers will read the filename of the image. With an empty string, it won't announce anything, which is more appropriate for an image that's purely decorative.