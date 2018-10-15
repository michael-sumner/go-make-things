---
title: "The web is actually really slow"
date: 2018-10-15T10:30:00-04:00
draft: false
categories:
- Accessibility
- Code
- CSS
- Design and UX
- HTML
- JavaScript
- Web Performance
---

[The average web page is 1.5mb](https://httparchive.org/reports/page-weight?start=2018_08_15&end=latest&view=list#bytesTotal).

About [a quarter of that weight is JavaScript](https://httparchive.org/reports/page-weight?start=2018_08_15&end=latest&view=list#bytesJs), which is [the most expensive type of bytes for browsers to download, parse, and render](https://medium.com/@addyosmani/the-cost-of-javascript-in-2018-7d8950fbb5d4). For contrast, [CSS is just 3% of the total page weight](https://httparchive.org/reports/page-weight?start=2018_08_15&end=latest&view=list#bytesCss), and way more performant to parse and render.

And now the kicker: a majority of the web's growth is coming from developing areas, where mobile connections are the primary way to access the web and service is spotty or unreliable.

Last week at [GDG DevFest](https://devfest.withgoogle.com/) in the Ukraine, [Sam Dutton](https://twitter.com/sw12) shared [this  crazy data point (via Martin Splitt)](https://twitter.com/g33konaut/status/1050651629098131456?s=21):

> 60% of mobile connections worldwide at 2G

Think about how maddening trying to load some of your favorite websites is on 3g, or even LTE.

Now imagine visiting them on 2g. That's the web for a billion or so people.

Slow. Buggy. Unreliable. Barely usable. *Not* usable.

Over the weekend I accidentally visited a site with my ad blocker off. The page started to freeze after 75 JS assets loaded, I noticed, and quit the page. There was more coming.

I've said this before: we have the technology in 2018 to make the fastest web experiences you can possible imagine, and instead we build slow, bloated messes in the name of "developer convenience."

We can do better.