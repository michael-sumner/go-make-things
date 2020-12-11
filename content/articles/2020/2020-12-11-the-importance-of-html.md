---
title: "The importance of HTML"
date: 2020-12-11T10:30:00-05:00
draft: false
categories:
- Accessibility
- Code
- Design and UX
- HTML
---

Earlier this year, Jerry Jones wrote [an awesome piece of the beauty and importance of HTML](https://jerryjones.dev/2020/04/20/the-importance-of-html/).

> HTML has clearly right and wrong ways to write it, and this is too often ignored. Here are several examples I’ve seen in the wild:
>
> - A “button” that’s actually a clickable `<div>` and not a `<button>`.
> - A “title” that’s actually a `<div>` and not a heading element (`<h1>`, `<h2>`, etc).
> - A “label”” for an `<input>` that’s actually a `<div>`.
> - An “input” that’s actually a `<div>` with keydown listeners.

> Notice a pattern? Looking at you, `<div>`. 👀

> The essential issue is using a non-semantic element when a semantic element should have been used.

In the article, Jerry digs into why choosing the semantically correct element for the task you're trying to achieve is so important, particularly for accessibility, but also for user experience in general.

[Go give the whole thing a read.](https://jerryjones.dev/2020/04/20/the-importance-of-html/)