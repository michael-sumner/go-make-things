---
title: What is indexedDB (and how do you use it)?
date: 2022-12-06T10:30:00-04:00
draft: false
categories:
- Code
- Design and UX
- JavaScript
- Web Performance
---

One of my readers asked me to write about indexedDB. It's a big topic, so we'll be looking at bits and pieces of it over the next few days.

Let's dig in!


## What is indexedDB?

indexedDB is a type of database storage built right into the browser. It has a few advantages over cookies and local or session storage.

- You can store almost any kind of value as a simple key/value pair, without needing to parse arrays and objects into strings and back again.
- indexedDB databases have _much higher_ storage limits. While it varies by browser and operating system, indexedDB can store GBs of data instead of KBs or MBs.
- Unlike cookies and local storage, indexedDB databases can be accessed in [service workers](https://vanillajsguides.com/service-workers), which makes passing data between a worker and the browser a lot easier.
- indexedDB lets you group several tasks into a _transaction_, and will only save and complete that group of operations if all of them succeed. This helps prevent accidental data loss.


## How indexedDB works

Before digging into the specific methods and techniques, it's helpful to understand how indexedDB works at a high-level.

**You create and access a _Database_.** You can have multiple databases per site, but as a best practice, a site or app typically only has one. Databases are scoped to a specific domain, so other sites can't access them.

**Each database has one or more _Stores_.** A _store_ is a collection of data of a similar topic or structure. It's similar to a table in SQL or a collection in mongoDB, if you're familiar with either of them.

For example, if you were building a digital library app, you might have one _store_ that contained all of your `books`, with data about the title, author, published date, and so on. You might have a second _store_ for your `authors`, with their bio and a list of books they've written.

**Each item in a _store_ is a key/value pair.** The value can be almost any type of data, and it does _not_ need to be converted to a string before saving. The indexedDB API stores it as-is.

Now that we've got some core concepts out of the way, let's look at how to actually work with indexedDB.


## Opening a database

Let's imagine that we want to build a "Spellbook" app that we can use to create a directory of wizards and the spells that they know.

The first thing we need to do is open a new database using the `indexedDB.open()` method. Pass in two arguments: the `name` of the database, and the `version` number.

```javascript
// Open a database
let openDB = indexedDB.open('spellbook', 1);
```

For performance reasons, any indexedDB method that involves getting or setting data is asynchronous.

Unfortunately, instead of using Promises, the API is event-driven, with `onsuccess` and `onerror` events that fire whenever the method succeeds or fails.

We can attach `onsuccess` and `onerror` events to our `openDB` variable that will run when the database successfully opens or fails, respectively.

In the `onsuccess` callback function, the `openDB.result` property is the returned data, in this case the actual database itself. This is pattern used in all of the `onsuccess` callbacks for this API. In the `onerror` callback, `openDB.error` is the error message.

```javascript
// Open a database
let openDB = indexedDB.open('spellbook', 1);

// If the database was successfully opened
openDB.onsuccess = function () {
	let db = openDB.result;
	console.log('success', db);
};

// If there was an error
openDB.onerror = function () {
	console.warn(openDB.error);
};
```

_Google developer Jake Archibald has created [a tiny library that uses the same API as the browser-native indexedDB API](https://github.com/jakearchibald/idb), but returns Promises instead of events. We'll be using vanilla JS for these articles, but Jake's library is worth a look once you understand the basics of indexedDB._


## Closing a database

It's generally not a good idea to keep a database open for the lifetime of an app.

Open the database when you need to get or write data to it, then close it again when you're done. You can close a database using the `IDBDatabase.close()` method on your database.

```javascript
// If the database was successfully opened
openDB.onsuccess = function () {

	// Get the database
	let db = openDB.result;

	// Do some stuff...

	// Close the database
	db.close();

};
```


## Actually using a database

Over the new few days, we'll dig into how to create database _stores_, and how to add, update, and remove data from them. If there's time, we'll also look at how to handle database upgrades, and changes to your data structure that might result.

If you don't want to wait, or want to dig into even more advanced topics than we'll cover in this series, [I have a guide and ebook on this topic that you might enjoy](https://vanillajsguides.com/browser-storage/).