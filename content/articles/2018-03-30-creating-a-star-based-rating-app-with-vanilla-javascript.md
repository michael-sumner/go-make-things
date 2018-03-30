---
title: "Creating a star based rating app with vanilla JavaScript"
date: 2018-03-30T10:30:00-04:00
draft: false
categories:
- Accessibility
- Code
- CSS
- HTML
- JavaScript
---

One of my readers suggested that it might be fun do a project-based article, where I ask you to build something, and then show you how I'd approach it in a follow-up article.

Great idea! Let's get right to it.

## A star-based rating feature

<p class="no-margin-bottom text-center"><img src="/img/articles/star-based-rating-feature.gif"></p>

We're going to build a star-based rating feature.

I've setup a repository on GitHub that will hold [all of the source code for this project](https://github.com/cferdinandi/project-star-rating-system). To get get you started, I've included an HTML boilerplate to work with.

```html
<form class="rating" id="product1">
	<button type="submit" class="star" data-star="1">
		&#9733;
		<span class="screen-reader">1 Star</span>
	</button>

	<button type="submit" class="star" data-star="2">
		&#9733;
		<span class="screen-reader">2 Stars</span>
	</button>

	<button type="submit" class="star" data-star="3">
		&#9733;
		<span class="screen-reader">3 Stars</span>
	</button>

	<button type="submit" class="star" data-star="4">
		&#9733;
		<span class="screen-reader">4 Stars</span>
	</button>

	<button type="submit" class="star" data-star="5">
		&#9733;
		<span class="screen-reader">5 Stars</span>
	</button>
</form>
```

I use `button` elements instead of `span` elements or something similar so that a keyboard-only use can navigate to and focus on the items.

Each button includes the hexcode for an emoji star (&#9733;). I've also included some text that's intended to only bee seen by screen readers to help people with visual impairments know how many stars they've selected&mdash;something sighted users can infer visually.

The `.star` class gives us a hook to style the buttons with, while the `[data-star]` attribute provides information about the rating for each button.

I've also added some minimal CSS.

```css
.star {
	background: none;
	border: none;
	font-size: 1.5em;
	padding: 0 0.15em;
}

/**
 * Visually hide an element, but leave it available for screen readers
 * @link https://github.com/h5bp/html5-boilerplate/blob/master/dist/css/main.css
 * @link http://snook.ca/archives/html_and_css/hiding-content-for-accessibility
 */
.screen-reader {
	border: 0;
	clip: rect(0 0 0 0);
	height: 1px;
	margin: -1px;
	overflow: hidden;
	padding: 0;
	position: absolute;
	white-space: nowrap;
	width: 1px;
}
```

The `.star` class styling removes the button styles from our buttons so that they just look like stars. The `.screen-reader` class is used to hide content visually but keep it accessible to assistive devices like screen readers.

I also added [polyfill.io](https://polyfill.io) onto the page so that you can work with ES6 methods if you'd prefer.

## The first challenge

[First, go grab the template on GitHub.](https://github.com/cferdinandi/project-star-rating-system)

Over the weekend, try to write some JavaScript that detects when a user has clicked a star. Make it look different from the other stars, and add some text for visually impaired users so that they know which star is selected, too.

**Bonus Points:**

- Highlight all of the stars before the selected one, too. For example, if you click the third star, stars one and two should also look different.
- Make it also work if a keyboard-only user uses the tab key to move over to their desired rating and hits enter instead of using a mouse.

On Monday, I'll walk you through how I approached this.