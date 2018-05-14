---
title: "Dont throw technology solutions at people problems"
date: 2018-05-14T10:30:00-04:00
draft: false
categories:
- Careers
- Code
- CSS
- HTML
- JavaScript
- Technology
---

One oft-repeated defense for CSS-JS is that it's otherwise hard to prevent CSS collisions on large projects with many junior developers.

[One of my biggest issues with CSS-in-JS](/whats-wrong-with-css-in-js/) is that it feels like throwing technology at people problems without addressing the *real* underlying causes.

Let's unpack that a bit.

## When technology is at it's best

Great technology accelerates human capabilities or makes and provides rails to prevent us from screwing up.

A good example of this is, I think, [front-end collision avoidance systems](https://en.wikipedia.org/wiki/Collision_avoidance_system) in cars. These are those cool pieces of technology that automatically brake your car for you if you're about to slam into the car in front of you.

Humans are easily distractible, don't always maintain a safe driving distance, and could suffer things like strokes or heart attacks behind the wheel. And cars are 4,000 pounds of steel on wheels. Preventing crashes is a very, *very* good thing.

But the driver still needs to know how to drive, and how to brake. These are important skills.

You might argue that autonomous vehicles will make those skills obsolete, and maybe you're right. But let's look at another example.

## Fly-by-wire airplanes

[Fly-by-wire](https://en.wikipedia.org/wiki/Fly-by-wire) is a flight control system in modern commercial airplanes that replaces manual controls.

When a pilot, for example, banks left on the controls, their actions don't have a direct effect on the plane (or so I'm told), but instead suggest to computer what the plane should do. The system then translates those inputs into behaviors in the plane.

This helps prevent pilots from doing things over-correcting or putting the planes into dangerous situations.

When they work, they're great! However, when they don't work as expected, [even seasoned pilots sometimes find themselves struggling](http://www.ravepubs.com/250-million-epic-fail-wonders-fly-wire/).

Imagine having to take over from fly-by-wire and control a plane manually because of some systems failure. You get used to these systems. You're out of practice flying manually. You can't trust or determine what info coming back is accurate and what is just the computer bugging out.

[This has actually happened.](https://www.theguardian.com/technology/2016/oct/11/crash-how-computers-are-setting-us-up-disaster)

> Bonin and Robert were shouting at each other, each trying to control the plane. All three men were talking at cross-purposes. The plane was still nose up, but losing altitude rapidly.
>
> Robert: “Your speed! You’re climbing! Descend! Descend, descend, descend!”
>
> Bonin: “I am descending!”
>
> Dubois: “No, you’re climbing.”
>
> Bonin: “I’m climbing? OK, so we’re going down.”
>
> Nobody said: “We’re stalling. Put the nose down and dive out of the stall.”
>
> At 11.13pm and 40 seconds, less than 12 minutes after Dubois first left the cockpit for a nap, and two minutes after the autopilot switched itself off, Robert yelled at Bonin:“Climb … climb … climb … climb …” Bonin replied that he had had his stick back the entire time – the information that might have helped Dubois diagnose the stall, had he known.

## What's all this got to do with CSS-in-JS

Obviously what we do as web developer isn't (usually) as life-or-death as flying an airplane safely. But let's bring this full circle.

Commercial airline pilots have a lot of experience flying planes, and still run into issues when fly-by-wire fails. Yet our solution when junior developers don't know CSS well or when teams keep conflicting with each other happens is to just throw more engineering at it.

I think that's ignores the real, underlying problem: people.

1. Document work better.
: Most internal documentation sucks. Write better docs. Detail what classes you use and why. Set guidelines on how classes should be used. Data attributes. When and why.

2. Have a CSS methodology and use it consistently
: Those things you documented? It works better if you have an approach and use it consistently. It doesn't matter if it's OOCSS, utility-first, BEM, Atomic Design, or another else. Consistent approaches make your code predictable.

3. Train and mentor junior developers better.
: It seems like there's no focus on growing junior developers' CSS skills. Letting the technology handle it means they never learn. Train your people (and not just on JavaScript)!

Does this mean technology has no place in the solution? Of course not!

I'd love to see something more like front end crash avoidance systems, though, and less like fly-by-wire. For example, an automated deploy task that tests modular Sass files to make sure you're not using a class that's already specified elsewhere unless you're supposed to.

Technology is great, but let's use it to augmented human skills, not make them nonexistent.