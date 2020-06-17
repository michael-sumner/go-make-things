---
title: "How to delete all node_modules directories from your computer"
date: 2020-06-17T10:30:00-04:00
draft: false
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
- Vanilla Framework Demos
---

Over the last few years, I've run `npm install` more times than I can count. And as a result, I have a lot of `node_modules` directories on my computer that I long forgot about and never use.

Sometimes I don't need the project at all anymore, but often, it's a codebase I just don't work with often.

My `node_modules` directories contained 50mb of stuff on the small side, and over 200mb of files in some cases. Over a few dozen projects, that really adds up!

Yesterday, I decided to delete every single `node_modules` directory off of my computer, and selectively reinstall the ones I need only when I need them.

That *could* be a really long, arduous manual task. But fortunately for me, [Mark Pieszak wrote an article about how to do it with a single command line script](https://trilon.io/blog/how-to-delete-all-nodemodules-recursively).

## Testing first

Before doing this, it's a good idea to test the script and make sure it's not going to do anything you don't want it to.

First, in a terminal/CLI window, `cd` into whatever directory contains most of your code projects. On my Mac, that's `sites`. Your setup might be different.

```bash
cd ~/sites
```

Then, run this code.

```bash
# Mac/Linux
find . -name "node_modules" -type d -prune -print | xargs du -chs

# Windows
FOR /d /r . %d in (node_modules) DO @IF EXIST "%d" echo %d"
```

This will spit out a list of all of the `node_modules` that it finds, and how much disk space they're taking up (individually and in total).

## Actually deleting files

If you're happy with what the script finds, you can now delete all of the directories off of your computer.

```bash
# Mac/Linux
find . -name 'node_modules' -type d -prune -print -exec rm -rf '{}' \;

# Windows
FOR /d /r . %d in (node_modules) DO @IF EXIST "%d" rm -rf "%d"
```

And that's that. [Thanks to Mark and the Trilon folks for documenting this!](https://trilon.io/blog/how-to-delete-all-nodemodules-recursively)