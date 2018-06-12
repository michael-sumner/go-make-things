---
title: "How to test for accessibility"
date: 2018-06-12T10:30:00-04:00
draft: false
categories:
- Accessibility
- Code
- Design and UX
- HTML
---

Last week, I shared some thoughts on [why you shouldn't use analytics data to determine what it is your users want](/your-website-data-is-a-lie/).

Reader Kevin Fitzhenry asked (shared with permission):

> Is there a screenreader simulator or some sort, or an online tool that can assess how optimized your site is for accessibility?

I'm an a11y advocate, but I'm far from an expert. So, I consulted my friends [Scott O'Hara](https://www.scottohara.me/) and [Eric Bailey](https://ericwbailey.design/), who *are* experts.

Here's what they had to say.

> **Scott:** macOS has VoiceOver built in for free. iOS has has VoiceOver built in for free. Android phones can get TalkBack (for free).
> Windows can use Narrator (primarily with IE/Edge) for free. Windows can use NVDA with FireFox/Chrome for free. Windows can use JAWS in free trial mode for a short period of time.
>
> **Eric:** The important part about manual testing is that you want to make sure your logic and markup work the way they’re intended. Automated checkers can hit false positives, and things like `<h1 aria-hidden="true">Very important information</h1>` are technically valid, but also an awful experience for the end user.

So in short: grab a free screen reader and try using your website with it. You'll learn a lot!