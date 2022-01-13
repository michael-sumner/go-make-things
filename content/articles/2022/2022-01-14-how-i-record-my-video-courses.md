---
title: How I record my vanilla JS video courses
date: 2022-01-14T10:30:00-05:00
draft: false
categories:
- Accessibility
- Business and Leadership
- Careers
- Design and UX
- Technology
---

Yesterday, one of my students asked me how I record [my JavaScript video courses](https://vanillajsguides.com) and [workshop lessons](https://vanillajsacademy.com).

Today, I wanted to share both my technical setup and general approach to making videos. Let's dig in!

## Screen recording

I use [Screenflow](https://www.telestream.net/screenflow/) for screen recording.

It's macOS only. If you're feeling cheap, you can also just use QuickTime, but I found that makes my fans spin like crazy. Screenflow also has some great editing features, including easy cropping and zooming, noise isolation, and so on.

If you're on Windows, you can alternative use [Camtasia](https://www.techsmith.com/video-editor.html), which I haven't used in years but used to when I was on a Windows rig.

## Microphone

For microphones, I used a [Blue Yeti](https://www.bluemic.com/en-us/products/yeti/) for years.

It's the most entry-level of "nice microphones," with a price to match. The audio quality on it is actually _really_ good, if you configure it and use it properly.

However, it's what's known as a _condenser microphone_. It picks up a wide range of tones, but is also very sensitive to low volumes, and thus, picks up a lot of background noise.

Now that everyone is remote, there's a lot more noise in my house, which was making recording very difficult. In a sound-treated space or dedicated studio, the Blue Yeti is amazing. But it's very unforgiving to background noise.

I recently upgraded to the [Shure MV7](https://www.shure.com/en-US/products/microphones/mv7).

It's what's known as a _dynamic microphone_. You need to put your mouth much closer to microphone to pick up a good audio level, but it isolates almost all noise that's not directly in front of it, which is just what I needed!

Shure makes some other microphones that are technically a bit better, but the MV7 is a USB mic, which lets me plug it directly into my computer. Most of their other mics are XLR microphones, which require a special interface to boost the audio before connecting to your computer.

If you're on a budget, any headset with a built-in microphone is a great place to start. Just beware that the mic on Apple's old-school corded airbuds tend to drag across beards and clothing and pick up noise that way.

## Boom Arm

While upgrading my microphone, I also purchased a [RØDE PSA1 boom arm](https://www.rode.com/accessories/stands/psa1).

This lets me position the mic directly in front of my mouth, without interfering with my keyboard or notes as I record. Some folks recommend optional things like shock arms to absorb desk movement, but I've found that's totally unnecessary with this mic.

Instead of a boom arm, you can use a desk stand. I did for years. They do sometimes pick up typing noises, so you have to be a bit careful about how hard you hit the desk.

## Positioning the Mic

The microphone has a built-in pop filter to minimize the popping noises that result from saying "p words" (called _plosives_).

I found that all of my s words sounded slurred with the new mic. From research, this often happens when a mic is positioned closer to your mouth.

After some trial and error, I found that positioning it below my mouth pointed up made that go away. But it's different for each person. Try positioning the microphone to the side, from the bottom, and from above until you find something that works best for you.

## Text Editor Settings

While I normally code in a dark theme, I use a light theme for my recordings, as many folks report that it's easier to see and read in well lit settings.

I boost the size of my text up to 19 pixels to make it easier to read on smaller screens. It's a bit awkwardly large on my end, but much better for the people watching my videos.

I use Monokai Light as my syntax highlighting theme. I've found that it has good contrast for easier visibility.

## Approach

I prefer talking over code to showing my face. Worrying about whether or not I'm making stupid faces makes recording even harder than it already it is.

I used to use a script, and restart my recordings every time I fucked up and said an "ooh," "um,", or "ah."

Then, I did a few live streaming things, and had folks tell me they preferred the more casual tone of those over my well scripted videos. Some research indicates that filler words (the "ums" and such) often go unnoticed consciously, but trigger brains to pay more attention to what's being said.

Now, I tend to write out a few notes on a piece of paper and "just wing it."

I aim for a single take with no edits beyond cropping the frame to HD and adjusting the audio level. If the video is longer than a minute or two, I may copy/paste the text into an email and keep it positioned on my phone in front of me instead.

But I always keep it conversational, and leave in the mess ups and debugging. Students have actively told me they like to see that stuff and how I work through it.

## Creating the Content

Each video starts with me creating the source code.

Next, I write up how it works. Then, I use that text version to help guide the talking points in the video. Some folks prefer to learn by reading, so I include text options as well.

## Hosting

I host all of my videos on [Vimeo Pro](https://vimeo.com/upgrade).

They handle compressing the video, and dynamically serve it at different rates based on the user's bandwidth and screen size. They also let me control the UI of the video player, and where it can be embedded. Finally, they have a "download video" link, which is also useful for my students.

Vimeo Pro is money well spent!

_**Note:** for business videos, you need at least Vimeo Pro. The Vimeo Plus plan does not allow business videos under its TOS._

## Captions

I use [Rev](https://www.rev.com/) for video captioning.

You can link your Vimeo account directly in Rev using the Vimeo API, and select the videos you want to caption directly from the Rev UI. Captions are uploaded directly to the video without you having to manually upload them.

This saves me a _ton_ of time.

## Anything I missed?

Hope that helps! Let me know if there's anything you want me to talk about that I missed.