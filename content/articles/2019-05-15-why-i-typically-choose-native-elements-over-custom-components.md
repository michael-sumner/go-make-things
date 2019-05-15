---
title: "Why I typically choose native elements over custom components"
date: 2019-05-15T10:30:00-04:00
draft: false
categories:
- Accessibility
- Code
- CSS
- Design and UX
- HTML
- JavaScript
- Web Performance
---

Given the following choices...

| Native               | Custom              |
|----------------------|---------------------|
| `input[type="date"]` | JS Datepicker       |
| `details`/`summary`  | JS Accordions       |
| `select`             | Hacked JS Dropdowns |
| Hard page loads      | JS routing          |

I'd choose the native column over the custom column almost every time.

You typically ([though not always](https://www.scottohara.me/blog/2019/03/05/open-dialog.html)) get accessibility out-of-the-box, you reduce the amount of dependency code you need to load, and you remove a "thing that can break" from your codebase.

Two common arguments against native components are that:

1. They can't be styled as easily, and
2. "But the client wants..."

There's an obsession in our industry with customizing all the things, when most users just want something that adheres to their browser/device’s defaults.

I don't care what my select menu looks like. I just want it to work.

And I know, I know, clients ask for things.

Our job as professionals is to advise clients on norms and best practices. As much as I also love a beautifully designed interface, at the end of the day, most users would prefer something fast and functional over something that “looks pretty.”