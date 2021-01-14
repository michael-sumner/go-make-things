---
title: "Automatic night mode with vanilla JS"
date: 2020-12-07T10:30:00-05:00
draft: false
categories:
- Code
- CSS
- Design and UX
- HTML
- JavaScript
---

Today, I live-coded an automatic night mode feature using vanilla JS (video and text write-up below).

For this project, I want to detect the time where the user is located, and display a time-aware greeting and color palette. Let's dig in.

## The template

My starting HTML looks like this.

```html
<p id="greeting"></p>
```

Inside the empty `#greeting` element, I want to display a customized greeting, like, "Good morning" or "Good afternoon", based on the time of day where the visitor is.

I also want to update the UI at night, and in the morning/evening.

```css
.night body {
	background-color: #001f3f;
	color: white;
}

.transitional body {
	background-color: #f7f7f7;
}
```

I have a `.night` class that uses a midnight blue color for the background instead of default white. For the morning and evening, I have a `.transitional` class that makes the background gray to be a bit more gentle on the eyes.

**[You can download the source code on GitHub.](https://gist.github.com/cferdinandi/5817d911130649f72fa88f8a61fd7a30)**

## Watch me code this project

If you want, you can [follow along while I figure this one out in real time](https://vimeo.com/488124332). If you're rather read about it, keep scrolling.

<div class="fluid-vids"><iframe src="https://player.vimeo.com/video/488124332?color=0088cc&title=0&byline=0&portrait=0" width="640" height="360" frameborder="0" allow="autoplay; fullscreen" allowfullscreen></iframe></div>

## How it works

For this project, the first thing I did was use the `new Date()` constructor to get a `Date` object for the current user and their location. Then, I used the `getHours()` method to get the hour of the day.

The `getHours()` method returns the hour portion of the time as an integer, in 24-hour format.

This means that for 10am, it would return `10`, and for 10pm it would return `22`. This is really handy for what we're trying to do.

```js
// Get the time right now
var now = new Date().getHours();
```

I also used the `querySelector()` method to get the `#greeting` element.

```js
// Get the #greeting element
var greeting = document.querySelector('#greeting');
```

### Displaying a greeting

Now, let's display a greeting based on the time of day.

I creating a `getGreeting()` function that will return the greeting as a string. I'll set the `textContent` of my `greeting` element to whatever it returns.

```js
/**
 * Get the greeting based on time
 * @return {String} The greeting
 */
var getGreeting = function () {
	// Code goes here...
};

// Set the greeting
greeting.textContent = getGreeting();
```

Inside the `getGreeting()` function, I check to see what `now` is. If it's bigger than `20` (8pm), I return `Good night!`. If it's bigger than `17` (5pm), I return `Good evening!`. And so on.

Because I use `return`, once we find a match, nothing else in the function runs. If no match is found, `Good morning!` is returned.

```js
/**
 * Get the greeting based on time
 * @return {String} The greeting
 */
var getGreeting = function () {
	if (now > 20) return 'Good night!';     // If it's after 8pm
	if (now > 17) return 'Good evening!';   // If it's after 5pm
	if (now > 11) return 'Good afternoon!'; // If it's after noon
	return 'Good morning!';                 // Default message
};
```

### Updating the color palette

Next, I want to update the color palette based on the time. I created an `adjustColorMode()` helper function, and run it when the page loads.

```js
/**
 * Adjust the color theme based on time
 */
var adjustColorMode = function () {
	// Code goes here...
};

// Update color palette
adjustColorMode();
```

If `now` is greater than `20` (8pm), I want to add the `.night` class. I used the `classList.add()` method for that. Then I ran `return` so the rest of the function would not run.

If `now` is greater than `17` or less than `11` (if it's after 5pm or earlier than 11am), I added the `.transitional` class instead.

```js
/**
 * Adjust the color theme based on time
 */
var adjustColorMode = function () {

	// If it's nighttime, go dark mode
	if (now > 20) {
		document.documentElement.classList.add('night');
		return;
	}

	// If it's morning or evening, go transitional
	if (now > 17 || now < 11) {
		document.documentElement.classList.add('transitional');
	}

};
```

### Updating throughout the day

If someone visits the site and stays there for a while, I want to periodically check the time and adjust the greeting and them as needed.

To do that, I first moved injecting the greeting and adjusting the color palette into a function, `updateUI()`, which I run when the page loads.

```js
/**
 * Add a greeting and adjust the color palette
 */
var updateUI = function () {

	// Set the greeting
	greeting.textContent = getGreeting();

	// Update color palette
	adjustColorMode();

};
```

Then, I setup a `setInterval()` method to run every 15 minutes. In it, I update the `now` variable to the current time, then I run the `updateUI()` function again.

```js
// Update the UI on page load
updateUI();

// Check again every 15 minutes
setInterval(function () {
	now = new Date().getHours();
	updateUI();
}, 1000 * 60 * 15);
```

Finally, I need to remove any existing `.transitional` or `.night` classes before trying to update the color palette.

```js
/**
 * Adjust the color theme based on time
 */
var adjustColorMode = function () {

	// Remove any existing classes
	document.documentElement.classList.remove('transitional');
	document.documentElement.classList.remove('night');


	// If it's nighttime, go dark mode
	if (now > 20) {
		document.documentElement.classList.add('night');
		return;
	}

	// If it's morning or evening, go transitional
	if (now > 17 || now < 11) {
		document.documentElement.classList.add('transitional');
	}

};
```

And now, I have a time aware, automatically updating UI.