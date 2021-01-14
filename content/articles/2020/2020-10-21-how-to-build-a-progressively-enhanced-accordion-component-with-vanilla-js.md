---
title: "How to build a progressively enhanced accordion component with vanilla JS"
date: 2020-10-21T10:30:00-04:00
draft: false
categories:
- Accessibility
- Art and Science
- Business and Leadership
- Careers
- Code
- CSS
- Design and UX
- HTML
- JavaScript
- Technology
- Web Performance
- WordPress
- Vanilla Framework Demos
---

I'm hearing a lot of enthusiasm over [my series of articles about converting popular jQuery methods and plugins to vanilla JS](/series/converting-jquery-to-vanilla-js/).

Today, I'm going to look how we can replace the need for a big plugin altogether by progressively enhancing HTML to add a bit more functionality to it.

Let's dig in.

## The `details` and `summary` elements

I *love* the `details` and `summary` elements.

You can use them to create interactive expand-and-collapse components without any JavaScript. They work in all modern browsers. In older, unsupported browsers like IE, the content is displayed in full, so the user is always able to access it.

```html
<details>
	<summary>Click Me</summary>
	<p>Oh, hello there!</p>
</details>
```

<details>
	<summary>Click Me</summary>
	<p>Oh, hello there!</p>
</details>

You can also style them with CSS, including changing the arrow location and appearance.

Open `details` elements have the `open` attribute on them, and you can set your component to be open by default but hard-coding it into the HTML.

```html
<details open>
	<summary>Click to close</summary>
	<p>This will be expanded by default</p>
</details>
```

<details open>
	<summary>Click to close</summary>
	<p>This will be expanded by default</p>
</details>

## Converting `details` and `summary` into a *real* accordion

You can use a group of `details` and `summary` elements to create an accordion component.

```html
<details>
	<summary>Click Me to Show More</summary>
	<p>Hi there!</p>
</details>

<details>
	<summary>Click Me to Show More, Too</summary>
	<p>Hi there!</p>
</details>
```

It's pretty common for accordion groups to only allow one content section to be open at a time. Opening an accordion section closes any existing open ones.

By default, `details` and `summary` don't work this way.

*But*... they do emit a `toggle` event when opened or closed. We can hook into that to progressively enhance them further into a true accordion component.

[I recorded myself coding this project if you'd like to watch.](https://vimeo.com/470356970)

<div class="fluid-vids"><iframe src="https://player.vimeo.com/video/470356970?color=0088cc&title=0&byline=0&portrait=0" width="640" height="360" frameborder="0" allow="autoplay; fullscreen" allowfullscreen></iframe></div>

[You can find the source code on GitHub.](https://gist.github.com/cferdinandi/490f1f42c77d4bc97442bda4013b396a)