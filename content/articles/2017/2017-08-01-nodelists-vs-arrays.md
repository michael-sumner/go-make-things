---
categories:
- Code
- JavaScript
date: '2017-08-01'
url: /nodelists-vs-arrays/
title: NodeLists vs. Arrays
---

Last week, we looked at two separate `forEach()` methods for [Arrays](/looping-through-arrays-the-es6-way/) and [NodeLists](/looping-through-nodelists-with-es6/). Reader [Judd Franklin](https://www.linkedin.com/in/judd-franklin/) asked:

> Why aren't nodelists arrays?
>
> One of the most frustrating and confusing things about learning JavaScript is how the browser APIs so muddle the simple and clean core of limited data types at the heart of the language.
>
> I'd love to hear your thoughts on this.

He let me reprint his email and my response here. So here's the deal...

NodeLists and Arrays are two different things because NodeLists are actually not a JavaScript API, but a browser API.

Things like `querySelectorAll()` and 1getElementsByTagName()` aren't JavaScript methods, they're browser APIs that let you access DOM elements. You can then manipulate them with JavaScript.

This used to confuse me like crazy, too, because JavaScript is *the* scripting language of the front end. Turns out, other languages can access these methods, too.

(*I actually didn't know this until you asked the question. Crazy, right?*)

For example, on MDN they provide [an example of using Python and getElementsByTagName](https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model/Introduction#DOM_and_JavaScript):

```bash
# Python DOM example
import xml.dom.minidom as m
doc = m.parse("C:\\Projects\\Py\\chap1.xml");
doc.nodeName # DOM property of document object;
p_list = doc.getElementsByTagName("para");
```

NodeLists differ from Arrays in another meaningful way, too.

They are often (but not always) live lists, meaning that if elements are removed or added to the DOM, the list updates automatically. `querySelector()` and `querySelectorAll()` return a static list (one that doesn't update), but properties like `.childNodes` are live lists that will change as you manipulate the DOM (which can be a good or bad thing, depending on how you're using it).

This is all made more confusing because arrays can contain nodes. And, there's another, older type of list called an HTMLCollection that predates NodeLists, but is functionally similar (another article for another day).

The key way to think about NodeLists vs. Arrays: NodeLists are a language-agnostic way to access DOM elements, and Arrays are a JavaScript object you can use to contain collections of stuff.

They each have their own methods and properties, and you can convert a NodeList into an Array if you need to (but not the other way around).