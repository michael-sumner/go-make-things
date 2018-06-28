---
title: "Some additional thoughts on copyright and open source"
date: 2018-06-28T10:30:00-04:00
draft: false
categories:
- Careers
- Code
- JavaScript
---

I received some interesting comments on [yesterday's article about open source and copyright](/copyright-code-and-open-source/).

A few folks pointed me to the [Creative Commons Zero license](https://creativecommons.org/publicdomain/zero/1.0/), which functions like a "public domain" license. I was under the assumption that Creative Commons licenses are not appropriate for software use, and indeed that is the case.

> **Can I apply a Creative Commons license to software?**
> We recommend against using Creative Commons licenses for software. Instead, we strongly encourage you to use one of the very good software licenses which are already available. We recommend considering licenses made available by the Free Software Foundation or listed as “open source” by the Open Source Initiative.
>
> Unlike software-specific licenses, CC licenses do not contain specific terms about the distribution of source code, which is often important to ensuring the free reuse and modifiability of software. Many software licenses also address patent rights, which are important to software but may not be applicable to other copyrightable works. Additionally, our licenses are currently not compatible with the major software licenses, so it would be difficult to integrate CC-licensed work with other free software. Existing software licenses were designed specifically for use with software and offer a similar set of rights to the Creative Commons licenses.

However, CC0 is different. According to the FAQs, it *is* ok to use for software. However, it comes with some caveats (emphasis mine).

> Yes, CC0 is suitable for dedicating your copyright and related rights in computer software to the public domain, to the fullest extent possible under law. Unlike CC licenses, which should not be used for software, CC0 is compatible with many software licenses, including the GPL. **However, CC0 has not been approved by the Open Source Initiative and does not license or otherwise affect any patent rights you may have. You may want to consider using an approved OSI license that does so instead of CC0, such as GPL 3.0 or Apache 2.0.**

When the makers of a license tell you that another license is probably a better choice...

I have two issues with CC0 for code:

1. When I author code, I want to retain my copyright ownership. Some of my open source projects represent hundreds of hours of free labor. I'm happy to have other people benefit from that, but don't want to completely absolve myself of ownership.
2. If organizations aren't comfortable and familiar with a license, it's less likely that people can use it. MIT is well known by legal teams. It's an easy sell. CCO? Less so.

I had at least one person respond back asking why I give a damn about developers at corporations being able to use my code at all.

They don't contribute much to open source, and take and benefit a lot from it, the argument goes.

But that thinking penalizes developers, not companies. I want to make it as easy as possible for as many people as possible to be successful at making things for the web. That means using a license that developers everywhere can have an easy time using on their projects.