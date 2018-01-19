---
categories:
- Code
date: '2014-12-03'
permalink: /get-distances-to-the-top-of-the-document-with-native-javascript/
title: Get distances to the top of the document with native JavaScript
url: /2014/12/03/get-distances-to-the-top-of-the-document-with-native-javascript
---

Last week I added two new code snippets to my [Ditching jQuery](/ditching-jquery) resource.

One is used to get your current position on a page from the top of the document. The other will get the distance of any element from the top of the document.

```lang-javascript
// Get current location's distance from the top of the page
var position = window.pageYOffset;

// Get an element's distance from the top of the page
var getElemDistance = function ( elem ) {
    var location = 0;
    if (elem.offsetParent) {
        do {
            location += elem.offsetTop;
            elem = elem.offsetParent;
        } while (elem);
    }
    return location >= 0 ? location : 0;
};
var elem = document.querySelector('#some-element');
var location = getElemDistance( elem );
```

[snippet id="8397"]