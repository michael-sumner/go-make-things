---
categories:
- Design &amp; UX
date: '2013-06-10'
url: /how-open-source-has-helped-me-write-better-code/
title: How open source has helped me write better code
---

Three months ago, I released <a href="http://cferdinandi.github.io/kraken/">Kraken</a> (yea, that just happened), a modular, open source boilerplate for front-end web developers.

It's been exciting to see Kraken used as the starting point for other people's projects. It's been forked into <a href="https://github.com/PendragonDevelopment/krakenrails">a Ruby gem</a>, with a Sass fork in the works as well.

But managing an open source project has also helped me write better code.
<!--more-->
<h2>Writing code for other people</h2>

Writing code that other people are going to use forces you to be more thoughtful.

I spend more time considering how a CSS class could be used (or reused) throughout the markup. I don't use IDs for anything any more. I abstract as much as I can. I've gotten much better at writing <a href="http://coding.smashingmagazine.com/2011/12/12/an-introduction-to-object-oriented-css-oocss/">modular, reusable OOCSS</a>.

I document my code obsessively. I'm never left wondering, "Why is this class in my CSS again?" It's right there, as a comment in the stylesheet. This has spilled over into my personal projects, too. It's a great habit to develop.

(<em>If you're worried about the bloat this adds to the code, it gets stripped out in the <a href="https://gomakethings.com/high-performance-websites/">minified production version</a>.</em>)

Thanks to open source, I launch projects faster. I used to waste time copying and pasting code from old projects into new ones, and then removing what I didn't need. Now I just fork the latest Kraken repo and get on with it. I've built up a wonderful <a href="http://cferdinandi.github.io/kraken/addons.html">library of flexible, reusable code</a>.

Open source has made me a better communicator. When you've been doing something for a while, you can forget that what's obvious to you isn't always obvious to others.

Kraken uses uses 100% relative sizing. There's not a single px to be found in the stylesheet. It's all ems and percentages. I thought, "How great! You just change the size of the <code>body</code> element and the whole site adjusts itself."

And then someone asked me how you figure out em values from pixels. (I wrote <a href="https://gomakethings.com/working-with-relative-sizing/">a tutorial on that</a>, if you're interested.)

<h2>Get Involved in Open Source</h2>

Getting involved is easy. Add some documentation to a bit of code you use often and add it to <a href="http://github.com/">GitHub</a>. It doesn't have to be anything big.

<a href="https://github.com/toddmotto/fluidvids">FluidVidsJS</a> is just 38 lines of code. <a href="https://github.com/davatron5000/Foldy960">Foldy</a> (which got forked into the grid for Kraken) is only a 6-column grid. You can even remix someone else's work. My first GitHub repo was a modified version of Foldy.

Open source will make you a better developer.