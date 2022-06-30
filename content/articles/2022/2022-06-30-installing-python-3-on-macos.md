---
title: Getting Python 3 to run on macOS Monterey
date: 2022-06-30T10:30:00-04:00
draft: false
categories:
- Code
- Technology
---

This article is absolutely a bit more niche than what I usually write about, so sorry in advance for that.

Python 2 was deprecated a while ago, but continued to be the default on macOS for a while. After upgrading my MacBook to Monterey, I discovered that Python 2 had been removed. 

I don't code in Python, but it is [my preferred way to run a web server](https://gist.github.com/willurd/5720255) on my Mac.

I installed Python 3, but running `python` in terminal was throwing a `command not found` error in Terminal. 

After a bunch of Duck Duck Going, I finally [found a solution on StackOverflow](https://stackoverflow.com/questions/71591971/how-can-i-fix-the-zsh-command-not-found-python-error-macos-monterey-12-3/71621142#71621142). I run this command in Terminal.

```bash
echo "alias python=/usr/bin/python3" >> ~/.zshrc
```

As I [mentioned a few weeks ago](/the-tools-i-use-to-make-working-with-command-line-easier/) I use [Oh My Zsh](https://ohmyz.sh/) in terminal. If you use stock terminal, the file you write to (`.zshrc` in the code above) might be different for you.

But this fixed my issue, remapping the `python` alias to `python3` instead of `python2`.