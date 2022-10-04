---
title: Tips and tricks for working with static site generators
date: 2022-05-20T10:30:00-04:00
draft: false
categories:
- Accessibility
- Art and Science
- Business and Leadership
- Careers
- Code
- CSS
- Design and UX
- HTML
- JavaScript
- Technology
- Web Performance
- WordPress
- Vanilla Framework Demos
---

Early this week, I wrote about how [I see a shift towards static site generators as a changing direction in our industry](/knowing-what-to-focus-on-as-a-web-developer/).

> While RWD was a huge shift in our industry, smaller but still impactful changes happen every few years. The transition from traditional DOM manipulation to state-based UI was one. If you were aware of it at the time, digging into a library like Vue or React was probably a better use of your time than learning jQuery.
> 
> Today, we’re seeing a similar shift as [transitional apps](/transitional-apps/) and [static site generators](/vanilla-javascript-and-old-school-ssgs-are-the-best-choices-for-web-performance/), as well as a renaissance for browser-native JavaScript (aka Vanilla JS).

I _love_ static site generators, but a lot of folks find them challenging to get started with.

Today, I wanted to share some tips and tricks I've learned from using one for pretty much every site I've built in the last five years.

Let's dig in!

## What is a static site generator?

Static site generators (often called _SSGs_ for short) take content files and templates for that content, and mash them together to generate flat `.html` files.

In that way, they're a lot like dynamically generated CMS's like WordPress and Drupal.

The biggest difference between an SSG and a dynamic CMS is that SSGs generate the HTML files ahead of time, before a visitor ever goes to access them. The files that sit on your server are typically `index.html` files, inside a directory tree that matches the desired URL path for the file.

For example, with an SSG the HTML for `/about/our-company/` would be `/about/our-company/index.html` on your server.

This takes advantage of how browsers and servers naturally work out-of-the-box to create an incredibly fast experience.

## How to create content with a static site generator

With an SSG, you write your content in markdown files. 

At the top of each file, you include three opening and closing dashes (`---`). Between these dashes is where you put what's called your _front matter_. This is all of the important information about the content that's not part of the content itself.

Here's what the front matter for this article looks like.

```md
---
title: Tips and tricks for working with static site generators
date: 2022-05-20T10:30:00-04:00
draft: false
categories:
- Code
- HTML
- Technology
- Web Performance
- WordPress
---
```

Most SSGs require the same two basic pieces of information in your front matter: a `title` and `date`. 

You can add any additional information you want, and typically, you can access front matter in your templates and use it to control or modify the layout.

Front matter is a lot like custom fields in WordPress, if you're familiar with those, but a bajillion times to easier to work with.

There's typically a dedicated directory for your content (often called `content`, though you can usually change that). Inside the directory, you can create subdirectories for different types of content.

For example, plain old static pages for my website live in the `/content` directory directly, while articles are in the `/content/articles` subdirectory.

## How to configure a static site generator

SSGs also have a configuration file that you use to specify things like the title and language for your site, the pattern to use for URLs (_do you the title from the content or the filename, do you include the date or directory name in the URL path, and so on_), and various other SSG-specific customizations.

Depending on the static site generator you use, this file might be in JSON format, YAML, or some other format. Some SSGs even let you use multiple formats depending on what you prefer.

## How do you create templates for your content?

There's typically a dedicated directory for your template files (it's name varies from one SSG to another).

Inside the directory, you include plain old HTML files for each of your different content types. The name and subdirectory these files are located in is used to map them to the corresponding types and directories for your `/content`.

For example, in Hugo, the SSG that I use...

- The `/themes/gmt/layouts` directory contains all of my template files
- The `./layouts/articles` directory contains templates for my daily articles
- The `./layouts/default` directory contains templates for everything else
- Inside the `./layouts/..` directories...
	+ A `list.html` file is used when the content has subdirectories underneath it
	+ A `single.html` file is used when the content is standalone
	
Using my site as an example again, the `./layouts/articles/list.html` file is the template for the main `/articles` landing page on my site, because there are a bunch of articles/subpages underneath that content.

The `./layouts/articles/single.html` file is used for each individual article.

**So... how do you actually inject content into those template files?**

Each template `.html` file includes templating code in another programming language. For Jekyll, it's Ruby. For Hugo, it's Go. In 11ty, you have a bunch of options, including Node, liquid, handlebars, and more.

