---
title: "Is Array.reduce() bad?"
date: 2020-01-28T10:30:00-05:00
draft: false
categories:
- Careers
- Code
- JavaScript
---

Two weeks ago, the HTTP 203 Podcast released a video called [Is reduce() bad?](https://www.youtube.com/watch?v=qaGjS7-qWzg).

<iframe width="560" height="315" src="https://www.youtube.com/embed/qaGjS7-qWzg" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

It's an interesting episode.

If you've been reading my articles for a while, you know that I'm an avid fan of `Array.reduce()`. It's my favorite JavaScript method (yes, I have a favorite).

But the `Array.reduce()` method also has a weird syntax that's often hard for people to understand. The video isn't really an attack on `reduce()` so much as an attack on developers who try to make their code too clever, something [I've written about before as well](/readability-is-more-important-than-brevity/).

Some key takeaways for me:

- Don't use `Array.reduce()` when another array method (`map()`, `filter()`, etc.) would work just as well.
- Do use it when it you can replace a series of chained array methods that might hurt performance with a single one (I think the podcast actually disagrees with me here).
- Do use it when you would otherwise need to use a series of different manipulations. Sometimes `reduce()` actually makes things simpler.

It bears repeating one more time: don't use clever code when simple code will work just as well.