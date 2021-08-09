---
title: "Google vs. the web"
date: 2021-08-09T10:30:00-04:00
draft: false
categories:
- Code
- Design and UX
- HTML
- JavaScript
---

Last week, I learned that [the Google Chrome team is planning to deprecate `alert()`, `prompt()`, and `confirm()`](https://groups.google.com/a/chromium.org/g/blink-dev/c/hTOXiBj3D6A/m/JtkdpDd1BAAJ), the three browser-native ways to surface a modal window to users.

The phrasing of the ticket implies that this is only on cross-domain sites (ie. third-party iframes), which in-and-of itself breaks sites like CodePen. But [if you dig deeper into the conversation](https://groups.google.com/a/chromium.org/g/blink-dev/c/hTOXiBj3D6A/m/Ut5AZXwuBAAJ), you learn that they're actually planning to do this for all sites and implementations.

This is a massive, break-a-ton-of-web kind of change that has really shown just how much power the Chrome team has over the platform. Let's dig in.

## Why does the Chrome team want to do this?

If you read through the messages and try to decipher the often technical language, the core reason is "security."

Some bad actors like to use `alert()` and so on with cross-domain iframes for phishing. Because `alert()`, `prompt()`, and `confirm()` appear at the top of the window and block the rest of the page from loading, less technically savvy users can find them confusing, believe the "something's wrong with your machine" messaging, and disclose sensitive information to hackers.

This is real, valid concern, especially for third-party or cross-domain iframes.

I'm less clear how this carries over to same-domain `alert()`, `prompt()`, and `confirm()` modals, though. They have plenty of valid uses, and if someone is using them for phishing on their own site, they're just going to use something else going forward.

Third-party blocking protects against unexpected injection attacks. Same-domain blocking? I don't get it.

So, I reached out to one of the Google Chrome developer advocates I know to see if I could learn more. It did not go well.

## The Chrome team has handled this _very_ badly

The developer advocate I reached out to found my phrasing argumentative. I'm not going to link to the original tweet, but here's what I wrote.

> Do you have any insight into Chrome deprecating alert(), confirm(), and prompt()? I get the cross-origin argument, but it seems like the plan is to remove it same-origin as well?
>
> This feels, at best, short-sighted.

The responses I got included (I'm paraphrasing here)...

- Did you actually read the discussion thread? It's all spelled out there.
- `alert()`, `prompt()`, and `confirm()` block the main thread.
- This is a long, slow path. We're not doing this tomorrow.
- _Did_ you actually read the discussion? Seriously, it's so clear!

The condescending "did you actually read it, it's so clear" refrain is patronizing AF. It's the equivalent of "just" or "simply" in developer documentation.

I read it. I didn't understand it. That's why I asked someone whose literal job is communicating with developers about changes Chrome makes to the platform.

This is not isolated to one developer at Chrome. The entire message thread where this change was surfaced is filled with folks begging Chrome not to move forward with this proposal because it will break all-the-things.

It includes responses like this one, responding to breaking how things work at CodePen...

> This is great! It means they won’t use these functions in the future, which helps with our goal of eventually deprecating and removing them from the platform. I’m really glad that in this instance they get to learn about the problem in a low-stakes learning environment instead of in production.

Breaking your site was a good thing! We did you a favor!

Because while deprecating this functions for the whole platform is "a long, slow path,", Google had already rolled these changes out for cross-domain iframes and broken a bunch of sites, with virtually no communication about it.

## `alert()`, `prompt()`, and `confirm()` are good for more than just "learning"

One of the big themes in the conversations I've seen around this is that `alert()`, `prompt()`, and `confirm()` are good for people who are learning the platform, but not much else.

That's nonsense!

There is no other accessible browser-native way to surface a modal window. The `dialog` element is an inaccessible mess that was never implemented cross-platform, and where it was implemented, doesn't work well.

The `alert()`, `prompt()`, and `confirm()` modals are simple and accessible and get the job done. They're not pretty, but they're useful for more than just learning.

They're great for confirming user actions before making serious changes (like submitting a form or deleting data). Boring, platform-native features are amazing! I want more of them.

The fact they "block the main thread" was brought up a lot, too. Personally, I view that as a feature, not a bug. The entire point of a modal is to block the user from doing anything else until they address it. That's literally what they were designed to do. Not everything needs to be async.

The security issues with cross-domain modals are real, but could also be addressed in other ways. Some folks have suggested a permission property on the `iframe` element itself.

```html
<iframe allow="alert" src="cross-domain.dom"></iframe>
```

Others have suggested adjusting the placement and styling of the modals to make it more obvious that they're part of the website or iframe itself, and not a system notification from the device's operating system.

## Chrome has too much power over the web

[Chrome has an estimated 65 percent of the browser marketshare across all platforms.](https://gs.statcounter.com/browser-market-share) This is bad for the web.

This has resulted in a history of them pushing out platform changes without the consensus of other browser vendors. Sometimes that changes are good for the web. Sometimes they're bad. But the standards process exists for a reason.

A few years ago, Microsoft Edge switched from their own rendering edge to Chromium, Google's rendering engine, which also powers Chrome. A lot of standards folks lamented the loss of another rendering engine, but the Chrome folks argued it was better to compete on features on-top of a shared engine.

But what happens when the company that controls that platform makes a unilateral change?

The Edge team decided to keep `alert()`, `prompt()`, and `confirm()` in to their latest update instead of removing them. This now puts them in the position of having to essentially maintain a forked version of Chromium or just go along with whatever Google wants to do with Chromium.

No one browser vendor should be able to just deprecate a long-standing platform feature without consensus from the others.

Features are generally not deprecated because backwards compatibility is so important, but it _does_ sometimes happen. But when it does, it needs to be part of a standardized process.

## A temporary reprieve

Google rolled back the cross-domain iframe change for a few weeks, to give people more time to fix things that were going to break on their platforms.

But that doesn't address the underlying issue here: Chrome has decided to break a big chunk of the web because they alone have decided it's the right thing to do.

The message thread now has folks heaping praise on the Chrome team for graciously agreeing not to break-all-the-things for a few weeks, and ~~begging~~ asking for some alternatives that would allow `alert()`, `prompt()`, and `confirm()` to still be used on a limited basis.

To be honest, I don't really know what the path forward is here. There's nothing to current replace the platform-native modals.