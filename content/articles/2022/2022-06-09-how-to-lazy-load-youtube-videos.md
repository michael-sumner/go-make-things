---
title: How to lazy load YouTube videos with vanilla JavaScript
date: 2022-06-09T10:30:00-04:00
draft: false
categories:
- Accessibility
- Code
- Design and UX
- HTML
- JavaScript
---

YouTube videos embedded on a webpage load a bunch of JavaScript behind-the-scenes.

If you have a bunch of them on a page, or you have a video that someone might not play, it can result in page lag or downloaded files that aren't actually needed.

Today, we're going to look at how to show a thumbnail for the video instead, and wait until it's clicked to load and play the video.

Let's dig in!

## The starting HTML

You should always [assume that your JavaScript won't work](/progressive-enhancement-the-new-hotness/).

For this use case, let's start with a link that points to the actual video we want to embed. Before our JS loads, or if it fails for some reason, visitors will still have a way to watch the video.

We'll also include a `[data-youtube]` attribute that we can target with our JavaScript after it loads.

```html
<a data-youtube href="https://www.youtube.com/watch?v=_VDGysJGNoI">
	Watch "The Bigger Picture" by Lil Baby
</a>
```

## Loading a thumbnail

When our JavaScript loads, we can progressively enhance our `[data-youtube]` links.

We'll extract the video ID from the URL, add a thumbnail, and [progressively enhance the link into a button for semantic reasons](/html-semantics/#buttons-and-links-do-different-things).

First, let's get all of our `[data-youtube]` links with the `document.querySelectorAll()` method.

```js
// Get all of the videos
let videos = document.querySelectorAll('[data-youtube]');
```

Then, we'll loop through each one with a `for...of` loop and add some attributes and content.

```js
// Get all of the videos
let videos = document.querySelectorAll('[data-youtube]');

// Progressively enhance them
for (let video of videos) {
	// ...
}
```

First, we'll [use the `new URL()` constructor and `URLSearchParams` object to `get()` the video ID](/getting-values-from-a-url-with-vanilla-js/), the `v` query string parameter, from the `video.href` property.

We'll assign the value to the `id` variable.

```js
// Progressively enhance them
for (let video of videos) {

	// Get the video ID
	let id = new URL(video.href).searchParams.get('v');

}
```

Next, we'll use the `Element.setAttribute()` method to update the `[data-youtube]` attribute with the `id` (we can use this later to embed the video player itself).

We'll also add a `[role]` attribute with a value of `button`.

```js
// Progressively enhance them
for (let video of videos) {

	// Get the video ID
	let id = new URL(video.href).searchParams.get('v');

	// Add the ID to the data-youtube attribute
	video.setAttribute('data-youtube', id);

	// Add a role of button
	video.setAttribute('role', 'button');

}
```

Then, we'll get the video thumbnail and add that to the link.

YouTube uses a consistent URL pattern, with the video ID in the path, for its video thumbnails. We'll use the `Element.innerHTML` property to add an image to the URL, and keep the descriptive text with it.

```js
// Progressively enhance them
for (let video of videos) {

	// Get the video ID
	let id = new URL(video.href).searchParams.get('v');

	// Add the ID to the data-youtube attribute
	video.setAttribute('data-youtube', id);

	// Add a role of button
	video.setAttribute('role', 'button');

	// Add a thumbnail
	video.innerHTML =
		`<img alt="" src="https://img.youtube.com/vi/${id}/maxresdefault.jpg"><br>
		${video.textContent}`;

}
```

Now, our links have been enhanced as clickable thumbnails.

## Dynamically injecting the YouTube player

_**Quick note:** this requires a server to work. For working locally, [here's a list of ways to do on your computer](https://gist.github.com/willurd/5720255)._

Let's first setup a `click` event listener.

Since we might have more than one video, [we'll use event delegation](/listening-for-events-on-multiple-elements-using-javascript-event-delegation/) to listen for all clicks on the document and filter out the ones we don't need.

We'll pass in a named function, `clickHandler()`, as the callback.

```js
// Detect clicks on the video thumbnails
document.addEventListener('click', clickHandler);
```

Inside the `clickHandler()` function, we'll first get the parent `[data-youtube]` element for the clicked item (the `event.target`) [using the `Element.closest()` method](/a-native-vanilla-javascript-way-to-get-the-closest-matching-parent-element/).

If no matching `link` was found, we'll use the `return` operator to end the callback function early. Otherwise, we'll use `event.preventDefault()` to stop the link from redirecting users away from the site.

```js
/**
 * Handle click events on the video thumbnails
 * @param  {Event} event The event object
 */
function clickHandler (event) {

	// Get the video link
	let link = event.target.closest('[data-youtube]');
	if (!link) return;

	// Prevent the URL from redirecting users
	event.preventDefault();

}
```

Next, we'll use the `Element.getAttribute()` method to get the video `id` from the `[data-youtube]` attribute.

```js
/**
 * Handle click events on the video thumbnails
 * @param  {Event} event The event object
 */
function clickHandler (event) {

	// ...

	// Prevent the URL from redirecting users
	event.preventDefault();

	// Get the video ID
	let id = link.getAttribute('data-youtube');

}
```

Now, we're ready to create the player itself.

We'll use the `document.createElement()` method to create a `div` and assign it to the `player` variable. Then we'll use the `Element.innerHTML` property to inject a YouTube video iframe.

As a courtesy to our users, let's use the `nocookie` version of the player. We'll use the video `id` as part of the iframe's `src` path, and add `?autoplay=1` to turn it into an autoplaying video.

```js
/**
 * Handle click events on the video thumbnails
 * @param  {Event} event The event object
 */
function clickHandler (event) {

	// ...

	// Get the video ID
	let id = link.getAttribute('data-youtube');

	// Create the player
	let player = document.createElement('div');
	player.innerHTML = `<iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/${id}?autoplay=1" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;

}
```

Finally, we'll [use the `Element.replaceWith()` method](/five-more-ways-to-inject-html-into-the-dom-with-vanilla-javascript/#the-node-replacewith-method) to replace the `link` with our new `player`.

```js
/**
 * Handle click events on the video thumbnails
 * @param  {Event} event The event object
 */
function clickHandler (event) {

	// ...

	// Create the player
	let player = document.createElement('div');
	player.innerHTML = `<iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/${id}?autoplay=1" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;

	// Inject the player into the UI
	link.replaceWith(player);

}
```

Now, when a user clicks the video thumbnail, the video is embedded into the UI and automatically starts playing.

[Here's a demo.](https://codepen.io/cferdinandi/pen/jOZeXgN)