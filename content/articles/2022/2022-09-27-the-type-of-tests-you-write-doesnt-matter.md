---
title: The type of JavaScript tests you write doesn't matter
date: 2022-09-27T10:30:00-04:00
draft: false
categories:
- Careers
- Code
- JavaScript
---

The title of this article is clickbait. It's probably better stated: the way you categorize your tests doesn't matter.

Last week, my friend [Sarah Dayan tweeted](https://twitter.com/frontstuff_io/status/1571530354741366786)...

> Don’t get caught up by test categorization—it doesn’t matter whether you’re writing unit tests, integration tests, or whatever else.
> 
> What matters:
> 1. Your tests assert cases like a user
> 2. Your tests are deterministic
> 3. Your tests are unequivocally labeled

In my [course and ebook on Testing JavaScript](https://vanillajsguides.com/testing/), I wrote:

> The goal of testing is to catch errors before they ship.
>
> We want to write tests that cover common use cases for whatever it is that we're building, and fail quickly when the code we've written won't behave correctly for the user.

Viewed through this lens, Sarah's three points are a simple roadmap for doing this more effectively.

I used to get really hung up on whether I was writing a unit test or integration test or end-to-end test. I was worried about what "the right mix" was, spawned by testing experts sharing cute graphics with pyramids and trophies detailing the right combination of tests to write.

Truth is, that doesn't really matter. What matters is that your tests catch errors before they ship, and give you confidence in your code.