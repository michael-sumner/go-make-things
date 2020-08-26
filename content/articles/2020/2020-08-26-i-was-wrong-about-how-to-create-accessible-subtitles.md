---
title: "I was wrong about how to create accessible subtitles"
date: 2020-08-26T10:30:00-04:00
draft: false
categories:
- Accessibility
- Code
- HTML
---

Back in July, I wrote about [how to create accessible subtitles using the `[role="doc-subtitle"]` attribute](/how-to-create-accessible-subtitles/).

I was wrong.

Adrian Roselli, who's far more of an expert on this sort of thing than I am, [pointed out some of the dangers and pitfalls of the role in an article last week](https://adrianroselli.com/2020/08/be-wary-of-doc-subtitle.html).

The main issue with `[role="doc-subtitle"]` is that it in many browser/screen reader combinations, it announces as either a heading without a level, or an `h2`. Both of these have semantic implications for visually impaired users, and are *not* actually the desired behavior.

> In a web (not epub) context:
>
> - Safari on macOS will claim they are all heading level 2 (ignoring `aria-roledescription`), polluting the headings navigation and complicating the perceived page structure;
> - JAWS with Chrome will also claim they are all heading level 2, polluting the headings navigation and complicating the perceived page structure;
> - Internet Explorer users will get no benefit from doc-subtitle;
> - NVDA with Firefox works well;
> - VoiceOver on iOS will also claim they are all heading level 2, and offers no context from `aria-roledescription`;
> - TalkBack with Chrome does not assign a level, but if you nest `doc-subtitle` within a native `<h#>` the content will be hidden.
> - TalkBack with Firefox works well.

Adrian provides some helpful alternatives depending on your goal.

[Go read his full article for a more in-depth look at the issues, the history of this spec, and so on.](https://adrianroselli.com/2020/08/be-wary-of-doc-subtitle.html) Trust me, it's a good read!

As for me, I'm going to revert to using a `.subheading` class.