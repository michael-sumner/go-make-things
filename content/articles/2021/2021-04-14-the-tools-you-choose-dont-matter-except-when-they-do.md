---
title: "The tools you choose don't matter... except they do"
date: 2021-04-14T10:30:00-04:00
draft: false
categories:
- Code
- JavaScript
- Web Performance
---

A few weeks ago, [Dwayne Charrington tweeted](https://twitter.com/AbolitionOf/status/1372896425911062528):

> Despite what the gatekeepers tell you, it actually does not matter what Javascript framework or library you use. Whether it's Angular, Aurelia, React, Svelte, Vue, or even vanilla JS, use whatever does the job and works.

And he's right... sort of.

When you're learning, and when you're trying to prototype, whatever gets you from "I have no idea what I'm doing" to "whoa! I built a thing!" fastest is the right choice. Inertia is _so_ important for learning and prototyping and iterating.

But... the tech you choose _matters a lot_ for the people who use what you build, especially those on older devices and low-bandwidth connections.

The difference between Angular and React is like 100kb of minzipped JS, which is _huge_ on slow connections and older devices. Same for the 30kb of minzipped React versus plain old vanilla JS. And after unzipping that JS, it's 3-5x bigger. That's a lot of parsing and abstracting for "not the latest devices" to have to work with.

Saying "you should use smaller tools" isn't gatekeeping. It's advocating for the experience of the end-user over the experience of the developer.

(_FWIW, I believe Dwayne agrees with me there._)