---
title: "Navigating the web with a keyboard"
date: 2019-09-30T10:30:00-04:00
draft: false
categories:
- Accessibility
- Code
- CSS
- HTML
---

Some people navigate the web exclusively or primarily with their keyboard instead of with a mouse.

Some people are visually impaired, and cannot see where the mouse cursor is on the screen. They can use their keyboard to move around the page, and a screen reader will announce where they are.

But not all people who use a keyboard to navigate the web are visually impaired. They might instead (or also) have a cognitive or muscular impairment that makes use a mouse difficult. For example, someone with [Parkinson's disease](https://en.wikipedia.org/wiki/Parkinson%27s_disease) may shake, making the fine motor control required for a mouse difficult.

How can you ensure that your websites and apps work well for people who navigate the web with a keyboard?

## Focus styles

By default, special styles are applied to the element that is currently *in focus*. For example, if you click on a form input, you may notice that input shows a blue, slightly fuzzy border.

People who navigate the web with a keyboard but *aren't* visually impaired don't always use a screen reader. Focus styles provide important visual clues that let them know where they are on a page. These styles are included in the browser's default CSS.

**Some designers dislike them, and remove them as part of their designs. Never do this.**

Focus styles are an important accessibility feature and should always be included in the sites and apps you makes.

You can still customize them to better match your design, but don't remove them. [Eric Bailey has an excellent presentation on this topic](https://noti.st/ericwbailey/TcMJFP/slides), if you want more information.

## Use the right element for the job

Many HTML elements convey semantic meaning to assistive devices like screen readers. They can also provide hooks that people who navigate by keyboard can use to more easily move around the page.

Here are three simple things you can do.

### 1. Use headings to convey hierarchy

I sometimes see people use headings exclusively for style.

```html
<h1>This is a webpage</h1>
<h5>Here's a subheading</h5>

<p>Some text.</p>

<h1>Another heading</h1>
```

Some rules around using headings:

- There should only ever be a single `h1` element on the page. It should be the primary heading at the top of the page.
- Subheadings should be sequential. If the last heading was an `h2`, the next one should be an `h2` if you're creating a new content section, or an `h3` if you're adding a subsection to the existing content.
- Headings should convey the start of a section, and not be used solely for style. Use classes for style, and to modify the correct semantic headings to look different if needed.

### 2. If an element should be interactive, use something focusable

People who navigate the web with a keyboard can jump from one focusable element to the next by hitting the `Tab` key on the keyboard. They can then interact with that element with the `Enter`/`Return` key or `Space` bar.

Not all elements are focusable.

I often see people use `div` or `span` elements with `click` event listeners. These should be `button` or `a` elements, which can be focused. With a `div`, a keyboard user wouldn't know the element was clickable, or might not be able to actually click on it.

### 3. Buttons and links are not interchangeable

Even if you use a focusable element, it might not be the right one. I often see people use links as buttons.

```html
<a class="click-me" href="#">Click Me</a>
```

Links and buttons convey unique semantic meaning to screen readers.

A link implies that clicking it will take you to a different location&mdash;either another page, or a different spot on the current one. Buttons imply interactivity&mdash;showing and hiding content, submitting a form, and so on.

[Marcy Sutton wrote a fantastic article about this.](https://marcysutton.com/links-vs-buttons-in-modern-web-applications)

Sometimes, you might have a valid link that you *progressively enhance* into a button after your JavaScript loads. In that case, add `role="button"` to the link element with your JS.

This is a common pattern with tabbed navigation. By default, it's a list of anchor links. After the script loads, it becomes an interactive component.

```html
<!-- Default -->
<ul>
	<li><a href="#hermione">Hermione</a></li>
	<li><a href="#neville">Neville</a></li>
	<li><a href="#harry-potter">Harry Potter</a></li>
</ul>

<!-- After JavaScript Loads -->
<ul>
	<li><a role="button" href="#hermione">Hermione</a></li>
	<li><a role="button" href="#neville">Neville</a></li>
	<li><a role="button" href="#harry-potter">Harry Potter</a></li>
</ul>
```