---
categories:
- Accessibility
- Code
- CSS
- Design and UX
date: '2016-04-11'
url: /hidden-content-for-better-a11y/
title: Hidden content for better a11y
---

Web accessibility (or a11y, for short) is a speciality area that you could spend a lifetime mastering.

Today, though, I wanted to share with you a few simple things you can do to make your site more usable for visually impaired and keyboard-only users who visit your site.

<!--more-->

## The keyboard-only user

People with visual impairments will often use their keyboard, paired with screen reading software, to navigate your site. But not every keyboard-only user is visually impaired.

People with neuromuscular conditions&mdash;Parkinson's disease, for example&mdash;who have fine-motor coordination challenges may also find it easier to use a keyboard to navigate your site.

Clicking the "tab" key will jump you front link to link on a webpage. You can try it yourself.

## The skip link

Imagine spending a lot of time on a site, clicking from article to the next. Now imagine having to tab through that site's navigation menu every single time, when all you want to do is read the article.

As a mouse user, that's relatively easily. Just scroll. As a keyboard-only user, it can be far more challenging. Fortunately, there's something relatively simple you can do to provide a better keyboard experience.

A "skip link" is a visually hidden anchor link that keyboard users can access that let's them skip over a section of content.

```html
<a href="#main">Skip to the main content</a>

<nav>Navigation elements...</nav>

<main id="main">The main content</main>
```

### Hiding the link

That markup will scroll you down the page to the main content, skipping over the navigation. Of course, the link will be visible to everyone. We want to:

1. Hide the link visually.
2. Make the link visible when it's in focus (so that a sighted keyboard user knows they're on it).

Let's add some CSS (***note:*** *the `.screen-reader` class was updated on December 12, 2016 to fix a bug that smushed all of the words in a sentence into one in some screen readers.*):

```css
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

/**
 * Extends the .screen-reader class to allow the element to be focusable when navigated to via the keyboard
 * @link https://github.com/h5bp/html5-boilerplate/blob/master/dist/css/main.css
 * @link https://www.drupal.org/node/897638
 */
.screen-reader-focusable:active,
.screen-reader-focusable:focus {
	clip: auto;
	height: auto;
	margin: 0;
	overflow: visible;
	position: static;
	white-space: normal;
	width: auto;
}
```

Now, our markup looks like this:

```html
<a class="screen-reader screen-reader-focusable" href="#main">Skip to the main content</a>

<nav>Navigation elements...</nav>

<main id="main">The main content</main>
```

### Bringing proper focus

Chrome has a longstanding bug that prevents it from properly bringing focus onto the content area with this approach.

If you use the skip link to jump to the content area, the page will scroll down, but focus remains on the skip link. When you click tab, it takes you to the next link&mdash;in our example, in the site nav, which we were trying to avoid.

There's an easy workaround: give the content area a `tabindex` of `-1`:

```html
<a class="screen-reader screen-reader-focusable" href="#main">Skip to the main content</a>

<nav>Navigation elements...</nav>

<main id="main" tabindex="-1">The main content</main>
```

To prevent this content from having a blue outline, I also like to add this class:

```css
/**
 * @workaround Remove focus from <main> element when using tabindex="-1" hack for skipnav link
 * @link https://code.google.com/p/chromium/issues/detail?id=37721
 */
.tabindex:focus {
	outline: none;
}
```

Now, our markup looks like this:

```html
<a class="screen-reader screen-reader-focusable" href="#main">Skip to the main content</a>

<nav>Navigation elements...</nav>

<main class="tabindex" id="main" tabindex="-1">The main content</main>
```

## Hidden labels

You can also use the `screen-reader` class to hide content visually while keeping it accessible for screen readers.

For example, if the only thing on a page is a search form, you might not want to display a label for that field. But, it can be helpful for screen reader users to know what content goes in the field. You can do something like this:

```html
<form>
    <label class="screen-reader" for="search">Search criteria</label>
    <input type="text" id="search" name="search" value="">
    <input type="submit" value="Search">
</form>
```

## Skip *to* navigation

Earlier, we talked about skipping over navigation.

But on [Beacon](http://beacon.gomakethings.com), my learning platform for web developers, I have navigation lower on the page that a user may want to quickly access. You can use a skip link to jump users to that navigation.

```html
<a class="screen-reader screen-reader-focusable" href="#secondary-nav">Skip to Course Navigation</a>

Some other content...

<nav class="tabindex" id="secondary-nav" tabindex="-1">Nav content...</nav>
```

## Focus visibility

One of the biggest accessibility issues I see on websites is the removal of `:focus` styling from links.

When you tab onto a link, it should be outlined in blue. This let's sighted keyboard users easily determine which link is in focus.

If there's anything in your stylesheet (other than our `.tabindex` class) that's removing `border` on `:focus`, remove it right now.

## Skipping over links

There may be times where you have links that you don't want to show up as a user tabs through content.

This article, for example, has a link with a `#` symbol after each header. This gives you easy access to an anchor link you can use to jump people to a particular section.

Imagine having to skip over those as you move through every article on a site though? It would get old and annoying pretty quickly.

Adding `tabindex="-1"` to a link removes it from the normal tab order, so it gets skipped as visitors tab through your content.

## Ask for feedback

Adrienne Debigare pointed me to [this awesome little trick on LinkedIn's site](https://twitter.com/adebigare/status/712368920490074113): include a hidden keyboard user link asking for a11y feedback.

I added one to my site. It just requires our skip link classes and a `mailto` value:

```html
<a class="screen-reader screen-reader-focusable" href="mailto:your@email.com&subject=Accessibility%20Feedback">Accessibility Feedback</a>
```

What I love about this one is that it empowers your audience to tell you when you're doing it wrong. I don't use my keyboard to navigate around websites. I'm not always aware of the unique challenges keyboard-only users face, or things that work poorly on a particular visitors setup.

This gives those users an easy way to reach you and tell you what's wrong so that you can fix it.

## What now?

This article barely scratched the surface of web accessibility, but hopefully it's caused you to start thinking about the way you build websites a bit differently.

If nothing else, go implement these easy fixes today!