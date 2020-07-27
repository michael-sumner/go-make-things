---
title: "How to create accessible subtitles"
date: 2020-07-23T10:30:00-04:00
draft: false
categories:
- Accessibility
- Code
- CSS
- Design and UX
- HTML
---

One popular design pattern on the web is a heading with a subtitle below it. The subtitle is typically bigger than normal body font, but smaller than the main `h1` heading.

What should the markup for that look like?

## The very wrong way that you should totally never do

One *bad pattern* that you definitely *shouldn't* do is to style it with headings, like this.

```html
<header>
	<h1>Puppies are amazing!</h1>
	<h5>New super pup sets record with 5 hour cuddle session</h5>
</header>
```

Heading have semantic meaning that conveys the structure of the document to screen readers.

## A better (but not perfect) way

I typically use a paragraph with a `.subheading` class, styled to look bigger (and often, bolder or italicized).

```html
<header>
	<h1>Puppies are amazing!</h1>
	<p class="subheading">New super pup sets record with 5 hour cuddle session</p>
</header>
```

```css
.subheading {
	font-size: 1.5em;
	font-style: italic;
}
```

This is good, but it does provide sighted users with additional information that visually impaired users don't get. Nothing about this markup pattern announces to screen reader users that the `.subheading` is, well, a subheading.

But that's about to change.

## The `doc-subtitle` role

Back in March, the wonderful [Steve Faulkner shared information about the `doc-subtitle` role](https://twitter.com/stevefaulkner/status/1236241209686966272).

This is a new addition to ARIA that, when added to an element, conveys to screen readers that the element is a subheading.

```html
<header>
	<h1>Puppies are amazing!</h1>
	<p role="doc-subtitle">New super pup sets record with 5 hour cuddle session</p>
</header>
```

You can skip the `.subheading` class entirely, and use the `role` as your styling hook in CSS, too.

```css
[role="doc-subtitle"] {
	font-size: 1.5em;
	font-style: italic;
}
```

Screen reader/browser support for this role is pretty poor right now, since it's so damn new.

But you should start using it today anyways. It gives you the same styling and semantic correctness as the `.subheading` class, and is also future ready for when screen reader support catches up.

Ultimately, it will provide a more comparable experience for screen reader users.