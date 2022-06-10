---
title: The tools I use to make working with command line easier
date: 2022-06-10T10:30:00-04:00
draft: false
categories:
- Code
- Technology
---

I am by no means a command line (or CLI) power user. 

In the past, I've written about how [you don't need to know command line to be a good developer](/you-dont-need-to-know-command-line-to-be-a-good-developer/), and [why you might want to learn it anyways (and some resources to do so)](/how-and-why-to-learn-command-line-as-a-front-end-developer/).

Today, I want to talk about a few tools I use that make working in the CLI easier. Let's dig in!

## Oh My Zsh!

[Oh My Zsh](https://ohmyz.sh/) is a CLI framework for macOS and Linux.

In addition to making the terminal look a bit nicer, it adds a ton of useful information and features. It automatically shows which git branch you're in, for example.

And through [a long list of plugins](https://github.com/ohmyzsh/ohmyzsh/wiki/Plugins), you can add lots of helpful features and shortcuts for many of your favorite developer tools.

This is one of the first things I install on any new machine.

## git-open

[git-open](https://github.com/paulirish/git-open) is a small tool from the amazing Paul Irish that opens the repository for the git repo you're currently on the web.

It works with GitHub, GitLab, and Bitbucket. Once it's installed, just type `git open` in the terminal to run it.

```bash
git open
```

## autojump

[autojump](https://github.com/wting/autojump) makes navigating around your file system in the CLI easier.

Once you visit a directory on your computer using the traditional `cd path/to/directory` command, you can go back to it any time you want by using `j` and the name of the directory.

For example, let's say I go to the directory for my website like this...

```bash
cd ~/my-awesome-mac/Sites/go-make-things/
```

Every other time I want to jump to that directory, I can just type this...

```bash
j go-make-things
```

For frequently visited directories, this is a must-have tool!

## What'd I miss?

My list is pretty sure. Do you have any favorite CLI tools you use?