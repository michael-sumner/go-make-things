---
title: The future of the reactive web is Vue
date: 2022-11-22T10:30:00-04:00
draft: false
categories:
- Code
- Design and UX
- HTML
- JavaScript
---

I've written and talked before about how I imagine that the web platform (as in, browsers) will absorb a lot of features that we use state-based UI libraries for today.

I'd love a JavaScript property or function that you can use [to diff the DOM](/browser-native-typescript-what-about-jsx-or-dom-diffing/) for example.

But these approaches are all very React-centric, and I think the future of state-based UI on the web is more like Vue.

I really like the idea of state tied to HTML attributes, updated by JavaScript with some simple DOM Manipulation, and baked right into the browser natively.

```html
<button @click="count++" count="0">
	Count is: ${ count }
</button>
```

The web platform is at its best when its declarative. HTML is simpler, easier, and more approachable than JavaScript.