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
		// press spacebar to start
		if (!this.state.dir && event.key === " ") {
			this.setState({
				dir: "a" // left (default)
			});
		} else if (this.state.dir
				&& ["w", "a", "s", "d"].includes(event.key)) {
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
		if (!this.state.dir) {
			return;
		}

		let snake = this.state.snake.slice(); // create a copy of snake
		if (!this.next().equals(this.state.food)) {
			snake.pop(); // remove tail
		}
		snake.unshift(this.next()); // add a new head

		this.setState({
			snake: snake
		});
	}

	// killSnake() {
	// 	if () {

	// 		this.setState({
	// 			dir: ""
	// 		});
	// 	}
	// }

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
		if (this.state.dir
				&& !this.state.snake[0].equals(this.state.food)) {
			return;
		}

		// a random square on the board
		let x = Math.floor(Math.random() * this.state.width);
		let y = Math.floor(Math.random() * this.state.height);

		// find another square if it's part of the snake
		while (this.isColliding([x, y], this.state.snake)) {
			x = Math.floor(Math.random() * this.state.width);
			y = Math.floor(Math.random() * this.state.height);
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