---
title: CSS Grid vs. Flexbox for layout
date: 2022-10-14T10:30:00-04:00
draft: false
categories:
- Code
- CSS
- Design and UX
- HTML
---

I recently saw a tweet that asked...

> CSS dev... grid or flexbox?

I have a personal tendency to pick "the one way" to do things and stick with it for as long as I possibly can. For example, [I pretty much always use `let` and never use `const` or `var`](/the-difference-between-let-var-and-const-for-defining-javascript-variables-and-why-you-should-probably-just-use-let/) because I just don't want to have to think about it.

In coding, there's often multiple ways to accomplish the same task, and it often doesn't matter which one you pick.

But it's also import to recognize that sometimes different tools are designed for very different jobs, and pick the one you use accordingly. In the case of layout, CSS Grid and flexbox were built with two very different use cases in mind.

When you want your layout to adjust and _flex_ to your content... use Flexbox. When you want the content to conform to a specific layout... use Grid.

You don't have to pick just one or the other. You can mix and match then in your layout as needed.

You might use Flexbox for your nav menu, where the number of items might vary over time and you want them always be evenly spaced no matter what. You might choose CSS Grid for a list of projects on your portfolio page, though, because you want them presented in a very specific way with every item in a specific place.

Modern CSS gives us some amazing tools that we only dreamed of ten years ago. You don't have to pick just one!

If you want to learn more, [Jen Simmons has a great video explaining the differences between them for her Layout Land YouTube series](/flexbox-vs.-css-grid/).