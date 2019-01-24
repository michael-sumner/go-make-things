---
title: "Progressive enhancement doesn't have to be more work"
date: 2019-01-24T10:30:00-05:00
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

[Progressive Enhancement](/does-progressive-enhancement-still-matter/) has fallen a bit out of favor lately.

There’s this line of thinking that says people shouldn’t be turning off JS in their browsers, and browsers are free so they can always just upgrade to the latest one. But [most JS failures are *not* because someone deliberately disabled it](/how-many-people-are-missing-out-on-javascript-enhancements/), and people don’t always have a choice over which browser they use.

Progressive enhancement, or building in layers, adds what Jeremy Keith calls “fault tolerance” to your site or app and helps ensure as much of is as as usable as possible to as many people as possible.

There’s a belief that progressive enhancement adds a lot of work, but it doesn’t have to.

## Building in layers

For example, let’s say you wanted to use [the GitHub API](https://developer.github.com/v3/repos/) and some JavaScript to show a list of your repositories on your site.

Rather than using a blank `<div>`, add a link to your GitHub account.

```html
<div id="github-repos">
	<a href="https://github.com/cferdinandi?tab=repositories">View my projects on GitHub</a>
</div>
```

Once the required JS is loaded, you can use the API to get a list of repositories and replace the existing link with the data from GitHub.

```html
<div id="github-repos">
	<h2>My latest projects on GitHub</h2>
	<ul>
		<li><a href="https://github.com/cferdinandi/smooth-scroll">Smooth Scroll</a></li>
		<li><a href="https://github.com/cferdinandi/reef">Reef</a></li>
		<li><a href="https://github.com/cferdinandi/atomic">AtomicJS</a></li>
	</ul>
</div>
```

If the JavaScript for this feature fails to load or run for some reason, people still get something usable: a link they can click to view your work.

It involves no extra work on your part.

## Progressive enhancement works for CSS, too

People usually think of progressive enhancement a JavaScript thing, but it applies to CSS, too.

For example, CSS Grid makes it a lot easier to create really innovative layouts that were quite difficult in the past. But, it only works in modern browsers. IE and older versions of Edge don’t support it.

 But... you can treat layout like a progressive enhancement. Browsers that support it will get the fancy layout, while browsers that don’t will get a simpler, single-column layout.

No need to build in complicated fallbacks and redundantly write features.

Done right, progressive enhancement *reduces* the amount of work you have to do rather than increases it.