---
categories:
- Code
- CSS
- Design &amp; UX
- JavaScript
date: '2016-09-02'
permalink: /accessible-toggle-tabs-and-accordions/
title: Accessible toggle tabs and accordions
url: /2016/09/02/accessible-toggle-tabs-and-accordions
---

This week I refactored two of my open source projects---a [toggle tabs plugin](https://github.com/cferdinandi/tabby) and an [accordions plugin](https://github.com/cferdinandi/houdini)---to make them more accessible to people who access the sites I build with screen readers or navigate primarily with a keyboard.

Today, I wanted to talk about my changing approach to writing JavaScript plugins that show and hide content on a web page.

## The approach

I've started thinking of tabs and accordions as visually enhanced anchor links rather than new functionality:

- The toggle that triggers a tab or accordion to open is a humble anchor link: `<a href="#some-content">Tab 1</a>`.
- Opening a tab or accordion updates the URL with a hash: `http://someurl.com#some-content`.
- Opening a tab or accordion should bring that content into focus.
- Visitors can right-click or command/control-click to open the link in a new window.
- If someone visits the page and the hash matches the ID of the tab or accordion, they're jumped to that section on the page and the content is already open and visible.
- The forward and back buttons on the browser should allow you to navigate back and forth, opening tabs or accordions.
- If someone is reading the page with a screen reader, they shouldn't even notice that it's tabbed. It should work just like anchor links, with all of the content accessible and readable to the screen reader without having to click a link.
- Focusing on a link or input inside a tab or accordion should open it (for sighted keyboard users).
- If JavaScript fails to load or breaks for some reason, the visitor is left with... perfectly functional anchor links!

## The code

### 1. It starts with good markup.

Start with simple anchor links and content sections with IDs. It's also helpful to add some classes or data attributes for styling and targeting.

```markup
<ul>
	<li><a class="tab-toggle" href="#tab1">Tab 1</li>
	<li><a class="tab-toggle" href="#tab2">Tab 2</li>
	<li><a class="tab-toggle" href="#tab3">Tab 3</li>
</ul>

<div class="tabs">
	<div class="tab-pane" id="tab1">
		...
	</div>

	<div class="tab-pane" id="tab2">
		...
	</div>

	<div class="tab-pane" id="tab3">
		...
	</div>
</div>
```

### 2. Let the browser do most of the heavy lifting.

You can use JavaScript to prevent the default click event, update URLs, and intercept the forward and back buttons to open content.

But it's so much easier and less fragile to just let the browser handle that with anchor links. It does it already, and it does a great job.

Instead of using `event.preventDefault()` to stop the normal click behavior, I just let the link be a link. This would normally result in the page jumping to the anchor location, which isn't really desirable for tabs and accordions, though.

To get around this problem, I use JavaScript to remove the anchored content's `id`, store it as a data attribute, and then add it back after the URL updates.

```javascript
// Listen for click events
document.addEventListener('click', function (event) {

	// Only take action if the clicked link was a tab toggle with a valid anchor link
	if ( !event.target.classList.contains( 'tab-toggle' ) || !event.target.hash ) return;

	// Get the anchored content
	var content = document.querySelector( event.target.hash )
	if ( !content ) return;

	// Store the ID as a data attribute and remove it
	content.setAttribute( 'data-id', content.id );
	content.id = '';

}, false);
```

After the URL update, add the ID back and open the content.

```javascript
// Listen for hashchange events
window.addEventListener('hashchange', function (event) {

	// Get the anchored content
	var content = document.querySelector( '[data-id="' + window.location.hash.substring(1) + '"]' );
	if ( !content ) return;

	// Restore the ID
	content.id = content.getAttribute( 'data-id' );

	// Open the content, close other tabs, whatever
	content.classList.add( 'active' );

}, false);
```

This approach also means that you can open a tab or accordion based on the hash.

```javascript
// Get the content
var content = document.querySelector( window.location.hash );

// If the content is a tab, open it
if ( content && content.classList.contains( 'tab-pane' ) ) {
	content.classList.add( 'active' );
	// close other tabs or do whatever else here
}
```

And as a bonus, clicking the forward and back buttons on the browser will now automatically jump you between tabs or accordions, automatically opening them for you.

### 3. Only hide content visually.

Historically, I would do something like this to show and hide my tabs and accordion content:

```css
/* Hide the tab */
.tab-pane {
	display: none;
	visibility: hidden;
}

/* Show the tab when active */
.tab-pane.active {
	display: block;
	visibility: visible;
}
```

Using this approach makes the content completely invisible to screen readers unless it has the `.active` class.

I now use a different approach to only hides the content visually. Screen readers can still *see* and read it, even if it's not visible to sighted users.

```css
/* Hide the tab */
.tab-pane {
	border: 0;
	clip: rect(0 0 0 0);
	height: 1px;
	margin: -1px;
	overflow: hidden;
	padding: 0;
	position: absolute;
	width: 1px;
}

/* Show the tab when active */
.tab-pane.active {
	clip: auto;
	height: auto;
	margin: 0;
	overflow: visible;
	position: static;
	width: auto;
}
```

Doing this means not having to mess around with aria roles or adding information for screen readers about which tabs are open, which are closed, etc. As far as the screen reader is concerned, these are just valid anchor links.

### 4. Set focus.

Normally, when you click an anchor link, focus on the page jumps to the anchored section.

Since we're removing the ID before the URL updates and then adding it back, this never happens. Fortunately, it's really easy to do this with JavaScript.

**One caveat:** you need to add `tabindex="-1"` to the content if it's not already a focusable content type.

Going back to our previous `hashchange` listener:

```javascript
// Listen for hashchange events
window.addEventListener('hashchange', function (event) {

	// Get the anchored content
	var content = document.querySelector( '[data-id="' + window.location.hash.substring(1) + '"]' );
	if ( !content ) return;

	// Restore the ID
	content.id = content.getAttribute( 'data-id' );

	// Open the content, close other tabs, whatever
	content.classList.add( 'active' );

	// Try to bring the content into focus
	content.focus();

	// If it didn't work, give the content a tabindex of -1 and try again
	if ( document.activeElement.id !== content.id ) {
		content.setAttribute( 'tabindex', '-1' );
		content.focus();
	}

}, false);
```

This results in a blue outline around the content. You can easily remove this with a touch of CSS.

```css
.tab-pane:focus {
	outline: none;
}
```

### 5. Open the content if a link or input field inside it is focused.

This is for the benefit of sighted users who navigate with a keyboard---people with neuromuscular disorders like Parkinson's, for example.

Since the content is only visually hidden, then can tab their way through all of the focusable areas. If they tab into an element that's visually hidden, that can be really confusing.

Fortunately, we can detect focus, check if the focused element is inside a tab or accordion, and open it up if it is.

```javascript
// A helper function to find a parent element with the matching class
// @link https://gomakethings.com/ditching-jquery/#climb-up-the-dom
var getClosest = function ( elem, selector ) { ... }

// Listen for focus events
// Last argument must be "true" for this to work
document.addEventListener('focus', function (event) {

	// Only take action if the focused content is in a tab
	var content = getClosest( event.target, '.tab-pane' );
	if ( !content ) return;

	// Open up the tab, but DON'T change focus, since we want it to stay on the focused content
	content.classList.add( 'active' );

	// close other tabs or do whatever else here

}, true);
```

### 6. Only hide content if JavaScript loads.

Remember, we're treating this as an enhancement. By default, your tabs or accordion should just be anchor links. When your JavaScript file loads, add a class to the `<html>` element.

```javascript
// Add the .tabs-loaded class to the <html> element
document.documentElement.classList.add( 'tabs-loaded' );
```

Next, hook into that class in your CSS before hiding any content.

```css
/* Hide the tab */
.tabs-loaded .tab-pane {
	border: 0;
	clip: rect(0 0 0 0);
	height: 1px;
	margin: -1px;
	overflow: hidden;
	padding: 0;
	position: absolute;
	width: 1px;
}

/* Show the tab when active */
.tabs-loaded .tab-pane.active {
	clip: auto;
	height: auto;
	margin: 0;
	overflow: visible;
	position: static;
	width: auto;
}
```

## Seeing it in action

To see these techniques in action, check out [Tabby](https://cferdinandi.github.io/tabby) or [Houdini](https://cferdinandi.github.io/houdini).

As extendable plugins, these are both a bit more robust than the simple examples I showed here. But feel free to try them out, dig through the code, and ask me any questions.