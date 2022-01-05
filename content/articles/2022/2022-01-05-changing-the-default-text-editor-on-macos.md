---
title: Changing the default text editor on macOS
date: 2022-01-05T10:30:00-05:00
draft: false
categories:
- Code
- Technology
---

I've been using the same computer for almost a decade, but recently upgraded my computer.

By default, macOS uses Apple's TextEdit app for any text file, and it's pretty bad. Years ago, on my old machine, I setup Sublime to be my default editor for everything, but couldn't remember how I did.

I eventually stumbled onto [a thread on StackExchange with a working solution](https://apple.stackexchange.com/questions/123833/replace-text-edit-as-the-default-text-editor/123834#123834). I wanted to document it here so I wouldn't forget again next time.

_**Just a heads up:** this requires using the command line._

In terminal, copy-and-paste the command from below that matches the text editor you want to use as your default. Then, press `return` to run it, and restart your machine.

```bash
# Sublime Text 3
defaults write com.apple.LaunchServices/com.apple.launchservices.secure LSHandlers -array-add '{LSHandlerContentType=public.plain-text;LSHandlerRoleAll=com.sublimetext.3;}'

# Sublime Text 4
defaults write com.apple.LaunchServices/com.apple.launchservices.secure LSHandlers -array-add '{LSHandlerContentType=public.plain-text;LSHandlerRoleAll=com.sublimetext.4;}'

# VS Code
defaults write com.apple.LaunchServices/com.apple.launchservices.secure LSHandlers -array-add '{LSHandlerContentType=public.plain-text;LSHandlerRoleAll=com.microsoft.VSCode;}'
```

A lot of places suggested right clicking the file, selecting "Get Info," and changing the "Open With" setting for all files of that type.

I tried that at first, but its time consuming when you work with lots of different file types. And it doesn't work at all for hidden files like `.htaccess` and `.gitignore`.

The command line trick works for all text files across the whole system, including hidden files, and I never have to think about it again.