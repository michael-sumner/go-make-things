---
title: How teams choose the JavaScript tools that they use (it's often not because it's the best tool for the job)
date: 2023-03-03T10:30:00-04:00
draft: false
categories:
- Business and Leadership
- Code
- JavaScript
- Technology
---

There's a pervasive belief that teams or organizations choose the tools that they use to build and maintain their sites and apps because they're the best choice for the job.

> If a company uses React, it must be because they tried it, tested it, and found that it works well for them over the long haul. Otherwise, they'd stop and use something else.

In reality, companies often end up using tools that aren't the best fit for a wide range of reasons...

- "Our lead developer used in the past and likes it, so that's what they want to use again."
- "Facebook/Twitter use it, so it must be good!"
- "Our lead developer really wants to learn {new tool}, so we'll be using it for this project."
- "We're already deeply invested in this tool, and even though its far from perfect, switching would be expensive."

Tools a trap!

Evaluating them for long-term fit takes, well... a long time! Time companies often either don't have or don't want to invest. So, they pick one with imperfect information, guided by the biases and preferences of their team, and once they're in, they're in. [It's like the Hotel California.](https://www.youtube.com/watch?v=09839DpTctU)

A lot of folks find the idea that team lead preferences would govern big decisions like this implausible, but [that's exactly what happened with the Mozilla Developer Network was rebuilt using React](https://github.com/mdn/sprints/issues/967).

> As an MDN developer, I want to rewrite the MDN page header using React, so I can gain experience using React for a non-trivial page component, and so that I can reduce our the dependencies on jquery.

Imagine that! Wanting to reduce dependency on jQuery by adding _another_, bigger library that's actually worse for performance... so that you can try something new.