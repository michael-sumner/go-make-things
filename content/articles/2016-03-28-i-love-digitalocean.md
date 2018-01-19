---
categories:
- Technology
date: '2016-03-28'
title: I <3 DigitalOcean
---

A few months ago, I switched from my old shared hosting provider to [DigitalOcean](https://m.do.co/c/08a079d9bd9a).

My site **doubled** in speed. Instantly. Without any other changes or optimizations to my site. My start render time is now 3 seconds on an *EDGE network*. That's insane. And my hosting is cheaper than I was paying before, too!

Curious? Here's how I made the switch.

<!--more-->

## The setup

DigitalOcean's docs are geared to people who are comfortable in command line. I'm not one of those people.

Instead, I use [ServerPilot](https://serverpilot.io) to add a GUI layer and handle all of that under-the-hood stuff for me: setting up an SFTP account, maintaining the software stack, performance and security optimization, one-click installs, etc.

<img src="https://gomakethings.com/wp-content/uploads/2016/03/serverpilot.png" alt="A screenshot of the ServerPilot app install screen" width="960" height="685" class="alignnone">
<p class="wp-caption-text">Just add a little info, select your PHP version, and click install. Your app is ready in about 10 seconds. Seriously.</p>

Their free plan is more than sufficient for my needs, but if I wanted to enable SSL, their *Coach* plan makes it a piece of cake.

I purchased a single Droplet from DigitalOcean, and use ServerPilot to install multiple sites on it.

I initially moved my hosting to DigitalOcean but left my domain at GoDaddy, which meant I only had to switch over my name servers. When my domains were up for renewal, I moved them over to [Namecheap](https://www.namecheap.com/). Because they were already pointed at my new DigitalOcean droplet, I had no downtime.

GoDaddy had been providing one of those free email forwarding accounts that I was routing through Gmail. I sprung for a Google Apps account, and am glad I did. So many awesome features!

So to recap:

- 1 DigitalOcean droplet ($5/month)
- ServerPilot's free account ($0/month)
- Namecheap for domain registration ($10/year)
- Google Apps ($5/month)

## Moving your server content

Moving content from one server to another can be a *huge* pain. To make it easier I:

1. Setup a local copy of my site, running on MAMP.
2. Pulled down all of my plugins and media files into the local site using FTP. My local site matched my live site exactly.
3. Used [WP Sync Database](https://github.com/wp-sync-db/wp-sync-db) to automatically copy all of my site data to the local site. Single click, and it even switches URLs over so nothing breaks.
4. Setup new site on DigitalOcean.
5. Used WP Sync Database again to push from my local site to the new live site.

I probably had about 2 hours of downtime while waiting for DNS records to update and moving content over.

## What I don't like about DigitalOcean

You're on your own for installing things like phpMyAdmin, which you need to do via command line (though, honestly, I haven't needed it once since I switched).

Also, every now and then the server gets hung up on a process and I need to restart it (maybe once every month or two). Takes about 2 minutes, but if you're used to a "everything just works" kind of environment, slightly annoying.

All that said, it's cheaper than what I was paying before, and so blazingly, insanely fast. Totally worth the tradeoffs.

## Get 2 months of DigitalOcean for free

If you [use my DigitalOcean referral code](https://m.do.co/c/08a079d9bd9a), you get $10 in free credit to use towards a droplet. That's 2 months free on their entry level plan.