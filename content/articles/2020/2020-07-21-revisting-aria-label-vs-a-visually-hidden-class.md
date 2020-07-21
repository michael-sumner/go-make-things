---
title: "Revisting aria-label versus a visually hidden class"
date: 2020-07-21T10:30:00-04:00
draft: false
categories:
- Accessibility
- Code
- CSS
- Design and UX
- HTML
---

Last week, I wrote about [the `[aria-label]` attribute](/icon-accessibility-and-aria-label/), and [when you should use aria](/when-should-you-use-aria/).

In the posts, I recommended that, generally speaking, `[aria-label]` is the better choice when you want the text read aloud by screen readers to be different from what's visually shown to sighted users.

**I was wrong.**

I had a handful of people reach out explaining why a `.visually-hidden` is almost always the better choice, and wanted to share why in today's article.

## The use case

In my article on icon accessibility, I shared the following code.

```html
<button>
	<svg xmlns="http://www.w3.org/2000/svg" height="1em" width="1em" viewBox="0 0 16 16"><path fill="currentColor" d="M13.922 5.626A3.72 3.72 0 0010.205 2a3.712 3.712 0 00-2.92 1.418 2.09 2.09 0 00-3.719 1.573 3.028 3.028 0 00-3.567 2.98A3.028 3.028 0 003.026 11H4.46l3.539 3.664L11.538 11h1.742a2.725 2.725 0 00.641-5.374zM8 13l-3-3h2V7h2v3h2l-3 3z"/></svg>
</button>
```

> For example, here’s an SVG icon of a cloud with an arrow pointing down out of it. In this app, it’s supposed to mean “download.”
>
> If you’re not visually impaired, you might be able to figure that out. If you rely on a screen reader, though, this button will announce, “button.”
>
> That’s it. “Button.”

I suggested using `[aria-label]`, because that's what the ARIA attribute is specifically designed for.

```html
<button aria-label="Download">
	<svg xmlns="http://www.w3.org/2000/svg" height="1em" width="1em" viewBox="0 0 16 16"><path fill="currentColor" d="M13.922 5.626A3.72 3.72 0 0010.205 2a3.712 3.712 0 00-2.92 1.418 2.09 2.09 0 00-3.719 1.573 3.028 3.028 0 00-3.567 2.98A3.028 3.028 0 003.026 11H4.46l3.539 3.664L11.538 11h1.742a2.725 2.725 0 00.641-5.374zM8 13l-3-3h2V7h2v3h2l-3 3z"/></svg>
</button>
```

But, that's probably not the right call.

## The `[aria-label]` attribute isn't announced consistently

Today, it's easy to take for granted the the benefits that web standards bring to the development process.

While there's some lag with newer features getting implemented, all of the major browsers do a pretty good job supporting a good number of features, and implement them pretty consistently. There are exceptions, but if you grew up during [the "Browser Wars" era](/the-browser-wars-an-abridged-history/), you'll know how easy things are now.

**Screen readers are stuck in the browser wars.**

Different ones pair best with different browsers. VoiceOver on macOS, for example, is designed to work with Safari. It does pretty well with Chrome, too, but misses the mark with certain features in Firefox.

As a result, [`[aria-label]` is not announced consistently](https://www.powermapper.com/tests/screen-readers/aria/index.html) in all screen reader/browser combinations.

## The `[aria-label]` attribute is not always translated

Many users rely on automatic translation services to translate websites from into the user's native language. If you or your company have an internationalization strategy, it may also rely on an API or a third-party service to do that for you.

The `[aria-label]` attribute is often not translated, and thus may not be usable to international users.

[Adrian Rosselli has a great article about this](https://adrianroselli.com/2019/11/aria-label-does-not-translate.html), in which he writes...

> One of the big risks of using ARIA to define text content is that it often gets overlooked in translation. Automated translation services often do not capture it. Those who pay for localization services all too often miss content in ARIA attributes when sending text strings to localization vendors...
>
> A more sustainable approach (which applies if you have no localization budget) might come earlier in the process — avoid using `aria-label`.

## Using a `.visually-hidden` class

In my article on when you should user ARIA, I mentioned that the `.visually-hidden` class sometimes results in the visually hidden text being read *before* any other text in an element.

```html
<a href="link-to-article.html">
	Read more<span class="visually-hidden"> about pirates</span>...
</a>
```

> In theory, it should visually appear as “Read more…” but get read aloud by screen readers as “Read more about pirates…”.
>
> But in some screen readers, the .visually-hidden text gets interpreted first in the markup, resulting in “about pirates Read more…”. Still kind of makes sense (if you’re Yoda), but not really what you intended.

Turns out, there's [a fix for it sitting in an open issue on GitHub](https://github.com/h5bp/main.css/issues/12#issuecomment-321106995) from three years ago, courtesy of [the amazing Scott O'Hara](https://www.scottohara.me/): remove the negative `margin`.

The corrected `.visually-hidden` class looks like this:

```css
/**
 * Visually hide an element, but leave it available for screen readers
 * @link https://github.com/h5bp/html5-boilerplate/blob/master/dist/css/main.css
 * @link http://snook.ca/archives/html_and_css/hiding-content-for-accessibility
 * @link https://github.com/h5bp/main.css/issues/12#issuecomment-321106995
 */
.visually-hidden {
	border: 0;
	clip: rect(0 0 0 0);
	height: 1px;
	overflow: hidden;
	padding: 0;
	position: absolute;
	white-space: nowrap;
	width: 1px;
}
```

Because the text is in the markup itself, it gets picked up by translators and translated into a new language, making it the better choice.

## Pairing a `.visually-hidden` class with `[aria-hidden]`

If the `.visually-hidden` text *augments* the content (as in our "Read more..." link above), you can use it by itself.

But what about when you want to have the text completely replace other text in the element?

For example, imagine a "Favorite" button that uses the unicode heart (`♥`) for an icon.

```html
<button class="favorite">♥</button>
```

This gets announced by VoiceOver on macOS as "Red Heart Suit."

So, you add some `.visually-hidden` text.

```html
<button class="favorite">
	♥
	<span class="visually-hidden">Favorite</span>
</button>
```

Now it gets announced as "Red Heart Suit Favorite." Huh? Not quite what you were looking for!

You can pair the `.visually-hidden` class with `[aria-hidden="true"]`, which will prevent the text from being announced by screen readers but will still visually show in the markup.

```html
<button class="favorite">
	<span aria-hidden="true">♥</span>
	<span class="visually-hidden">Favorite</span>
</button>
```

Now, the screen reader announced "Favorite." Perfect!