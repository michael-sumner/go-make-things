---
title: Build tool plugins for web performance
date: 2022-11-02T10:30:00-04:00
draft: false
categories:
- Accessibility
- Careers
- Code
- CSS
- Design and UX
- HTML
- JavaScript
- Technology
- Web Performance
---

Last week, [Keith Cirkel tweeted out...](https://twitter.com/Keithamus/status/1585940696569384960)

> Writing a Webpack plugin that makes build times at least as long as it takes to download them.

```js
class WebpackPluginUXGtDX {
  apply(compiler) {
    compiler.hooks.emit.tapPromise(
      'UX is more important than DX',
      (compilation) => {
        return new Promise(resolve => {
          const ms = getP95ForBundleOn3g();
          console.log(`This bundle takes ${ms}ms to download`);
          console.log(`I'm making you wait at least as long as that.`);
          console.log(`If you want a faster build, work on that.`);
          setTimeout(resolve, ms);
        });
    });
  }
}
```

The included code, in theory, gets the download time for the bottom 5th percentile of users on 3g connections, and forces the build to wait that long before proceeding.

While this is a joke (I think?), I also think Keith is on to something.

A lot of "thought leaders" in our space obsess over the _developer experience (DX)_, and have bought into [the myth that better DX leads to a better _user experience (UX)_](/the-developer-experience-is-bullshit/). They also often work on really expensive high-end machines, connected to a fast and reliable network.

That's just not the reality for a lot of people who use what we build. It's hard for a lot of people to feel empathy without experiencing that pain themselves.

I'd _love_ to see build systems have a built in setting that you can use to throttle builds to what actual users experience.

You can automate some aspects of performance. Minifying and gzipping help. [Service workers do, too.](https://vanillajsguides.com/service-workers/)

But a lot of web performance is baked into the core of your code, how you write it, and what you ship.