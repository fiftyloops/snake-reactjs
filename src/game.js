import React from 'react';
import Board from './board';
import './game.css';

class Game extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			// board dimensions
			height: 20,
			width:  30,

			// the snake & the direction it's moving
			snake: [],
			dir: "",

			// the food
			food: []
		};
	}

	componentDidMount() {
		// event handler for keypress event
		window.onkeypress = this.handleKeyPress;

		this.initSnake();
		// init food
		
		// init timer
		this.interval = setInterval(() => {
			// redraw only if game is running
			if (this.state.dir) {
				this.redrawSnake();
				// redraw food
			}
		}, 300);
	}

	componentDidUpdate(prevProps, prevState) {
		const snake = this.state.snake;
		const dir   = this.state.dir;

		if (!snake.equals(prevState.snake) || dir !== prevState.dir) {
			this.drawFood();
		}
	}

	// clear timer when component unmounts
  	componentWillUnmount() {
    	clearInterval(this.interval);
  	}

	handleKeyPress = (event) => {
		// start game
		if (!this.state.dir && event.key === " ") {
			this.setState({
				dir: "a" // left (default)
			});
		// reset game
		} else if (this.state.dir === "x" && event.key === " ") {
			this.initSnake();
			this.setState({
				dir: ""
			});
		} else if (this.state.dir
				&& ["w", "a", "s", "d"].includes(event.key)) {
			if (this.state.dir === "x") {
				return;
			}
			this.setState({
				dir: event.key
			});
		}
	}

	// return the type of the given square
	typeOf = ([x, y]) => {
		const food = this.state.food;
		if ([x, y].equals(food)) {
			return "food";
		}

		const snake = this.state.snake;
		for (let i = 0; i < snake.length; i++) {
			if ([x, y].equals(snake[i])) {
				if (i === 0) {
					return "snake head";
				} else {
					return "snake tail";
				}
			}
		}

		// background
		return "";
	}

	initSnake() {
		// center of the board
		const x = this.state.width  / 2;
		const y = this.state.height / 2;
		
		let snake = [];
		for (let i = 0; i < 5; i++) {
			snake.push([x + i, y]);
		}

		this.setState({
			snake: snake
		});
	}

	redrawSnake() {
		if (!this.state.dir || this.state.dir === "x") {
			return;
		}

		// create a copy of snake
		const snake = this.state.snake.slice();
		const next  = this.next();

		// ==============================
		//           snake.die
		// ==============================

		// snake is moving off the screen
		if (next[0] < 0 || next[0] >= this.state.width
				|| next[1] < 0 || next[1] >= this.state.height
				// snake is moving into itself
				|| this.isColliding(next, snake.slice(1))) {
			this.setState({
				dir: "x"
			});
		}

		// ==============================
		//           snake.eat
		// ==============================

		if (!next.equals(this.state.food)) {
			snake.pop(); // remove tail
		}
		snake.unshift(next); // add a new head

		this.setState({
			snake: snake
		});
	}

	next() {
		const x = this.state.snake[0][0];
		const y = this.state.snake[0][1];

		switch (this.state.dir) {
			case "w":
				return [x, y - 1];
			case "a":
				return [x - 1, y];
			case "s":
				return [x, y + 1];
			case "d":
				return [x + 1, y];
			default:
				return [x, y];
		}
	}

	drawFood() {
		const snake  = this.state.snake;
		const food   = this.state.food;
		const width  = this.state.width;
		const height = this.state.height;

		if (this.state.dir // snake is not eating the food
				&& !snake[0].equals(food)) {
			return;
		} else if (this.state.dir === "x") { // snake has died (rip)
			return;
		}

		// a random square on the board
		let x = Math.floor(Math.random() * width);
		let y = Math.floor(Math.random() * height);

		// find another square if it's part of the snake
		while (this.isColliding([x, y], snake)) {
			x = Math.floor(Math.random() * width);
			y = Math.floor(Math.random() * height);
		}

		this.setState({
			food: [x, y]
		});
	}

	isColliding(square, arr) {
		for (let i = 0; i < arr.length; i++) {
			if (square.equals(arr[i])) {
				return true;
			}
		}
		return false;
	}

	render() {
		return (
			<div>
				<div className="game-title">{"Snake"}</div>
				<div className="game-board">
					<Board
						row={this.state.height}
						col={this.state.width}
						typeOf={this.typeOf}
					/>
				</div>
			</div>
		);
	}
}

// eslint-disable-next-line no-extend-native
Array.prototype.equals = function(arr) {
    if (this.length !== arr.length) {
        return false;
    }

    for (let i = 0; i < this.length; i++) {
        if (this[i] instanceof Array && arr[i] instanceof Array) {
            if (!this[i].equals(arr[i]))
                return false;       
        } else if (this[i] !== arr[i]) { 
            return false;   
        }           
    }       
    return true;
}

export default Game;