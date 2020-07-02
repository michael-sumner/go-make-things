---
title: "No, vanilla JS doesn't mean hand-writing every single line of code"
date: 2020-07-02T10:30:00-04:00
draft: false
categories:
- Accessibility
- Careers
- Code
- JavaScript
- Web Performance
---

Yesterday, a popular programming education website sent a marketing email titled, "Beware of vanilla JS." In it, the author wrote:

> But just vanilla JS by itself is a dangerous road to take.

No, it's not, for a multitude of reasons. Let's unpack them.

## Vanilla JS is powerful and capable

The email and question cited a miniatures website (for RPG nerds like me) that displayed the price to a US-based visitor like this:

```
139,00 $
```

> And how did this happen? Long story short, the developers decided to use a minimal amount of JavaScript and manage currency conversion and formatting themselves. And unfortunately, localization, like so many issues, has a lot of nuances that aren’t obvious if you just learn a little. You have to dig deep and almost become an expert. A lot of currencies use commas and many use points, the placement of the symbol varies. Knowing these issues is just one of many things you have to worry about in building an app.

This entire premise is flawed, for numerous reasons.

First, currency is hard, period. That's not a "vanilla JS" problem. It's a currency problem.

My friend [Sarah Dayan](https://sarahdayan.dev/) created a vanilla JS currency conversion plugin, [Dinero.js](https://dinerojs.com/). She told me one of the hardest things about it wasn't writing the code, but learning about how wildly different currency conventions are around the world. Currency is itself a specialization.

If you need currency localization in your app, you don't need a framework. In fact, Angular is the only major framework with that baked in, and it's twice the size of React and Vue. You're still looking at "doing your own thing" or reaching for a plugin.

You can code in vanilla JS, and use Dinero.js for currency. Nothing dangerous about that.

You can also use the browser-native `Intl.NumberFormat()` method, which can localize currencies for you. It doesn't have as many niceties as Dinero.js, but it's a very capable method the browser gives you for free out-of-the-box.

## Vanilla JS doesn't mean you recreate the wheel

There's a common misconception that vanilla JS means, "I wrote every single line of this myself." That it means recreating the wheel.

Bullshit!

Vanilla JS means it's dependency-free. That it uses native JS methods and APIs instead of requiring another library or framework to work.

React and Vue components, or jQuery plugins? *Not* vanilla JS because they don't work unless you have React or Vue or jQuery, too. Dinero.js? That's vanilla JS.

Yes, it becomes a dependency for *your project*, but it has no underlying dependencies. You can drop it into any project, using any framework or library (or none at all) and it would still work.

You lean on solutions people have come up with before you and still code in vanilla JS. It's not some hero's quest to do it all yourself.

## Libraries and frameworks bring their own issues

Popular libraries and frameworks come with a benefit: lots of people use them, find bugs, report them, and push patches and fixes.

But that doesn't mean they're somehow "less dangerous" than vanilla JS.

As we already discussed, you can use popular vanilla JS plugins that have lots of support and bug fixes. They're no less robust than a framework or library.

But frameworks also come with their own dangers: fragility and performance.

**The more JS you use, the slower and more fragile your app is. Period.**

[Frameworks slow down your first render. They cripple older devices and run badly on slower networks.](https://timkadlec.com/remembers/2020-04-21-the-cost-of-javascript-frameworks/) If they take too long, they timeout and stop working entirely (that's all JS, but more JS means it's more likely to happen).

And [sites built with frameworks are more likely to have accessibility issues](https://webaim.org/projects/million/), too.

## Vanilla JS is *resilient*

Vanilla JS isn't a dangerous road. It's a resilient one.

[There are valid reasons to use a framework.](/when-should-you-use-a-javascript-library-or-framework-instead-of-vanilla-js/) But it should be the choice of last resort, not first.

Vanilla JS is more performant than frameworks. It's powerful. It does a lot out-of-the-box. It doesn't lock you in to one tool forever unless you want to completely "redesign all the things."

Vanilla JS is a modern, sensible approach to web development.