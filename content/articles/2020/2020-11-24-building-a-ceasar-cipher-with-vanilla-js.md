---
title: "Building a Caesar Cipher with vanilla JS"
date: 2020-11-24T10:30:00-05:00
draft: false
categories:
- Code
- JavaScript
---

Today, I'm back with another live-coding video.

Last week, I stumbled across [a tutorial from Kirupa on building a Caesar Cipher with JavaScript](https://www.kirupa.com/html5/caesar_cipher.htm). A Caesar Cipher is an old, super simple encryption algorithm that works by shifting each letter in a message a specific number of characters over to create a new message.

For example, shifting "hello" by one character results in "ifmmp". The letter "i" is one character after "h", "f" is one character after "e", and so on. To decrypt the message, you shift it back the other way.

I wanted to try Kirupa's project my own way. I also added a "multi-pass" feature that will encrypt the message multiple times to make it harder to decipher.

[Watch me code this project.](https://vimeo.com/483130171)

<iframe src="https://player.vimeo.com/video/483130171?color=0088cc&title=0&byline=0&portrait=0" width="640" height="360" frameborder="0" allow="autoplay; fullscreen" allowfullscreen></iframe>

[You can find the source code on GitHub.](https://gist.github.com/cferdinandi/01e058031441971b6268a6b4a6cf5cb0) And don't forget to go read Kirupa's original article for more background and details.