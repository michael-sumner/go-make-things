---
title: "Some additional thoughts on CSS-in-JS"
date: 2018-05-07T10:30:00-04:00
draft: false
categories:
- Accessibility
- Art and Science
- Business and Leadership
- Careers
- Code
- CSS
- Design and UX
- HTML
- JavaScript
- Technology
- Web Performance
- WordPress
---

The other week, I wrote about [what's wrong with CSS-in-JS](https://gomakethings.com/whats-wrong-with-css-in-js/) (and talked about it on my [vanilla JS podcast](https://vanillajspodcast.com)).

I had a few thoughtful responses from folks that I wanted to share here.

## Lack of portability

[Brad Frost expanded on some of my thoughts](http://bradfrost.com/blog/link/whats-wrong-with-css-in-js/) with some more nuance and added some other reasons why CSS-in-JS not a good approach to front end development.

The one that really jumped out at me is this:

> **Lack of portability:** So much of my work involves helping gigantic organizations create and deploy design systems to [a vast array of tech stacks](http://bradfrost.com/blog/post/managing-technology-agnostic-design-systems/). Even if CSS-in-JS is a more powerful, elegant solution, it only works for JS-driven environments. So what happens if an organization has some React projects in play, but also has some Drupal, WordPress, or [anything else] projects they need to unify under the same design system? Do they have to re-platform their whole technical architecture just to get updated button styles?

[Go read Brad's full post for more.](http://bradfrost.com/blog/link/whats-wrong-with-css-in-js/)

## Arguments in favor of CSS-in-JS

My buddy [Andrew Borstein](http://andrewborstein.github.io/portfolio/) made some interesting points in favor of CSS-in-JS, shared here with his permission.

> I think there’s a really interesting conversation to be had here around different approaches to CSS and styling. To me the main driver seems like the advent of large scale web applications — not blogs or content-based sites, but what seem to me like “Web 3.0” _software_. Along with that comes increased scale, more distributed contributors, and often an increased pace of work. Those things can make it a lot more challenging to embrace the built-in features of CSS, like the global scope, cascade, and, well, choosing naming conventions.
>
> I’ve had the chance now to work in what would, relatively speaking, be considered a very small team at a very small company, with a (kinda) small app. I’ve worked with some incredibly talented developers that could not figure out how to keep their CSS styles from turning into an insane pile of spaghetti. It got to the point where we couldn’t add a button to a new form without including an extra entire page of styles to override to overly aggressive and specific styles put in place elsewhere.
>
> It’s totally possible lots of devs just don’t understand CSS well enough, at least not well enough to be trusted to use it at scale in complex applications. But I do think some of the features of CSS are inherently dangerous — it’s a tradeoff, with more power comes more responsibility 🙃
>
> Allowing a dev to use `button { background: blue }` and have it affect, by default, _every single button_ is a totally different philosophy than used in most OOP.
>
> And I think the biggest challenge is not just understanding CSS and how to use it, but that testing CSS is somewhere between annoying and impossible. Unit testing and feature testing. That’s probably the biggest reason devs who don’t know how to use it well want to avoid using it altogether, because it’s really hard to set up good tests to make sure one change here doesn’t screw stuff up wayyyy over there. Or right here for that matter.
>
> You need lots of manual QA or visual regression testing software. But it’s the type of stuff that’s not natively accessible. Like you can write JS tests in JS, very easily, and be confident in them to catch bugs. But even having automated visual regression testing for a full kitchen sink component library with all your UI in its various states isn’t guaranteed to catch and test the interactions of all these pieces together, i.e. the cascade.
>
> And actual browser feature tests are the most annoying thing in the world, e.g. selenium and capybara. When it’s hard to write tests and to trust them for a given technology, it’s tempting to just avoid it. Or, in this case, rewrite the technology, change the way we use it.
>
> On my team, as we’re rebuilding our entire app in React on the front-end, I’m pushing us into an almost exclusively atomic CSS world, and so far it’s been a really awesome transition. We’re building a lot faster, our stylesheets are plateau-ing, not ballooning. New developers can get up to speed really quickly. We can still have a design _system_, which lends itself to better UX. I’m not personally ready to go the CSS-in-JSS route, but I absolutely see its appeal.
>
> CSS is hard! And the fact that it’s _not_ a programming language is in and of itself a reason to be nervous using it. It’s more of a black box, and one that requires more discipline to maintain control over.
>
> And for whatever reason, lots of big apps/teams are feeling similar pain, and finding novel solutions.

There's a lot to unpack here, and I won't try to discuss all of Andrew's points, but I did want to touch on just a few of them.

Fist off, Andrew's focus is on web things that are pretty different from what I often build (but not always), and I'm also a solo dev, so a lot of the "team issues" I hear come up don't affect me quite as much.

That said...

### Apps vs. Sites

> To me the main driver seems like the advent of large scale web applications — not blogs or content-based sites, but what seem to me like “Web 3.0” _software_. Along with that comes increased scale, more distributed contributors, and often an increased pace of work. Those things can make it a lot more challenging to embrace the built-in features of CSS, like the global scope, cascade, and, well, choosing naming conventions.

This still feels to me like throwing engineering at two people problems:

1. The internal code is badly documented, so you need safeguards in place to prevent people from messing it up.
2. JS developers often don't know CSS that well.

For my money, I'd rather fix those than undo a decade of CSS best practices. The problems are real. I just disagree with the solution.

### Testing CSS

> And I think the biggest challenge is not just understanding CSS and how to use it, but that testing CSS is somewhere between annoying and impossible. Unit testing and feature testing. That’s probably the biggest reason devs who don’t know how to use it well want to avoid using it altogether, because it’s really hard to set up good tests to make sure one change here doesn’t screw stuff up wayyyy over there. Or right here for that matter.

This is super spot on!

I wouldn't call unit testing JS easy, but you can write JS tests in JavaScript, and once you learn the conventions, it gets *easier*.

But how do you test visual changes? How do you identify if they were intentional or not? I've done some of this in a previous career, and it's AWFUL. It involved a lot of command line based screenshots, copy/pasting, rerunning code, and trying to figure out why something was one fucking pixel off from the previous set of screenshots.

I'd love a more simple, straightforward way to automate testing CSS.

### CSS is Hard

> CSS is hard! And the fact that it’s _not_ a programming language is in and of itself a reason to be nervous using it. It’s more of a black box, and one that requires more discipline to maintain control over.

This is the one statement of Andrew's I most strongly disagree with.

CSS, especially the more advanced stuff, *is* hard. But so is JavaScript. And because it's visual, it feels like less of a blackbox to me than JavaScript. YOu can literally see what it's doing right in front of you.

### Teams and Communication

Many of the challenges CSS-in-JS aims to fix seem to be rooted in poor training, poor communication, and skill gaps across development teams.

CSS-in-JS is absolutely a novel solution that helps address those challenges. But it also places developer ease above end-user experience, and throws engineering at what is fundamentally a people problem.

I think we can do better.