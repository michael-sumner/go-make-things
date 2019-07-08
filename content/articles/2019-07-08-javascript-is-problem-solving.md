---
title: "JavaScript is problem solving"
date: 2019-07-08T10:30:00-04:00
draft: false
categories:
- Code
- Design and UX
- JavaScript
---

Last week, [Erin tweeted](https://twitter.com/erinfranmc/status/1147179748839309313):

> I've been feeling really confident about my coding skills lately
>
> And I think the reason is, I'm getting way better at breaking down big problems into smaller ones. It's a LOT easier solving a list of little problems, than one big one
>
> I feel like a pikachu becoming a raichu 🥳

This is awesome!

Good JavaScript (good any code, really) is good problem solving. The better you become at solving problem, the better you become at coding.

And good problem solving is mostly about breaking big problems down into smaller, more manageable ones.

## An example

The toughest project I ever worked on was [my Smooth Scroll plugin](https://github.com/cferdinandi/smooth-scroll).

When you click on an anchor link, instead of jumping right there, it does an animated scroll down to the location instead. I was at a complete loss for how to tackle this one.

In my mind it went:

1. Detect a click on a link
2. Use `event.preventDefault()` to stop the jump from happening
3. {something something magic} animate the scroll
4. You're at the linked location now

It wasn't until I broke the third step down into small parts that I was able to make any progress.

## Breaking a problem into parts

So how *would* you animate a scroll from one spot to another with JavaScript? Here's what I came up with.

1. Determine your current location on the page (in pixels from the top of the page).
2. Determine the location of the place you want to go (in pixels from the top of the page).
3. Get the distance between those two points.
4. Take the total amount of time you want the animation to take (in milliseconds), and divide it by how often you want to run an animation (I use `16`, the approximate number of milliseconds in a frame refresh) to get the number of animations you'll need.
5. Divide the distance from step 3 by the number of animations in step 4.
6. Every animation interval, scroll the amount you got in step 5 until you get to your location.

Breaking it down like this gave me some very clear tasks I needed to take to complete the script.