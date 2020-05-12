---
title: "Own your platform"
date: 2020-05-12T10:30:00-04:00
draft: false
categories:
- Careers
- Code
- JavaScript
- Web Performance
---

Last week, [Laurie Voss, cofounder of NPM, tweeted](https://twitter.com/seldo/status/1256003526141960192):

> I cannot emphasize enough that "I should write my own framework!" is the wrong call 99.9% of the time.
>
> Seeing a lot of replies to this which go:
>
> - not true! You learn a lot writing one!
> - so true! I hate using this weirdo framework somebody built!
>
> And that's the problem. Frameworks are fun and informative to build but unless a lot of people adopt them, they are painful to use.
>
> So maybe I will modify my position to: feel free to build a framework and use it on personal projects. But only very, very rarely is it going to be a good idea to get other people at your company to use it.
>
> The primary advantage of a framework is not technical but human: more people use it, more use cases accounted for, more tutorials, more bugs fixed, better docs. Until that happens the experience of using it is trying to reverse-engineer the author's idea of "the right way".
>
> So feel free to write your weirdo framework. Let's face it, me tweeting wasn't going to stop you anyway! Frameworks are too fun to build. But think long and hard before inflicting a crystallization of your preferences on other people.

Laurie is both very right and very wrong.

Frameworks solve a lot of problems. They also introduce a lot more.

> The primary advantage of a framework is not technical but human: more people use it, more use cases accounted for, more tutorials, more bugs fixed, better docs.

Those bug fixes? Awesome. Most of them don't apply to you and your use cases. You're inheriting a ton of code (that you pass on to the user) that has nothing to do with what you're trying to build.

Your users pay a performance tax for someone else's problems.

> Until that happens the experience of using it is trying to reverse-engineer the author's idea of "the right way".

Good documentation goes a long way.

There's a strong belief that frameworks enforce "the right way" of doing things, but I'm not sure that holds up very well. Because the appeal of these tools is also that they're very flexible.

Google how to do something in React and you'll get a dozen articles recommending a dozen different approaches. And now with React Hooks, there's two completely different architectural approaches you can take.

> So feel free to write your weirdo framework... But think long and hard before inflicting a crystallization of your preferences on other people.

It's not a "weirdo framework" if it solves real problems with how you build more elegantly than the existing market solutions.

Angular is giant, bloated mess. React is really confusing for newer developers. Vue's co-mingling of JavaScript in the HTML itself is... not for everyone.

And all of these tools impose a big performance penalty on users. Newer "weirdo frameworks" like [Svelte](https://svelte.dev) and [Reef](https://reefjs.com) exist because of gaps or problems with the existing options.

I built Reef to learn how DOM diffing and reactivity work. Then I discovered that a lot of developers found it _way_ more approachable than what's already out there.

Facebook built React even though Angular already existed. Evan You built Vue even though React was already popular.

So go, build your own little mini-framework. Don't give in to the cargo cult of "just use React/Vue/Angular."

Own your platform!