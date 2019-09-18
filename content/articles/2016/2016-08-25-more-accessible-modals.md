---
categories:
- Accessibility
- Code
- Design and UX
- JavaScript
date: '2016-08-25'
url: /more-accessible-modals/
title: More accessible modals
---

I just pushed a major accessibility update to my [Modals plugin](https://github.com/cferdinandi/modals).

In previous versions, when a modal opened, focus would remain on the button or link you clicked to open the window. This works relatively ok for sighted and mouse-using visitors, but for someone navigating with a screen reader or by keyboard, it leaves you completely lost.

My latest release, version 9.0.0, brings focus to the open modal window, fixing this issue. It also returns focus to the link or button that toggles the modal when it's closed, so you can return back to your spot on the page.

If you're using Modals on any of your projects, I'd recommend you update today.

***Quick Note:*** *This is a breaking update. I've also changed the `closeModals` method to `closeModal`, so if you were using that in any custom scripts, you'll need to update them accordingly.*