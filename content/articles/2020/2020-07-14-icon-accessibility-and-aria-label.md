---
title: "Icon accessibility and aria label"
date: 2020-07-14T10:30:00-04:00
draft: false
categories:
- Accessibility
- Code
- HTML
---

Sometimes, user interfaces include icons without any supporting text.

For example, here's an SVG icon of a cloud with an arrow pointing down out of it. In this app, it's supposed to mean "download."

```html
<button>
	<svg xmlns="http://www.w3.org/2000/svg" height="1em" width="1em" viewBox="0 0 16 16"><path fill="currentColor" d="M13.922 5.626A3.72 3.72 0 0010.205 2a3.712 3.712 0 00-2.92 1.418 2.09 2.09 0 00-3.719 1.573 3.028 3.028 0 00-3.567 2.98A3.028 3.028 0 003.026 11H4.46l3.539 3.664L11.538 11h1.742a2.725 2.725 0 00.641-5.374zM8 13l-3-3h2V7h2v3h2l-3 3z"/></svg>
</button>
```

If you're *not* visually impaired, you might be able to figure that out. If you rely on a screen reader, though, this button will announce, "button."

That's it. "Button."

So, how do you use icons for buttons accessibly?

The `[aria-label]` attribute let's you add what's called an *accessible label*. This is text that's read aloud by screen readers, but is not visually exposed to users.

```html
<button aria-label="Download">
	<svg xmlns="http://www.w3.org/2000/svg" height="1em" width="1em" viewBox="0 0 16 16"><path fill="currentColor" d="M13.922 5.626A3.72 3.72 0 0010.205 2a3.712 3.712 0 00-2.92 1.418 2.09 2.09 0 00-3.719 1.573 3.028 3.028 0 00-3.567 2.98A3.028 3.028 0 003.026 11H4.46l3.539 3.664L11.538 11h1.742a2.725 2.725 0 00.641-5.374zM8 13l-3-3h2V7h2v3h2l-3 3z"/></svg>
</button>
```

The `[aria-label]` text is read instead of any content inside the element, including otherwise accessible text.

In addition to icons, it can be useful when the context of a link or button might be apparent to sighted users, but confusing for visually impaired users.

For example, a sighted user might be able to infer that a "read more" link is for the article before it, while a screen reader user tabbing through links might not.

The link below would be announced as "Read more about pirates," instead of "Read more...".

```html
<a href="link-to-article.html" aria-label="Read more about pirates">
	Read more...
</a>
```