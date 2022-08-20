---
title: Logging and printing things in Terminal
date: 2022-08-26T10:30:00-04:00
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

_I'm wrapping up production on [a new series of courses on developer tooling](https://vanillajsguides.com/tooling-bundle/). The first course on [Terminal](https://vanillajsguides.com/terminal/) should be ready in the next week or two, but you can pre-order it today. This is an excerpt from the guide._

Today, we're looking at how to log and print things in Terminal.

## Printing things in Terminal

Use the `echo` command to print things in the Terminal window. Whatever you type after `echo` is printed.

```bash
# prints "Ahoy, matey"
echo Ahoy, matey
```

You can also wrap the text to log in quotes.

```bash
# also prints "Ahoy, matey"
echo "Ahoy, matey"
```

You can use `\n` to add a line break. This only works if your text is wrapped in quotes.

```bash
echo "Ahoy\nmatey"
```

_**Note:** in Terminal, certain characters, like the bang operator (`!`) are used with commands. If included in an `echo` string, they can have unintended side-effects unless you escape them with a backslash (`\`) like this: `echo "Ahoy, matey\!"`._

## Reading the contents of a file

Use the `cat` command to read the contents of a file and print it into the console. Use the filename as an argument.

```bash
# prints the contents of the characters.md file
cat characters.md
```

Here, the full contents of the `characters.md` file are printed into the Terminal window.

```markdown
Wizard
Druid
Knight
Bard
```

If you use the `-n` option before your filename, line numbers are included.

```bash
# print the character.md file with line numbers
cat -n characters.md
```

File names can be wrapped in quotes. You can also pass in multiple files as arguments.

```bash
# print the contents of two files
cat "characters.md" "pirates.md"

# print multiple files with line numbers
cat -n "characters.md" "pirates.md"
```

## Sorting the contents of a file

Use the `sort` command to sort the contents of a file alphabetically, in reverse order, by number, or by month. It can also remove duplicates.

By default, spaces are treated as the delimiter. The original file is not modified.

For example, let's imagine that we have a `characters.md` file that looks like this. The character types are _not_ in any sort of order.

```markdown
Wizard
Druid
Knight
Bard
```

To sort them alphabetically, we would do this.

```bash
# sort the contents of the characters.md file alphabetically
sort characters.md
```

This is what's printed to the console as a result.

```markdown
Bard
Druid
Knight
Wizard
```

You can sort in reverse order using the `-r` option.

```bash
# sort the contents in reverse alphabetical order
sort -r characters.md
```

To sort by numeric order, use the `-n` option. You can also sort in reverse-numeric order using `-n` and `-r` together.

For example, imagine that you have a `health.md` file that tracks an RPG characters health.

```markdown
12 - Wizard
11 - Druid
20 - Knight
4 - Bard
```

To sort it numerically (in ascending or reverse order, respectively), you would do this.

```bash
# sort in numeric order
sort -n health.md

# sort in reverse numeric order
sort -nr health.md
```

To remove duplicates while sorting, use the `-u` option.

For example, imagine you have a `more-characters.md` file with some duplicates in it.

```markdown
Wizard
Druid
Knight
Bard
Druid
Wizard
Healer
Barbarian
```

To sort them and remove the duplicates, you would do this.

```bash
# remove duplicates
sort -u more-characters.md
```

You can use the `-o` option to save the sorted output to a file. Add it to the end of your command, other options, and argument, with the filename as an option value.

```bash
# sort alphabetically and save to a new file
sort -u more-characters.md -o characters-sorted-unique.md
```

## Clearing the Terminal window

The `clear` command will remove all content from the Terminal window.

```bash
# clear the Terminal window
clear
```