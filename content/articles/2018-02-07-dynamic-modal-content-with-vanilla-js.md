---
title: "Dynamic modal content with vanilla JavaScript"
date: 2018-02-07T10:16:05-05:00
draft: draft
categories:
- Accessibility
- Art and Science
- Business and Leadership
- Careers
- Code
- CSS
- Design and UX
- HTML
- JavaScript
- Technology
- Web Performance
- WordPress
---

Today, I wanted to show you how to dynamically load content into a modal window.

## Why would you want to do this?

There are a few reasons.

You might have some conditional content that changes depending on which link or button was clicked to open the modal.

This is also a great way to build in fallback content. By default, your modal toggle could be a link that points to an HTML file, and after JavaScript loads, you can instead dynamically grab that content and load it into the modal.

Whatever the case, let's look at how it all works.

## Your modal script

For this article, I'm not going to show you how to actually write a modal script.

There are a *ton* of them available, [including my own](https://github.com/cferdinandi/modals). Some are more accessible than others, so be sure you vet them carefully.

## Detect when the modal is clicked

