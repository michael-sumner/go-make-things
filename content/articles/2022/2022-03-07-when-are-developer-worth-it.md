---
title: When are developer worth using, and when do they just add more overhead?
date: 2022-03-07T10:30:00-05:00
draft: false
categories:
- Accessibility
- Careers
- Code
- CSS
- Design and UX
- HTML
- JavaScript
---

Over the weekend, [Ben Vinegar tweeted...](https://twitter.com/bentlegen/status/1500574177673289733)

> I don’t understand the agenda of “web development is too complicated now” people ... what is the endgame?
> 
> Before Prettier I spent needless hours bikeshedding code style minutiae with my coworkers. If you want those days back, delete .prettierrc and go nuts.
> 
> Before ESLint (or TypeScript), it was common to deploy syntax errors because of easy typos like misspelling “var” or “function”. If you want that freedom again, remove .eslintrc and step through the time machine.
> 
> Having a bunch of dotfiles in a folder is not indicative of needless complexity. It is an acknowledgment that this was always complicated, but now we have tools to deal with it.
>
> I would never go back.

Ben and I had a really good chat about this!

Some of the other folks who joined in raised some questions about when tools cross that threshold from being value add to "needlessly complex," and that's something I wanted to explore today.

Let's dig in!

## The education industrial complex

I've written a bit about this topic before, and shared [a link to this article with Ben](/web-tech-is-better.-developer-norms-are-worse./).

**The tl;dr:** modern tech is better, modern norms are worse. By worse, I mean for both the user and developers trying to break into the field.

Ben responded with [this really insightful comment](https://twitter.com/bentlegen/status/1500613029213442049)...

> I agree with the crux of it, although I believe those “norms” are manufactured by an increasingly-powerful developer education industrial complex.

And he's right!

I've described this in talks before as "the hype cycle." Someone at a company invents a new tool that helps their specific team for their specific use case. Then, they talk about it at a conference.

Everyone rushes out to try it, and invests a ton of time in learning it because "if it's good enough for {BIG NAME BRAND COMPANY}, it must be good enough for me." Then, they write blog posts about it.

It's hard to learn, so companies pop up to teach people how to use it. More conference talks.

Then, companies start putting "needs experience with {NEW TOOL}" in their job descriptions to ensure that appeal to "the best developers" who are up on all the cool new tools.

And that's how you end up in an industry that uses React for literally everything, even though it was designed for a very narrow use-case specific to Facebook.

## So, when are tools worth using?

Tools aren't bad. I agree with Ben that the right tools can save countless hours of time!

One of the dudes in the replies was trying to argue that, by my logic, we should just toss out linters and version control and uploading flat files with FTP. Maybe? 😂😂😂

I haven't actually seen anyone seriously argue that linters or version control are bad.

I've seen people rightly say that they should be easier to use. Git is amazing. It's also absurdly complicated, to the point that [I would still use a cheatsheet](https://ohshitgit.com/) for complicated tasks, and rely heavily on GitHub's UI to do most of the work for me.

Sometimes complexity is needed in tooling. The problem, in my opinion, is dogma.

## Utility > dogma

We get... weird about our tools.

- "I would never go back to vanilla JS after using React."
- "Every project should use typescript."
- "Webpack is the future! No, we use rollup.js now. You still use rollup? ESBuild is the future!"

It's exhausting. It's alienating. It drives people away.

Is React useful? Sometimes. It's also probably the wrong choice for a lot of situations where its used. And when it _is_ the right choice, [Preact is probably a better one](/vanilla-javascript-and-old-school-ssgs-are-the-best-choices-for-web-performance/#javascript-libraries-and-performance).

Is typescript useful? Not for me, personally. I haven't personally run into the issues typescript solves. For me, it's needless complexity. But I know a lot of folks who work on teams that find it invaluable.

Build tools? I got by just fine without them for years. When I finally added a build process, I used CodeKit for years. I only switched to command line build tools because my open source work needed a bit more flexibility than GUI-based tools could provide.

A lot of the tools our industry obsesses over were built for large-scale projects, and a lot of what we build are _not_ large-scale projects. Just like you wouldn't use a sledge hammer to hang a painting, you shouldn't necessarily use Facebook-sized tools for "small startup" sized projects.

Pick the tools that give you the utility need, without the overhead.

## Utility is subjective

Another angle that came up in conversation was the role that skill-level plays in the utility one gets from various tools.

For example, high-quality paint and expensive brushes let professional artists create amazing paintings, and make it easier for them to do their work. But in the hands a novice, or someone who's just learning, they add no value.

That applies for developers and development tools, too.

But beyond not just adding any value, the tools we use in our industry add significant overhead. Installing them is overhead. Keeping them up-to-date is overhead. Just using them is overhead that senior developers often take for granted.

## When are tools worth it?

When they help more than they hinder. Not just for you, but for everyone on your team.