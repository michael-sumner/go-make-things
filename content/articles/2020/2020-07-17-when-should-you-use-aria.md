---
title: "When should you use ARIA"
date: 2020-07-17T10:30:00-04:00
draft: false
categories:
- Accessibility
- Code
- CSS
- Design and UX
- HTML
- JavaScript
---

In response to [my article on the `[aria-label]` attribute](/icon-accessibility-and-aria-label/), I received a handful of emails telling me that ARIA should be a last resort, and that usually [a visually hidden class](/a11y-and-text-just-for-screen-readers/) is the better approach.

I agree, and it's not, respectively.

Accessibility is nuanced and confusing, and it's really easy to take a general concept (use ARIA as a last resort) and misapply it to come to the conclusion that `[aria-label]` is a bad fit.

Let's explore this more.

## ARIA as a last resort

ARIA is an acronym that stands for *Accessible Rich Internet Applications*. It's designed to bridge the gap when HTML alone fails to expose important information in a uniform, predictable way to assistive technology (*AT*) like screen readers.

So, what does "use ARIA as a last resort" mean?

It means don't use ARIA when semantic markup already conveys the same information.

For example, the `[role]` property is part of ARIA. One available role is `heading`. Its purpose is to let screen readers and other AT know that an elements that's *not* an `h*` element is supposed to be a heading.

```html
<div role="heading" aria-level="1">This is a main page heading</div>
```

There are maybe some edge cases where this makes sense, but using an `h1` here is a much better choice. It's the *semantically correct* choice.

```html
<h1>This is a main page heading</h1>
```

I also sometimes see folks use ARIA in a way thats redundant with what the element semantically conveys already.

Here, the `[role="button"]` attribute is unnecessary. The element itself conveys the role by virtue of its semantic nature.

```html
<button role="button">Click Me</button>
```

This is why people who are passionate about HTML and accessibility talk about the importance of *semantic markup* so much.

Choosing the right element for the job does a lot of work for you out-of-the-box.

## The `.visually-hidden` class hack is *not* the same thing

The HTML5 Boilerplate popularized the use of a `.visually-hidden` class that you can add to an element to hide it visually, but leave it exposed for screen readers.

```css
/**
 * Visually hide an element, but leave it available for screen readers
 * @link https://github.com/h5bp/html5-boilerplate/blob/master/dist/css/main.css
 * @link http://snook.ca/archives/html_and_css/hiding-content-for-accessibility
 */
.visually-hidden {
	border: 0;
	clip: rect(0 0 0 0);
	height: 1px;
	margin: -1px;
	overflow: hidden;
	padding: 0;
	position: absolute;
	white-space: nowrap;
	width: 1px;
}
```

A lot of the folks who wrote back telling me I shouldn't use `[aria-label]` instead advocated for this approach. This is a misunderstanding of "use ARIA as a last resort."

**That class is _not_ semantic HTML. It's a hack.**

It's a good hack, but it's still a hack. And, it can actually make accessibility *worse*.

Here's the "read more" link I shared in my `[aria-label]` article.

```html
<a href="link-to-article.html" aria-label="Read more about pirates">
	Read more...
</a>
```

If you rewrite it to use the `.visually-hidden` class, it looks like this.

```html
<a href="link-to-article.html">
	Read more<span class="visually-hidden"> about pirates</span>...
</a>
```

In theory, it should visually appear as "Read more..." but get read aloud by screen readers as "Read more about pirates...".

But in some screen readers, the `.visually-hidden` text gets interpreted first in the markup, resulting in "about pirates Read more...". Still kind of makes sense (if you're Yoda), but not really what you intended.

Here, `[aria-label]` was designed specifically for this use kind of use case. It's the correct choice.

It's whole purpose is to replace the text within the element with something else for screen readers. Ideally, it should be similar, but with a bit more context that would be visually apparent for sighted users.

## When *should* you use a `.visually-hidden` class, then?

The `.visually-hidden` class isn't all bad. There are two examples I can think of where it's very much the right choice.

1. Skip nav links
2. Role announcements

### 1. Skip nav links

[A skip nav link](/hidden-content-for-better-a11y/#the-skip-linf) is a link that's visually hidden, but allows keyboard users to skip past long navigation elements and jump straight to the content.

```html
<a href="#main">Skip to the main content</a>

<nav>Navigation elements...</nav>

<main id="main">The main content</main>
```

You can visually hide it with the `.visually-hidden` class, which leaves it accessible to keyboards and screen readers. You should ideally also make it appear visually when focused for sighted keyboard users (for example, someone with poor motor function).

```css
/**
 * Extends the .screen-reader class to allow the element to be focusable when navigated to via the keyboard
 * @link https://github.com/h5bp/html5-boilerplate/blob/master/dist/css/main.css
 * @link https://www.drupal.org/node/897638
 */
.screen-reader-focusable:active,
.screen-reader-focusable:focus {
	clip: auto;
	height: auto;
	margin: 0;
	overflow: visible;
	position: static;
	white-space: normal;
	width: auto;
}
```

The link would then end up look like this.

```html
<a href="#main">Skip to the main content</a>
```

### 2. Role announcements

In a web app, you may have visual changes that occur on screen that a sighted user would see but a visually impaired user would not.

You can [use `[role="status"]` or `[aria-live]`](/how-and-why-to-use-aria-live/) to create an elements whose changes are announced by screen readers.

```html
<div aria-live="polite">Changes here will be announced.</div>
```

If the content to be announced should also be available to sighted users, you can use it as-is.

But what if you just want to notify screen reader users about a change without reading the whole thing aloud (for example, loading some dynamic content with a "content loaded" message)?

Adding a `.visually-hidden` class to the element will hide it visually while keep the announcement.

```html
<div class="visually-hidden" aria-live="polite">Changes here will be announced but not shown in the UI.</div>
```

## Don't fear ARIA

ARIA should be used as a last resort.

But that doesn't mean you should fear it or shy away from it. It exists for a reason.

If a semantic HTML element exists that serves the purpose, use it. If not, ARIA is an important part of building a more accessible web.