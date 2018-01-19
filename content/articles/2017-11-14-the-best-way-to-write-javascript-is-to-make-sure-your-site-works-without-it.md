---
categories:
- Accessibility
- Code
- JavaScript
date: '2017-11-14'
title: The best way to write JavaScript is to make sure your site works without it
---

I've been doing some research for an upcoming chat I'm going to be having with [Ethan Marcotte](https://ethanmarcotte.com/) and [Karen McGrane](https://karenmcgrane.com/) on how to write JavaScript that works for anyone on any device (and what to do when it doesn't).

I'm amazed at how many sites break in some fundamental way when JavaScript isn't available.

I don't just mean immersive, interactive web applications. I'm talking blogs. Portfolio sites. Marketing micro-sites. They all stop working in some critical way.

## Common ways sites break without JavaScript

The number one thing I see break without JavaScript is navigation, typically on smaller viewports, but sometimes on larger ones, too.

That ubiquitous expand-and-collapse nav on mobile? It runs on JavaScript. No JavaScript means you're stuck on the homepage.

I've also seen some sites where dropdown menus don't work without JavaScript. On one of them, the *really* weird part was that the dropdown was shown with a hover, but *only* when JavaScript was supported. You can power something like that with just CSS if you wanted to.

Another big one, especially on ecommerce sites, is JavaScript-only checkout.

If JavaScript is working, you get a fully functional checkout cart. If not, you get... a blank screen. Or a spinning loader that never stops. Or worst of all, a complete checkout form with the submit button disabled, so you only find out after you've entered all of your info that you can't actually complete a purchase.

And since JavaScript is often used to show and hide things, you often see "more details..." links, tabbed content, and modal links with content hidden behind them that can never be accessed.

These are all stupid problems that are cost you money and visitors, and (mostly) have some reasonably easy fixes.

## Who cares? No one actually turns JavaScript off, anyways.

There are *some* people who turn off JavaScript, but generally speaking, the days of disabling JavaScript on purpose are over.

There are still tons of people who end up on your site without JavaScript, though. How does that happen?

- The CDN you're serving your file from is having issues and fails.
- An overly aggressive ad blocker flags your script as an ad and blocks it (this one happens to me a lot with [Ghostery](https://www.ghostery.com/)).
- Your visitor is on a slower connection or older device, so while they're waiting, they have no JS and can't use your site (even though all of the content is already loaded and ready).
- Your visitor's connection is so slow that their browser times out your JavaScript file and never downloads it at all.
- They're commuting (on a train, bus, whatever) and hit a no-service zone halfway through loading your site. All of the content is loaded, but the JavaScript file isn't.
- Your visitor is using an older device or browser that doesn't support the JavaScript methods and browser APIs you're using. And no, they can't just "download a new one" because they're on a corporate computer or an old, crappy laptop they can't afford to upgrade.
- Their company's firewall blocks any external JavaScript files that's not whitelisted (I've had this happen to me often, too).

There are a lot of reasons why a vistor might not have access to JavaScript, most of them beyond their control. Shouldn't that person be able to complete the core tasks on your site anyways?

## So... what can you do about it?

The fix is pretty obvious: make sure your stuff works without JavaScript.

This doesn't mean users without JavaScript get the same exact top-tier experience. It just means they can access all of the content and complete their core tasks. [As Brad Frost says](http://bradfrost.com/blog/mobile/support-vs-optimization/), support is not the same as optimization.

Navigation menus? Show all of the links as an inline list until the script loads, and then hide them behind the expand-and-collapse menu. I've even seen some sites display them in the footer, with the menu button acting as an anchor link by default. Once JS is available, the menu moves off campus and the button works the way you'd normally expect it to. (Check out the [Financial Times](https://www.ft.com/) for a great example of this.)

Show-and-hide widgets and tabbed menus? Show all of the content until your script loads and treat them like anchor links. Same goes for modals. Or, if you'd prefer, you can host the modal content on another page and pull it asynchronously into the modal when someone clicks the link.

Checkout carts get a little bit harder, because [Stripe](https://stripe.com/) is awesome, and requires JavaScript to work. If you really care about maximizing revenue, though, you should probably figure out a no-JavaScript server-side option as well.

## This sounds complicated

It can be, because it forces you to think different about how you write your JavaScript.

After two or three projects, though, it becomes second nature, and sites that don't work without JavaScript will start to drive you nuts.