---
title: At what point in your build process should you optimize performance?
date: 2022-09-29T10:30:00-04:00
draft: false
categories:
- Accessibility
- Careers
- Code
- JavaScript
- Web Performance
---

Earlier today, [Wisen Tanasa shared a great thread on how he breaks his coding tasks into smaller parts](https://twitter.com/ceilfors/status/1575425216322248704), and pushes a bunch of small commits with iterative changes instead of one big commit with a bunch of stuff.

I like this approach a lot!

> Smaller commits help retain my flow state, therefore improving my productivity.
>
> To have smaller commits, you have to be able to slice your task into nano-slices. I have found adopting Angular's commit format to be helpful in the slicing activity.

The whole thread is excellent, and I highly recommend reading it.

One part of Wisen's process jumped at me, though.

## Make it work, make it right, make it fast

Wisen articulated a workflow that aims to prevent premature optimization (a valid concern).

> feat/fix > refactor > (perf)
> 
> Following @KentBeck's mantra of "make it work, make it right, make it fast".
> 
> Notice that `perf` is a separate commit type. I like performance improvement to be done as a separate effort, which encourages less premature optimisation.

I agree with this at a high level, but just like with accessibility work, it’s often faster, cheaper, and easier to bake performance in then to apply it retroactively.

And [as Ethan Gardner points out](https://twitter.com/EthanGardner/status/1575481868035977216), "Fix it later often turns into fix it never."

## When _do_ you optimize for performance?

Wisen presented an interesting scenario:

> If I tell you that a `while` loop is faster than a `for` loop in, would you fix and use a `while` loop for all of your future code?

For the sake of argument, let's pretend the performance difference of looping methods is significant and would make a big difference in site/app performance (it doesn't). Now, I have to track down and update every loop instance in my code, evaluate it, and update it. 

It would have been faster to do it right the first time.

And loops are generally easy to swap out. Real performance changes typically involve bigger changes than that. In many instances, it means approaching a problem a different way, or a refactor of a chunk of code. 

Refactoring working code is always a risky proposition. It takes time and costs money.

In many businesses, you often see PMs/companies deciding to _not_ fix obvious bugs, performance issues, and accessibility issues because, "it works most of the time for most people," or, "this is an edge case."

> Oh, that loop is slower? Only affects people on slow connections. Our best paying customers have fast machines. We'll address that later... maybe.

This sort of thing happens. ALL. THE. TIME.

## Performance is built-in, not bolt-on

Your first pass at something is often sloppy. A refactor is one of the first things I do after I get my code working. 

But I think pushing performance optimizations to the end of the process ignores the reality of both how businesses work and how web performance works.

It's not a bolt-on. It's a built-in.

(_Wisen's thread is about git flows more than web performance specifically, and it's really good. I don't want to take away from that with this discussion. [I'd strongly recommend reading the whole thing!](https://twitter.com/ceilfors/status/1575425216322248704)_)