---
categories:
- Code
- Design and UX
date: '2016-08-17'
url: /how-to-go-from-idea-to-published-book-in-a-week/
title: How to go from idea to published book in a week
---

Two weeks ago, I released *[The Web Developer Career Guide](/career-guide/)*, my field guide on how to stay relevant, hack the hiring process, and make more money as an in‑house developer.

I went from idea to published book in about a week, and today I want to walk you through how I did it.

## Planning the book

Like everything I do (code included), *The Web Developer Career Guide* started out on actual paper.

I made a rough list of high-level topics I wanted to cover and the the things I needed to address under each of them. Some topics were based on my previous experience coaching developers on careers. Others were based on emails I'd gotten from readers of [my newsletter](/newsletter).

I didn't worry too much about structure and order at this point. I just wanted to capture all of the things I needed to write about.

## Writing the book

I cheated, and you should, too.

I pulled about a third of the book content from previous articles I've written, email responses I sent to newsletter readers, and so on. I did some light editing on those, but why reinvent the wheel? This is the same approach I used for *[Wicked Fast Websites](/wicked-fast-websites)*.

For all of the stuff left to be written, I opened up my text editor (I like Sublime Text) and just started writing in [markdown](https://daringfireball.net/projects/markdown/syntax).

Picking a topic I knew well and was ready to write about helped a lot. There was minimal research involved. I just put everything taht was already in my head down into pixels.

## Organizing the book

After getting everything out into markdown, I started to organize stuff into a logical order.

What would someone need to know first before this other piece of info makes sense? How would they approach a task? What would they need to do first? Let's talk about that first.

I reordered my markdown files just by renaming them with a numbered prefix: `01`, `02`, etc.

## Editing the book

I edited the book myself, which can be tough. Your brain tends to ignore typos or incorrect words because it knows what you meant to write and doesn't even notice when it says something different.

To get around this, I created a Kindle version of the book from my markdown files (more on this later) and sent it to myself by email.

Reading the book on a different device in a different medium forced me to notice all sorts of things I'd messed up. I used the Kindle notes feature to collect of my changes. When I was done reading the whole thing, I pulled up my list of notes and made all of my updates.

## Creating the book

I used [Pandoc](http://pandoc.org/) to create PDF and EPUB versions of the book from my markdown files, and [Calibre](https://calibre-ebook.com/) to convert it to Kindle's MOBI format.

Both of these are 100% free, but do require you to be comfortable working in command line.

Setting Pandoc up to look the way I wanted took a bunch of trial and error. To make things easier for you (and me next time I do this), I [open sourced my ebook boilerplate](https://github.com/cferdinandi/ebook-boilerplate).

### Setting book info

Pandoc uses a `metadata.yml` file to set the title, subtitle, author name, and so on, and embeds all of that into the EPUB. It also autogenerates a title page for you.

PDFs don't use this file, so I also created a `title.md` file that contains all of that stuff. I only include it with the PDF version.

### Creating a cover

I created a simple cover in Keynote (in the past, I've used PowerPoint). I set up my Keynote to have a custom 1100 x 850 pixel size, so that it would generate files I could scale to 8.5 x 11, the size of my PDF.

I exported the cover to PNG file, which I link to in the `metadata.yml` file for EPUB and MOBI formats.

Pandoc can't create a full-bleed cover image. You have two options:

1. Just include the image in the `title.md` file and be ok with white margins.
2. Create a standalone PDF and merge it with the ebook.

I chose option 2. Easy to do on OSX in Preview (just drag and drop thumbnails), and there are free tools to do this in Windows as well.

***Note:*** *I create some "good enough" covers for this project, but you want want to hire someone to create a professional cover for you.*

## Distributing the book

I decided to use [Easy Digital Downloads](https://easydigitaldownloads.com/) to sell the book directly through my site.

I had toyed with using something like [SendOwl](https://www.sendowl.com/) or [GumRoad](https://gumroad.com/), but ultimately decided I wanted more control and flexibility over things.

Easy Digital Downloads is awesome and super extensible if you're comfortable working with PHP and WordPress. I'll be covering all of my integrations and customizations for this in another article.

## Marketing the book

This is always the biggest struggle for me.

I sent out a few emails to my newsletter telling them about the book before it launched, and then again after. Since they're the awesomest people on the planet, I gave them some serious money off: 50% for everyone, and 100% off for people who wanted to be book evangelists (both good for just 48 hours).

I also mentioned the book on Twitter a few times, and am now reaching out to some podcasts to talk about careers for web developers.

Three articles you should definitely read on this:

1. [Marketing tools for any self-published book](https://pjrvs.com/a/selfpub/)
2. [$26,679 in 24 hours: stats from my latest book launch](http://nathanbarry.com/behind-the-scenes/)
3. [What I learned selling $6,000+ of my ebook today](http://nathanbarry.com/learned-selling-6000-ebook-today/)

It's worth mentioning that my numbers are **nowhere** near that impressive. I sold about $250 worth in the first week.

But, I also have a much smaller newsletter list and audience in general. I'm hoping to slowly sell more over time, rather than having a bit spike in sales that trickles off to nothing.

## What now?

If you're interested in getting something published quickly, check out [my ebook boilerplate on GitHub](https://github.com/cferdinandi/ebook-boilerplate).

To see the resulting books, [check out one of my field guides](/guides/).