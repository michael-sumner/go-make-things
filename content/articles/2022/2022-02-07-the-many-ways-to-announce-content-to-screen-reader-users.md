---
title: The many ways to announce content to screen reader users
date: 2022-02-07T10:30:00-05:00
draft: false
categories:
- Accessibility
- Code
- Design and UX
- HTML
---

My friend Scott O'Hara is an accessibility specialist. 

[His blog is a trove of goodness](https://www.scottohara.me/writing/). A few weeks ago, he wrote about [how the `div` element isn't as terrible as some people make it out to be](https://www.scottohara.me/blog/2022/01/20/divisive.html).

But today, I wanted to share a recent post he wrote on [how to announce content to screen reader users](https://www.scottohara.me/blog/2022/02/05/are-we-live.html).

> Live regions are elements that inform assistive technologies, such as screen readers, that their descendant content may update. And, in such situations those updates need to be relayed to their users.
> 
> Live regions may be implemented into a web page via three different methods:
> 
> - Using specific [ARIA live region roles](https://www.w3.org/TR/wai-aria-1.2/#live_region_roles), such as `alert`, `log` or `status`. There’s also `marquee` and `timer`... but more on those in a second.
> - Using the [`aria-live` attribute](https://www.w3.org/TR/wai-aria-1.2/#aria-live) to turn “any element” into a live region. There are three states that a live region may be in.
> 	+ `assertive`: high importance updates which take precedence over other announcements.
> 	+ `polite`: announcements that will be made at the next opportunity.
> 	+ `off`: announcements will not be made unless focus is presently on the live region element.
> - [Using HTML’s native `<output>` element.](https://www.scottohara.me/blog/2019/07/10/the-output-element.html) This element has the implicit ARIA role of `status`.
> 
> Why you would use one method over the other will depend on how you want the content exposed to your users.

Scott's article digs into the various approaches, and when and why you'd choose one over the other.

Even if you've got a pretty good grasp on this, I'd recommend [giving the whole article a read](https://www.scottohara.me/blog/2022/02/05/are-we-live.html). Scott is one of the most knowledgeable folks I know, and his articles always deliver tons of goodness!