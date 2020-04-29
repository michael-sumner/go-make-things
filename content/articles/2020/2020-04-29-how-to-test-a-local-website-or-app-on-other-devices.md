---
title: "How to test a local website or app on other devices"
date: 2020-04-29T10:30:00-04:00
draft: false
categories:
- Code
- CSS
- Design and UX
- HTML
- JavaScript
---

Yesterday, I said that today we'd look at more advanced layouts with CSS Grid. Unfortunately, I ran out of time to write that article, so it will have to wait until tomorrow.

Today, we're going to look at how to test a website or web app that's setup locally on your computer on other devices.

One of my students shared this with me (shared with permission):

> Hey all I just figure out with a bit of troubleshooting how to test something I built locally on Mac to test on mobile - bit of poking around found that there is a way on Windows, too.
>
> Here is how:
>
> 1. You need to have the website running on `localhost` on your computer, on some port (like `8080`). You can use a package like live-server for a static site.
> 2. Make sure your computer and phone are on the same wifi network.
> 3. Find the IP address of your computer.
>     - On macOS, use command `ipconfig getifaddr en0` in the terminal.
>     - On Windows, use the comand `ipconfig` in the command line, then find the IPv4 address.
> 4. On both platforms, the IP looks has this format: `192.168.1.##`
> 5. On your phone, open the browser at the IP address from step 3, on the port you're using. Example: `192.168.1.23:8080`

My student credited [Jonas Schmedtmann's newsletter](https://codingheroes.io/resources/) for this one (they figured out how to make it work on Windows, too).

If you're not sure how to start up a local server on your computer, [here's a big list of ways to do that](https://gist.github.com/willurd/5720255) (*and [a fork](https://gist.github.com/cferdinandi/2b0cd2d0b5b90a49033be0b531b72e17) just in case that ever disappears*).

If you'd rather use a GUI, [MAMP is also a good option](https://www.mamp.info/).

One last detail: you need to use the terminal command above to get your IP address. Visiting one of the "what's my IP address?" websites will get your public IP, not the one specific to your machine.