---
title: "A simple, progressively enhanced audio player with vanilla JS"
date: 2019-01-03T10:30:00-05:00
draft: false
categories:
- Accessibility
- Code
- CSS
- Design and UX
- HTML
- JavaScript
---

Today, I wanted to show you how to use a little vanilla JavaScript to take a link to an mp3 file and progressively enhance it into a simple, accessible audio player.

## The markup

Our starting markup is a link to an mp3 file hosted on archive.org. When the user clicks it, it will download the MP3 (or in some browsers, play it in a new tab).

We'll also add a `[data-song]` attribute to use as a selector.

```html
<a data-song href="https://ia902508.us.archive.org/5/items/testmp3testfile/mpthreetest.mp3">
	&#9654; Play Song
</a>
```

This is the perfect starting point. Anyone can access the audio file even if JS fails for some reason.

## Progressively enhancing

Once the page loads, we can *progressively enhance* the experience by letting the user play the file natively in the current window.

To do this, we'll use the `Audio()` object, supported in all modern browsers, and IE9 and up.

### Setting up the element

First, we'll loop through each item with the `[data-song]` attribute on it and create a new `Audio()` object, which we'll attach to the element as the `audio` property so we can access it later.

*Since `querySelectorAll()` returns a NodeList and not an array, I'm using `call()` to apply the `Array.forEach()` method to it and loop through each item.*

```js
// Create a new Audio object for each song and attach is as a property of the element
// Also add accessibility elements
Array.prototype.forEach.call(document.querySelectorAll('[data-song]'), function (song) {

	// Create a new Audio object for the song
	song.audio = new Audio(song.href);

});
```

Next, we'll add to attributes for better accessibility.

Since this is going to be an interactive element and not a link anymore, we'll add `role="button"` using the `setAttribute()` method. We'll also add `[aria-pressed]`, with a default value of `false`, to let screen reader users know if the button is pressed or not.

```js
// Create a new Audio object for each song and attach is as a property of the element
// Also add accessibility elements
Array.prototype.forEach.call(document.querySelectorAll('[data-song]'), function (song) {

	// Create a new Audio object for the song
	song.audio = new Audio(song.href);

	// Add a11y attributes
	song.setAttribute('role', 'button');
	song.setAttribute('aria-pressed', 'false');

});
```

### Playing the audio

Now, we need to detect clicks on our button and play or pause the audio.

We'll use [event delegation](/checking-event-target-selectors-with-event-bubbling-in-vanilla-javascript/) to listen for all clicks, and discard any on elements that don't have the `[data-song]` attribute.

If the clicked element does have the attribute, we'll prevent the default click event from happening.

```js
document.addEventListener('click', function (event) {

	// Ignore clicks on elements that aren't the song link
	if (!event.target.hasAttribute('data-song')) return;

	// Prevent link default
	event.preventDefault();

}, false);
```

Now, we can play the audio by using the `play()` method on the `Audio()` object we attached to the element's `audio` property.

We'll also update the `[aria-pressed]` attribute to `true`, so that screen reader users know the button is now pressed and playing.

```js
document.addEventListener('click', function (event) {

	// Ignore clicks on elements that aren't the song link
	if (!event.target.hasAttribute('data-song')) return;

	// Prevent link default
	event.preventDefault();

	// Play the audio
	event.target.audio.play();
	event.target.setAttribute('aria-pressed', 'true');

}, false);
```

It works! [Here's a demo.](https://codepen.io/cferdinandi/pen/GPQrxX)

Of course, there's currently no way to pause the audio. Let's add that.

We can check to see if the `[aria-pressed]` attribute is `true` or not. If it is, we know the audio is playing and can pause it with the `pause()` method. Otherwise, we'll play it as normal.

```js
document.addEventListener('click', function (event) {

	// Ignore clicks on elements that aren't the song link
	if (!event.target.hasAttribute('data-song')) return;

	// Prevent link default
	event.preventDefault();

	// If the item is already playing, hit pause
	if (event.target.getAttribute('aria-pressed') == 'true') {
		event.target.audio.pause();
		event.target.setAttribute('aria-pressed', 'false');
		return;
	}

	// Otherwise, play it
	event.target.audio.play();
	event.target.setAttribute('aria-pressed', 'true');

}, false);
```

[Here's an updated demo.](https://codepen.io/cferdinandi/pen/MZQJBK)

### Adding visual affordances

Screen reader users have the `[aria-pressed]` attribute to let them know if the audio is playing or not, but there's currently no visual indication of the button's state.

We can use the `[data-play]` and  `[aria-pressed]` attributes as a styling hook to add some visual affordance to our button.

```css
[data-song] {
  background-color: #f5f5f5;
  border: 1px solid #e5e5e5;
  color: #272727;
  padding: 8px 25px;
  text-decoration: none;
}

[data-song][aria-pressed="true"] {
  background-color: #e5e5e5;
  box-shadow: inset 0 2.5px 4px rgba(0, 0, 0, 0.15), 0 1px 2.5px rgba(0, 0, 0, 0.05);
}
```

[And here's the finished product.](https://codepen.io/cferdinandi/pen/oJEYmz)

<p data-height="265" data-theme-id="0" data-slug-hash="oJEYmz" data-default-tab="js,result" data-user="cferdinandi" data-pen-title="Audio Test" class="codepen"></p>