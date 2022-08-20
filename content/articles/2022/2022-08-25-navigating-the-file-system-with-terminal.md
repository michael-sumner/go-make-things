---
title: Navigating the file system with Terminal
date: 2022-08-25T10:30:00-04:00
draft: false
categories:
- Code
- Technology
---

_I'm wrapping up production on [a new series of courses on developer tooling](https://vanillajsguides.com/tooling-bundle/). The first course on [Terminal](https://vanillajsguides.com/terminal/) should be ready in the next week or two, but you can pre-order it today. This is an excerpt from the guide._

Today, we're looking at how to move around the file system in the command line.

## Changing directories

The `cd` command stands for _change directory_, and is used to change the current working directory in the Terminal.

Type the `cd` command, followed by the path of the directory you want to navigate to.

```bash
cd path/to/directory
```

Paths are relative to the directory you're currently in. When you first open Terminal, the root directory that you start in is the home directory for the currently logged in user.

For example, to navigate to the `/Sites` directory, you would type...

```bash
# Navigate to the /Sites directory
cd Sites
```

In Terminal, the tilde symbol (`~`) is a shortcut to the home directory.

```bash
# Go home
cd ~

# Go to the /Sites directory from anywhere
cd ~/Sites
```

You can also jump to the home directory by typing `cd` without any path.

```bash
# Go home
cd
```

To move up to the parent directory of the one you're current in, use two dots (`..`) for the path.

```bash
# Move to the parent of the current directory
cd ..
```

You can also combine `..` with a path. For example, to navigate to a sibling directory called `/Downloads`, you would type...

```bash
# Move to a sibling directory
cd ../Downloads
```

Typing complex paths into the Terminal can be difficult and annoying. You can also drag-and-drop the directory you want to navigate to into Terminal to auto-complete the path.


## Opening directories and files

The `open` command opens files and directories. Type `open`, followed by the directory or file that you want to open.

Directories will open in Finder, and files will open in their default app.

```bash
# Open the /Sites directory
open ~/Sites

# Open readme.md in your default text editor
open readme.md

# Open jellyfish.jpg in Preview
open jellyfish.jpg
```

Use `.` to open the current working directory.

```bash
# Open the current directory
open .
```

## List directories and files

Use the `ls` command to list the directories and files inside a directory. 

Typing `ls` without a path lists files and directories in the current working directory.

```bash
# List all files and directories in the current directory
ls
```

If you include a path, it will list the files and directories under that path instead.

```bash
# List all files and directories in the ~/Sites directory
ls ~/Sites
```

By default, only visible files and directory are show. To also view hidden files and directories, use the `-a` option.

```bash
# show all files and directories
ls -a
```

## Tab to autocomplete

When typing, you can use the `tab` key to autocomplete the current path or filename that you're typing.

If more than one file or path match, they'll both be displayed, and you can use the `tab` key again to navigate to the one you'd like to use. Then, press `enter` or `return` to autocomplete it.