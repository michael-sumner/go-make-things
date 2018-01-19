---
categories:
- Code
- CSS
- HTML
- JavaScript
date: '2017-12-12'
permalink: /adding-placeholder-content-to-your-javascript-web-app/
title: Adding placeholder content to your JavaScript web app
url: /2017/12/12/adding-placeholder-content-to-your-javascript-web-app
---

Depending on which parts of your user interface you're rendering with JavaScript and how you're fetching your data (Ajax vs. local storage, and so on), there may be parts of your UI that aren't ready when the page first loads.

Placeholder content&mdash;sometimes called an app shell&mdash;can help improve the perceived load time of your app.

<img src="https://gomakethings.com/wp-content/uploads/2017/11/placeholder.gif" alt="An example of placeholder content" width="1498" height="738" class="aligncenter size-full wp-image-19389" />

Your placeholders mimick the completed layout of the app. They're typically gray, and often have a slight animation to them to imply that the real content is loading.

Let's look at how to use them in your web app.

## Creating placeholders

Placeholder content can be created with just a little bit of HTML and CSS. First, create a `<div>` and add the `.placeholder` class.

```lang-html
<div class="placeholder"></div>
```

Then we'll add this CSS to our app.

```lang-css
/**
 * Setup keyframes for pulsing animation
 */
@-webkit-keyframes loadingPlaceholders {
	0% {
		background-color: lightgray;
	}
	50% {
		background-color: #e5e5e5;
	}
	100% {
		background-color: lightgray;
	}
}
@keyframes loadingPlaceholders {
	0% {
		background-color: lightgray;
	}
	50% {
		background-color: #e5e5e5;
	}
	100% {
		background-color: lightgray;
	}
}

/**
 * Style the placeholder
 */
.placeholder {
  -webkit-animation: loadingPlaceholders 1.5s ease-in infinite;
          animation: loadingPlaceholders 1.5s ease-in infinite;
  background-color: #e5e5e5;
}
```

## Customizing Placeholders

While the CSS above adds the basic functionality, you'll want to style your placeholders to match the layout of your app.

I use a handful of modifier classes to create different shapes to match my content.

```lang-css
.placeholder-hero {
	height: 20em;
}

.placeholder-heading {
	height: 3em;
	width: 55%;
}

.placeholder-sentence {
	height: 1.5em;
	margin-bottom: 0.5em;
}

.placeholder-sentence-last {
	width: 85%;
}

.placeholder-paragraph {
	height: 8em;
	margin-top: 1.625em;
}

.placeholder-btn {
	height: 3em;
	width: 8em;

}

.placeholder-thumbnail {
	border-radius: 50%;
	height: 9em;
	width: 9em;
}

.placeholder-hero,
.placeholder-heading,
.placeholder-paragraph,
.placeholder-btn,
.placeholder-thumbnail {
	margin-bottom: 1.625em;
}
```

And you use them like this.

```lang-html
<div class="placeholder placeholder-hero"></div>

<div class="placeholder placeholder-thumbnail"></div>

<div class="placeholder placeholder-paragraph"></div>

<div class="placeholder placeholder-sentence"></div>
<div class="placeholder placeholder-sentence"></div>
<div class="placeholder placeholder-sentence placeholder-sentence-last"></div>

<div class="placeholder placeholder-btn"></div>
```

[Here's a working demo.](https://jsfiddle.net/cferdinandi/0ew9raa4/)