---
title: How I create my JavaScript books and courses
date: 2022-06-23T10:30:00-04:00
draft: false
categories:
- Accessibility
- Business and Leadership
- Careers
- Code
- CSS
- Design and UX
- HTML
- JavaScript
- Technology
---

Over the last two weeks, I release [a new course on accessible components](https://vanillajsguides.com/accessible-components/) and [a new course on native web components](https://vanillajsguides.com/web-components/), and [completely redid my course on writing JavaScript libraries](https://vanillajsguides.com/writing-js-libraries/).

Today, I wanted to talk about how I create my courses and ebooks.

This article is focused on the actual content and finished books/videos. If you want to learn more about how I sell and deliver them, I wrote about [the tech behind my learning platform](/the-tech-behind-my-javascript-education-platform/) a few years ago.

Let's dig in!

## The process

Every pocket guide I create follows the same process...

1. Learn how to do a thing
2. Outline the stuff you need to know: the basics, some advanced topics, and weird gotchas or edge cases that most tutorials miss
3. Write the ebook
4. Create source code from the ebook
5. Use the source code to create the video course
6. Create the book cover and course image
7. Convert the ebook into PDF, EPUB, MOBI, and HTML formats
8. Upload the videos to a streaming service and get them captioned
9. Sell the course!

Let's look at each step in more detail.

## Learn how to do a thing

[My pocket guides](https://vanillajsguides.com) are short and focused. Every one starts off as a narrow topic that I'm personally interested in or learning about.

My code base was getting unruly, so [I learned about ES modules](https://vanillajsguides.com/es-modules/). I wanted to improve the resilience and offline capabilities of my sites, so [I learned about Service Workers](https://vanillajsguides.com/service-workers/).

The process for me always starts by Duck Duck Going a whole bunch, reading a bunch of tutorials, and trying to implement what I've read into a simple working project.

There's almost always a bunch of assumed knowledge in the tutorials, or edge cases they don't mention, or gotchas or weird bugs that pop up that weren't discussed. This is the kind of stuff that makes self-taught learning so hard, and one of the reasons I started creating courses in the first place.

After I've built a few small projects, I have a pretty good grasp on how things work. But I'm also close enough to "being a new learner" that the pain points and "oh, I wish someone had told me that!" stuff is still really fresh in my mind.

This is the perfect time to start actually writing the course.

## Outline the stuff that you need to know

I find most tutorials on the web fall into one of two categories:

1. Hand wave over some essential knowledge and jump right into the interesting stuff.
2. Go into way too much detail about every aspect of a topic.

Both approaches suck, for different reasons.

The _hand-wavy tutorials_ are impossible for beginners, because you can never get started. There's all this stuff you need to know first that's not mentioned or covered.

The _too much detail_ tutorials can be confusing and overwhelming. They often cover stuff that's not likely to come up, or not important at first (but good to know later). They're hard for beginners, too, mostly because they overload you with information.

I like to break my outline into a few common parts:

1. The essential stuff you need to start doing the thing.
2. Advanced topics. After you've got the essentials down, _now_ lets talk about those advanced features, edge-cases, and so on.
3. A project. I've found that for most folks, learning doesn't really stick until you apply it. I include a project in every course, because it dramatically improves learning retention.

## Writing the ebook

I start with the ebook, because it's easier for me to write and edit and clarify my thoughts in text first.

I write my ebooks as a collection of markdown files. Each chapter gets its own file.

Markdown works really well for me because my books include a lot of code snippets, and being able to create highlighted code blocks is much easier in markdown than with other tools I've tried (like MS Word or Apple Pages).

There's no real trick here.

I tend to write like I talk, and I talk very directly. That seems to work well for a lot of people. I've also got years of experience writing about technical topics, so I've become really efficient at it.

## Creating source code from the ebook

Next, I got through every chapter of the ebook and create source code from it.

Every chapter gets its own directory, and every section or snippet gets its own HTML file with the code able to be run live in a browser.

When I'm done, the entire directory gets put up on GitHub for easy access and version control. Yes, that means anyone can view it. I don't think it's nearly as useful without the explanations around it, so I'm not particularly worried.

## Using the source code to create the video course

The video course versions of my pocket guides are me talking about and explaining the source code.

I copy/paste the text from the ebook into an email and pull it up on my phone as rough notes about the topics I'm supposed to follow. I used to try to follow a very precise script, but found students like it better when I'm a bit more casual in my videos.

So now, I pull up the source code and record myself explaining how it works. [I use Screenflow for this.](https://www.telestream.net/screenflow/overview.htm)

Occasionally, I'll have a section that doesn't have any code.

When that's the case, I grab [a few relevant images from Unsplash](https://unsplash.com/) or put one or two big, relevant words on a slide in Keynote. Then I use Screenflow to record myself giving a short presentation.

My videos are typically two to five minutes in length.

## Creating the book cover and course image

I use the same cover for every book... almost.

Every pocket guide cover has the same exact layout. I use a different background color based on the bundle the book is part of (blue for beginner, greenish for advanced, and purple for expert).

I also include a nautical creature or artifact of some kind on the cover. I try to make it somewhat relevant, when I can. For example, the [accessible components guide](https://vanillajsguides.com/accessible-components/) has a starfish, which looks a little bit like the "arms out person" icon often used as the A11Y logo.

[I get the icons from the Noun Project.](https://thenounproject.com/) I purchase the one-time, royalty-free license.

Even though everyone's moved on to Figma or whatever, I still [design my covers in Sketch](https://www.sketch.com/). I also use Sketch and the cover image to create the graphic that appears at the top of the sales page for the course on the website.

## Converting the ebook into PDF, EPUB, MOBI, and HTML formats

So, I've got a bunch of markdown files, and I've got a cover image. How do I make them into an actual ebook?

I built my own command line tool using [Pandoc](http://pandoc.org/), [wkhtmltopdf](http://wkhtmltopdf.org/), and [Calibre](https://calibre-ebook.com/). [I have an open sourced version of it available here](https://github.com/cferdinandi/ebook-boilerplate) (it's probably in need of some dependency updates).

The version I use is customized a bit to reuse certain files (like my "about the author" page) across all of the books, and can batch compile multiple books at once.

## Uploading the videos to a streaming service and get them captioned

[I host my videos on Vimeo Pro.](https://vimeo.com/professionals)

Vimeo handles bandwidth aware streaming far better than I ever could. They let me customize the appearance of the embedded video player. They let me control where my videos can be embedded. They support closed captions. They support downloading.

Vimeo is one of the easiest no-brainer business expenses I have.

They have a cheaper "Vimeo Plus" plan with many of the same features, but it doesn't support business users. If you're selling paid content or creating business content, you need at least a Pro subscription.

[I use Rev for my captions.](https://www.rev.com/)

They're affordable, have a quick turnaround, and are relatively accurate. Best of all for me, they have Vimeo API integration. 

This means I can log in to Rev and just select the videos I want captioned from a list. Rev automatically uploads and activates the captions to the videos for me. I used to have to manually upload each file to the matching video, and that sucked.

## Selling the course!

Honestly, for me, the marketing aspect of an education business is far harder than the course creation.

I spend a lot of my time writing articles like this, answering questions on Twitter, chatting with students, and appearing on podcasts. I don't "buy ads." I think that's a waste of money.

Most of my sales come from people who subscribe to my newsletter, like what I have to say, and eventually buy a course or ten.