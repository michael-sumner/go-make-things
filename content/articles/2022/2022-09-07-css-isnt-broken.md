---
title: "CSS isn't broken: Tailwind, utility classes, and CSS architecture"
date: 2022-09-07T10:30:00-04:00
draft: false
categories:
- Code
- CSS
- Design and UX
- HTML
---

I have an incredibly strong dislike of Tailwind, the CSS framework. Today, I wanted to talk about why.

Let's dig in!

## What is Tailwind?

Tailwind is a utility-class library for creating UIs. 

Let's say you have a `div` element. You want to center the text, round the corners, and add a border color to it to make it stand out. With Tailwind, you can do something like this.

```html
<div class="text-center rounded border-black">
	<h2>Ready to join?</h2>
	<a href="/join">Get Started!</a>
</div>
```

Their tagline is...

> Rapidly build modern websites without ever leaving your HTML.

And a key part of the value proposition championed by Tailwind's creator and its many fervent fans is that CSS is broken, and Tailwind "fixes" it.

## Utility classes are awesome! They're not everything, though.

You can absolutely build entire websites with only utility classes. And for quickly throwing together prototypes, it's probably the quickest way to get started.

Maintaining a setup like that, though? Hell!

Imagine an _alert component_. Here's what that might look like using only Tailwind CSS utility classes.

```html
<div class="p-4 px-6 mb-4 text-green-700 bg-green-100 rounded-lg dark:bg-green-200 dark:text-green-800" role="alert">
	<span class="font-bold">You did it!</span> Results saved.
</div>
```

And here's what it would look like using a more traditional approach to writing CSS.

```html
<div role="alert" class="my-alert">
	<span class="font-bold">You did it!</span> Results saved.
</div>
```

Sometimes, leaving your HTML to write a little CSS makes it _faster and easier_ to write your HTML. CSS is good, actually!

## When _should_ you use utility classes?

This is, of course, entirely a matter of personal preference.

That said, I personally find that utility classes are best for nudging and tweaking the UI of existing components. In my own projects, I use utility classes to do things like...

- Increase/decrease the default font-size of an element
- Adjust margins and padding
- Use a secondary font on certain elements
- Align text to the left or right

For example, imagine if you have a big call to action on a page. You have a heading and a one-sentence description.

```html
<div>
	<h1>Join the crew!</h1>
	<p>Start an exciting career as a pirate, and explore the seven seas.</p>
</div>
```

You might want to center your text, remove the normal spacing between the `h1` and `p` elements, and make the `p` text a bit bigger. This is where utility classes shine!

```html
<div class="text-center">
	<h1 class="margin-bottom-small">Join the crew!</h1>
	<p class="text-large">Start an exciting career as a pirate, and explore the seven seas.</p>
</div>
```

Now, if this was a pattern you found yourself repeating over-and-over again, _then it might be useful_ to pull it up into its own component.

```html
<div class="cta">
	<h1>Join the crew!</h1>
	<p>Start an exciting career as a pirate, and explore the seven seas.</p>
</div>
```

```css
.cta {
	text-align: center;
}

.cta h1 {
	margin-bottom: 0.25em;
}

.cta p {
	font-size: 1.25em;
}
```

[Andy Bell's CUBE CSS](https://cube.fyi/) provides a nice mental model for how to approach CSS architecture in a sensible, scalable way.

I don't use his specific naming conventions, but I do follow an approach that's quite similar.