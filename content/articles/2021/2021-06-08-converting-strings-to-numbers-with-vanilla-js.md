---
title: "How to convert strings to numbers with vanilla JS (and back again)"
date: 2021-06-08T10:30:00-04:00
draft: false
categories:
- Code
- JavaScript
---

Today, we're going to look at three methods you can use to convert a string into a number, and one method for converting a number into a string.

Let's dig in.

## parseInt()

You can use the `parseInt()` method to convert a string into an integer (a whole number), or turn a decimal into an integer.

Pass in the string (or number) as the first argument. The second argument is called the `radix`. This is the base number used in mathematical systems. For our use, it should always be `10`.

```javascript
// returns 42
parseInt('42', 10);

// also returns 42
parseInt('42px', 10);

// ALSO also returns 42
parseInt(42.1234, 10);
```

[Here's a demo of the `parseInt()` method.](https://codepen.io/cferdinandi/pen/RwpBWMO)

# parseFloat()

You can use the `parseFloat()` method to convert a string into a point number (a number with decimal points). Pass in the string as an argument.

If the number has no decimal places, an integer is returned.

```javascript
// returns 3.14
parseFloat('3.14');

// also returns 3.14
parseFloat('3.14someRandomStuff');

// returns 3
parseFloat('3');
```

[Here's a demo of the `parseFloat()` method.](https://codepen.io/cferdinandi/pen/rNyrOvG)

## Number()

You can also use the `Number()` method to convert a string into a number.

Sometimes it returns integer. Other times it returns a float. And if you pass in a string with random text in it, you’ll get `NaN`, an acronym for _Not a Number_.

As a result of this inconsistency, I personally prefer to use `parseInt()` or `parseFloat()`. If you know the format of the number you’d like, use those instead. If you want the string to fail with `NaN` if it has other characters in it, though, `Number()` may actually be a better choice.

```javascript
// returns 123
Number('123');

// returns 12.3
Number('12.3');

// returns NaN
Number('3.14someRandomStuff');
```

[Here's a demo of the `Number()` method.](https://codepen.io/cferdinandi/pen/gOmjazV)

## Number.toString()

You can use the `Number.toString()` method to convert a number into a string.

```javascript
let pi = 3.14;
let eleven = 11;

// returns "3.14"
pi.toString();

// returns "11"
eleven.toString();
```

[Here's a demo of the `Number.toString()` method.](https://codepen.io/cferdinandi/pen/ZEejbRJ)