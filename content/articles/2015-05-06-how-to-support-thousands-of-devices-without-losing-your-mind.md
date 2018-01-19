---
categories:
- Code
- Design &amp; UX
date: '2015-05-06'
permalink: /how-to-support-thousands-of-devices-without-losing-your-mind/
title: How to support thousands of devices without losing your mind
url: /2015/05/06/how-to-support-thousands-of-devices-without-losing-your-mind
---

*The following post was adapted from [Wicked Fast Websites](/wicked-fast-websites/), my free beginner's guide to building fast websites and web apps that work on any device. [Download it here.](/wicked-fast-websites/)*

Over the last two years, [PAWS New England](http://pawsnewengland.com/) has been visited by over 800 different devices. These devices range from the very capable (the latest iOS and Android versions) to the very old and underpowered (a Nintendo DS and my 5 year old Kindle).

Though it hasn't actually been tested on 800 devices, the site works on all of them. In this section, we'll look at techniques that you can use to support a nearly infinite number of devices, even if you can only test a small fraction of them.

<!--more-->

## The Secret Sauce: Progressive Enhancement

Progressive enhancement is the secret to supporting a nearly infinite number of devices without losing your mind. So what is progressive enhancement? To quote [Team Treehouse](http://blog.teamtreehouse.com/progressive-enhancement-past-present-future):

> Progressive enhancement is a layered approach for building websites using HTML for content, CSS for presentation, and JavaScript for interactivity. If for some reason JavaScript breaks, the site should still work and look good. If the CSS doesn’t load correctly, the HTML content should still be there with meaningful hyperlinks. And even if the HTML is malformed, browsers are smart enough to continue rendering what they can. Progressive enhancement typically yields a result that is robust, fault tolerant, and accessible. People that have the latest devices will get the most progressively enhanced experience, and people on slow connections or less capable devices will still be able to access the information. Websites don’t need to look the same in every browser, they just need to deliver core content and functionality.

Progressive enhancement is about building in successive layers.

## Building in Layers

There are three main layers of the front-end development stack: HTML, CSS, and JavaScript.

1. Write solid, semantic markup that will logically make sense without CSS or JavaScript.
2. Next, layer in visual style with CSS, and ensure that it will work and look decent even if your JavaScript fails to load.
3. Finally, add interaction with JavaScript, but know that this is a nice-to-have rather than a need-to-have.

## Progressive Enhancement with JavaScript

Some of my scripts use CSS to hide and show elements. By default, I want all elements visible. They should only be hidden if the browser has the appropriate JavaScript support and my JS file successfully loads. To do that, I include this snippet in my JavaScript file:

```lang-js
document.documentElement.className += ' js';
```

This adds a `.js` class to my `<html>` element. I can check for this class in my CSS before hiding any content:

```lang-css
.js .example {
	display: none;
	visibility: hidden;
}
```

If your script is dependent on certain APIs that aren't supported by all browsers (things like query selectors and event listeners), you should check for those before running your script or adding your class:

```lang-js
if ( 'querySelector' in document && 'addEventListener' in window ) {
	// Do stuff...
	document.documentElement.className += ' js';
}
```

If your JavaScript file fails to load (because of a broken URL, a corporate firewall, or a bad wireless connection), and while your visitor is waiting for it to download, all of your content is still visible and accessible.

### That popular JavaScript framework you're using

Today's most popular MVC JavaScript frameworks-ones like Angular, Backbone, Ember, and more-render markup primarily using JavaScript, and therefore do not support progressive enhancement.

Not only does this make them far more fragile (if the JS file fails, the user gets an empty page), performance suffers greatly as well. The folks at Filament Group found that [JavaScript frameworks can take 4 seconds or more](http://www.filamentgroup.com/lab/mv-initial-load-times.html) to display the first piece of content to a user. As we learned in the first section, even fractions of a second have meaningful bottom-line impacts on your business.

The good news: there's a push towards [isomorphic JavaScript](http://nerds.airbnb.com/isomorphic-javascript-future-web-apps/), scripts that can be run on both the server and in the browser. You get faster initial load times from the server, *and* faster updates from the browser. And if the JS file fails to load, you simply fallback to the server and the visitor still gets all of your content.

The bad news: We're not there yet with most of today's most popular JavaScript frameworks.

## Mobile First

Mobile first, from a coding perspective, means that your base style is typically a single-column, fully-fluid layout. You use `@media (min-width: whatever)` to add a grid-based layout on top of that.

The alternative – desktop first – involves starting with a wide, grid-based layout, and using `@media (max-width: whatever)` to scale down to a single-column layout. When we all began converting our desktop-*only* sites to responsive design, it was common to use a desktop-*first* approach because it made retrofitting easier.

Mobile-first is the ~~better~~ more future-friendly approach. Here's an example of desktop-first code, borrowed from our chapter on RWD:

```lang-css
#main {
	width: 66.666666667%;
}

#sidebar {
	width: 33.333333333%;
}

@media (max-width: 480px) {
	#main,
	#sidebar {
		width: 100%;
	}
}
```

And here's that same code, rewritten mobile-first:

```lang-css
#main,
#sidebar {
	width: 100%;
}

@media (min-width: 480px) {
	#main {
		width: 66.666666667%;
	}

	#sidebar {
		width: 33.333333333%;
	}
}
```

### Why mobile first?

iPhone and Android browsers are quite capable, but older smart phones, feature phones and other small-screen devices like gaming consoles may not support media queries.

Imagine trying to read tiny text in a big screen layout on an old, underpowered feature phone.

Mobile first web design extends progressive enhancement to site layout, allowing you to serve simple, readable content to all devices, and layer on structure and presentation for more capable devices.

It's worth noting that IE 8 and lower do not support media queries, so they receive the basic, single-column layout when using this approach. There is [a simple way to address this](/mobile-first-and-internet-explorer/) if you *really* need to optimize for IE 8.

## Support is not the same as optimization

The web is for everyone, but [support is not the same as optimization](http://bradfrostweb.com/blog/mobile/support-vs-optimization/).

Rather than trying to provide the same level of functionality for older browsers, use progressive enhancement to serve a basic experience to all browsers (even Netscape and IE 5), and layer in a better layout, more visually attractive elements, and an enhanced experience for newer browsers that support modern APIs and techniques.

This will let you build engaging, feature rich web experiences, support any browser that can connect to the web, and maintain your sanity.

## Does this mean I don't have to test my site?

No. Testing on real devices will still surface unexpected layout quirks and interaction challenges. Test on as many real devices as you can, but acknoweldge that you can't test everything. Come with up a sensible policy and stick to it.

**This seems reasonable:** "We test on the current and last major release of iOS and Android. We also test on the latest versions of all modern browsers, as well as the latest version of IE and two versions prior."