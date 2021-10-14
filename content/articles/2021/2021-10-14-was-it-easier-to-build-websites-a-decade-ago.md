---
title: Was it easier to build websites a decade ago?
date: 2021-10-14T10:30:00-04:00
draft: false
categories:
- Accessibility
- Careers
- Code
- CSS
- Design and UX
- HTML
- JavaScript
- Technology
- Web Performance
---

This week, [Tim McNamara tweeted](https://twitter.com/timClicks/status/1448001283307102209):

> Why is it harder to make a website in 2021 than it was in 1996?
> 
> I mean, writing your own HTML in Notepad and uploading it via FTP was a chore. But it was understandable and easy.
> 
> If you want to create a fanpage of some obscure topic, everything is just ... too much. So instead, people will create an Instagram/TikTok/Facebook/etc and start posting there.

[In a follow-up](https://twitter.com/timClicks/status/1448149829830381574), he later noted:

> the original tweet wasn't me being nostalgic, it was about the fact that ad-driven apps are simpler and will therefore win. until that happens, creativity and expression will be captured by large, privacy-invading companies.

Tim's not wrong, but he's also not entirely right.

Let's dig in.

## The web is more complicated

There's a lot to unpack in Tim's tweets, but let's start with the web itself.

Back in 1996, the web barely did anything. It was mostly just a bunch of online documents (and don't get me wrong, that was awesome). CSS was _literally_ just invented. You couldn't style links on hover.

JavaScript, amazingly, already existed, but not consistently across all browsers. It also did very little.

All of the stuff we _love_ about the web today&mdash;streaming videos, interactive applications, and full on fucking video games&mdash;that shit is complicated. And when you build complicated things, the process of building them is also a bit more complicated.

A car is a lot more difficult to build than a bike.

## Building things for the web is actually easier

So, there's some nuance here. 

I spend _a lot_ of time talking about how our deep dependency chains and complicated JS libraries add needless complexity to the build process. I stand by that. It's true, and I also think it's what Tim was referring to in his tweets.

On the otherhand, the web platform has made building complicated things easier than ever.

### `spacer.gif`

Depending on how old you are, you may or may not remember spacer GIFs. These were 1px by 1px square images named `spacer.gif` with a transparent background, because a GIF was how you got transparent background images then. PNG wasn't a thing.

You used spacer GIFs to nudge and tweak the layout, shifting things around the UI one painstaking placed pixel at time. Margins and padding weren't a thing yet.

Nuanced layouts required the `table` element to position things where you wanted them, because neither `flexbox` nor `grid` existed yet, and CSS floats didn't either.

If you could have accessed the web on a mobile device, the whole house of cards would have fallen apart. The mobile web didn't exist yet, so those fixed-width sites weren't really an issue.

### Browser standards (or lack thereof)

Similarly, JavaScript was brand new, poorly designed, and had totally different APIs from one browser to another. Doing anything with it was a nightmare.

It's hard to imagine now, but jQuery was like a gift from the gods when it was released.

Before jQuery, you couldn't easy add or remove classes, or get elements in the DOM by anything other than an ID. Even basic things required convoluted `if...else` statements to conditionally run one method or another depending on the user's browser and what it supported.

Now? The platform does all of that stuff natively, and then some. And it does it (relatively) consistently from one browser to another.

### Paving cow paths

I personally hate the complexity of modern build tools.

I get little value from React or Vue on most of the projects I build. I hate running `npm install` in order to start working on a project. I think Bootstrap and Tailwind are overengineered, and in trying to do too much, cause real harm to the end user.

But the older I get, the more I've come to appreciate that these tools _do_ solve problems for a large segment of developers.

And more importantly, they create the cow paths. jQuery showed us what a good DOM manipulation API could look like. So many of the modern JS methods I love were adopted almost as-is from jQuery. It made the paths, and browser standards paved them into the platform.

Similarly, modern build tools gave us dependency management and imports, and now that's a browser-native feature. They provide HTML sanitization. Now there's a spec for that (not production ready yet). They make adding interactive components easier, and provide state-based UI with targeted DOM updates. 

I'd love to see browsers adopt some of those features, too. That's how things get easier.

## You _can_ still build websites like its 1996

Literally yesterday I authored a file in my text editor (I'm partial to Sublime), saved it, and logged into my server with my FTP client of choice, FileZilla. I dragged the file into the correct directory on my server, and it was live on the web.

You can absolutely still have that experience if you want.

If you want an even easier experience, [LiveJournal](https://www.livejournal.com/) still exists. [WordPress.com](https://wordpress.com/) provides free hosted websites. [Glitch](https://glitch.com/) lets you create entire fucking apps without even signing up for an account.

And static site generators like [Hugo](https://gohugo.io/) and [Eleventy](https://www.11ty.dev/) merge the best of the 1996 with modern approaches. 

I author the articles for this site in markdown, and Hugo mashes them into some templates I created in mostly plain old HTML. I absolutely could drag-and-drop those onto my server with an FTP client if I wanted to. 

Personally, I find [pushing them to git and letting them auto-build and deploy](/automating-the-deployment-of-your-static-site-with-hugo-and-github/) easier, once it's setup. But that's the thing. You can augment your process with as many or as few "modern niceties" as you want.

Sometimes they help. Sometimes they make things harder.