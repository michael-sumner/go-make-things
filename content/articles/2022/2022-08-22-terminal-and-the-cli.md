---
title: Terminal and the command line interface
date: 2022-08-22T10:30:00-04:00
draft: false
categories:
- Code
- Technology
---

_I'm wrapping up production on [a new series of courses on developer tooling](https://vanillajsguides.com/tooling-bundle/). The first course on [Terminal](https://vanillajsguides.com/terminal/) should be ready in the next week or two, but you can pre-order it today. This is an excerpt from the guide._

The Command Line Interface (or CLI) is a way to interact with your computer (or a remote server) using text-based commands instead of a GUI (Graphic User Interface) and mouse.

The command line gives you greater control over your OS (operating system), and let you do things that there may not be GUI-based software or an interface for. You absolutely do _not_ need to know CLI to be a good developer, but learning it can help you do more with your code, work more efficiently, and save you money on software.

## The Terminal

Different operating systems have different native apps for working with their CLI.

On macOS, it's Terminal. On Windows, it's Command Prompt, and more recently Powershell. Each CLI app has different features, levels of access to the OS, and slightly different conventions.

For example, in Terminal, file paths use a forward slash (`/`), while in Command Prompt, they use a backslash (`\`).

```bash
# Terminal
path/to/my/file.js

# Command Prompt
path\to\my\file.js
```

These syntax differences mean that learning how to work with the command line is often very specific to the app you're using to access it. 

This guide focuses specifically on Terminal as the CLI app.

## Terminal for Windows

If you're a Windows user on version 10 or higher, you can [install Windows Subsystem for Linux, or WSL](https://docs.microsoft.com/en-us/windows/wsl/).

WSL allows you to run a Linux environment (including access to Terminal) directly on your Windows machine, without needing to dual-boot or run a virtual machine.

[Learn more here.](https://docs.microsoft.com/en-us/windows/wsl/)