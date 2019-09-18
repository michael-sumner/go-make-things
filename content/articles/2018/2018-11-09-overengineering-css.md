---
title: "Overengineering CSS"
date: 2018-11-09T10:30:00-05:00
draft: false
categories:
- Code
- CSS
- Design and UX
- HTML
- JavaScript
- Web Performance
---

Last week, Nicolas from Facebook Engineering (formerly Twitter) tweeted [a thread on Twitter's changing approach to CSS](https://twitter.com/necolas/status/1058949372837122048):

> A brief analysis and comparison of the CSS for Twitter's PWA vs Twitter's legacy desktop website. The difference is dramatic and I'll touch on some reasons why.
>
> Legacy site *downloads* ~630 KB CSS per theme and writing direction...
>
> PWA *incrementally generates* ~30 KB CSS that handles all themes and writing directions.

Obviously, 630kb is an absurdly huge amount of CSS, and 30kb is a dramatic improvement.

**But... both the original problem and the solution represent our industry's obsession with overengineering CSS.**

## JavaScripting all the things!

Nicolas expand...

> The legacy site's CSS is what happens when hundreds of people directly write CSS over many years. Specificity wars, redundancy, a house of cards that can't be fixed. The result is extremely inefficient and error-prone styling that punishes users and developers.
>
> The PWA's CSS is generated on-demand by a JS framework that manages styles and outputs "atomic CSS". The framework can enforce strict constraints and perform optimisations, which is why the CSS is so much smaller and safer. Style conflicts and unbounded CSS growth are avoided.

What this means, of course, is that if that JS file fails *for any reason* you don't get Twitter's stylesheet.

You probably don't browse the web with JS disabled (though, for many valid reasons, some people do). But CDN errors, ad blockers, hyper aggressive corporate firewalls, shitty web connections, and even bad weather can all knock out a JS file.

Twitter has moved one of the most resilient parts of the web stack to the most fragile and error prone part of it.

## CSS is good enough

At the heart of it all is a hostility from JS-focused developers towards CSS, betrayed later in Nicolas's Twitter thread.

> How does the PWA do responsive design with 0 media queries? Modern responsive design is about conditionally rendering entire component trees, and making components adapt to their own dimensions. You need to use 'ResizeObserver' for that. Media queries in CSS aren't good enough.
>
> In fact, putting state in CSS (:hover, @media, etc) is as much of a problem for dynamic web apps as putting state in the DOM. Removing state from style definitions simplifies coordinating changes to trees & styles, and opens the door to more native-feeling interactions.
>
> The Twitter PWA is a good example of how a huge, highly dynamic app benefits from a simpler "styles in JavaScript" paradigm (powered by a subset of CSS) that is significantly more effective and reliable than working directly with CSS or CSS-in-JS.

But CSS *is* good enough. Media queries *are* good enough.

CSS's beauty is that it's both simple *and* powerful. We don't need to overengineer it more.

I don't mean to pick on Nicolas specifically here. He and I vehemently disagree on engineering approaches here, but he's a talented guy who shares a lot of what he learns with the community, and that's awesome!

## An alternative approach

One area where I do agree with him is this...

> There are tradeoffs and new possibilities from moving the styles into JavaScript. Roughly speaking, this:

```css
.name { prop-name: value; … }
```

```html
<div class="name"></div>
```

> Is now written as:

```js
let name = { propName: value, … }
<div className={name} />
```

> And renders to:

```html
<div class="jzrps nibae lupp mihax"></div>
```

> The impact on over-the-wire size of more HTML classes per element is negligible, whether in HTML or JS; it's massively offset by CSS byte savings and style safety.

I couldn't agree more.

Shifting more code to HTML, the most stable part and easy-for-browsers-to-render part of the stack, is a huge performance win. I disagree with implementation, though.

Rather than relying on some fragile, overdone JavaScript tooling, you can write some lightweight CSS using [a utility-first approach](https://frontstuff.io/in-defense-of-utility-first-css).

The end result is the same: more classes in your markup, with smaller JS files.

But the outcome is also more obvious, easy-to-read class names that can be easily traced back to styles in the stylesheet. And they can be authored in CSS without any transpiling.

If you're not familiar with utility-classes and OOCSS, I recommend checking out both [Nicole Sullivan's original presentation on the topic](https://www.slideshare.net/stubbornella/object-oriented-css), and [Sarah Dayan's primer](https://frontstuff.io/in-defense-of-utility-first-css).