---
title: Abbreviations suck
date: 2022-07-27T10:30:00-04:00
draft: false
categories:
- Accessibility
- Code
- Design and UX
- HTML
---

Last week, I had a discussion with some web friends about how [the `abbr` element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/abbr) actually sucks for accessibility.

The `abbr` element is _supposed to_ be used to denote an abbreviation or acronym. If you include a `title` attribute, you can describe what the abbreviation or acronym means. It's surfaced as a tooltip in certain browsers on hover.

```html
<abbr title="Cascading Style Sheets">CSS</abbr>
```

The thing is... the `abbr` element sucks, and you probably shouldn't use it. Let's dig in!

## What's the problem with `abbr`?

Just a few days after my conversation, [Martin Underhill published a great article](https://www.tempertemper.net/blog/abbreviations-can-be-problematic) going into some details. It's definitely worth a read.

But here are the two big highlights:

- Screen readers don't actually read/announce the `title` attribute aloud, so visually impaired users can't access the definition.
- The `title` attribute shows up on `:hover`. That means you have to know to hover over it, and have a device that supports hovering as an input. So... touch-only devices? Nothing.

## What should you use instead?

Nearly 100 percent of the time, the better option is to just write out what the acronym stands for the first time you use.

```html
CSS (Cascading Style Sheets)
```

It's actually less work _and_ provides a better user experience.