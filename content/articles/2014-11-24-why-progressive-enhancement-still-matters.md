---
categories:
- Design &amp; UX
date: '2014-11-24'
title: Why progressive enhancement still matters
---

One thing I've struggled to answer when people start debating the importance of progressive enhancement is how you enhance something like a camera app.

Jeremy Keith did a fantastic job tackling touch questions like this in his recent post, ["Just what is it you want to do?"](https://adactio.com/journal/7774)

<!--more-->

> Here again, the real question to ask is “what is the core functionality?” Building a camera app is a means to an end, not the end itself. You need to ask what the end goal is. Perhaps it’s “enable people to share photos with their friends.” Going back to good ol’ HTML, you can accomplish that task with:
>
> ```javascript
> <input type="file" accept="image/*">
> ```
> Now that you’ve got that out of the way, you can spend the majority of your time making the best damn camera app you can, using all the latest browser technologies. (Perhaps WebRTC? Maybe use a canvas element to display the captured image data and apply CSS filters on top?)

Hell yea, that's awesome.

If often have people tell me that it's unrealistic to expect older browsers to get the same functionality as ones that support modern web technologies.

I agree. That's not the point of progressive enhancement. Jeremy sums it up nicely:

> If progressive enhancement truly meant making all functionality available to everyone, then it would be unworkable. I think that’s a common misconception around progressive enhancement; there’s this idea that using progressive enhancement means that you’re going to spend all your time making stuff work in older browsers. In fact, it’s the exact opposite. As long as you spend a little bit of time at the start making sure that the core functionality works with good ol’ fashioned HTML, then you can spend most of your time trying out the latest and greatest browser technologies.

Since I moved to a progressive enhancement development approach, I find myself spending far less time testing older browsers and much more time working on cool new stuff. Win-win.