---
title: "Yes, vanilla JS does scale"
date: 2021-01-08T10:30:00-05:00
draft: false
categories:
- Code
- HTML
- JavaScript
- Web Performance
---

There's a never-ending myth I see circulating on Twitter every few weeks:

> Vanilla JS doesn't scale.

This is complete nonsense.

## What does "scale" even mean?

**Is the implication is that vanilla JS literally cannot handle the load of large applications the way frameworks can?** That's obviously untrue, as every single framework is powered by vanilla JS under-the-hood. They can only work "at scale" if vanilla JS can as well.

**Do they mean that it can't work well for large teams building big things?** If so, [no one better tell that to GitHub, Basecamp, or Netflix](https://vanillajslist.com/).

"Scale" an empty but important sounding word used to dismiss vanilla JS because you don't like it while sounding like there's a valid reason behind it.

## The Virtual DOM is not a magic potion

With this conversation, I see a lot of folks say things like:

> The virtual DOM is more performant than vanilla JS.

First, again, the virtual DOM is _built with_ vanilla JS. It _can be_ more performant than vanilla JS when making lots and lots of updates to lots and lots of deeply nested HTML elements (inspect element on the Twitter UI sometime to see what I'm talking about).

But in many cases, the virtual DOM is actually slower and less performant&mdash;both for intial page load _and_ UI updates&mdash;than using vanilla JS. [Jeremy Wagner did some research on this last year for CSS-Tricks.](https://css-tricks.com/radeventlistener-a-tale-of-client-side-framework-performance/) Vanilla JS is _orders of magnitude_ faster than React.

## Vanilla JS doesn't always mean "writing your own framework"

A lot of folks can't seem to wrap their heads around the idea that there are ways to build websites other than using a framework.

As a result, you see really catchy but absurd statements like this:

> If you're not using a framework, you're writing your own poorly documented one.

A little known fact: you can built websites, and even large applications, without a framework!

One common approach (used by companies like GitHub and Basecamp) is to build server-side first applications that you augment with JavaScript. That means every single view in the app is generated with server-rendered HTML, using whatever your preferred server language is. That might be PHP, or Ruby, or even node-powered JS.

Once the site is in the browser, JavaScript can take over an _augment_ the user experience.

That might mean using Ajax for form submissions but otherwise doing full page reloads for navigation (what GitHub does). Or, it could mean using Ajax to asynchronously fetch the entire HTML (from the server) on route changes and updating the UI.

## Sometimes it does mean writing your own framework, and that's OK

Sometimes, in the case of Basecamp, that actually _does_ mean writing your own framework. That's not inherently bad.

Frameworks solve a bunch of problems, and introduce more of their own. They force particular conventions, tools, and dependencies on you. They come with their own bloat, and solutions to problems you and your organization might not face.

Before Google created Angular, Backbone JS existed. They created their own anyways. Angular was already around when Facebook created React. And even though React was popular, Evan You still created Vue.

There are plenty of valid reasons to create your own framework, and pithy social media comments don't change that.

## If you don't need a framework to scale, why do companies use them?

Whenever I mention that "vanilla JS _does_ actually scale," I get asked:

> Well, why do so many companies use frameworks, then?

A whole bunch of reasons!

- Because of a belief that using "the new hotness" will attract the best developers
- Because the developers who made the tech decision wanted "to try something new" (seriously, [that happened at Mozilla](https://github.com/mdn/sprints/issues/967))
- Because the executive who made the tech decision was told you need frameworks to scale at a conference they attended
- Because one of their big competitors rebuilt their site using React, so maybe they should, too
- Because "if it's good enough for Facebook, it's good enough for us"
- Because it actually solves real problems they have

Far too often, that last one isn't actually the reason. And when it is, there are often other smaller and more performant tools that solve the problem just as well with less of an impact on the user.

Because vanilla JS definitely scales. But frameworks? Not always.