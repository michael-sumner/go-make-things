---
categories:
- Business and Leadership
date: '2015-05-01'
url: /how-to-go-from-idea-to-published-ebook-in-5-days/
title: How to go from idea to published ebook in 5 days
---

Last week, I released <a href="https://gomakethings.com/wicked-fast-websites/">Wicked Fast Websites</a>, a beginner’s guide to high-performance responsive web design.

I had only just come up with the idea on Friday. By the following Wednesday, the book was available for download as a relatively nicely formatted PDF, EPUB, and MOBI.

Here's how I did it.

<!--more-->

<h2>Sourcing from existing content</h2>

In a broad sense, I've been writing this book for two years.

I find myself talking about the same topics over-and-over again, both here on the site, and in conversations with colleagues and peers. It took me 15 minutes to sketch a quick outline of how I thought the book should flow.

The first few chapters were written from scratch. They were kind a grand unifying theory of what the heck my book was supposed to be about. But after that, I was able to borrow heavily from stuff I had already written.

Most of the chapters in the book are modified, updated, or expanded blog posts from this site.

<h2>The Process and Tools</h2>

I wrote the whole book in markdown in Sublime Text. Each chapter was its own file, ordered by number. I used <a href="https://github.com/cferdinandi/wicked-fast-websites-ebook">GitHub to backup my work</a> (and for version control).

I wrote the whole thing in about two days, then spent a third reading, making some light edits, and polishing. I added a chapter on content parity across devices to fill in what felt like a hole in the story.

<h3>Designing the Book</h3>

The design of the book was all done in OSX Pages. I've always used Word, but Pages provides "export as epub" functionality. It was an absolute delight to use.

This is where my obsession with markdown came back to bite me. I had to do a lot of copy-and-pasting to add formatting, remove markdown style elements, and add links. In retrospect, I should used a markdown editor that displayed formatted text I could have copied into Pages instead. Live and learn.

<h3>Publishing the Book</h3>

I exported from Pages into a PDF, and then again as an EPUB. I downloaded <a href="http://calibre-ebook.com/">Calibre</a> and used that to convert the EPUB into a MOBI file. Exporting all the formats took less than five minutes.

<h2>Releasing the Book</h2>

Everything lives on the server for this site, and is served via a simple link to the file (which triggers a download for most of the file formats).

I use Google Analytics Events to track the downloads. It's a simple <code>onclick</code> event on the download links.

I had originally just included a link to a zip file with all three file formats. Then I realized someone may want to just immediately start reading on their mobile device, so I added separate links for the individual file formats as well.

<h2>What I Learned</h2>

Momentum is your friend. If I didn't knock this out in a week, it would have taken me a month.

Write about what you know. Better yet, refine and polish what you've already written about. This felt easy because I had done so much of the leg work already.

The right tools make a difference. I've fought with Word in the past to create ebooks. Pages made it <em>so</em> much easier.

Just ship the darn thing. There are a few typos in the book. I proofread it a few times but still missed some things. I wish the table of contents linked to the chapters, too. And the one image in the book doesn't resize properly on smaller screens, so it's cropped off.

But getting something pretty good out there for people to use matters more than perfect. I can always go back and release an updated version later.

I actually used semantic versioning for the book itself. So the initial release is v1.0.0. Typo fixes would be v1.0.x changes. Additions to content would be v1.x.0 changes. Changes in content due to evolving practices would be major version changes (ie. vx.0.0).

It was a lot of fun, and I plan to do this again soon. Let me know if you have any questions.