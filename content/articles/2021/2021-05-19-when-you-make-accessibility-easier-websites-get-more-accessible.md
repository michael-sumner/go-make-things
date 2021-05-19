---
title: "When you make accessibility easier, websites get more accessible"
date: 2021-05-19T10:30:00-04:00
draft: false
categories:
- Accessibility
- Code
- Design and UX
- HTML
- JavaScript
---

Yesterday, I wrote about how [I wish there were more native HTML elements](/accessibility-is-hard.-its-also-your-job./) for common interaction patterns that people usually implement inaccessibly.

> What I’d love to see more of are native accessible elements that make this easier, for things like…
>
> - Toggle tabs (ex. `<tab>` and `<tabcontent>`)
> - Dropdown menus (ex. `<dropdown>` and `<summary>`, like the `<details>`/`<summary>` elements)
> - Modals (as in a `<dialog>` element that actually works!)
> - Photo galleries and carousels (ex. `<gallery>` and `<galleryitem>`)

This is a big, obvious, "yea no shit" kind of thing to state, but: when you make accessibility easier, websites get more accessible.

For the last few years, the accessibility group WebAIM has published [an annual accessibility report on the top 1 million sites on the web](https://webaim.org/projects/million/). And every year, the results are really disheartening.

And every year, sites that use frameworks have more accessibility errors than sites that don't.

> the adoption of any of these frameworks corresponded with more accessibility errors than the average home page. This does not necessarily mean that the frameworks caused these errors, but home pages with these frameworks had more errors than on average.

There was one notable exception this year, though: React.

The React community invested a _lot_ of effort in making their tools and their most popular components more accessible. And when you make it easy for people to implement accessible features, the things they make get more accessible.

Now, I'm not suggesting you rush out and immediately switch to React. But I do think they've _paved the cow paths_ a bit in demonstrating clearly that there's a need for simple, accessible components.

I want to see those at the platform level. We shouldn't _need_ frameworks for that.