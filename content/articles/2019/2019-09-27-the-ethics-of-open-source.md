---
title: "The ethics of open source licenses"
date: 2019-09-27T10:30:00-04:00
draft: false
categories:
- Business and Leadership
- Careers
- Code
- CSS
- HTML
- JavaScript
- Technology
---

Yesterday, I wrote a bit about my struggles with [the ethics of the tools we use](/the-ethics-of-the-tools-we-use/).

Today, I wanted to talk about one of my big ethical dilemma's with giving code away: people can use it for things you don't agree with.

## Open Source Software (OSS)

One of the central tenants of open source software is *freedom*.

There's a lot of debate in the OSS community about what makes software more free. Is GPL more free, because it prevents others from using your code in a closed-license project? Or is it less free, because it restricts what people can do with it?

I personally distribute all of my code with an [MIT license](/mit).

I like it because it's well known, places almost no restrictions on how the code can be used, and means that you can use it for all sorts of cool projects, commercial and not. I can also understand it, which I think is important.

But there's a downside to all of that freedom.

## People can use your code for bad shit

Recently, [developer Seth Vargo found out code he wrote was being used by ICE](https://www.vice.com/en_us/article/mbm3xn/chef-sugar-author-deletes-code-sold-to-ice-immigration-customs-enforcement) to help separate parents from their children.

Before this, I hadn't given much consideration to the fact that my use of a liberal OSS license means that code I write can be used for things I find reprehensible.

My use of the MIT license means that people can use my projects to help animal rescue organizations save animals for high-kill shelters, or to help people find jobs. But it can also be used by the KKK (FUCK those guys).

That's troubling. Is it just an inherently part of how free, open source software works?

## First, do no harm

[Coraline Ada Ehmke](https://where.coraline.codes/) just released [the Hippocratic License](https://firstdonoharm.dev/), an MIT license variant with an added clause that prohibits code from being used to endanger or harm people.

It's sparked a *lot* of debate on whether or not software licenses should have ethics clauses in them, which was exactly Coraline's intent.

> My goal was to spark conversation about the implications of the “freedom at all costs” requirement for officially sanctioned Open Source software, in light of the abuses of power and civil and human rights violations of governments and their collaborators. Developers don’t want their labor being used to do harm, and the current structure of open source software strips any power from creators to prevent this from happening. We are being exploited. Human freedom is being traded for so-called “software freedom”.

To be honest, I absolutely *love* the license, and am considering relicensing all of my code under it. My two bigger concerns with it:

1. Licenses like MIT have a history/pedigree that makes it easy for companies to use them. Many legal departments have MIT on a list of "pre-allowed" licenses. The Hippocratic License is new, and therefore unvetted. That adds a roadblock for developers are bigger companies.
2. Is it enforceable? What "endangers or harms people" could be up for interpretation, at least in the legal sense. Can that clause actually be enforced? And do people or groups that do terrible, shitty, horrible things care about what the license allows, anyways?

Regardless, I think I've hit a point in my career where I'd rather lose some developers using my code for a license that more closely aligns with my morals.

What do you think?