---
title: "A process for debugging your JavaScript"
date: 2018-09-26T10:30:00-04:00
draft: false
categories:
- Code
- JavaScript
---

One of the things many of my students find most confusing is figuring out why the code they wrote isn't working quite as expected.

Broken code is an inevitable aspect of being a web developer. Having a process for figuring out *why* your code is broken and *how* to fix it will save you a lot of pain and suffering.

My debugging process isn't magical. It's just two steps, repeated consistently.

<div class="list-spaced">
{{%md%}}
1. **Identify the last working piece of code.** If there's an error in the console window, it will tell you a line number for the code that's throwing the error. Start there. If not, go to the very first piece of code in your script that runs.
2. **Use `console.log()` to log all of your work in the console window.** If you're using grabbing an element in the DOM with `querySelector`, log it an make sure you're actually getting the element.<br><br>If you're running an event listener, `console.log()` some text (like `console.log('it worked!')`) and then try to trigger the event, so that you can confirm it's working.<br><br>Keep working your way back through the code until you find the thing that's not behaving the way you expect it to.
{{%/md%}}
</div>

This is tedious, annoying work.

But it will also help you learn a *lot* about how to structure code and avoid common issues. Over time, you'll have to do this less and less.

I typically start at the last working piece of code, using `console.log()` to check what's happening until I find the piece of code I messed up or that's returning an unexpected result.

One trick to make things go faster when there are no errors in the Console tab: drop a bunch of `console.log()` statements into the code, with sequential numbers (`1`, `2`, `3`) as you go. This will help you isolate where the code stops running.

```js
console.log(1);

// Some code...

console.log(2);

// Some more code...

console.log(3);

// Etc.
```