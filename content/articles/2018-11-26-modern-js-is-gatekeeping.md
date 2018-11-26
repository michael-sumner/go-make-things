---
title: "Modern JS is gatekeeping"
date: 2018-11-26T10:30:00-05:00
draft: false
categories:
- Accessibility
- Careers
- Code
- CSS
- HTML
- JavaScript
- Web Performance
---

Yesterday, [Amy Hoy tweeted](https://twitter.com/amyhoy/status/1066847123822526464):

> about 80% of "modern javascript" is gatekeeping. discuss

When asked what that meant, [she elaborated](https://twitter.com/amyhoy/status/1066858612662956039):

> pointless complexity, absurd tech churn, absolutely god awful tooling, a gnat’s willingness to commit to an approach, AND dicks.

And if you're not familiar with the term *gatekeeping*, it's the practice of actively restricting and controlling access to something.

We've got this absurd thing happening with JavaScript right now, where we're convinced that to be "mature" we need *more*. More tooling. More buzzwords. More functionality. More code.

Did I mention more tools?

And then, *because* we've added so much fucking bloat to our sites with all of this needless JavaScript complexity, we write more JavaScript to introduce more complexity to manage it all and make our code more performant.

## A circular problem

Our JS devs suck at CSS, so let's have them write it in JavaScript and let the tool handle shit. We're sending megabytes of JavaScript down the pipe, so let's write more JS to split out our scripts and figure out what we need and only load that.

Our entire site is a single HTML file that loads content with JavaScript, so let's recreate all of the routing and URL handling goodness the browser provides out of the box. And since that stuff is *really* hard to do right, we'll use some big plugins to handle it all for us.

The argument is that this tooling removes bugs, introduces structure, and helps eliminate errors introduced by junior developers.

There's another way to do that, though.

## Write less fucking JavaScript

A lot of what we do in JavaScript is better handled with HTML and CSS.

A lot of what we rely on frameworks for can be done just as easily without one. A lot of what we use approaches like CSS-in-JS and code-splitting for could be handled just as easily by learning and embracing CSS and then writing less JS.

I'm not sure if all this modern absurdity is gatekeeping.

That implies a willful desire to exclude people, and the *complexity crowd* actually seems to want everyone to join them in complexity hell.

But, it does make the entire process wildly unapproachable to beginners. It makes code bases harder to maintain.

It makes websites and apps more fragile and less fault tolerant.

## A way forward

It's all unnecessary, and my professional mission is to show people a simpler way to make things for the web.

If that sounds appealing to you, I publish [pocket guides and short video courses](https://vanillajsguides.com), and run [a hands-on training program](https://vanillajsacademy.com), on a simpler way to work with JavaScript.