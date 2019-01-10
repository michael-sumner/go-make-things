---
title: "Does progressive enhancement still matter?"
date: 2019-01-10T10:30:00-05:00
draft: false
categories:
- Accessibility
- Code
- Design and UX
- JavaScript
- Web Performance
---

On Twitter yesterday, [John Zomer asked](https://twitter.com/JohnZomer/status/1083013981047013376):

> How important do you think it is to think about users who turn off JavaScript in their browsers anymore? Do you think about that when considering graceful degradation/progressive enhancement?

Great question!

It’s 2019. JavaScript is an integral and important part of the web. An absurdly tiny number of people disable it (generally because of annoying pop-ups and ads and tracking terribleness).

I'm honestly not worried about the people who do that. They have valid reasons, but that's the risk they take.

But CDNs fail. Firewalls and Ad Blockers get overly aggressive with what they block. Absurdly large JS files timeout on slow connections. People browsing on mobile devices while commuting go through tunnels and lose the internet.

And for them, the effect is the same as disabling JS, only they have no control over the matter.

So, I like to build in layers and provide proper fallbacks that you enhance on top of... not for the "disable JS" people, but for everyone else who doesn't have control over what happens.