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

As the game progresses our state will contain X's and O's as each player takes their turn.

The React version of the game tracks the move/turn history, and lets you revisit moves. We'll create a `historyState` array to store this info.

Finally, `currentState` will hold the current state of the board, and `turn` will track whose turn it currently is (either `X` or `O`).


Now we can go ahead and create the initial board.

Let's setup a helper function called `buildBoard()`. We'll pass the current `state` of the board (as in, whether each square has an `X`, an `O`, or nothing).

```js
var buildBoard = function (state) {
	// Our code will go here...
};
```

The React demo uses `div` elements with floats for this, but that makes it difficult for visitors using screen readers to know which row and column they're selecting. We'll use a table instead, which naturally conveys that information to the user.

To start, I'll setup a `rows` variable that opens up a `table` and `tbody`. Then, I'm going to loop through my state using `forEach()`.

If the current item is the start of a row, I want to open up a `tr`. And if it's the last in a row, I want to close it. The `id` starts at `0`, not `1`, so to make the math easier, I'll add `1` to it and divide by `3` using the modulo operator (`%`). This returns the remainder after dividing.

If that remainder is `1`, it's the first, fourth, or seventh squares, so we'll start a new row. It it's `0`, it's the third, sixth, or ninth squares so we'll close the current row.

```js
var buildBoard = function (state) {

	// Setup the board
	var rows = '<table><tbody>';

	// Create each square
	state.forEach(function (square, id) {

		// Check if it's a new row
		if ((id + 1) % 3 === 1) {
			rows += '<tr>';
		}

		// Our square content will go here...

		// Check if it's the last column in a row
		if ((id + 1) % 3 === 0) {
			rows += '</tr>';
		}

	});
	rows+= '</tbody></table><p><button id="play-again">Play Again</button></p>';

	return rows;
};
```

Inside each square, we'll create a new `td` element, and add a `button` element. The `button` will get a class of `.game-square` so that we can style it and select against it later, and a `data-id` to let us know which square it is.

We use a button here because it's automatically focusable for keyboard navigation and semantically implies that it should be clicked, tapped, or selected.

```js
var buildBoard = function (state) {

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

I also added some CSS to make the `button.game-square` elements, well, squares.

```css
.game-square {
	background: none;
	border: 1px solid #808080;
	color: #272727;
	font-size: 2em;
	font-weight: bold;
	height: 1.5em;
	width: 1.5em;
}
```

## Loading the board into the DOM

Before loading the board into the DOM, we need to set a value for the `currentState`, `history`, and `turn`.

We'll set the `currentState` to the `baseState()`, create a fresh array for `historyState`, and set the default first turn to `X`.

Then, I'll grab the `#game-board` from the DOM, and set it's `innerHTML` to the returned string from `buildBoard()`, passing in the `currentState`.

```js
var resetBoard = function () {
	currentState = baseState();
	historyState = [];
	turn = 'X';
	var board = document.querySelector('#game-board')
	if (!board) return;
	board.innerHTML = buildBoard(currentState);
};
```

## Detecting Turns

Now that we've got our board setup, we need to listen to turns and update the DOM.

Because we have several squares, I'm going use [event delegation](/checking-event-target-selectors-with-event-bubbling-in-vanilla-javascript/) to listen to all `click` events in the DOM, and filter out ones that aren't on `.game-square` elements.

```js
// Listen for selections
document.addEventListener('click', function (event) {

	// If a .game-square was clicked
	if (event.target.matches('.game-square')) {
		renderTurn(event.target);
	}

	// If #play-again was clicked
	if (event.target.matches('#play-again')) {
		resetBoard();
	}

	// If a historical button was clicked
	if (event.target.matches('[data-history]')) {
		updateBoard(event.target.getAttribute('data-history').split(','));
	}

}, false);
```