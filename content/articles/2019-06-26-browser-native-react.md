---
title: "Browser-native React"
date: 2019-06-26T10:30:00-04:00
draft: false
categories:
- Code
- JavaScript
---

A few weeks ago, [Laurie Voss of NPM (not so obviously jokingly) tweeted](https://twitter.com/slightlylate/status/1135342338606153729):

> BUILD REACT INTO THE BROWSER YOU COWARDS

While Laurie was joking, this is something that's been seriously proposed before.

The "build X into the browser" refrain isn't new, either. For a long while, it was, "Build jQuery into the browser!" Then, "Build Backbone into the browser!"

Now it's React.

Alex Russell, a developer for Google Chrome and fellow [lean web advocate](https://gomakethings.com/talks/the-lean-web), didn't realize it was a joke (I didn't either), and provided [a detailed and thoughtful explanation of why browser vendors wouldn't do that](https://twitter.com/slightlylate/status/1135342338606153729).

The whole thread is worth a read, but here are some of my favorite parts.

## Why you would want to do this

> The benefit to browsers from integration is potential for efficiency; less code on the wire.
>
> Current JS ecosystem practice (which @seldo's product has done more than any other to exacerbate) is to externalize costs onto users at runtime.

I rant about this often. We use too much JavaScript. Period.

Offloading more of the external stuff to native browser features is better for everyone. That doesn't inherently mean, "bake React into the browser," though.

jQuery isn't browser-native, but many of it's conventions became browser features.

We got better selection tools with `querySelector()` and `querySelectorAll()`. The `classList` API makes manipulating classes so much easier. Methods like `Array.forEach()` make looping trivial compared to using `for` loops.

## What "build React into the browser" means

Baking React in doesn't have to be a literal statement.

> let's consider what it might mean...there are many versions! A few:
>
> 1.) *literally do exactly this*
> 2.) add building blocks
> 3.) start from syntax

## Literally baking it in

There are many reasons you wouldn't want to do that.

> The first is a re-casting of the old "why don't you put jQuery into the browser?" saw. This doesn't work for a few reasons, starting with compat. Which version *specifically*? We can't bloat our binary infinitely, so there are limits. Does everyone get upset when we evict one?
>
> Next, security updates will now require browser engineers to pay attention to all the ways in which a specific bit of 3p code can be subverted and tend to updates accordingly...updates that can break users. This is a big tax.
>
> But the biggest reason we never did this with jQuery (and it likely holds for React) is that *not enough people use the same version*. There's a constituency that looks like "all jQuery developers", but when you look at it closely, it's a small, narrow per-version constituency.

I still run across codebases using pre-v1.8.x jQuery. Sometimes, they also load post-v1.8.x jQuery, too, and it can break the older code.

## Borrowing conventions

> As for bringing up the platform to meet libraries (#2), we've been hard at work on this! ...
>
> Because we serve more than one framework (because option #1 isn't "The Plan"), this needs to be generic.
>
> Capabilities we've added over the years live under identical constraints:
>
> - must be backwards compatible with existing syntax and semantics
> - must be usable by any/all developers in granular, layered ways (see: https://extensiblewebmanifesto.org )
> - must serve more than one customer
>
> This, plus standards, makes "just putting something in the browser" much, much, much harder than it looks from the outside (unless you go with #1, which we don't for the previously discussed reasons).
>
> We pay a heavy tax for fairness. Is that the right thing to do? Usually, yes.

As I mentioned before, we've seen this with pulling *conventions* from jQuery (and lodash and underscores) into browser-native APIs.

While I don't like frameworks, they do often provide a useful model for how the browser *could* work. We learn from them, steal the ideas that make sense, and ignore the ones that don't.

## Frameworks recreate the wheel

Something I've talked about before but have never given really good, specific examples for is that frameworks often recreate browser-native functionality in their own syntax.

> React itself contains a ton of platform-level duplication, e.g. the events system... which is in addition to a great deal of over-polyfilling by default in most of the available toolchains.

## What comes next?

Personally, I'd love to see browser-native DOM-diffing and state-based UI methods.

Where React and Vue (and their lighter weight cousins hyperHTML and Svelte) really shine is in DOM diffing and automated, gentle DOM manipulation.

Being able to say "this is how the UI should look based on the data I have," and then letting the code figure out what's different between the current UI and the desired one and what needs to change, is amazing. It's better for both developers and end-users.

If we integrate anything from frameworks into the browser, I really hope it's that!