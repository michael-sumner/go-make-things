---
categories:
- Code
- Design &amp; UX
- JavaScript
date: '2017-05-22'
url: /social-sharing-buttons-are-pointless-except-when-theyre-not/
title: Social sharing buttons are pointless (except when they&#8217;re not)
---

It's well documented that social sharing buttons, particularly on mobile devices, are entirely pointless. [Josh Clark from Big Medium writes:](https://bigmedium.com/ideas/no-mobile-share-buttons.html)

> Only 2 out of every 1000 mobile web users ever tap a custom share button—like even once—according to [a Moovweb study](http://moovweb.com/blog/anyone-use-social-sharing-buttons-mobile/). We found similarly tiny numbers during our research designing Philly.com and verticals for About.com. That means people are over 11 times more likely to tap a mobile advertisement than a mobile share button for Facebook, Twitter, Pinterest, etc.
>
> To be clear: people do share a ton of webpages to those services from mobile devices, but it happens through other means—using browsers’ built-in sharing tools or copying the URL directly into a social post. Mobile users have established their own sharing habits, in other words, and for the vast majority, those habits don’t involve share buttons embedded in the page canvas.

## There's a caveat, though.

> Turns out that use of custom share buttons leaps way, way, way up for visitors coming directly from a social network. **People are 20 times more likely to use a social button on mobile when they’ve tapped through from a social network, we discovered during our research designing the About.com verticals.** Call them the “20x users.”

## So here's what you should do about it:

1. By default, don't display social sharing buttons.
2. BUT, if someone visits your site from Facebook, show the Facebook sharing button. If they visit from Twitter, show the Twitter sharing button. I'd recommend using [the static HTML versions](https://github.com/cferdinandi/social-sharing/) instead of the ones the social networks give you.
3. Josh recommends setting a cookie and making them persistent across the visit.

## The code to make it all happen

Let's drop an empty placeholder element somewhere on the page that we can add our sharing button to later if needed.

```markup
<div id="social-sharing"></div>
```

Next, we'll check to see if we were referred from a social network and act accordingly. For this example, I'll look at Facebook and Twitter. Add others to suit your tastes and traffic.

```javascript
var addSocialButton = function (title, handle) {

	'use strict';

	// Get the placeholder for our social links
	var placeholder = document.querySelector('#social-sharing');
	if (!placeholder) return;

	// Our meta values
	var meta = {
		title: title || '',
		handle: handle || ''
	}

	// The sites to look for
	var sites = {
		twitter: {
			url: 't.co',
			button: '<a target="_blank" href="https://twitter.com/intent/tweet?text={title}&url={url}&via={handle}">Tweet</a>'
		},
		facebook: {
			url: 'facebook.com',
			button: '<a target="_blank" href="https://www.facebook.com/sharer/sharer.php?u={url}">Share on Facebook</a>'
		}
	};

	// Get the value of a cookie
	// https://gist.github.com/wpsmith/6cf23551dd140fb72ae7
	var getCookie = function (name) {
		var value = "; " + document.cookie;
		var parts = value.split("; " + name + "=");
		if (parts.length == 2) return parts.pop().split(";").shift();
	};

	// Check to see if the referrer is one of our social sites.
	// If it is, return the button markup
	var matches = function () {
		for ( var key in sites ) {
			if ( Object.prototype.hasOwnProperty.call( sites, key ) ) {
				if ( new RegExp('^(https?:)?\/\/(?:www\.|(?!www))' + sites[key].url, 'i').test(document.referrer) ) {
					return key;
				}
			}
		}
	};

	// Add meta data to our button
	var addMeta = function (button) {
		return button.replace('{title}', meta.title).replace('{url}', document.href).replace('{handle}', meta.handle);
	};

	// Check for referrer or cookie
	var referrer = matches() || getCookie('socialReferrer');

	// If there's a match, load it in our placeholder and set a cookie
	if ( referrer ) {
		placeholder.innerHTML = addMeta(sites[referrer].button);
		document.cookie = 'socialReferrer="' + referrer + '"';
	}

};
```

To run it, do this, where `title` is the title of your page, and `handle` is your Twitter handle (you can remove this from the script if you want).

```javascript
addSocialButton(title, handle);
```

How do you get the title? You might set it as a JavaScript variable with your CMS, or just grab the content of the `h1` element on the page like so:

```javascript
var title = document.querySelector('h1');
addSocialButton(title.innerHTML, 'MyDopeTwitterName');
```