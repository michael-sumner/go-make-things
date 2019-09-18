---
categories:
- Design and UX
date: '2013-09-16'
url: /you-cant-infer-intent-from-screen-size/
title: You can&#8217;t infer intent from screen size
---

In a recent online discussion about <a href="http://econsultancy.com/us/blog/63385-16-drop-dead-gorgeous-examples-of-mobile-design-inspiration#comments">responsive web design versus dedicated mobile sites</a>, I cited this data from <a href="http://www.google.com/think/research-studies/creating-moments-that-matter.html">a recent study by Google and Neilsen</a>:

<blockquote>
  77% of mobile searches happen in locations where you would expect a desktop device to also exist&mdash;at home and in the office.
</blockquote>

In rebuttal, Jonathan Bass shared this perspective:

<blockquote>
  You are right in that 77% are doing the same. But your implication is wrong, IMHO. The 23% who are doing things differently are precisely why mobile is not the same as desktop. If optimisation is valuable for much smaller segments then it's even more so for a quarter of the audience.
</blockquote>

<p>Jonathan has a great point. But just because they're in a location that lacks a desktop computer doesn't mean they're not looking for the same information. They <em>could</em> have different needs, but we have no way of really knowing.
<!--more--></p>

<h2>You can't infer intent from screen size</h2>

If there's one mantra I've been trumpeting around RWD for the last year, it's that <a href="https://gomakethings.com/content-parity-on-the-web/">you can't infer intent from screen size</a>. Mobile context is a myth.

I see two themes:

<ol>
<li>Based on <a href="https://gomakethings.com/adopting-a-dog-from-your-phone/">the behaviors I observe</a>, I expect mobile traffic for what were previously considered "desktop tasks" to continue to rise. The web is everywhere, and we can't stop it.</li>
<li>We have no way of knowing, based on the size of device, what the person is there to do. We can assume they only want directions or a phone number or what not, but our chances of being wrong are very high.</li>
</ol>

<h2>What we should be doing about it</h2>

For me, the direction seems clear:

<ol>
<li>Adaptive design and progressive enhancement (not content) so that you're serving appropriate and appropriately sized resources based on the device and it's limitations or capabilities.</li>
<li>Fluid layouts that provide the same content to everyone.</li>
<li>A focus on performance as a key design feature—whether the person is on a desktop, smartphone, refrigerator, TV, or whatever.</li>
<li><em>Really</em> strong information architecture. Identify common use cases and workflows, and make it easy for the visitors themselves to find the content that fits <em>their</em> desires.</li>
</ol>

It's arrogant to assume that we as designers and developers can know exactly what a person wants from our site. Our job should be to make it easy for them to get where they want to go.