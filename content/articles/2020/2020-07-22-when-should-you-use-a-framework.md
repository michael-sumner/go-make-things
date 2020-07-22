---
title: "When should you use a framework?"
date: 2020-07-22T10:30:00-04:00
draft: false
categories:
- Code
- JavaScript
- Web Performance
---

I advocate [embracing the web platform](https://leanweb.dev/ebook/lean-web-principles/) whenever you can. But [vanilla JS doesn't mean hand-writing every single line of code](/no-vanilla-js-doesnt-mean-hand-writing-every-single-line-of-code/).

Sometimes, using a helper function or two is enough. Other times, a plugin. And sometimes, a full-fledged library or framework is the right call.

One question I get asked quite a bit is:

> When should you use a framework? How do you know when it makes sense, and when vanilla JS is "enough."

There's some nuance here.

1. If you're building an app above a certain level of complexity, I personally think [state-based UI](/how-to-create-a-reactive-state-based-ui-component-with-vanilla-js-proxies/) makes things easier to manage and less prone to errors.
2. If you're using state-based UI that updates reactively to user interactions, you want to [use DOM diffing](/dom-diffing-with-vanilla-js/) instead of just re-rendering the whole UI with innerHTML.
3. If you're going to use DOM diffing, _then_ it's a good idea to reach for a framework because it's really complicated and hard to do well.

If you're going to use a library or framework, I recommend using a smaller one that forgoes a "virtual DOM."

Options like [Preact](https://preactjs.com/), [AlpineJS](https://github.com/alpinejs/alpine/), or my own [ReefJS](https://reefjs.com/) fall into that bucket. They're a fraction of the size of React and Vue, and actually [more performant for moderately sized apps](https://timkadlec.com/remembers/2020-04-21-the-cost-of-javascript-frameworks/).

If you're building apps with tons of data and DOM nodes (think Facebook, Twitter, Quickbooks), a full-sized framework like React or Vue may be a better choice.