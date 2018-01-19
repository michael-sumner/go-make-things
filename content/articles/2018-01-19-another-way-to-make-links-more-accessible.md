---
title: "Another Way to Make Links More Accessible"
date: 2018-01-19T10:46:33-05:00
draft: false
categories: ["Accessibility", "CSS", "Design & UX", "HTML"]
---

Reader [Robbert de Kuiper](http://www.robbertdekuiper.com/) emailed me after [yesterday's article](/improving-link-legibility-with-two-lines-of-css/) to share another approach for making links for accessible: `border-bottom`.

> You can remove the underline of a link and add a border-bottom to the link to emphasise it. That option also removes the problem with the cut-through descenders and gives the text a little more room ‘to breath’. The default underline always feels a little bit cramped to me. And you can also add extra styling for the border on hover, for example to move it a pixel down.

```css
a {
	color: blue;
	border-bottom: 1px solid blue;
	padding-bottom: 1px;
	text-decoration: none;
	transition: all 0.2s ease;
}

a:hover {
	color: purple;
	border-bottom-color: purple;
	padding-bottom: 2px;
}
```

[See it in action here.](https://jsfiddle.net/cferdinandi/pybo79va/1/)