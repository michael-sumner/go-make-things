---
title: "Dynamically changing the text color based on background color contrast with vanilla JS"
date: 2019-07-16T10:30:00-04:00
draft: false
categories:
- Accessibility
- Code
- Design and UX
- JavaScript
---

Last month, we looked at a technique for [generating random colors with vanilla JS](/a-better-better-way-to-generate-a-random-color-with-vanilla-js/).

Reader Stephen Flannery showed me [a demo he built](https://codepen.io/flannerydesigns/pen/byPPGj) with the technique where the text color changed from black to white if the color was too dark.

## Checking color contrast with vanillia JS

When I asked Stephen how he did it, he pointed me to [this article from Brian Suda at 24 Ways on checking color contrast](https://24ways.org/2010/calculating-color-contrast/). In it, Brian shares this technique.

> The second equation is called ‘YIQ’ because it converts the RGB color space into [YIQ](https://en.wikipedia.org/wiki/YIQ), which takes into account the different impacts of its constituent parts...
>
> You’ll notice first that we have broken down the hex value into separate RGB values. This is important because each of these channels is scaled in accordance to its visual impact. Once everything is scaled and normalized, it will be in a range between zero and 255. Much like the previous ’50%’ function, we now need to check if the input is above or below halfway. Depending on where that value is, we’ll return the corresponding highest contrasting color.

And here's a helper function he wrote to go with the technique.

```js
function getContrastYIQ(hexcolor){
	var r = parseInt(hexcolor.substr(0,2),16);
	var g = parseInt(hexcolor.substr(2,2),16);
	var b = parseInt(hexcolor.substr(4,2),16);
	var yiq = ((r*299)+(g*587)+(b*114))/1000;
	return (yiq >= 128) ? 'black' : 'white';
}
```

The helper function is really neat. Let's build on it.

## Adding flexibility to our contrast checker function

Brian's function only accepts six-character hexcolors, and they *cannot* have a leading hash (`#`).

Let's first modify it to accept a leading hash. We'll use `Array.slice()` to get the first character and check if it equals `#`. If it does, we'll use `Array.slice()` again to remove the leading hash and redefine `hexcolor`.

```js
var getContrast = function (hexcolor){

	// If a leading # is provided, remove it
	if (hexcolor.slice(0, 1) === '#') {
		hexcolor = hexcolor.slice(1);
	}

	// Convert to RGB value
	var r = parseInt(hexcolor.substr(0,2),16);
	var g = parseInt(hexcolor.substr(2,2),16);
	var b = parseInt(hexcolor.substr(4,2),16);

	// Get YIQ ratio
	var yiq = ((r * 299) + (g * 587) + (b * 114)) / 1000;

	// Check contrast
	return (yiq >= 128) ? 'black' : 'white';

};
```

Next, let's modify the function to allow both three and six-character colors.

To do that, we'll first check the length of `hexcolor`. If it's `3`, we'll use `Array.split()` to convert the `hexcolor` string into an array of characters. Then, we'll use `Array.map()` to double each character, and `Array.join()` to combine it back into a string.

```js
/*!
 * Get the contrasting color for any hex color
 * (c) 2019 Chris Ferdinandi, MIT License, https://gomakethings.com
 * Derived from work by Brian Suda, https://24ways.org/2010/calculating-color-contrast/
 * @param  {String} A hexcolor value
 * @return {String} The contrasting color (black or white)
 */
var getContrast = function (hexcolor){

	// If a leading # is provided, remove it
	if (hexcolor.slice(0, 1) === '#') {
		hexcolor = hexcolor.slice(1);
	}

	// If a three-character hexcode, make six-character
	if (hexcolor.length === 3) {
		hexcolor = hexcolor.split('').map(function (hex) {
			return hex + hex;
		}).join('');
	}

	// Convert to RGB value
	var r = parseInt(hexcolor.substr(0,2),16);
	var g = parseInt(hexcolor.substr(2,2),16);
	var b = parseInt(hexcolor.substr(4,2),16);

	// Get YIQ ratio
	var yiq = ((r * 299) + (g * 587) + (b * 114)) / 1000;

	// Check contrast
	return (yiq >= 128) ? 'black' : 'white';

};
```

## Bringing it all together

[Here's a demo on CodePen.](https://codepen.io/cferdinandi/pen/Yomroj) Reload the page to get a new color. You can [download the modified helper function on the Vanilla JS Toolkit](https://vanillajstoolkit.com/helpers/getcontrast/).

This technique works in all modern browsers, and IE9 and above.