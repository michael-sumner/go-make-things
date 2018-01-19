---
categories:
- Code
date: '2016-09-26'
title: Open Source Etiquette
---

I love [creating open source code](/open-source) and seeing the cool things people do with it.

However... as my projects get more popular, I find myself dealing with demands for features that don't exist yet, the same question asked repeatedly, and other time-sucks. Most people just make well-meaning mistakes. A few are real jerks.

Today, I wanted to cover a few basic pieces of etiquette for using open source code.

## I owe you nothing.

I don't mean to sound like an asshole, but I do want to make one thing clear: I owe you nothing.

I've spent a considerable amount of my personal time writing, testing, and maintaining code that I then give away for free for anyone to use. If I won't or don't want to implement a feature you care about, that's my right.

GitHub makes it really easy to fork and modify any public project. Fork my code and add the feature you want. But don't get mad if I won't.

Again, most people are *really* understanding about this. But a few people---especially on my larger projects---have gotten really entitled about features that I wasn't interested in adding.

## If there's documentation, read it.

I spend a *lot* of time writing documentation.

As a new developer, I was always frustrated by bad or nonexistent documentation on open source projects. Before I was able to really read code and understand how it worked, it made using other people's stuff really difficult.

As a result, I spend a lot of time writing documentation that can used by people of all skill levels.

Despite this, I'll often get asked questions that are addressed directly in the documentation. If you're a beginner and something's unclear, I'm more than happy to help you understand it better.

But please read the documentation before you ask me how to do something.

## Look at existing issues before opening a new one.

GitHub issues are searchable. If you have a question or think you've found a bug, search for it to make sure it hasn't been asked already before submitting a new issue.

If the issue already exists and there's nothing in it that solves your problem, add to the existing discussion.

## Provide as much info as possible when reporting a bug.

I often get bug reports that say something like, "This isn't working on my site. What am I doing wrong?"

That's it. No link. No code. No additional information.

The absolute best thing you can do is provide a [reduced test case](https://css-tricks.com/reduced-test-cases/). Remove all other plugins, styles, and so on until you get the most reduced version of your site that still triggers the issue.

This makes it far easier for me to identify the problem, but might also help you figure it out yourself.

Knowing what browser, operating system, and version of my code you're using or have been able to replicate the problem in helps, too.

## If there are contributing guidelines, follow them.

Seriously.

If you're submitting a Pull Request to contribute code to my project, follow the contributing guidelines. GitHub provides a link to them at the top of every new issue and PR (if the project has a `CONTRIBUTING.md` file).

If I say "tabs, not spaces," use tabs. If I say use [JSDoc](http://usejsdoc.org/) style comments, use them. If I say to change the version number and run a build process, do it. If you don't know how, mention that in your request.

Not doing so makes more work for me, and makes the project feel inconsistent. Even if a project has multiple authors, it should feel like it was written by one.

## Say thank you.

Sometimes I get bug reports that end up being user errors, and I tell them what they did wrong and how to fix it. Other times, they're legitimate bugs, and I fix them as fast as possible.

I'm amazed at how often people don't say, "thank you."

Remember, time I spend looking at your project that's not working is time I'm not spending outside, or with my family, or watching TV, or reading a book. I'm giving you my time, for free, for your benefit.

Say thank you. It's just good manners.