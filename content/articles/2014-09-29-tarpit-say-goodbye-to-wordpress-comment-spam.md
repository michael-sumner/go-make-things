---
categories:
- Code
- Design &amp; UX
date: '2014-09-29'
permalink: /tarpit-say-goodbye-to-wordpress-comment-spam/
title: 'Tarpit: Say Goodbye to WordPress Comment Spam'
url: /2014/09/29/tarpit-say-goodbye-to-wordpress-comment-spam
---

Back in June, I made a decision to [remove comments from this site](/disabling-comments/).

I wasn't happy about it. I think the web is better with open conversations. But Askimet was letting through an incredible amount of spam, and managing it was taking up time that I could have spent writing posts and making cool stuff.

Over the weekend, I brought comments back and added a new plugin that has stopped comment spam entirely.

<!--more-->

## Spam Honeypots

[Tarpit](https://github.com/cferdinandi/tarpit) reduces comment spam with a [smart honeypot](http://www.smartfile.com/blog/captchas-dont-work-how-to-trick-spam-bots-with-a-smarter-honey-pot/) that captures spam bots:

> A honey pot is a field added to the form that the users can’t see due to CSS or JavaScript (which hides the field). Honey pots are awesome because they don’t inconvenience users like a captcha and they are a valid tool for thwarting spam bots. Basically, a spam bot fills in a field that valid users can’t see, alerting us to their activity. If the honey pot field is filled in, we can confidently reject the form as spam.

Tarpit was forked from [WP Comment Smart Honeypot](https://github.com/freak3dot/wp-smart-honeypot) by Ryan Johnston. [Ryan explains](http://www.smartfile.com/blog/captchas-dont-work-how-to-trick-spam-bots-with-a-smarter-honey-pot/):

> After the honey pot was invented, the spam bot authors got a little smarter. They added some code to detect these hidden fields. If the name of the field is always the same, then the field is really simple to detect.

### How it works

Tarpit (and of course WP Comment Smart Honeypost) does a few things:

1. It adds a field to your comment form that bots can see but users cannot.
2. It gives your real comment form fields random IDs so bots don't know what they are.
3. It gives your fake comment field the ID of a real comment field (like "name" or "email"), so bots will always fill it out.
4. It randomizes the location of the fake comment field so bots can't ignore it based on its index.

Ryan's plugin was dependent on JavaScript, included some Bootstrap-specific styling, and required you to change code in the plugin itself. I removed the dependency and created a settings screen so you can control options from the WordPress dashboard.

Really, Ryan did all the hard work and I just made a few slight usability tweaks.

I'd also be a ginormous ass if I didn't give a shoutout to David Walsh. His post on [how he stopped WordPress comment spam](http://davidwalsh.name/wordpress-comment-spam) kicked this whole thing off, and the comments on his post got me pointed in the right direction.

## The results

Since installing Tarpit, I've had zero spam sneak through. None. So far, it's a success!

[Download Tarpit on GitHub.](https://github.com/cferdinandi/tarpit)