For example, here's what the `./layouts/articles/single.html` file looks like for my site.

```html
<article>

	<header>

		<aside class="text-muted">
			<time datetime="{{ .Date }}" pubdate>{{ dateFormat "January 2, 2006" .Date }}</time>
		</aside>

		<h1 class="no-padding-top">
			{{ .Title }}
		</h1>

	</header>

	{{ .Content }}

</article>
```

When Hugo compiles my markdown files into HTML, it uses those weird bits between the curly brackets (`{{ }}`) to run some scripting with Go and inject the matching content for my markdown file and front matter.

The `{{ .Content }}` is the actual body content from the file, parsed with a markdown engine. The `{{ .Tile }}` is the `title` property from my front matter.

And this bit let's me customize how the date string from my front matter gets formatted: `{{ dateFormat "January 2, 2006" .Date }}`.

## How do you actually build your HTML files?

With a command line prompt.

Whenever you're ready to actually compile HTML from your markdown and template files, you go into the directory for your project in your CLI tool of choice, and run a build command (the command varies by SSG).

For example, for my site, I have to do this.

```bash
cd ~/sites/go-make-things
hugo
```

The SSG then builds all of the HTML files and drops them into a new directory (typically named `/public` in most SSGs). 

You can them publish those HTML files on your server.

**How?** You have options. You can drag-and-drop them using an FTP client like Filezilla. You can use some command line magic to move them (I've never learned how to do this, but people who are good at command line apparently know how 😂😂😂), or you can deploy your project to git and use some deploy hooks to do it for you.

[I actually use a slightly more automated approach.](/automating-the-deployment-of-your-static-site-with-hugo-and-github/)

I push all of my files to GitHub, but I skip the build step. GitHub pings my server, which pulls the latest version of the site into a temporary `/build` directory. Then, the server runs the build step, and moves all of the compiled files into the directory where the live version of my site lives.

## Is there a GUI or CMS you can use?

This is hands-down the most frequent question I get about SSGs.

Personally, I _love_ the experience of authoring in markdown. I wouldn't want to go back to using a GUI for that. 

But, I also know that a lot of folks do enjoy having a proper CMS. And for client work, "open a markdown file and..." isn't usually a viable solution.

When I use SSGs for client work, I typically add [ForestryIO](https://forestry.io/). This is a web-based CMS that uses GitHub's content API to pull and push content. Whenever an update is made, that automated deploy process I mentioned takes over and builds a new version of the site.

If you use Netlify, they also offer [a free CMS you can customize for your projects](https://www.netlifycms.org/).

While these options are "good enough", in my opinion, I haven't found a truly great CMS for SSGs. The team behind Forestry is working on a new thing, [Tina](https://tina.io/), that seems like it will be a lot better, but I haven't actually used it yet.

## Which static site generator should you use?

Every SSG has benefits and trade offs.

**Generally speaking,** pick the one whose documentation is easiest for you to understand, that's simplest for you to get started with, and that uses a template language you're comfortable using.

Those three things are related, in my opinion.

I ended up using Hugo because at the time it was the only SSG I could actually figure out how to get running on my machine, and I was able to map some of Go's clunky templating over to what I was used to doing with PHP in WordPress. Ruby confused the hell out of me, so Jekyll was out, and 11ty didn't exist yet.

Some pros and cons of each platform...

- **Jekyll** is very stable, well-documented, and is the OG of this. Ruby isn't for everyone, though, and Jekyll sites can be slow to compile.
- **Hugo** has the fastest compile times of any SSG. But their documentation is of mixed quality, and the dude who built it can be an arrogant ass if you ask questions he views as beneath him.
- **11ty** is built on JavaScript and Node, which means if you're reading this site it may be the easiest one to get started. It's the most flexible of the bunch in terms of features and structure. And Zach Leatherman, the creator, is one of the friendliest, most approachable dudes on the internet! 
	
	The biggest downsides of 11ty, in my opinion, are that it's so open-ended in what it can do that getting started is a bit harder. And because it uses Node, you may find yourself subject to that annoying "you need to update the dependency tree before you can continue" thing that happens.

If SSGs seem interesting to you, [I've written a bunch of articles on my specific setup](/series/hugo-and-static-site-generators/) that you may find helpful.

I've also written a follow-up article that digs into [some of the details about building a website with an SSG](/a-workflow-for-building-a-website-with-a-static-site-generator-or-ssg/).