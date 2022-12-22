---
title: The FormData API
date: 2022-12-22T10:30:00-04:00
draft: false
categories:
- Code
- HTML
- JavaScript
---

Historically, getting all of the data from a form into a single object was a bit difficult, but modern techniques make it a lot easier.

The `FormData` object provides an easy way to serialize form fields into key/value pairs.

[I recently wrote about this for Steph Eckles' amazing 12 Days of Web series](https://12daysofweb.dev/2022/formdata-api/), and today, wanted to give you a little preview.

## How the FormData API works

You can use the `new FormData()` constructor to create a new `FormData` object, passing in the form to serialize as an argument. 

For example, let’s imagine you have a form that looks like this.

```html
<form>
    <label for="title">Title</label>
    <input type="text" name="title" id="title" value="Go to the beach">

    <label for="body">Body</label>
    <textarea id="body" name="body">Soak up the sun and swim in the ocean.</textarea>

    <input type="hidden" name="userId" value="1">
    <button>Submit</button>
</form>
```

_**Important!** Form fields must have a `name` attribute to be included in the object. Otherwise, they're skipped. The `id` property doesn't count._

To create a `FormData` object, you would pass the form into the `new FormData()` constructor, like this.

```js
// Get the form
let form = document.querySelector('form');

// Get all field data from the form
// returns a FormData object
let data = new FormData(form);
```

## Looping through FormData values

The `FormData` object is an _iterable_.

You can loop through it using a `for...of` loop. Each entry is an array of key/value pairs.

```js
// logs...
// ["title", "Go to the beach"]
// ["body", "Soak up the sun and swim in the ocean."]
// ["userId", "1"]
for (let entry of data) {
    console.log(entry);
}
```

You can also [use array destructuring](/destructuring-in-javascript/) to assign the key and value to their own variables within the `for...of` loop.

```js
// logs "title", "Go to the beach", etc.
for (let [key, value] of data) {
    console.log(key);
    console.log(value);
}
```

## How to get, set, and serialize values (and more!)

[In my article on 12 Days](https://12daysofweb.dev/2022/formdata-api/), I go into a lot more detail about the nitty-gritty of working with the FormData API. Many thanks to Steph for letting me participate in this year's series!

[Click here to read the whole thing.](https://12daysofweb.dev/2022/formdata-api/)