---
title: "Why write vanilla JS when you can just use [insert library or framework here]?"
date: 2020-02-26T10:30:00-05:00
draft: false
categories:
- Accessibility
- Careers
- Code
- JavaScript
- Web Performance
---

Yesterday on Twitter, I had an interesting conversation that boiled down to a simple, reasonable question:

> Why write your own vanilla JS in a world where so many talented developers have created libraries and frameworks that solve similar problems to the one you're trying to solve?

For me, there are three reasons:

1. Performance
2. Accessibility
3. Time

Let's break each one down...

## Performance

Most third-party solutions are packed with lots of stuff you don't need for your specific use case.

They solve *your* problem, but they also solve a bunch of others you don't have. I talk about this a bit in [the Lean Web](https://leanweb.dev).

Multiply that extra code times all of the third-party libraries, frameworks, and plugins we use, and you end up with performance-crushing bloat that's ruining the web for all but the most modern devices and internet connections.

## Accessibility

The web is for everyone, but it doesn't always feel like it.

An alarming number of modules, libraries, and frameworks are not built accessibly... including ones that advertise themselves as "accessible."

Last year, the accessibility group WebAIM conducted a survey of the top million sites on the web. They found that sites that used frameworks were *more likely* to have accessibility errors.

If you care about the web and the people who use it, that matters a lot more than "ease for the developer."

## Time

I find that many, many third-party solutions do *almost* what I want, but not quite.

Often, in the amount of time I spend messing around with it to make it do what I want, I could have just built my own thing. I know that I might be an outlier here.

As a more junior developer, finding third-party solutions that solved my problems was a blessing.

But learning how they worked, and how to write my own approach? That's what pushed me past being a junior developer.

## I'm not saying you should never use third-party solutions

None of this is to say "always write 100% of your own code."

I use small plugins and helper functions all the time. I use other people's code snippets and build on top of them.

But I think that's way different than "just use a framework."