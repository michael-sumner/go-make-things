---
title: "Just how much faster is vanilla JS than frameworks?"
date: 2020-08-25T10:30:00-04:00
draft: false
categories:
- Code
- JavaScript
- Web Performance
---

A few months ago in a private Slack channel I'm in, [Jeremy Wagner](https://twitter.com/malchata) mentioned that he'd run some performance tests on React vs. Preact vs. vanilla JS, and promised to write about the results.

Last week, he finally [wrote about his experiment, and the results, in an article on CSS Tricks](https://css-tricks.com/radeventlistener-a-tale-of-client-side-framework-performance/).

> The experiment I conducted compared the mobile nav toggle behavior across three implementations:
>
> 1. A stateful React component (React.Component) rendered on the server and hydrated on the client.
> 2. A stateful Preact component, also server-rendered and hydrated on the client.
> 3. A server-rendered stateless Preact component which was not hydrated. Instead, regular ol’ event listeners provide the mobile nav functionality on the client.

Jeremy tested a mix of low and mid-range devices (from a low-end Android phone to a laptop to a new iPhone).

The full results are really interesting, but here's the quick overview of what he found:

- Preact initially renders the UI 3-4x faster than React.
- Vanilla JS initially renders the UI anywhere from 5-10x faster than Preact, and *about 30x faster than React*!
- Handling UI state changes with vanilla JS is also orders of magnitude faster than using Preact or React.

[You should absolutely go read the whole thing and dig into the results.](https://css-tricks.com/radeventlistener-a-tale-of-client-side-framework-performance/) It's fascinating!

For me, the takeaways are clear:

- If you can get away with just vanilla JS, it will give you the best experience, period.
- If you need state-based UI, Preact is not just smaller than React, but far more performant, too.