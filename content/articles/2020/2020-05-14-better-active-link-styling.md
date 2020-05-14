---
title: "Better (more accessible) active link styling"
date: 2020-05-14T10:30:00-04:00
draft: false
categories:
- Accessibility
- Code
- CSS
- Design and UX
---

Until this morning, I always styled the current link in my navigation menu by doing this.

```html
<ul class="nav">
	<li><a href="/about">About</a></li>
	<li class="active"><a href="/articles">Daily Tips</a></li>
	<li><a href="resources">Learn JS</a></li>
</ul>
```

```css
.nav .active a {
	border-bottom: 0.125em solid #fa7176;
	color: #272727;
}
```

It gives users a clear visual indication that "you are here."

Well... sighted users, that is. If you're visually impaired or use a screen reader to navigate the web, it tells you nothing.

I just learned that I should have been using `[aria-current]` to indicate the current page in the navigation, like this.

```html
<ul class="nav">
	<li><a href="/about">About</a></li>
	<li><a aria-current="page" href="/articles">Daily Tips</a></li>
	<li><a href="resources">Learn JS</a></li>
</ul>
```

You can even hook into the attribute for styling purposes, so I can drop the `.active` class altogether.

```css
.nav [aria-current] {
	border-bottom: 0.125em solid #fa7176;
	color: #272727;
}
```

[Léonie Watson has a great article on the `[aria-current]` attribute](https://tink.uk/using-the-aria-current-attribute/), and I suggest you go read the whole thing.

Most notably, you can use it for more than just the current page (formatting adjusted for space).

> The aria-current attribute can be given one of a predefined set of values (enumerated tokens):
>
> - `page` represents the current page within a set of pages;
> - `step` represents the current step within a process;
> - `location` represents the current location within an environment or context;
> - `date` represents the current date within a collection of dates;
> - `time` represents the current time within a set of times;
> - `true` represents the current item within a set;
> - `false` does not represent item within a set.

You can dig deeper into the `[aria-current]` attribute, with some great examples, [in Léonie's detailed article](https://tink.uk/using-the-aria-current-attribute/).