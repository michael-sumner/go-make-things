---
title: 4 ways to include external content in your HTML
date: 2022-11-10T10:30:00-04:00
draft: false
categories:
- Code
- Design and UX
- HTML
- JavaScript
---

Several years ago, [there was a proposal for HTML modules](https://github.com/WICG/webcomponents/blob/gh-pages/proposals/html-modules-explainer.md) (often called _HTML includes_), that would let you import external HTML into an HTML file, similar to how JavaScript modules work.

Unfortunately, it was both JS-dependent and never really went anywhere.

Over the next few days, we'll look at four ways you can use HTML includes today. Let's dig in!

## Example HTML

For this lesson, let's assume we have an `index.html` file with some HTML in it.

```html
<h1>Hate the complexity of modern front-end web development?</h1>

<p>Me too! I send out a short email each weekday on how to build a simpler, more resilient web. Join over 13k others.</p>
```

We also have an external HTML file, `about.html`, with a bit more markup in it.

```html
<h2>Hi, I'm Chris Ferdinandi.</h2>

<p><strong>I help people learn vanilla JavaScript,</strong> and I believe there’s a simpler, more resilient way to make things for the web.</p>
```

We want to include the HTML from `about.html` on the `index.html` (and probably a few other places, too).


## Option 1: an iframe (seriously!)

My favorite approach to this problem comes from [the Filament Group](https://www.filamentgroup.com/lab/html-includes/).

First, you include an `iframe` that points to the remote content.

```html
<iframe src="about.html"></iframe>
```

Next, you add an `onload` handler.

When the `iframe` loads, we want to grab the `body` or `document` from `iframe`. Then, we'll use the `Element.children` property to get all of the child nodes.

Finally, we'll pass the nodes into [the `Element.before()` method](/injecting-one-element-before-another-with-vanilla-js/) to inject them into the UI before the `iframe`, using [the spread syntax operator](/the-spread-syntax-operator-in-vanilla-js/) to pass in each node.

```html
<iframe src="about.html" onload="this.before(...(this.contentWindow.document.body||this.contentWindow.document).children)"></iframe>
```

As one last bit of cleanup, we should use the `Element.remove()` method to remove the `iframe` from the UI.

```html
<iframe src="about.html" onload="this.before(...(this.contentWindow.document.body||this.contentWindow.document).children);this.remove()"></iframe>
```

You can [download the source code on GitHub](https://gist.github.com/cferdinandi/ec67092fda6ea2586663fd53295d048f). 

You'll need to run a web server to make this work, which you can do [using the command line](https://gist.github.com/willurd/5720255) or running [a GUI tool like MAMP](https://www.mamp.info/).

## More options

Over the next few days, we'll look at a few web component options, as well as how to do this on the server.