---
categories:
- Code
- JavaScript
date: '2017-08-11'
permalink: /debugging-tips-and-tricks/
title: Debugging tips and tricks
url: /2017/08/11/debugging-tips-and-tricks
---

One thing that often trips up newer developers (and sometimes seasoned ones) is debugging code.

At it's heart, debugging is a trial-and-error process of starting with the last working piece of code and working your way backwards.

[Calvin Koepke](https://calvinkoepke.com/) has put together [an awesome set of tips and tricks to help make debugging a little easier](https://gist.github.com/cjkoepke/aadf9262b861f56cb26c67fa7bf36ab5). I didn't realize you can group a set of console logs together like this:

```javascript
// Group console data together for better viewing. Nice to group console logs together.
console.group('label')
  console.log('message')
  console.log('another message')
console.groupEnd()
```

[Go check out the whole thing.](https://gist.github.com/cjkoepke/aadf9262b861f56cb26c67fa7bf36ab5) It's awesome!