---
title: HTML includes with compilers and static site generators (SSGs)
date: 2022-11-15T10:30:00-04:00
draft: false
categories:
- Code
- Design and UX
- HTML
- JavaScript
---

This article is the last part in a series on HTML includes. 

So far, we've looked at [how to include external HTML using iframes](/4-ways-to-include-external-content-in-your-html/), [how to build a web component to fetch remote HTML](/html-includes-with-web-components/), and [how to combine the two](/html-includes-using-web-components-and-iframes/).

Today, we're talking about compilers and static site generators (or SSGs).

A static site generator is a tool that takes content (usually in the form of markdown files) and templates (in a variety of languages, including Ruby, Go, and even JavaScript), and mashes them together into pre-rendered HTML that you upload to your server.

Pretty much every one provides a way to create some partial HTML (like our `about.html` file) and _include_ it in your content or a template file.

In [Eleventy](https://www.11ty.dev/), you can [use the `include` tag](https://learneleventyfromscratch.com/lesson/6.html#adding-our-site-header) with Liquid JS templates.

```js
{% include "partials/about.html" %}
```

In [Hugo](https://gohugo.io/) (the SSG that powers my websites), you can [use shortcodes in content files](https://gohugo.io/content-management/shortcodes/) or [partials in template files](https://gohugo.io/templates/partials/).

```go
// A template partial
{{ partial "partials/about.html" . }}
```

If I had to pick a preferred approach to HTML includes, it would be this one.

Because the thing that ultimately gets shipped to the browser is complete HTML with the external content already included, you remove the potential points of failure that the other techniques suffer from.

There's no complicated HTML `iframe` to include, and there's no JS dependency that might break.

Of course, not every project will use an SSG. When it doesn't, I'm glad other options exist.