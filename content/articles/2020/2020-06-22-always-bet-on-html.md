---
title: "Always bet on HTML"
date: 2020-06-22T10:30:00-04:00
draft: false
categories:
- Accessibility
- Code
- Design and UX
- HTML
- JavaScript
- Web Performance
---

There's a slogan that's been floating around the web for sometime now.

I think the first person to say it was the guy who invented JS (he donated to ban gay marriage in CA, so I'm not going write his name or link to the source here).

> Always bet on JavaScript.

The thinking behind this is that JS is *the* programming language to know.

It can do so much, and run almost anywhere. It's on the web, sure. But it's also [in smart devices](https://iotjs.net/) and [even in the control systems that Space X uses on some of its rockets](https://www.reddit.com/r/spacex/comments/gxb7j1/we_are_the_spacex_software_team_ask_us_anything/) (which is actually terrifying if you're familiar with how fragile JS can be!)

But today, I want to advocate for something else:

> Always bet on HTML.

## The most resilient language in the world

HTML is absolutely amazing.

In JavaScript, if you misspell a variable name, the entire app crashes down and breaks.

```js
var app = document.querySelector('#app');

// Oh noez, my app is broken!
appp.classList.add('loading');
```

If you misspell an element name in HTML, it treats it like a `div` and keeps on going.

```html
<!-- This still works! -->
<arcticle>
	WTF is an arcticle? An article you read in the Arctic?
</arcticle>
```

Same goes for properties and attributes, too.

Mistype one? The browser just ignores it and keeps on going.

```html
<div clsas="hero">
	You misspelled "class", silly head!
</div>
```

Some people don't like that about HTML.

It can make bugs a little harder to track down, because HTML doesn't critically fail and error out the way JavaScript (and some other programing languages) do.

**But the smarties who built HTML made a decision/UX decision: the user experience is more important than the developer experience.**

Put another way, it's better to have an app that works than an app that's easier for a developer to debug.

## HTML is a programming language

This one pisses a lot of people off, but HTML *is* a programming language (seriously, if you respond to me to tell me it's not I'm just going to send your emails to spam).

Let's look at some examples.

### Playing audio and video files

The native `audio` and `video` elements let you embed and play audio and video files directly on a webpage.

```html
<!-- Audio -->
<audio controls="controls">
	<source src="/path/to/file.mp3" type="audio/mpeg">
	<p>Looks like your browser doesn't support streaming audio. <a href="/path/to/file.mp3">Click here to download it.</a></p>
</audio>

<!-- Video -->
<video controls="controls">
	<source src="/path/to/file.mp4">
	<p>Looks like your browser doesn't support streaming video. <a href="/path/to/file.mp4">Click here to download it.</a></p>
</video>
```

With `video`, you can even embed subtitles using the `track` element.

```html
<video controls="controls">
	<source src="/path/to/file.mp4">
	<track label="English" kind="subtitles" srclang="en" src="/path/to/subtitles-en.vtt" default>
	<p>Looks like your browser doesn't support streaming video. <a href="/path/to/file.mp4">Click here to download it.</a></p>
</video>
```

### Accordions/disclosure components

You can add native expand-and-collapse components to your site using the `details` and `summary` elements.

```html
<details>
	<summary>This is shown by default</summary>
	<p>Anything else in the element is hidden until you click the summary.</p>
</details>
```

<details>
	<summary>This is shown by default</summary>
	<p>Anything else in the element is hidden until you click the summary.</p>
</details>

You can make your content expanded by default by adding the `open` attribute.

```html
<details open>
	<summary>This is shown by default</summary>
	<p>Now this content is shown by default.</p>
</details>
```

<details open>
	<summary>This is shown by default</summary>
	<p>Now this content is shown by default.</p>
</details>

And because HTML is so damn awesome, in unsupported browsers, the elements fallback to `div` behavior and show the content by default, meaning no one is every unable to access it.

You get built in progressive enhancement for free!

### Autocomplete fields

Using a traditional `input` field and pairing it with a `datalist` element, you can create HTML-only autocomplete fields.

Create a `label` and `input` like you normally would. Then create a `datalist` element, and add an `option` element for each autocomplete choice.

Give the `datalist` an ID. Add the list property to your input with a value equal to your `datalist` ID.

```html
<label for="states">Who's the best wizard?</label>
<input type="text" id="wizards" name="wizards" list="wizards-list">
<datalist id="wizards-list">
	<option>Harry Potter</option>
	<option>Hermione</option>
	<option>Dumbledore</option>
	<option>Merlin</option>
	<option>Gandalf</option>
</datalist>
```

<label for="states">Who's the best wizard?</label>
<input type="text" id="wizards" name="wizards" list="wizards-list">
<datalist id="wizards-list">
	<option>Harry Potter</option>
	<option>Hermione</option>
	<option>Dumbledore</option>
	<option>Merlin</option>
	<option>Gandalf</option>
</datalist>


## HTML is performant AF

In September of 2019, [Zach Leatherman tweeted](https://twitter.com/zachleat/status/1169998370041208832)

> Which has a better First Meaningful Paint time?
>
> 1. a raw 8.5MB HTML file with the full text of every single one of my 27,506 tweets
> 2. a client rendered React site with exactly one tweet on it
>
> (Spoiler: @____lighthouse reports 8.5MB of HTML wins by about 200ms)

Take a moment to wrap your head around that.

**It’s perceivably faster to load 8.5 megabytes of HTML than it is to load a single tweet with a client-side React app.**

It's more resilient, too, as we previously discussed.


## Real companies can and do build apps with HTML first

The folks at [Basecamp](https://basecamp.com/) just released a new email product, [Hey](https://www.hey.com/), that tries to address a lot of the stuff that people find frustrating about email.

Neither product is really my cup of tea, but what I find super interesting is how Hey is built.

It's core is server-rendered HTML. Basecamp is a Ruby on Rails shop ([their CTO created Rails](https://en.wikipedia.org/wiki/Ruby_on_Rails)). Almost every view in the app is created on a server.

Then, they sprinkle just a little vanilla JS on top to turn things up to 11.

Basecamp uses a project they open sourced called [Turbolinks](https://github.com/turbolinks/turbolinks). This JavaScript plugin intercepts link clicks and progressively enhances a server-side app into a single-page app (or SPA) by fetching additional pages with Ajax and only replacing the stuff that needs updating.

By using this approach, if the JS fails or isn't supported, the app still loads and works and gives people the full experience. It also means you don't have to wait for the full JS package to load before you can start using the app.

You still get the benefits of faster page loading that SPAs sometimes give you, but you don't have to maintain two code bases or do complicated server-to-client hand offs ("rehydration" as they call it in the React world).

## Some JS developers find this upsetting

I've seen some JS developers trashing Hey on Twitter this week.

The general vibe is "this is overhyped and only fanboys like it" and "$100 a year for email is ridiculous."

I think it's telling that the only folks I see complaining like this are "JS all the things" type developers. It invalidates their argument that lots of JavaScript is necessary for a modern web experience, and, by extension, invalidates a lot of the skills they hold dear.

I teach JS for a living. I'm obviously not saying "never use of JS" or "JavaScript has no place on the web." Hell, their are even times where building a JS-first app makes sense.

But if I were going to bet on a web technology, it's HTML. Always bet on HTML.