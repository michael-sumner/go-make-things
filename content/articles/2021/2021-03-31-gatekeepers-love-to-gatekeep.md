---
title: "Gatekeepers love to gatekeep"
date: 2021-03-31T10:30:00-04:00
draft: false
categories:
- Accessibility
- Code
- JavaScript
---

In yesterday's article [on documenting code](/documenting-javascript/), I wrote.

> A lot of senior developers are obsessed with the idea of “self-documenting code.” That is, code whose purpose is so obvious that it doesn’t need documentation.
>
> This is a myth.
>
> What’s obvious to you may not be obvious to someone else reading your code. Documenting helps them work faster and easier. The self-documenting code myth is a form of gatekeeping.

And of course, some random dude on Twitter replied:

> I'm tired of people calling everything they don't like "gatekeeping."

Nah, nope. This ain't that. Let's dig in.

## What _is_ gatekeeping?

If you’re not familiar with the term _gatekeeping_, it’s the practice of actively restricting and controlling access to something.

## How is the self-documenting code myth gatekeeping?

The self-documenting code myth says that your code shouldn't need documentation to be understood. It should be so simple and straightforward that you can understand it just by looking at it.

So, what happens when a junior developer _can't_ understand your code just by looking at it, and you were too lazy to add a few lines of documentation to it?

They're restricted from working with it. That's gatekeeping.

I'm not arguing that your code shouldn't be simple, clear, and easy to read _without_ documentation. It should be. But you should document it, too.

## Something isn't gatekeeping just because you don't like it

I don't like arrow functions. I used to hate them, now I begrudingly tolerate them because everyone uses them.

Arrow functions _are not_ gatekeeping.

Using arrow functions doesn't keep someone from accessing your codebase (unless they don't know how arrow functions work, but that's true of any function or method, and why documentation is important).

[Modern tooling _might be_ gatekeeping](/modern-js-is-gatekeeping/), as [illustrated by the WordPress Gutenberg project's use of React](https://leanweb.dev/ebook/modern-best-practices/#gatekeeping-has-business-consequences), and how that locked their own accessibility team out of the process.

> Because no one on the team has React experience (nor could they find volunteers in the A11Y community), they couldn’t effectively work on improvements themselves.
>
> This made it very difficult for Rian and her team to do the work they were tasked with doing.
>
> In May of 2019 [a detailed A11Y audit of the new Gutenberg editor was conducted](https://wpcampus.org/2019/05/gutenberg-audit-results/). It was a 329 page report detailing various accessibility issues. The executive summary alone was 34 pages, and it documented 91 accessibility related bugs in quite a bit of detail.
>
> So much of this could have been avoided if Rian and her team hadn’t been locked out of the process because of technology choices.

## Senior developers elevate those around them

I'm continually amazed at how resistant so many senior-level developers are to documentation.

I don't care how many years of experience you have or how technically capable you are. If you refuse to elevate the people around you, you're not a senior anything.

There is some nuance here, of course. For example, neuroatypical folks may struggle with communication in a way that makes teaching and training others difficult for them. Not everyone needs to be a manager, a coach, or a mentor.

But if you actively work against things that broaden access to code, you're kind of a jerk.