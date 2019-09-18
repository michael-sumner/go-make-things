---
title: "Understanding the cascade (and specificity) in CSS"
date: 2018-09-11T10:30:00-04:00
draft: false
categories:
- Code
- CSS
- HTML
---

Last week, [Max Stroiber tweeted this poll](https://twitter.com/mxstbr/status/1038073603311448064?s=21).

> How well do you know CSS? 👨🏼‍🏫
>
> Given these classes:

```css
.red {
  color: red;
}
.blue {
  color: blue;
}
```

> Which color would these divs be?

```html
<div class="red blue">
<div class="blue red">
```

The correct answer: they're both blue, and 43% of respondents got it right.

The most popular answer (with 44% of the votes) was that the first is blue and the second is red.

That most people *didn't* get this right is a failing in how we teach web development. [Tim Kadlec summarized it like this:](https://timkadlec.com/remembers/2018-09-10-the-cascade-and-other-essential-unessentials/)

>  It’s clear from these results that we’re not doing a good enough job discussing and teaching these fundamental concepts. That’s on us—those of us who have learned these topics—for not effectively passing that information along.

I remember being completely confused by the cascade for a *looonnngggg* time when I started learning web development, too.

When I finally learned how it worked, I felt like Neo in the Matrix when he can suddenly see the world in 0's and 1's. Web development got easier. Debugging got easier. My code got infinitely better.

So, with Tim's words in mind, today let's take a quick look at the *cascading* nature of CSS (aka Cascading Style Sheets).

## How the cascade in CSS works

**The most important rule of the cascade:** all other things being equal, the last defined style is the one that's used.

Let's say your stylesheet looks like this.

```css
p {
	color: red;
}

p {
	color: blue;
}

p {
	color: purple;
}
```

Your paragraph `color` will always be `purple`, because that's the last one that's defined in the stylesheet. Change the order, and the color changes.

```css
p {
	color: red;
}

p {
	color: purple;
}

p {
	color: blue;
}
```

Now, your paragraphs will always be `blue`.

### The order of classes on an element doesn't matter

The "last in wins" rule only applies to the order of styles in your stylesheet, not on the elements themselves. This is what tripped up so many people on Max's quiz.

Given these two classes:

```css
.red {
	color: red;
}

.blue {
	color: blue;
}
```

If the `.red` *and* `.blue` classes are both on an element, it will always have a `color` of `blue` because that's the last one in the stylesheet. If it *only* had the `.red` class, the `color` will be `red`.

```html
<div class="red blue">My text is blue.</div>
<div class="blue red">My text is blue, too.</div>
```

### The "cascading" nature of stylesheets

The "cascade" also means that unless specifically overridden, styles "cascade down" the stylesheet if more styles are declared on an element or class.

[Here's an example/demo of this in action.](https://codepen.io/cferdinandi/pen/VGXKpX)

```css
p {
	color: red;
	font-weight: bold;
	size: 2em;
}

.blue {
	color: blue;
}

p {
	font-style: italic;
}
```

```html
<p>I'm red, bold, and italic.</p>
<p class="blue">I'm all of those things, and also blue.</p>
```

In this example, the second `p` declaration that sets the `font-style` to `italic` doesn't *override* the previous styles on our `p`. It just augments them with more styles.

If you wanted to remove `bold`, for example, you would need to redefine that property.

```css
p {
	font-weight: normal;
}
```

## How specificity works

Remember the most important rule of the cascade?

> All other things being equal, the last defined style is the one that's used.

That "all other things being equal" part is pretty important, too.

Select *specificity* means "how specific is the selector for this style." Selectors that are more specific (ie. that have more *specificity*), have priority over less specific selector styles, *even* when they show up later in the stylesheet.

This can get weird and complex, but there's some general rules to make it easier to remember.

- Classes are more specific than element selectors
- IDs are more specific than classes.
- Combined selectors are more specific than single selectors.
- Inline styles are more specific than stuff in stylesheets.

[Here's an example/demo.](https://codepen.io/cferdinandi/pen/JaLKrG)

```css
p {
	color: red;
}

.override.orange {
	color: orange;
}

.blue {
	color: blue;
}

#purple {
	color: rebeccapurple;
}
```

```html
<p>I'm red.</p>
<p class="blue">I'm blue.</p>
<p class="blue" id="purple">I'm purple.</p>
<p class="blue override orange">I'm orange.</p>
<p class="blue override orange" id="purple">I'm still purple, because IDs have more specificity.</p>
<p id="purple" style="color: green">I'm green.</p>
```

### What about `!important`

The `!imporant` rule can be added to any style to force it to override other style declarations, even when they have greater specificity.

```css
.green {
	color: green !important;
}

#purple {
	color: rebeccapurple;
}
```

```html
<p class="green" id="purple">I'm green, because the .green class used !important.</p>
```

__You should *almost* never use it.__

Generally speaking, if a style isn't working the way you want, you have a specificity or cascade problem, and you should fix that instead of using `!important`.

Using `!important` instead of fixing your specificity issue will result in an escalating "war of `!important`."

Over time, more and more of your code base will use it to override previously declared properties that also use it. Eventually, your code base will be an unmaintainable nightmare.

The one exception where it *might* make sense to use `!important`: on modifier classes that nudge and tweak style and might not always have the most specificity.

[Here's an example.](https://codepen.io/cferdinandi/pen/KxogPO)

```css
#hero p {
	color: red;
	font-size: 3em;
	font-weight: bold;
}

.no-bold {
	font-weight: normal !important;
}
```

```html
<div id="hero">
	<p>I am giant and bold!</p>
	<p class="no-bold">Except for me.</p>
</div>
```

Without `!important`, `#hero p` has more specificity than `.no-bold`, so the paragraph is always bold.

## You don't have to instantly know how every selector will interact with others

Things get crazy when you start to use nesting selectors and direct-descendant selectors (`>`).

You don't know to instantly know which selector's styles will "win" given a set of complex selectors and styles.

What I *do* want you to come away from this article with is a more solid understanding of the essentials of the cascade, how it works, and why.

I want you to understand why certain styles are showing up and others aren't. I want you to feel confident that you can debug things when styles don't work as expected.

## Best Practices

To help prevent unintentional style bugs, you should...

- **Use as little specificity as possible.** Use element and class selectors over IDs and combination selectors whenever possible. Avoid inline styles whenever possible.
- **Structure your code to respect the cascade.** Put general element-based styles up top, followed by specific component/module styles, followed by modifiers.

Hopefully this gives you a stronger platform to build awesome stuff going forward.