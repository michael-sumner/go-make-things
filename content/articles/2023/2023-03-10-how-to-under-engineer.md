---
title: How to under engineer your JavaScript
date: 2023-03-10T10:30:00-04:00
draft: false
categories:
- Accessibility
- Code
- CSS
- Design and UX
- HTML
- JavaScript
---

A few weeks ago, I wrote about [under-engineering your code](/under-engineer/)... 

> Every complex thing I’ve ever built, I’ve later gone on to refactor into something simpler. Same thing with team code.
>
> Simpler, less clever solutions are nearly always better in almost every way. They’re easier to implement. They’re easier to maintain. They’re less likely to break. They’re less confusing to users, because they’re expected rather than novel.

In response, someone asked...

> Do you have a concrete example? 
> 
> I find that tech companies look for engineers that practice SOLID and other OOP patterns. 
>
> Can you under-engineer with OOP patterns or is incompatible? 

It's a great question!

Under-engineering isn't some hard line that you're on one side or the other of. It's very much contextual to the thing you're building. Some examples...

- If there's a native HTML or CSS solution for what you're doing, maybe don't build a big custom JavaScript implementation.
- If there's a small, narrowly focused library that does what you want, choose that over the big monolithic library that does all the things.
- If you can easily render something on the server, maybe don't do it in the browser/client instead.

Here's a more concrete example: you want to have an element that can expand and collapse to show or hide more content.

Using a small disclosure library is better than adding React to the site with a disclosure component. Using the browser-native `details` and `summary` elements is better than using a small JS library.

But... what if your site already has some state-based UI, like a financial app or dashboard or something? In that case, the "under-engineering" approach might actually be to use a small component that works with the library you're already using...

But `details` and `summary` are probably still better.