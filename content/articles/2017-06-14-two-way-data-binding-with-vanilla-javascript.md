---
categories:
- Code
- JavaScript
date: '2017-06-14'
title: Two-way data binding with vanilla JavaScript
---

One of the things champions of large MVC JavaScript frameworks like Angular and React love is two-way data binding.

What is that?

Two-way data binding means that when you change something in the browser (for example, the content of a form input), it immediately updates the place where you store that data. AND, when you update the data source, it immediately updates that content in the browser window.

Here's an example:

<a class="jsbin-embed" href="https://jsbin.com/yoqaku/1/embed?console,output">JS Bin on jsbin.com</a><script src="https://static.jsbin.com/js/embed.min.js?4.0.4"></script>

The thing is, you don't need a large framework to do this. [Remy Sharp's bind.js helper function](https://github.com/remy/bind.js) makes this really easy, and weighs just 5.6kb.