---
title: Low upkeep software
date: 2021-10-05T10:30:00-04:00
draft: false
categories:
- Careers
- Code
- CSS
- Design and UX
- HTML
- JavaScript
- Technology
- Web Performance
---

Yesterday, I had a chat with [Drew McLellan for the Smashing Podcast](https://podcast.smashingmagazine.com/) (_the episode won't come out for a few weeks_). 

One of the big focuses of our chat was around the _illusion of a better developer experience_ that large JavaScript libraries and modern build processes provide.

They _absolutely_ make some things faster and easier. But they also introduce a delicate house of cards that needs to be constantly maintained.

One of my favorite things about using a toolset that's primarly just browser-native HTML, CSS, and JavaScript is how little upkeep it needs. I can come back to things I built months or years ago and just start working on them again.

And so, I really enjoyed [Jeff Kaufman's article on Designing Low Upkeep Software](https://www.jefftk.com/p/designing-low-upkeep-software)...

> It's common for me to get excited about a personal project, put a bunch of time into it, and then lose interest. As much as possible, I want these projects to continue working; upkeep isn't fun. What does designing for minimum maintenance look like?
>
> The biggest piece is minimizing your dependencies, and limiting them to ones that value backwards compatibility.

One of the more interesting approaches Jeff uses, and one I've done myself for some personal projects, is to store data as flat files.

> Store data on the file system, including for caching. It's not as elegant as a proper database, but it doesn't require an additional process or dependency. Debugging and backup are very simple, because everything is visible.

[I'd recommend reading the whole thing.](https://www.jefftk.com/p/designing-low-upkeep-software) It's quite good, and a fast read!