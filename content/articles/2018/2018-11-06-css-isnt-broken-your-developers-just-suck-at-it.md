---
title: "CSS isn't broken, your developers just suck at it"
date: 2018-11-06T10:30:00-05:00
draft: false
categories:
- Code
- CSS
- JavaScript
- Web Performance
---

Last week, I read an article that kicked things off like this:

> It’s no news that CSS has evolved along the way and has become more powerful nowadays, but it’s widely known that additional tooling needs to be used in order to make CSS somehow work for teams.

No. Just no.

CSS isn't broken. Your developers just suck at it.

(*I'm not going to link to the original article because I don't want this to be a mean/trolling thing.*)

I'm not saying a team development process doesn't need any tooling.

[GitHub](https://github.com/) and other services like it are invaluable for working collaboratively on code. [Autoprefixer](https://github.com/postcss/autoprefixer) makes it so that you don't have to worry about which vendor prefixes are needed for backwards compatibility. [Sass](https://sass-lang.com/) lets you maintain modular CSS files and add more structure to your code without compromising performance.

But that's not what this article meant.

They're talking about moving CSS into JS. Because, you know, JS is supposedly better at all the things. CSS is just horrible, right?

This was echoed in a response I got from someone on Twitter:

> It is always more easy to blame all developers. But if everyone suck with some technology, it may mean that the problem is in technology, not in people.

That's on interpretation.

The other is that JS developers routinely devalue CSS while complaining that it sucks and its hard. So they never learn it properly and spend time trying to "fix" it with JavaScript.

I can't stress this enough: CSS is not broken.

Like all languages, it's not without faults. But the things most JS devs complain about with CSS are it's most powerful features.

It's global, cascading nature is what makes it so powerful. With a few component styles and [a healthy handful of utility classes](https://frontstuff.io/in-defense-of-utility-first-css), you can build some pretty impressive sites that have strong visual consistency and super tiny stylesheets.

JavaScript is slow. It's bloated. It's fragile.

CSS is fast and fault tolerant. It's great at some things and sucks at others. Just like JavaScript.

Let's stop trying to "fix" CSS and spend more time learning to use it better.