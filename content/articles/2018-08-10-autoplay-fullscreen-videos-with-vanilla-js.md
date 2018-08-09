---
title: "How to play a video in full screen mode when its thumbnail is clicked with vanilla JS"
date: 2018-08-10T10:30:00-04:00
draft: false
categories:
- Code
- HTML
- JavaScript
---

Building on [yesterday's post on the Fullscreen API](/going-full-screen-with-vanilla-js/), today we're going to look at a more practical example of how to use it.

You'll learn how to add video thumbnails to your site that, when clicked, autoplay the matching video in full screen mode. Just remember: with great power comes great responsibility. Don't be an asshole about autoplay video *or* full screen mode.

## Setting up the markup

First, we'll create an `img`, and giving a `[data-video]` attribute with a value equal to the video's ID on YouTube.

```html
<p><img data-video="Y7d42LJfkqQ" alt="Play this video" src="http://img.youtube.com/vi/Y7d42LJfkqQ/0.jpg"></p>
```

Next, let's set up an event listener to detect clicks, and ignore clicks that aren't on an image with the `[data-video]` attribute.

```js
// Listen for clicks
document.addEventListener('click', function (event) {

	// Check if clicked element is a video thumbnail
	var videoId = event.target.getAttribute('data-video');
	if (!videoId) return;

}, false);
```

## Creating a video iframe

Next, we need to create our iframe. Use `document.createElement()` to create a `div`, and `innerHTML` to setup the YouTube iframe inside it (I copy/pasted this from YouTube).

We'll use the `videoId` value for the video's ID in the embed string. We'll also add `&autoplay=1` at the end of the video `src` to make the video autoplay.

```js
// Listen for clicks
document.addEventListener('click', function (event) {

	// Check if clicked element is a video thumbnail
	var videoId = event.target.getAttribute('data-video');
	if (!videoId) return;

	// Create iframe
	var iframe = document.createElement('div');
	iframe.innerHTML = '<p>x</p><iframe width="560" height="315" src="https://www.youtube.com/embed/' + videoId + '?rel=0&autoplay=1" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>';

}, false);
```

*__Psst...__ Wondering why the `<p>x</p>`? That's to address [an old IE scoping bug](https://www.thecssninja.com/javascript/noscope). It's not always needed, but I like to err on the side of caution.*

Now, we'll get grab the iframe element from the `iframe` div with `childNodes[1]`. The `childNodes` property returns a NodeList, and we want the second item in it (index `1`).

```js
// Listen for clicks
document.addEventListener('click', function (event) {

	// Check if clicked element is a video thumbnail
	var videoId = event.target.getAttribute('data-video');
	if (!videoId) return;

	// Create iframe
	var iframe = document.createElement('div');
	iframe.innerHTML = '<p>x</p><iframe width="560" height="315" src="https://www.youtube.com/embed/' + videoId + '?rel=0&autoplay=1" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>';
	var video = iframe.childNodes[1];

}, false);
```

## Injecting the video into the DOM

Finally, we'll replace the clicked image with the new iframe using the `replaceChild()` method. Then, we'll call `video.requestFullscreen()` to put the video in full screen mode.

```js
// Listen for clicks
document.addEventListener('click', function (event) {

	// Check if clicked element is a video thumbnail
	var videoId = event.target.getAttribute('data-video');
	if (!videoId) return;

	// Create iframe
	var iframe = document.createElement('div');
	iframe.innerHTML = '<p>x</p><iframe width="560" height="315" src="https://www.youtube.com/embed/' + videoId + '?rel=0&autoplay=1" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>';
	var video = iframe.childNodes[1];

	// Replace the image with the video
	event.target.parentNode.replaceChild(video, event.target);

	// Enter fullscreen mode
	video.requestFullscreen();

}, false);
```

And that's that. [Here's a working demo for you.](https://codepen.io/cferdinandi/pen/wxRwPM)

<p data-height="265" data-theme-id="light" data-slug-hash="wxRwPM" data-default-tab="js,result" data-user="cferdinandi" data-pen-title="Autoplay Video" class="codepen"></p>
<script async src="https://static.codepen.io/assets/embed/ei.js"></script>

And per yesterday's post, [this does require a polyfill](/going-full-screen-with-vanilla-js/).