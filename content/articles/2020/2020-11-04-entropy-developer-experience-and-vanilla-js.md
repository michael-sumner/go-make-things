---
title: "Entropy, developer experience, and vanilla JS"
date: 2020-11-04T10:30:00-05:00
draft: false
categories:
- Careers
- Code
- CSS
- Design and UX
- HTML
- JavaScript
- Web Performance
---

Last month, [Jim Nielsen published an article on "cheating entropy with native web technologies,"](https://blog.jim-nielsen.com/2020/cheating-entropy-with-native-web-tech/) and it just hit on *so many things* I've experienced and feel strongly about.

> When I open an old project like number two (described above) [built with libraries and abtractions], I find entropy staring me back in the face: library updates, breaking API changes, refactored mental models, and possible downright obsolescence. An incredible amount of effort will be required to make a simple change, test it, and get it live.
>
> Conversely when I open an old project like number one (described above) [built with vanilla HTML, CSS, and JS], I find myself relieved. A project authored in native web technologies, enhanced with an eye towards the future, with little or no tooling, leaves me facing few obstacles. Remove a couple shims that are no longer needed and that’s about it. Imagine that: you can remove code to update a project?

I talk about this a bit in my talk and book, [The Lean Web](https://leanweb.dev).

In it, I describe the deep dependency chains that modern tooling forces on you. It's a house of cards that collapses around you the moment one dependency goes out-of-date.

Jim describes it like this:

> On the other hand, a project built on abstractions from native web technologies—frameworks, tooling, language sub/supersets—will contain innumerable dependencies with countless major version changes over time. Updating a single dependency often requires updating everything. Building on top of base web technologies, where possible, is a way to cheat the entropy and churn of modern web technology abstractions.

Jim's come to the same conclusion I have: that native web technology results in a *better developer experience* than the tooling that's supposed to do just that.

> The more I author code as it will be run by the browser the easier it will be to maintain that code over time, despite its perceived inferior developer ergonomics (remember, developer experience encompasses both the present and the future, i.e. “how simple are the ergonomics to build this now and maintain it into the future?) I don’t mind typing some extra characters now if it means I don’t have to learn/relearn, setup, configure, integrate, update, maintain, and inevitably troubleshoot a build tool or framework later.

[Go read Jim's whole post.](https://blog.jim-nielsen.com/2020/cheating-entropy-with-native-web-tech/) I think you'll really enjoy it.