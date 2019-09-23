---
title: "We're all just fumbling our way through this"
date: 2019-09-23T10:30:00-04:00
draft: false
categories:
- Careers
- Code
- JavaScript
---

Recently, I've gotten a handful of emails from readers telling me things like...

> I don't think I'm a very good developer.

or...

> I'm starting to wonder if I even belong here.

Today, I want to tell you that you might *not* be a very good developer *today*, but **you *do* belong here and you *will* get better**.

The developers you look up to constantly fuck up in ways both big and small, too.

[Jake Archibald](https://jakearchibald.com/) is a senior developer at Google. Today, he [tweeted out this awesome screw up he made](https://twitter.com/jaffathecake/status/1176090548605788161).

> Today on Jake-can't-code: I did some stuff with dates and timezones, which worked fine. BUT THEN…

Here's his original code:

```js
const formattedTime =
	(date.getUTCHours() % 12 || 12) +
	(minutes ? ':' + minutes : '') +
	(minutes >= 12 ? 'am' : 'pm');
```

If you're not sure what's going on here or can't quite figure out the mistake, he's checking to see if `minutes` is greater than or equal to `12`. If it is, he uses `am`. Otherwise, he uses `pm`.

But... `12` or later should be `pm`. He's got them reversed.

Here's the corrected code.

```js
const formattedTime =
	(date.getUTCHours() % 12 || 12) +
	(minutes ? ':' + minutes : '') +
	(minutes >= 12 ? 'pm' : 'am');
```

It's easy to think that once you get "good enough" you stop making stupid mistakes like this, but you don't. The bugs that give me the hardest time are typos, misnamed variables, and forgetting to `return` values.

They're all rookie mistakes, but you never stop making them.

In the responses to Jake's tweet, [Alice Boxhall pointed out](https://twitter.com/sundress/status/1176091080938229761) that, um... the am/pm thing is based on `hours`, not `minutes`. 🤦‍♂️

According to Jake, this one even made it past a code review!

Even the seasoned developers you look up to screw up the basic stuff. We're all just fumbling our way through this.

Never feel like you're not good enough. You are, you belong here, and our community is lucky to have you in it.
```

