---
title: "How to recreate the React tic-tac-toe game with vanilla JS"
date: 2018-06-08T10:30:00-04:00
draft: true
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
---

Last week, I kicked off a series where I [recreate popular framework demos with vanilla JS](/javascript-framework-demos-in-vanilla-js/), starting with VueJS.

This week, we're going to build [React's Tic-Tac-Toe game](https://reactjs.org/tutorial/tutorial.html#what-were-building). And we're going to do with fewer lines of code and zero dependencies, and make it more accessible.

Let's get started.

## The Starting Markup

The starting markup for this one is an empty `div` with an ID of `#game-board`. We're going to use JavaScript to build the rest of the markup and inject it into that container.

```html
<div id="game-board">Loading...</div>
```

## Building the Board

The first thing we need to do is setup some state-related variables

```js
var baseState = function () {
	return [null, null, null, null, null, null, null, null, null];
};
var historyState = [];
var currentState, turn;
```

The `baseState` variable is a function that returns the default "state of the board". I used a function here to [make this immutable](/how-to-handle-immutability-in-javascript/). It will always return a fresh copy.

The React version of the game tracks the move/turn history, and lets you revisit moves. We'll create a `historyState` array to store this info.

Finally, `currentState` will hold the current state of the board, and `turn` will track whose turn it currently is (either `X` or `O`).


Now we can go ahead and create the initial board.

The React demo uses `div` elements with floats for this, but that makes it difficult for visitors using screen readers to know which row and column they're selecting. We'll use a table instead, which naturally conveys that information to the user.

```js
var buildBoard = function () {

	// Setup the board
	var rows = '<table><tbody>';

	// Create each square
	state.forEach(function (square, id) {

		// Check if it's a new row
		if ((id + 1) % 3 === 1) {
			rows += '<tr>';
		}
		rows += '<td><button class="game-square" data-id="' + id + '"></button></td>';

		// Check if it's the last column in a row
		if ((id + 1) % 3 === 0) {
			rows += '</tr>';
		}

	});
	rows+= '</tbody></table><p><button id="play-again">Play Again</button></p>';

	return rows;
};
```