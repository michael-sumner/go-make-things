---
title: "How to debug JavaScript like a pro"
date: 2020-12-04T10:30:00-05:00
draft: false
categories:
- Code
- JavaScript
---

[My debugging process is really basic.](/a-process-for-debugging-your-javascript/) It’s just two steps, repeated consistently.

1. **Identify the last working piece of code.** If there’s an error in the console window, it will tell you a line number for the code that’s throwing the error. Start there. If not, go to the very first piece of code in your script that runs.
2. **Use `console.log()` to log all of your work in the console window.** If you’re using grabbing an element in the DOM with querySelector, log it an make sure you’re actually getting the element. Keep working your way back through the code until you find the thing that’s not behaving the way you expect it to.

So I was delighted when Steve Griffith released a video this week on [debugging beyond `console.log()`](https://www.youtube.com/watch?v=VQ7SUjYj4r0).

<div class="fluid-vids"><iframe width="560" height="315" src="https://www.youtube.com/embed/VQ7SUjYj4r0" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>

I'll do a write-up of the tips in his video in the future, but for now, go check out his awesome video if you'd like to learn how to debug more effectively. I learned a ton!