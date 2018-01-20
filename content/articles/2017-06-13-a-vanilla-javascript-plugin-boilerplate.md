---
categories:
- Code
- JavaScript
date: '2017-06-13'
url: /a-vanilla-javascript-plugin-boilerplate/
title: A vanilla JavaScript plugin boilerplate
---

Yesterday I posted a video video on [how I structure my JavaScript plugins](/how-i-structure-my-vanilla-javascript-plugins-video/). Today, I wanted to share the boilerplate I use to start all of my new JavaScript projects.

It's annotated with a bunch of comments, but if I did a bad job documenting something or have any questions, email me and let me know!

```javascript
(function (root, factory) {
    if ( typeof define === 'function' && define.amd ) {
        define([], factory(root));
    } else if ( typeof exports === 'object' ) {
        module.exports = factory(root);
    } else {
        root.myPlugin = factory(root);
    }
})(typeof global !== 'undefined' ? global : this.window || this.global, function (root) {

    'use strict';

    //
    // Variables
    //

    var window = root; // Map window to root to avoid confusion
    var publicMethods = {}; // Placeholder for public methods

    // Default settings
    var defaults = {
        turkey: true,
        mayo: false,
        bread: 'wheat',
    };


    //
    // Methods
    //

    /**
     * Merge two or more objects. Returns a new object.
     * @private
     * @param {Boolean}  deep     If true, do a deep (or recursive) merge [optional]
     * @param {Object}   objects  The objects to merge together
     * @returns {Object}          Merged values of defaults and options
     */
    var extend = function () {

        // Variables
        var extended = {};
        var deep = false;
        var i = 0;
        var length = arguments.length;

        // Check if a deep merge
        if ( Object.prototype.toString.call( arguments[0] ) === '[object Boolean]' ) {
            deep = arguments[0];
            i++;
        }

        // Merge the object into the extended object
        var merge = function (obj) {
            for ( var prop in obj ) {
                if ( Object.prototype.hasOwnProperty.call( obj, prop ) ) {
                    // If deep merge and property is an object, merge properties
                    if ( deep && Object.prototype.toString.call(obj[prop]) === '[object Object]' ) {
                        extended[prop] = extend( true, extended[prop], obj[prop] );
                    } else {
                        extended[prop] = obj[prop];
                    }
                }
            }
        };

        // Loop through each object and conduct a merge
        for ( ; i < length; i++ ) {
            var obj = arguments[i];
            merge(obj);
        }

        return extended;

    };

    /**
     * A private method
     * @private
     */
    var somePrivateMethod = function () {
        // Code goes here...
    };

    /**
     * A public method
     */
    publicMethods.doSomething = function () {
        somePrivateMethod();
        // Code goes here...
    };

    /**
     * Another public method
     */
    publicMethods.init = function ( options ) {

        // Merge user options with defaults
        var settings = extend( defaults, options || {} );

        // Listen for click events
        document.addEventListener( 'click', function (){
            // Do something...
        }, false );

        // Listen for window resize events
        window.addEventListener( 'resize',  function (){
            // Do something...
        }, false );

        // Code goes here...
        //
    };


    //
    // Public APIs
    //

    return publicMethods;

});
```

This is also [on GitHub](https://gist.github.com/cferdinandi/57c96241114fc6e8ce6cd2c5bfeeb346).