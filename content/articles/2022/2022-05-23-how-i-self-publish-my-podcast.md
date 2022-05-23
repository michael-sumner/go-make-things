---
title: How I self publish my podcast
date: 2022-05-23T10:30:00-04:00
draft: false
categories:
- Business and Leadership
- Design and UX
- Technology
---

One question that comes up from students (and business friends) periodically is what platform I use to host [the Vanilla JS Podcast](https://vanillajspodcast.com). Most people are surprised to learn that I self-publish.

Today, I wanted to share all of the tools I use to make that happen. Let's dig in!

## A quick word about equipment audio quality

I just want to make something clear up front: you _don't_ need fancy, expensive equipment to run a podcast.

The audio doesn't need to be studio quality. It just needs to be _good enough_.

Generally, that means you don't want to use the built-in microphone on your computer. Even those cheap headphones that come with most smart phones now (or used to, anyways) are a step up.

As long as your audio is clear and there isn't a ton of echo or background news, you're good enough to get started! Don't let perfect be the enemy of good!

I've upgraded my audio setup over the year or two, but I used cheap "what I have around already" equipment for years.

## My microphone

When I first decided to get "a nicer microphone," I purchase [the Blue Yeti](https://www.bluemic.com/en-us/products/yeti/). At the time, it was _the_ microphone most podcasters reached for as their first nice mic.

The audio quality is actually really good, and it served me well for many years.

But, with everyone at home during the pandemic, I started noticing a lot more background noise in my recordings. Because of the type of microphone the Yeti is (_a condenser microphone_), it picks up a wide range of sound. Those sound amazing in a sound studio, but not so much in a home office.

I recently upgraded to a [Shure MV7](https://www.shure.com/en-US/products/microphones/mv7).

I chose it because it's a _dynamic microphone_. It picks up a narrower range of sound, and tends to favor loud noises directly in front of it. As a result, it does a much better job cutting out background noise. Dynamic mics are the kind musicians use on stage at concerts.

Shure makes some nicer microphones, but most are what's called XLR, which means they require a special cable and interface to connect to a computer. The MV7 is their USB model, so I can plug it directly into my computer and start recording. 

It's been amazing!

I also bought [the RØDE PSA1 boom arm](https://rode.com/en/accessories/stands-bars/psa1), which lets me put the mic right in my face while recording without getting in the way of my hands typing on the keyboard. It also helps prevent vibrations from my typing from getting picked up by the mic.

## Recording software

On macOS, you can record audio using the built-in QuickTime software. On Windows, there's a comparable Windows Voice Recorder app.

Because I also do lots of screen recordings, I already own an app called [Screenflow](https://www.telestream.net/screenflow/), and just use that. When I was on Windows, I used to use [Camtasia](https://www.techsmith.com/video-editor.html).

On the rare occasion when I'm interviewing someone else, I use Zoom's native audio recording. 

By default, it records a single audio track, but it has an option to record each person as a separate audio file. I recommend turning that on if you use it.

## Editing files

I deliberately just ramble on my podcasts, record a single take, and skip the editing step. If I don't like how a podcast turned out, I delete it and try again.

Editing sucks! But you _could_ chop and cut and mute stuff with Screenflow or Camtasia if you wanted to.

Screenflow exports audio files as MP4, but I need MP3. I use [ffmpeg](https://ffmpeg.org/) for that.

ffmpeg is a command line tool. When I'm ready to convert my MP4 file, I open up my terminal window, go to the directly where the file is, and run the following command.

```bash
FILE=name-of-mp4-file
ffmpeg -i $FILE.mp4 -ac 1 -ab 96k $FILE.mp3
```

That converts my file from a large MP4 file to a smaller, more compressed single-channel MP3 file (for efficient streaming).

I use an app called [Tagr](http://www.entwicklungsfreu.de/tagr.html) to add artist and title information and the podcast thumbnail to the MP3 file.

## Hosting the podcast

I host my MP3 files on [DigitalOcean Spaces](https://www.digitalocean.com/products/spaces). This is a nice high-volume storage solution that costs me $5 a month.

The site for the podcast itself is [a static website hosted powered by Hugo](/tips-and-tricks-for-working-with-static-site-generators/).

I create a markdown file for the episode, and add some front matter details about the episode (a description, it's length, the file size, and a URL to the MP3 file on DigitalOcean Spaces). Hugo creates a page for the episode, and embeds it onto the page with an `audio` element.

Hugo also generates a custom RSS feed for the podcast. I looked up the requirements for podcast feeds and made sure all of the necessary stuff was in there.

I use that feed to send email updates in ConvertKit. I also used Apple, Google, and Spotify's "podcast host" features to submit my own feed for syndication. Whenever I publish a new episode, the RSS feed updates, they get notified, and the episode shows up.

## Why do you do this instead of just using a third party service?

Two reasons for me: cost and control.

Most third-part services get pretty pricey, but save you a ton of time. I frankly don't do enough with my podcast to justify the cost. The value just isn't there for me.

But more importantly, self-hosting gives me more control over the layout and user experience. That's generally why I tend to build my own platforms. I want to present a unified experience across all of my stuff.