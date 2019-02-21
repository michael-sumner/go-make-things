---
title: "When it's OK if a browser doesn't support a feature"
date: 2019-02-21T10:30:00-05:00
draft: false
categories:
- Accessibility
- Code
- CSS
- Design and UX
- HTML
- JavaScript
- Technology
---

Yesterday, we looked at [a technique for building JavaScript-free accordions](/javascript-free-accordions/).

I mentioned that it has no IE or Edge support, and that I was perfectly OK with that. So... why did I decide it's perfectly fine to not support a feature for a major browser?

For me, the line is access to content.

When the `details`/`summary` feature isn't supported by a browser, users get... all of the content. The toggle is shown, the content is shown, and nothing ever gets hidden.

To me, the expand/collapse functionality is a progressive enhancement. Great for users that support it, but an extra nicety that browsers that don't can comfortably go without.

If that content was hidden and inaccessible on unsupported browsers, I would feel differently.