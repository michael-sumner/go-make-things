---
title: "Accessible HTML Patterns"
date: 2018-12-21T10:30:00-05:00
draft: false
categories:
- Accessibility
- Code
- HTML
---

My buddy Eric Bailey maintains [a big collection of accessible HTML patterns](https://ericwbailey.github.io/accessible-html-content-patterns/).

Right-Click > Inspect Element to checkout the right accessible markup to use for a ton of common HTML patterns and components. For example, the [symbols sections](https://ericwbailey.github.io/accessible-html-content-patterns/#subsection-symbols) documents how to make symbols like `+` and `<` more accessible.

Here's what the plus symbol should look like:

```html
<span role="definition" aria-label="Plus">+</span>
```

Thanks to Eric for publishing this awesome resource! [Go check it out on GitHub.](https://ericwbailey.github.io/accessible-html-content-patterns/)