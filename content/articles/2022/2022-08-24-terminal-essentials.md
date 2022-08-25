---
title: Terminal essentials
date: 2022-08-24T10:30:00-04:00
draft: false
categories:
- Code
- Technology
---

If you're new to working with Terminal, here are some key things you should know.

_**Note:** I'm wrapping up production on [a new series of courses on developer tooling](https://vanillajsguides.com/tooling-bundle/). The first course on [Terminal](https://vanillajsguides.com/terminal/) should be ready in the next week or two, but you can pre-order it today. This is an excerpt from the guide._


## Running commands

Throughout this guide, we'll be looking at Terminal commands that you can use to work with the command line.

To run any of them, press the `enter` or `return` key.

Most Terminal commands accept options, typically prefixed with a dash (`-`) and grouped together, and arguments. Both are typed after the command itself.

```bash
<command> <-options> <argument1> <argument2>
```

## Quitting things

Sometimes, you'll run an ongoing task, or one that takes a long time to complete, and want to quit it.

To quit an active or ongoing task, use the `Control + C` keys.

For example, the `ping` command makes repeated calls to a website. We can `ping google.com`, and we'll get a response printed in Terminal every second or so. To stop it, we press `Control + C`.

```bash
# Ping Google
ping google.com

# Something like this starts printing
PING google.com (142.251.40.238): 56 data bytes
64 bytes from 142.251.40.238: icmp_seq=0 ttl=117 time=28.667 ms
64 bytes from 142.251.40.238: icmp_seq=1 ttl=117 time=26.424 ms
64 bytes from 142.251.40.238: icmp_seq=2 ttl=117 time=27.626 ms

# Stop the process by pressing Command + C
```

Some commands open up a _subwindow_ in Terminal. You can quit the subwindow and return to the main Terminal view by pressing `q`.

For example, the `top` command shows all active processes. Pressing `q` exits the subwindow.

```bash
# Show all active processes
top

# Press q to quit
```

Sometimes, you need to prefix `q` with a colon (`:q`).

For example, the `vim` command opens a text editor that's notoriously confusing to Quit. Running `:q` quits Vim.

```bash
# Start vim
vim

# Run :q to quit vim
```

## Getting help

Through this guide, we'll be learning about many built-in Terminal commands.

To avoid overloading you with too much information, this guide is focused on the Terminal commands and options that you're likely to use most often. 

Terminal includes a built-in manual that you can use to explore the full set of options available for any of the built-in commands. This is also useful if you forget how a command works.

Run `man` followed by the command to learn more about how it works.

For example, this would open up the manual for the `echo` command.

```bash
# Open up the manual for the echo command
man echo
```

The `man` command opens up a subwindow. You press `q` to quit and return to the main Terminal view.

## Start of line/End of line

Terminal is keyboard based. You can't use a mouse to skip to the start or end of a line.

Fortunately, there are keyboard shortcuts for that. Press `Control + A` to jump to the start of line, and `Control + E` to jump to the end.

## Command History

Pressing the up arrow cycles through the history of commands that you've run in Terminal. If you press `enter` or `return`, Terminal will run the current command in your history again.

This is useful if you want to run a command over-and-over again.

For example, you can press the up arrow, then `return`, to rerun the last command you ran.