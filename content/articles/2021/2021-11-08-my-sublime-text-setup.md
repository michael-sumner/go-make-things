---
title: My Sublime Text setup for front end web development
date: 2021-11-08T10:30:00-05:00
draft: false
categories:
- Code
- CSS
- HTML
- JavaScript
- Technology
---

Even though [VS Code](https://code.visualstudio.com/) is the new hotness, I still use [Sublime Text](https://www.sublimetext.com/) for all of my web development and text editing needs.

Today, I wanted to share my setup. Let's dig in!

## First: why Sublime over VS Code?

I recommend VS Code to all of my students. It is hands-down the best free text editor available today.

It even does something Sublime can't: preserve formatting when copy/pasting code. This is invaluable when putting together presentations with code samples, so I use VS Code myself when building conference talks.

However, my number one want in a text editor for day-to-day use is speed.

I don't want to have wait around for files to open. I want to double click on a file, or open the app to start a new project, and just have it ready to go.

And Sublime Text is the undisputed champ there. 

Like all apps written in electron, VS Code just cannot compete with the performance of an app written in an OS's native language like Sublime Text. And Sublime Text 4 has been optimized for the new macOS chips, making it even faster.

Beyond speed, I generally want a text editor that stays out of my way, and VS Code is very much the opposite of that. The UI has more going on. It has a lot more bells-and-whistles baked right in.

That seems like a good thing, and for many people, it is! But me? I just want my text editor to get out of the way and let me write code.

I used Sublime 3 for pretty much my entire career, and just recently upgraded to Sublime 4. It's a nice improvement!

## Basic Settings

Sublime's settings are pretty good out-of-the-box, but like most pieces of software, I like to make a few changes to better fit my workflow.

- `find_selected_text` - When a word is highlighted, find every other instance of it in the document. I turn this on.
- `highlight_line` - Adds a highlight color to the line the cursor is currently on.
- `hot_exit` - This reopens unsaved changes when Sublime opens back up. I prefer to get asked if I want to save, and discard unsaved changes next time the app opens. I turn this off.
- `mini_diff` - I turn off native Git diffing in the sidebar, because I have a Git extension I prefer to use instead.
- `show_git_status` - This shows git repository information next to files in sidebar and in the status bar. Again, I have an extension I prefer to use for this.
- `show_definitions` - This shows a popup of possible definitions whenever you hover over a word. It's distracting, particularly while screensharing, and especially for someone with ADHD. I turn this off.
- `trim_trailing_white_space_on_save` - This removes all trailing white space when you save. Yea, get rid of that 100% of the time, please!
- `trim_only_modified_white_space` - This will only trim white space on save for the parts of a file that have been modified by you. Leave this on if working with a team, but for my open source work, I want to remove that white space always.
- `word_wrap` - I always want text to wrap. No horizontal scrolling for me, even with source code.

Here's what that looks like in my settings file.

```json
{
	"find_selected_text": true,
	"highlight_line": true,
	"hot_exit": false,
	"mini_diff": false,
	"show_git_status": false,
	"show_definitions": false,
	"trim_trailing_white_space_on_save": "all",
	"trim_only_modified_white_space": false,
	"word_wrap": true
}
```

## Theming

I use Sublime's default theme with the [Sublime Monokai Extended color scheme](https://github.com/jonschlinkert/sublime-monokai-extended). I has both light and dark options, both with great contrast for my old person eyeballs.

I use Menlo as my font face. I also bump the font size up to `15`, and add some line padding to make code feel more spacious and easy to scan.

```json
{
	"font_face": "Menlo",
	"font_size": 15.0,
	"line_padding_bottom": 1,
	"line_padding_top": 1
}
```

## Packages & Extensions

The first thing I do on any new Sublime install is add the [Package Control extension](https://packagecontrol.io/). 

This is one area where VS Code really wins, because their package manager is baked right in. This used to be a manual process, but Sublime 4 makes it a one-click thing from the Command Palette.

Here are the packages I use.

- [DocBlockr](https://github.com/spadgos/sublime-jsdocs) automates adding DocBlockr style comments (JSDoc, PHPDoc, etc.) to a ton of languages. You type `/**` and hit the `return` key, and it automatically adds a bunch of info for you.
- [BracketHighligher](https://facelessuser.github.io/BracketHighlighter/) highlights the opening or closing bracket whenever you have your cursor on its partner. This is really useful when working with larger chunks of code.
- [ToggleQuotes](https://github.com/spadgos/sublime-ToggleQuotes) lets you easily toggle from one quote style to another. Highlight text wrapped in double quotes (`"`) and press the single quote key (`'`), and it changes to single quotes, automatically escaping any single quotes inside the text. Works for template literals with backticks, too.
- [Compare Side-by-Side](https://bitbucket.org/dougty/sublime-compare-side-by-side/src/master/) will open two files side-by-side in two-pane view, and highlight what's different between them.
- [Schemr](https://github.com/benweier/Schemr) let's you toggle between two or more color schemes. I use this to toggle between Monokai Light and Monokai Dark (I use the light scheme for screen sharing and working outdoors). I have mine mapped to a keyboard shortcut.
- [HTMLPrettify](https://github.com/victorporof/Sublime-HTMLPrettify) formats HTML, CSS, JavaScript, JSON and more with proper indentation and structure. Really useful when you get mangled code from a third-party source.
- [GitGutter](https://github.com/jisaacks/GitGutter) is my preferred "git in Sublime" tool. It's a bit more subtle and less distracting than the native tool in Sublime.
- [Color Highlighter](https://packagecontrol.io/packages/Color%20Highlighter) shows a little square with the corresponding color next to any color values in your CSS.
- [SublimeLinter](http://www.sublimelinter.com/) and [the JSHint extension](https://github.com/SublimeLinter/SublimeLinter-jshint), with live linting turned on. These catch any weird issues or errors in real time as I type, which is very useful!
- [MarkdownEditing](https://sublimetext-markdown.github.io/MarkdownEditing/) adds syntax highlighting and a few extras for authoring files in markdown. I write all of my blog posts and books in markdown, so this one is essential.
- [ClickableLinks](https://github.com/leonid-shevtsov/ClickableUrls_SublimeText) makes links in your code clickable. VS Code does this natively, so having it in Sublime is awesome.
- [SyncSettings](https://www.mfuentesg.dev/SyncSettings/) saves all of my settings and extensions to a private github repo, which makes porting my setup to new machines or undo mistakes really easy.
  
A lot of what I use extensions for is baked into VS Code out-of-the-box, but I really prefer adding just what I want and nothing more.