---
categories:
- Design &amp; UX
date: '2015-04-17'
url: /let-buttons-be-buttons/
title: Let buttons be buttons
---

From [Matt Henry on Twitter](https://twitter.com/heymatthenry/status/588000007237804032):

> Trying to book a flight, but the airline’s form has a span + javascript instead of a submit button. And it’s broken. Let buttons be buttons.

Reminder: progressive enhancement is not just about people who have JavaScript turned off (though it *is* about them, too). JavaScript is the most fragile part of your front-end stack, and when a file fails to load or you forget a semicolon or some other stupid bug emerges, you want people to still be able to use your site.

HTML first. Then CSS for style. *Then* JavaScript for enhancement functionality.