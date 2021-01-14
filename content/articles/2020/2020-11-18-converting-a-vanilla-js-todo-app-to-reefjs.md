---
title: "Converting a vanilla JS todo app to ReefJS"
date: 2020-11-18T10:30:00-05:00
draft: false
categories:
- Code
- HTML
- JavaScript
- Web Performance
- Vanilla Framework Demos
---

Yesterday, I [converted the React todo app demo to vanilla JS](/converting-the-react-todo-app-demo-to-vanilla-js/).

The app works great in its current form, but as you add features and functionality, maintaining it with traditional DOM manipulation will become increasingly complex.

Today, I wanted to convert the app into state-based UI, but without the overhead and complexity of React.

[In this video](https://vimeo.com/478507808), you can watch me convert yesterday's vanilla JS todo app into state-based UI. Instead of react, I use [ReefJS](https://reefjs.com), my 2.5kb state-based UI library that requires no build steps.

<div class="fluid-vids"><iframe src="https://player.vimeo.com/video/478507808?color=0088cc&title=0&byline=0&portrait=0" width="640" height="360" frameborder="0" allow="autoplay; fullscreen" allowfullscreen></iframe></div>

[You can download the source code on GitHub.](https://gist.github.com/cferdinandi/d21a6c4ee9a7106afbc9d60723e8df39)