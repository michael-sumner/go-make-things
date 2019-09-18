---
title: "The developer experience is bullshit"
date: 2018-09-13T10:30:00-04:00
draft: false
categories:
- Accessibility
- Code
- CSS
- Design and UX
- HTML
- JavaScript
- Web Performance
---

This week, Alex Russell published an article titled ["The developer experience bait-and-switch,"](https://infrequently.org/2018/09/the-developer-experience-bait-and-switch/), and I found myself nodding in agreement with every single sentence he wrote.

> **TL;DR:** we cannot continue to use as much JavaScript as is now “normal” and expect the web to flourish. At the same time, most developers experience no constraint on their use of JS... until it’s too late. “JS neutral” and “TTI negative” tools are here, but we’re stuck in a rhetorical rut. We need to reset our conversation about “developer experience” to factor in the asymmetric cost of JS.

👏👏👏

Hell. Fucking. Yes.

Alex summarizes the arguments in favor of bloated JS tooling like this.

> Here’s a straw-man composite from several recent conversations:
>
> "These tools let us move faster. Because we can iterate faster we’re delivering better experiences. If performance is a problem, we can do progressive enhancement through Server-Side Rendering."
>
> This argument substitutes good intentions and developer value (“moving faster”, “less complexity”) for questions about the lived experience of users. It also tends to do so without evidence. We’re meant to take it on faith that it will all work out if only the well intentioned people are never questioned about the trajectory of the outcomes.
>
> Most unfortunately, this substitution is frequently offered to shield the preferences of those in a position to benefit at the expense of folks who can least afford to deal with the repercussions. Polluters very much prefer conversations that don’t focus on the costs of emissions.

The argument is that developer ergonomics (that is, how easy it is for a developer to write code) leads to faster iteration of product, which is better for the user.

But this strikes me as being a bit like trickle-down economics. It feels like it *should* make sense, but that's not how it works in reality.

Just as tax cuts for businesses often don't lead to new jobs, but instead lead to bigger bonuses for executives or shareholder payouts, more JS often leads to developers having an easier time writing *even more* JS, and the cycle continues.

Here's an example of the insanity.

1. This new JS framework let's me write more code, more quickly, but it's big and makes the site slow.
2. That's ok, I'll add *another* JS extension for it so that it renders on the server, too.
3. I'm still loading a shit-ton of JS on the front end, so I'll add *yet another* JS module that decides what's needed on this page and only loads that.
4. Now that I'm looking at it, my CSS file is pretty bloated, too, because my expertise is actually in JS. Let me add *yet more JS still* to decide what CSS is needed on the page and inline that, breaking the cascade in the process.
5. And on, and on, and on...

It's 2018.

We have the tools to make the most insanely fast websites and apps ever, using a solid foundation of HTML, well structured CSS, and just enough JS to add interactivity and flourishes.

Instead, we reduce our use of HTML and CSS to byproducts of an ever-growing mess of fragile, expensive JavaScript.

We can do better. We *need* to do better.

People who aren't us---who don't have expensive fiber-optic internet connections and the latest devices and the best browsers---they can't use the stuff we build with all this JS. It's too slow, and it's too expensive.

If you really believe that "the web is for everyone," then you use as little JS as possible.