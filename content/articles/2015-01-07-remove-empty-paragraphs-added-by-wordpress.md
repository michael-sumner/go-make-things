---
categories:
- Code
- WordPress
date: '2015-01-07'
permalink: /remove-empty-paragraphs-added-by-wordpress/
title: Remove empty paragraphs added by WordPress
url: /2015/01/07/remove-empty-paragraphs-added-by-wordpress
---

WordPress automatically adds paragraphs and line breaks to your content.

This is awesome when you're trying to write a quick blog post... and infuriating when you're trying to use specific, well-formed markup on a page. I've spent far too much time trying to prevent WordPress from adding empty `<p>` tags throughout my markup.

Fortunately, there's an easy fix!

<!--more-->

## A simple helper method

Just drop this snippet, courtesy of [Ryan Hamilton](https://gist.github.com/Fantikerz/5557617), into your `functions.php` file:

```php
/**
 * Remove empty paragraphs created by wpautop()
 * @author Ryan Hamilton
 * @link https://gist.github.com/Fantikerz/5557617
 */
function remove_empty_p( $content ) {
	$content = force_balance_tags( $content );
	$content = preg_replace( '#<p>\s*+(<br\s*/*>)?\s*</p>#i', '', $content );
	$content = preg_replace( '~\s?<p>(\s|&nbsp;)+</p>\s?~', '', $content );
	return $content;
}
add_filter('the_content', 'remove_empty_p', 20, 1);
```

I've added this to [Keel](http://github.com/cferdinandi/keel). It's a must-have feature for me.