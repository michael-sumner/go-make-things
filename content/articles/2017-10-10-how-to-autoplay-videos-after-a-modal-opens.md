---
categories:
- Code
- JavaScript
date: '2017-10-10'
title: How to autoplay videos after a modal opens
---

Over the weekend, [Kabolobari](https://do22.co/), one of my students, asked me how to make videos autoplay after a modal is opened (shared with permission).

> What's the best way (or best plugin) to do vanilla js modal window that also auto play video in it when it's triggered?

Today, let's look at how to do that.

## Picking the right modal plugin

YouTube, Vimeo, and HTML5 videos all have parameters that let you autoplay them. YouTube and Vimeo both use `autoplay=1` as a query string in the URL, while HTML5 videos have an `autoplay` property.

*But*, if you include those parameters directly in the markup, the video will autoplay when the page loads, whether or not the modal is open.

We need a modal plugin that has a callback or event that runs after a modal opens. We can hook into that and add our parameter or property when the modal opens, and remove it when it closes.

My [Modals plugin](https://github.com/cferdinandi/modals) has callbacks that run when modals are opened or closed, and I'm sure some other popular plugins do, too.

## Adding the autoplay parameter

Let's create a function called `autoplayVideo()`. We'll pass the modal we want to play the video in as an argument.

```js
var autoplayVideo = function (modal) {
	// Code goes here...
};
```

The first thing we want to do is get our video. We'll use `querySelector()` to search inside the modal.

`querySelector()` lets you pass in multiple selectors, separated by a comma, and will grab the first matching element. We'll looking for iframes with either YouTube or Vimeo in the `src`, as well as `video` elements.

If the modal doesn't have a matching video, we'll call `return` to bail on the function.

```js
var autoplayVideo = function (modal) {

	// Look for a YouTube, Vimeo, or HTML5 video in the modal
	var video = modal.querySelector('iframe[src*="www.youtube.com"], iframe[src*="player.vimeo.com"], video');

	// Bail if the modal doesn't have a video
	if (!video) return;

};
```

Next, we want to check if the video is an HTML5 video element. HTML5 videos expose a JavaScript API. If it is, we can call `video.play()` to make the video start playing.

We'll use `tagName` to get the type of element our video is, and `toLowerCase()` to convert it to lowercase, as some browsers return uppercase tag names and string comparisons are case-specific. It it's a match, we can `return` to end our function after playing the video.

```js
var autoplayVideo = function (modal) {

	// Look for a YouTube, Vimeo, or HTML5 video in the modal
	var video = modal.querySelector('iframe[src*="www.youtube.com"], iframe[src*="player.vimeo.com"], video');

	// Bail if the modal doesn't have a video
	if (!video) return;

	// If an HTML5 video, play it
	if (video.tagName.toLowerCase() === 'video') {
		video.play();
		return;
	}

};
```

Finally, if it's an iframe, we'll get the current `src` attribute and add `autoplay=1` to it to cause it to start playing.

Because the video `src` might already have other query parameters on it, we'll check to see if there's a `?` in the URL already. If there is, we'll add an `&` before our autoplay parameter. If not, we'll add a `?`.

```js
var autoplayVideo = function (modal) {

	// Look for a YouTube, Vimeo, or HTML5 video in the modal
	var video = modal.querySelector('iframe[src*="www.youtube.com"], iframe[src*="player.vimeo.com"], video');

	// Bail if the modal doesn't have a video
	if (!video) return;

	// If an HTML5 video, play it
	if (video.tagName.toLowerCase() === 'video') {
		video.play();
		return;
	}

	// Add autoplay to video src
	// video.src: the current video `src` attribute
	// (video.src.indexOf('?') < 0 ? '?' : '&'): if the video.src already has query string parameters, add an "&". Otherwise, add a "?".
	// 'autoplay=1': add the autoplay parameter
	video.src = video.src + (video.src.indexOf('?') < 0 ? '?' : '&') + 'autoplay=1';

};
```

## Passing the function is with your callback

This will vary from plugin to plugin. In [my modals script](https://github.com/cferdinandi/modals), the callback is an option you can pass in at initialization.

It exposes the button that toggled the modal and the modal itself as arguments.

```js
modals.init({
	callbackOpen: function ( toggle, modal ) {
		autoplayVideo(modal);
	}
});
```

## Stopping the video when the modal closes

If you're going to autoplay a video when the modal opens, you should also stop it when the modal closes.

To accomplish this, we'll create a new `stopVideo()` function, and reverse what we did in `autoplayVideo()`.

To stop an HTML5 video, we'll use `video.pause()`. For iframes, we'll use the `replace()` method to remove `?autoplay=1` and `&autoplay=1` from the video source and then reset it. This reloads the video and stops it from playing.

```js
/**
 * Stop a YouTube, Vimeo, or HTML5 video
 * @param  {Node} modal  The modal to search inside
 */
var stopVideo = function (modal) {

	// Look for a YouTube, Vimeo, or HTML5 video in the modal
	var video = modal.querySelector('iframe[src*="www.youtube.com"], iframe[src*="player.vimeo.com"], video');

	// Bail if the modal doesn't have a video
	if (!video) return;

	// If an HTML5 video, pause it
	if (video.tagName.toLowerCase() === 'video') {
		video.pause();
		return;
	}

	// Remove autoplay from video src
	video.src = video.src.replace('&autoplay=1', '').replace('?autoplay=1', '');

};
```

Don't forget to pass the `stopVideo()` function in to your callback as well.

```js
modals.init({
	callbackOpen: function ( toggle, modal ) {
		autoplayVideo(modal);
	},
	callbackClose: function ( toggle, modal ) {
		stopVideo(modal);
	}
});
```

[Here's a demo of all of this in action.](https://jsfiddle.net/cferdinandi/w4va2mpr/9/)