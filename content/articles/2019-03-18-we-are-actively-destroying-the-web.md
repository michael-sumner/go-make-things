---
title: "We are actively destroying the web"
date: 2019-03-18T10:30:00-04:00
draft: false
categories:
- Accessibility
- Careers
- Code
- CSS
- Design and UX
- HTML
- JavaScript
---

One of the central themes of [my talk on The Lean Web](/the-lean-web-video-from-boston-css/) is that we as developers repeatedly take all of the great things the web and browsers give us out-of-the-box, break them, and then re-implement them poorly with JavaScript.

This point smacked me in the face hard a few weeks ago after [WebAIM released their survey of the top million websites](https://webaim.org/projects/million/).

As [Ethan Marcotte noted in his article on the survey](https://ethanmarcotte.com/wrote/the-web-we-broke/):

> Pages containing popular JavaScript frameworks were more likely to have accessibility errors than those that didn’t use those frameworks.

## Our tech decisions help create this problem

[Eric Bailey wrote a deeply introspective analysis of the study](https://ericwbailey.design/writing/2019-03-05-fighting-uphill.html), noting...

> Overwhelmingly, crushingly, we shove new developers towards learning JavaScript single page application frameworks (SPAs). While many of these frameworks pay lip service towards preserving accessibility, if you do your homework you find that the majority of them were built without assistive technology in mind. These considerations were bolted on later, when their creators figured out that the things they threw away to get a more app-like experience actually mattered.
>
> My go-to examples are routing and focus management. It’s a sad, sorry state of affairs that this critical functionality oftentimes requires third party plugins to make them capable of interfacing with assistive technology. The decision to use SPAs, and all that come with them, can often come from baseless nerd navelgazing&mdash;many business owners would be livid to find out that the technology choices their teams are making are actively incurring legal liability.

JavaScript routing has always perplexed me.

You take something the browser just gives you for free, break it with JavaScript, then reimplement it with *more* JavaScript, often poorly. You have to account for on-page clicks, on-site clicks, off-site clicks, forward and back button usage, and so on.

But this is more than just a technology problem.

## Developers don't know how to build accessible websites

Eric pointed out one of the more depressing aspects of the survey.

> In a sea of already demoralizing findings, probably the most notable one is that pages containing ARIA&mdash;a specialized language intended to aid accessibility&mdash;are actually more likely to have accessibility issues.
>
> I don't think this is intentional malice on the part of authors, but it is worth saying that the road to hell is paved with good intentions. These failures via omission and ignorance actively separate people from their civil rights.

And I'll be honest, I struggle with this *a lot* myself.

Accessibility is hard, particularly if you're not someone who uses assistive tech to access the web. The way things *seem* like they should work isn't always how they actually work.

## Accessibility is *very* contextual

One example I like to come back to is accordions versus toggle tabs.

On the surface, they seems like two different visual treatments of the same type of component: a thing that shows/hides groups of content. But so much about how people who use assistive technology expect to interact with those components is wildly different.

**Accordions**

- Are typically a collection of headings with associated content that's hidden beneath them.
- The heading should be focusable (as in, probably wrapped in a button).
- That button should have an `[aria-controls]` attribute on it with a value equal to the ID of the content it shows/hides.
- The `Tab` key on your keyboard should bring you down to the next focusable element, probably the next accordion header.

**Tabs**

- Are typically a linked list that points to groups of content.
- Also need the `[role="tab"]` and `[aria-selected]` attributes.
- The `Tab` key on your keyboard should *skip* sibling tabs and jump straight into the tab content. Instead, the arrow keys navigate between tabs.

There's a lot of nuance.

It's easy for me to say, "You can always just use `querySelector()` to get an element in the DOM." But there are few cut-and-dry statements like that with accessibility.

The decisions you make are driven by the specific thing you're trying to do, and, often, the content and markup involved.

## How do we get better at this?

Eric has a ton of ideas: some social, some technological, some based on people of influence pushing for us to do better here (much like we did with web standards back in the day).

I particularly loved this quote.

> Some engineers who work with physical materials have a constant reminder of the gravity of the decisions they make. They [wear iron rings](https://blogs.scientificamerican.com/oscillator/ring-ritual-reminds-engineers-of-their-responsibility/) to be reminded that they have an obligation to the public good, and that actual lives are on the line. I like that idea a lot—I think it's a concept we as an industry could benefit from if we borrowed from it thematically.
>
> It’d take some organizing to get to a place where we do such a thing. And maybe that’s a good thing—right now it feels like we’re an industry of [overpaid, fly-by-night plumbers](https://twitter.com/ericwbailey/status/1082694786480513026) who have the luxury of saying they don’t believe in using wrenches.

Culturally, I want there to be more shame around *not* building things accessibility.

I don't really love negative, stick-based motivation. But too often, we seem comfortable building inaccessible experiences that "we'll fix later." That's not ok. You should feel like shit if you knowingly do that.

But I also really loved Ethan's thoughts on focusing on *one thing* instead of accessibility at large.

> Basically, aim to do one thing this week to broaden your understanding of how people use the web, and adapt your design or development practice to incorporate what you’ve learned.

## Resources for learning

Per Ethan, I'd recommend picking just one thing and diving into it. Here are some resources to help.

**Newsletters**

- I really like the [A11Y Newsletter](https://a11yweekly.com/), but it throws a lot at you and can be overwhelming if you're just getting started.

**Reference Guides**

- The [A11Y Project](https://a11yproject.com/) is an awesome collection of patterns, checklists, articles, and more around accessibility. It's best-in-class.
- I've found Dave Rupert's [A11Y Nutrition Cards](https://davatron5000.github.io/a11y-nutrition-cards/) unbelievably useful for quickly breaking down what a JavaScript component I'm building should do and how it should work.

**People**

My most valued resource around learning this stuff is people willing to answer dumb questions. For me, those include...

- [Scott O'Hara](https://www.scottohara.me/)
- [Eric Bailey](https://ericwbailey.design/)
- [Sara Soueidan](https://www.sarasoueidan.com/)
- [Roel Van Gils](https://twitter.com/roelvangils/)

## Better education

I'm also trying get better about this, and bake more accessibility into my [pocket guides, video courses](https://vanillajsguides.com), and the [Vanilla JS Academy](https://vanillajsacademy.com).

I'd love to see more accessibility woven into tutorials and courses elsewhere, too.