---
title: How to write good comments
date: 2022-03-01T10:30:00-05:00
draft: false
categories:
- Code
- JavaScript
---

Dr. Kate Compton shared [this delightful little one-sentence gem about how to write good comments](https://twitter.com/GalaxyKate/status/1497733203611852803) on Twitter last week...

> Programming pro tip: In your comments, write what you did and why, record your level of petulance (REALLY) and the StackOverflow link that made you realize something

She also shared a sample comment, which I've [converted to JSDoc style](/documenting-javascript/).

```js
/**
 * Copy into the local scope
 * NOTE: this has issues with scope for eval'ing list comprehensions, which sucks
 * {@link https://stackoverflow.com/questions/45194934/eval-fails-in-list-comprehension}
 */
```

I love it!