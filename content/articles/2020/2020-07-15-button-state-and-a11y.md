---
title: "Button state and accessibility"
date: 2020-07-15T10:30:00-04:00
draft: false
categories:
- Accessibility
- Code
- CSS
- Design and UX
- HTML
- JavaScript
---

Yesterday, we looked at [how to use `[aria-label]` to make icons with no obvious meaning for visually impaired users accessible](/icon-accessibility-and-aria-label/).

Today, we're going to look at button state and the `[aria-pressed]` attribute.

*Huge shoutout to [Sarah Higley for her awesome article on button state](https://sarahmhigley.com/writing/playing-with-state/), which heavily informed this article.*

## What is button state?

In apps, it's common to have buttons that have an on/off or pressed/not pressed state.

For example, take the Twitter "like" button (which, for *:waves hands wildly:* reasons is not actually a button, but for this article, we'll pretend it is).

```html
<button class="fave" aria-label="Favorite">❤</button>
```

Maybe you have a few simple styles associated with the `.fave` class, like this.

```css
.fave {
	background: transparent;
	border: 0;
	font-size: 2em;
}
```

When someone clicks the button, you want to show that it's "active." That's the button's "state."

## Wrong ways to show active state

I often see "active state" classes, like `.is-active`, added to elements to modify their appearance.

```html
<button class="fave is-active" aria-label="Favorite">❤</button>
```

```css
.fave.is-active {
	color: red;
}
```

While this changes the *visual* appearance of the button, it does not convey any information about the new state to screen reader users.

You might think you can solve this by changing the `[aria-label]` to say `Favorited` or something similar.

```html
<button class="fave is-active" aria-label="Favorited">❤</button>
```

Unfortunately, changes to the `[aria-label]` text are *not* announced by most screen reader/browser combinations.

## The accessible way to show active state

To solve this issue, you can use the `[aria-pressed]` attribute.

This attribute lets screen readers know that a button has "state." When it has a value of `false`, the button is not pressed. When it has a value of `true`, it is.

```html
<!-- This button is NOT active -->
<button class="fave" aria-label="Favorite" aria-pressed="false">❤</button>

<!-- This button IS -->
<button class="fave" aria-label="Favorite" aria-pressed="true">❤</button>
```

You can change the attribute value using the `setAttribute()` method.

Don't remove the attribute if the button is inactive. Toggle it from `true` to `false`

```js
// The button is active
btn.setAttribute('aria-pressed', true);

// The button is inactive
btn.setAttribute('aria-pressed', false);
```

You can even hook into it for styling purposes.

```css
.fave[aria-pressed="true"] {
	color: red;
}
```

With this approach, you should *not* change the `[aria-label]` if you've used one. The `[aria-pressed]` attribute conveys the important information about the button state.

With our "favorite" button example, the button's label is "Favorite," and its `[aria-pressed]` value conveys whether the item is favorited or note.