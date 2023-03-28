---
title: Ditching TypeScript for JavaScript
date: 2023-03-28T10:30:00-04:00
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
- Vanilla Framework Demos
---

I often get asked what I think about TypeScript: do I use it, is it important, and so on?

TypeScript is a tool that, frankly, solves problems I've never had. Let's dig in!

## TypeScript creates more problems than it solves

I've been a developer for a decade now and never run into an issue where JavaScript's loosely typed nature has created a problem for me. Maybe I've just been lucky. Maybe if I was working on part of a larger team that wouldn't be the case.

But between [linting and unit/integration tests](https://vanillajsguides.com/testing/), I've always been really well covered.

TypeScript is not the kind of tool you just toss on top of your existing workflow and forget about. [As Kyle Shevlin wrote back in 2019...](https://twitter.com/kyleshevlin/status/1095093908038549505)

> My workflow today: 15 minutes of writing code that works and does what I want. 2 hours of trying to appease the static type gods. 😕

## Svelte is ditching TypeScript

Despite all that, it's felt like TypeScript was slowly consuming the front-end developer world, just like React had. [You have folks like Kent C. Dodds tweeting out...](https://twitter.com/kentcdodds/status/1624595023659667456)

> Unless I'm teaching you JavaScript fundamentals, everything I teach will be taught with TypeScript going forward.
>
> TypeScript has won, and it's only a matter of time you're using it whether you like it or not.

So what a breath of fresh air it was to see champion of [the lean web](https://leanweb.dev) Rich Harris talk about how [Svelte is moving away from TypeScript to plain old vanilla JavaScript in future versions](https://thenewstack.io/rich-harris-talks-sveltekit-and-whats-next-for-svelte/), just like SvelteKit already has.

> "Now that SvelteKit is out, [is] pretty widely used and stable at this point, our attention is going to switch back to Svelte itself," Harris told The New Stack. "Right now we’re working on Svelte 4, which is going to modernize the codebase."
>
> The team is switching the underlying code from TypeScript to JavaScript. That and the update will then allow the team to incorporate "big ideas" for Svelte 5 later this year, he added.

On Twitter, [Rich elaborated...](https://twitter.com/Rich_Harris/status/1639344836766576640)

>  SvelteKit is written in JS and distributed as source code — no build step — and it's been miraculous for productivity. build steps make sense for apps, they make much less sense for libraries

## Svelte aren't the only ones considering a switch back to vanilla JS

As part of that discussion, a few folks from the AstroJS team shared that [Deno is also considering switching to vanilla JS internally](https://twitter.com/jutanium/status/1639345056795570177).

The [design doc they linked to](https://docs.google.com/document/d/1_WvwHl7BXUPmoiSeD8G83JmS8ypsTPqed4Btkqkn_-4/preview?pru=AAABcrrKL5k*nQ4LS569NsRRAce2BVanXw#) includes a lot of detail, but the _Problems_ section really nails it...

> - Incremental compile time when changing files in cli/js takes minutes. This is crushingly slow and painful to modify.
>
> - The typescript organization/structure that we're using in cli/js is creating runtime performance problems. As an example, we recently realized that we're unable to to get TS to generate a class with the name "Header" because it shadows the declaration in our d.ts file. So instead we name the class "HeaderImpl" and assign it to "window.Header". But that creates the problem that "Header.name" has the wrong value. So we're forced to add unnecessary runtime code 
>
> 	```js
>	Object.defineProperty(HeaderImpl, "name", { value: "Header" });
> 	```
> 
> 	to fix "Header.name". Who knows if this kicks Header out of some optimization path in V8. The optimal thing is to generate "class Header { ... }" anything less suggests a fundamental flaw in the design.
> 	
> - TypeScript is supposed to be helping us organize code, but one could claim it has the opposite effect. For example, we have two independent Body classes https://github.com/denoland/deno/issues/4748. This is difficult to have visibility into because of the complexity involved with generating the runtime code. Ideally we would have a system where two Body classes would be obviously wrong.
> 
> - Our internal code and runtime TS declarations must already be manually kept in sync. TSC isn't helping us to generate the d.ts files - it was too much overhead and complexity when we attempted it before.

## Making more thoughtful decisions about tooling

To me, this all speaks to something I tell my students all the time: use tools when they help, and skip them when they don't.

Our tendency to just blinding reach for tools because it's what Google or Facebook does often just makes things worse for both developers and the people who use what they build.

It's great to see a swing back in the other direction.