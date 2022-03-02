---
title: Progressive Enhancement, the New Hotness™
date: 2022-03-02T10:30:00-05:00
draft: false
categories:
- Accessibility
- Business and Leadership
- Careers
- Code
- CSS
- Design and UX
- HTML
- JavaScript
- Web Performance
---

Yesterday, [my web friend Sara Soueidan tweeted out a poll](https://twitter.com/SaraSoueidan/status/1498655196347604993)...

> Do you use Progressive Enhancement (PE) to build your Web products? If you *don’t*, do you mind sharing the reason(s) why? 

A shocking 36.8 percent of respondents said they didn't know what progressive enhancement was! Another 13.5 percent said they don't use it.

So today, we're going to talk about Progressive Enhancement, the New Hotness™. 

Let's dig in!

## What is progressive enhancement?

Progressive enhancement means that you add functionality to the things you build in layers.

All users, when possible, should get a basic "minimum functionality" as part of the HTML file. Then, you can progressively layer in enhancements through your CSS and JavaScript.

If the CSS or JS fail, the user still gets a usable, albeit less flashy, experience.

Progressive enhancement stands in contrast to the "all or nothing" approach you often see with modern websites, where if something fails, the user gets no experience at all.

## An example of progressive enhancement

A good, simple example of progressive is a "slide in navigation" component, where the site navigation _slides in_ from the side of the page when a hamburger icon is clicked.

Let's imagine that by default the nav menu is hidden with some CSS. When the hamburger icon is clicked, a CSS class is added that shows it (probably will some animation). Clicking the hamburger again removes the class and hides it.

```css
#nav {
	position: fixed;
	top: 0;
	right: -10em;
	width: 10em;
}

#nav.slide-in {
	right: 0;
}
```

What happens if the JavaScript file that powers the nav menu fails? Now, the user can't navigate the site.

As an alternative, you could place the nav in the footer, and use an anchor link for the hamburger.

```html
<a href="#nav">Menu</a>
```

When your JavaScript loads, you can add some classes and attributes to _progressively enhance_ the menu from a simple "anchor to the footer" experience into a slide-in navigation.

```js
let hamburger = document.querySelector('[href="#nav"]');
let nav = document.querySelector('#nav');

// Add a11y attribute to link
hamburger.setAttribute('role', 'button');

// Add "component ready" class to nav menu
nav.classList.add('slider');
```

Then, you make your CSS conditional on the inclusion of the `.slider` class (you probably don't need or want that much specificity).

```css
#nav.slider {
	position: fixed;
	top: 0;
	right: -10em;
	width: 10em;
}

#nav.slider.slide-in {
	right: 0;
}
```

This ensures a baseline experience for everyone, and a nicer experience for people when nothing goes wrong.

## Why isn't progressive enhancement more popular

There are a lot of myths about progressive enhancement. 

Many of them were popularized by JS library "thought leaders" as a way to dismiss legitimate feedback about the tools they were building.

Myth: PE is only for people who disable JS on purpose, and you shouldn't do that.
: JavaScript fails about 1 percent of the time. Most of those failures are not people deliberately turning it off (though there are valid reasons to do so). File errors cause JS failures. CDNs go down. Ad blockers flag a file incorrectly. Overzealous corporate firewalls block your file.

Myth: PE is only for older browsers.
: All of those file errors? They happen in new browsers, too!

Myth: PE is only for JavaScript.
: CSS enhancements can be treated as progressive enhancement, too. CSS files also fail to load sometimes, and modern features don't always work everywhere. Grid-based layouts? Progressive enhancement! A single column layout is the base experience. Animations? Progressive enhancement! Any styles at all? Progressive enhancement!

Myth: PE is inherently more work.
: In the comments on Sara's poll, there's a lot of, "progressive enhancement is a lot more work and clients won't pay for that." But it doesn't have to be! It can be just a little more work, or none at all, depending on how you structure your code!

## Some low-hanging fruit progressive enhancement

Here are some simple ways you can start to implement progressive enhancement.

### Treat CSS as an enhancement

Disable it on your site, then look at it. Is the HTML well structured? Is there any "hidden by CSS" junk that completely ruins the experience or is confusing? Can you still navigate around?

### Use CSS and HTML elements that provide progressive enhancement out-of-the-box

[The `details` and `summary` elements create a disclosure component.](/how-to-build-a-progressively-enhanced-accordion-component-with-vanilla-js/)

```html
<details>
	<summary>Click Me</summary>
	<p>Oh, hello there!</p>
</details>
```

<details>
	<summary>Click Me</summary>
	<p>Oh, hello there!</p>
</details>

In older browsers, you get a heading and always-visible content. In modern browsers, you get an expand-and-collapse component. Progressive enhancement is baked right in.

[The CSS `scroll-behavior` property lets you animate scrolling to anchor links.](/smooth-scrolling-links-with-only-css/)

```css
/**
 * Smooth scrolling on the whole document
 */
html {
	scroll-behavior: smooth;
}

@media screen and (prefers-reduced-motion: reduce) {
	html {
		scroll-behavior: auto;
	}
}
```

In older and unsupported browsers (I'm looking at you, Safari!), anchor links jump to the location. In modern browsers, you can a nice animated scroll effect. Progressive enhancement is baked right in!

And, if someone has _prefers reduced motion_, an accessibility setting, enabled in their operating system, you can also disable it with a single line of CSS.

### Provide fallback/loading content

If you're pulling data in from an API, you can provide alternative content while you're waiting for it to load.

For example, if you're using the GitHub API to get and render a list of your top repositories on Github, you might include a link to your GitHub profile as the default HTML.

```html
<div id="github">
	<p><a href="https://github.com/cferdinandi">🐙🐱 View my Profile on GitHub</a></p>
</div>
```

When the API returns data, you can wipe the content out and replace it with dynamically rendered HTML.

This works for any API-driven content that also provides an alternative view elsewhere, and takes about 15 seconds worth of effort to implement.

## Progressive enhancement is for everyone

If you work in tech, you know that eventually things break. Sometimes its your fault. Sometimes things just go wrong. 

Progressive enhancement adds [what Jeremy Keith calls "fault tolerance."](https://adactio.com/)

If you care about quality engineering, you want as much fault tolerance in the things you build as possible.