---
categories:
- Code
- WordPress
date: '2017-03-07'
title: Automating Slack and WordPress
---

Last week, I released [a new version of *Ditching jQuery*](https://ditchingjquery.com) that included exclusive access to my Ditching jQuery Slack Team.

Currently, Slack requires you to manually invite people to your team. There are a handful of third party tools to automate this (they all use undocumented Slack APIs), but the only one for WordPress requires Gravity Forms, which I don't use.

I ended up creating two WordPress plugins to automate Slack invites, depending on your preferred approach.

1. **[Automated Slack Invites](https://github.com/cferdinandi/gmt-automated-slack-invites)** let's people enter their email address into a field and hit submit. The plugin handles the rest.
2. **[Slack Invites for EDD](https://github.com/cferdinandi/gmt-slack-invites-for-edd)** automatically sends an invite when people purchase an eligible product through Easy Digital Downloads (no additional steps required on their part).

Enjoy!