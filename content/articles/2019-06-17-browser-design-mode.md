---
title: "Browser design mode"
date: 2019-06-17T10:30:00-04:00
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

[Austin Byrd shared an awesome browser trick](https://twitter.com/AustinTByrd/status/1138867419319955456) on Twitter that I was previously unaware of: design mode.

<video controls>
	<source src="/img/articles/design-mode.mp4" type="video/mp4">
	<source src="/img/articles/design-mode.webm" type="video/webm">
	<img alt="A screen capture of design mode" src="/img/articles/design-mode.gif">
</video>

When you switch on design mode, every piece of content in the browser can be edited by clicking on it.

To turn it on, open up the console tab of your browser's developer tools and run:

```js
document.designMode = 'on';
```

It works in all modern browsers. Thanks Austin!