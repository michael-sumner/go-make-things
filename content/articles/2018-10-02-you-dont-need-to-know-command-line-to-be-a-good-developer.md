---
title: "You don't need to know command line to be a good developer"
date: 2018-10-02T10:30:00-04:00
draft: false
categories:
- Careers
- Code
- CSS
- HTML
- JavaScript
---

One of the things I was shamed for by coworkers when I was first starting out was not knowing the command line, or terminal.

This is that black or white window with the blinking Matrix-style cursor where you can type in text-based commands to make your computer (or some remote server) do things.

> Real developers know how to use command line.
> <cite>&ndash; Assholes</cite>

Today, I want to clearly say as someone who now *does know* how to use command line: **you don't need to know command line to be a good developer.**

Anyone who tells you otherwise is a bully and an asshole, and probably a little bit insecure in their own capabilities as a "real developer."

## Why you don't need to know command line

First of all, you can build great websites using nothing more than a text editor and a browser, writing good old HTML, CSS, and JavaScript.

If you want a more robust (or complicated, depending on your perspective) process, pretty much anything you want to do as a developer today can be done with a GUI.

<div class="list-spaced">
{{%md%}}
- **Git.** [GitHub's *free* app](https://desktop.github.com/) is *really* good. If you're using another git client, [Sourcetree](https://www.sourcetreeapp.com/) is also nice, and I've heard good things about [Tower](https://www.git-tower.com/mac). Plus, git itself can be confusing, and using GUI can help you better understand how it all works---especially if you're a visual learner like me.
- **Sass.** [CodeKit](https://codekitapp.com/) and [Prepos](https://prepros.io/) are two powerful apps that let you compile Sass into CSS without ever opening a terminal window.
- **JavaScript Stuff.** Want to concatenate modular JS files, minify them, and lint them for errors. See above. CodeKit and Prepos do that, too!
- **FTP/SFTP.** There are so many options here, but I love [Filezilla](https://filezilla-project.org/). And it's free!
- **Image Optimization.** [ImageOptim](https://imageoptim.com/mac) often produces better results than the command line tools. If you're on Windows, [base64.io](https://base64.io/) is a great alternative. Both are free.
- **SVG Optimization.** Need to condense those poorly done SVGs? [SVGO has an online GUI.](https://jakearchibald.github.io/svgomg/)
- **Configuring Servers.** Many hosts have 1-click install features these days. If you use something like [DigitalOcean](https://www.digitalocean.com/) (highly recommended!), I'd encourage you to check out [ServerPilot](https://serverpilot.io/), who add a GUI layer to server management.
- **Install SSL Certificates.** See above about configuring servers.
{{%/md%}}
</div>

This covers nearly 100% of what I do as web developer.

## Why you might want to learn command line anyways

Ok, so, you don't *need* to learn command line. You're still a great web developer, even if you don't know it.

But... you may *want* to learn it anyways. I'm glad I did.

Here's why...

### 1. I have more control

GUIs are great, but there's a limit to what they can do.

For example, in CodeKit, getting a project to render minified and unminified versions of the same files in one swoop is hard to do (I actually couldn't figure out a way, though the developer tells me it is possible through some custom hooks).

I wrote my own custom [GulpJS](https://gulpjs.com/) workflow that let's me output the files in both formats automatically as I make changes.

This is particularly useful on open source projects, where I want people to have the option of using a file they can modify *or* something production-ready out-of-the-box.

That same workflow also let's me create two additional versions: one with required polyfills, and one without (for people who are using their own).

Again, really hard to do in a GUI.

### 2. It's made me more efficient

Command line prompts often run faster than GUIs do.

Also, because I do everything I need from one window, I spend less time jumping around from app to app, moving the mouse around to click different buttons, etc.

With a JavaScript project, for example, I'll run my build, which concatenates, minifies, and lints all of my scripts. Then I add it all to git and push it up to GitHub. All from one window, without taking my hands off the keyboard.

It also means I don't have to mess around with GUI configurations to get them to do what I want.

*And*, if I can't find software that does what I need, I can write my own command line thing to do it for me.

### 3. It saves me money

Many GUI products are free, but some are not.

Software to generate ebooks from markdown files, for example, costs money or gives you zero configuration options.

To create my [Vanilla JS Pocket Guides](https://vanillajsguides.com), though, I use a few command-line tools that I run back-to-back with a single terminal command to generate guides in PDF, EPUB, MOBI, and HTML formats, styled the way I want.

It cost me $0.

## How can you learn command line?

If you *do* want to learn command line (and again, it's totally cool if you don't), there are two resources I highly recommend:

1. [Really Friendly Command Line Intro](https://hellowebbooks.com/learn-command-line/) by Tracy Osborn is free to read online (with ebooks available for purchase), and really well done. Honestly, she needs to charge more for this. It's great!
2. If you're more into video courses, I've heard nothing but great things about Remy Sharp's [Terminal Training](https://terminal.training/) course.