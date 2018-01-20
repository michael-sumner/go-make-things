---
categories:
- Code
- JavaScript
date: '2017-08-17'
url: /yes-you-can-ditch-jquery-and-still-support-ieedge/
title: Yes, you can ditch jQuery and still support IE/Edge
---

Last month, Ollie Williams wrote a post for CSS Tricks on why [now more than ever you really don't need jQuery](https://css-tricks.com/now-ever-might-not-need-jquery/). He covered a handful of modern ES5 and ES6 JavaScript and browser APIs that make working with vanilla JS just as easy as using jQuery.

[The comments section](https://css-tricks.com/now-ever-might-not-need-jquery/#comments) was littered with people arguing that if care about IE or Edge at all, this just won't work.

> So, as always, you can’t do this in IE. So my company and I cannot use it.

<hr class="line-secondary">

> But I died a little inside when I saw that there is currently no native support on Microsoft Internet Explorer / Edge. I cannot imagine a single project that I have on my roster now or have had in the past oh… 5 years… that could just completely ignore IE. And if I have to rely on a poly to bridge the gap… I mean why not stick with jQuery at that point?

<hr class="line-secondary">

> I agree that it would be nice to ditch jQuery, but the cross browser support that it gives is invaluable.

<hr class="line-secondary">

> Fortunately few of my users use IE or Edge – and I don’t have a problem telling those few to use something better.

## You can use vanilla JavaScript *and* support IE and Edge.

Seriously. The comments above are 100% wrong.

Most ES5 methods (the ECMAScript 5 flavor of JavaScript is 6 years old at this point) work in IE9 and above, which covers 99.6% of global browser usage.

If you want to use some of the nicer ES6 methods like `Array.forEach()`, `Element.before()` and so on, you *could* use some complicated command line build tools and transpile everything. *Or* you could just load [polyfill.io](https://polyfill.io) and start coding.

## Polyfills are your friend

[I love polyfills.](/why-i-love-polyfills/) Polyfills are little snippets of code that add support for a features to browsers that don’t offer them natively.

Polyfill.io is a service that detects what browser your visitor is on and serves them just the polyfills they need.

On modern browsers like the latest version of Chrome, they get nothing. On older versions of IE (like IE7), they get about 13kb worth of code. Most browsers fall somewhere in the 1-5kb range.

## Polyfills > jQuery

As one commenter asked:

> And if I have to rely on a poly to bridge the gap… I mean why not stick with jQuery at that point?

The latest version of jQuery, minified, is 87kb, and that's not include jQuery Migrate, which is often required.

So, why polyfills? You're loading at least 6x less code, usually more. You're also getting *better* browser support with that than the latest version of jQuery.

jQuery 3 supports IE9 and up (same as native ES5-flavored JavaScript). Polyfill.io bolts support back to IE7 at a fraction of the size.

## The big argument in favor of jQuery

Documentation. Vanilla JavaScript documentation sucks.

The closest thing to jQuery documentation for vanilla JS is [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript), and it's often written in a way that's inaccessible to beginners. jQuery makes getting started a lot easier.

This is why I started writing my [pocket guides series](/guides/). I want to make vanilla JS as accessible to new developers as jQuery is.

## You don't need jQuery

Here's the thing, though. It's getting better.

I don't like the phrase, "You might not need jQuery." It's too passive. It's too soft.

You *don't* need jQuery.

Most of the things you typically use jQuery for are just as easy with vanilla JavaScript. And you'll load less code and support more browsers in the process.

[Ready to make the leap?](/guides/)
