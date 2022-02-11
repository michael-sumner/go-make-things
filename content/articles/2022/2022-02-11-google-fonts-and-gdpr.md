---
title: Google Fonts and GDPR
date: 2022-02-11T10:30:00-05:00
draft: false
categories:
- Business and Leadership
- Careers
- Code
- Design and UX
- HTML
- Web Performance
---

Last month, [a German court ruled that serving custom web fonts from Google Fonts violates GDPR](https://www.theregister.com/2022/01/31/website_fine_google_fonts_gdpr/), because it shares a visitors IP address with Google without their permission or consent.

> The decision, by Landgericht München's third civil chamber in Munich, found that the website, by including Google-Fonts-hosted font on its pages, passed the unidentified plaintiff's IP address to Google without authorization and without a legitimate reason for doing so. And that violates Europe's General Data Protection Regulation (GDPR).
> 
> That is to say, when the plaintiff visited the website, the page made the user's browser fetch a font from Google Fonts to use for some text, and this disclosed the netizen's IP address to the US internet giant. This kind of hot-linking is normal with Google Fonts; the issue here is that the visitor apparently didn't give permission for their IP address to be shared. The website could have avoided this drama by self-hosting the font, if possible.

The penalties for violating this ruling are pretty serious!

> The ruling directs the website to stop providing IP addresses to Google and threatens the site operator with a fine of €250,000 for each violation, or up to six months in prison, for continued improper use of Google Fonts.

## So... what can you do?

[You can self-host your custom web fonts.](/how-to-self-host-google-fonts/) 

I started doing that two years ago, out of privacy concerns with Google-hosted fonts.

> Earlier this year, I wrote about how [I removed all tracking from my website and newsletter](https://gomakethings.com/i-dont-know-if-youre-reading-this/).
>
> But the brilliant [Laura Kalbag](https://laurakalbag.com/) pointed out a vector I’d missed: Google Fonts. While the data is not as rich as you’d get from a full on analytics script, it still gives Google more information about who your visitors are.

Not only do you get a privacy benefit, but if you [pair self-hosting with service workers](https://vanillajsguides.com/service-workers/), your fonts load amazingly fast with dramatically reduced data usage.

## How is this different from loading assets from other CDNs?

It's not, really! 

For example, if you use Cloudflare, the visitor's IP address gets sent along with the request. Same with JSDelivr and other CDN-for-OSS-projects services. 

I'm not sure if this ruling affects how other CDNs will operate going forward, or if Google was targeted specifically because they're in the "suck up data to sell ads" business.