import React from 'react';
import Board from './board';
import './game.css';

class Game extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			// true if game is running
			running: false,

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
		
		// initialize timer
		this.interval = setInterval(() => {
			// redraw only if game is running
			if (this.state.running) {
				this.redrawSnake();
				// redraw food
			}
		}, 1000);
	}

	componentDidUpdate(prevProps, prevState) {
		const snake = this.state.snake;
		const food  = this.state.food;

		if (!snake.equals(prevState.snake)
				&& this.isColliding(food, snake[0])) {
			this.drawFood();
		}
	}

	// clear timer when component unmounts
  	componentWillUnmount() {
    	clearInterval(this.interval);
  	}

	handleKeyPress = (event) => {
		// press spacebar to start
		if (event.key === " ") {
			this.setState({
				running: true,
				dir: "a" // left (default)
			});
		} else if (this.state.running
				&& ["w", "a", "s", "d"].includes(event.key)) {
			this.setState({
				dir: event.key
			});
		}
	}

	// return the type of the given square
	typeOf = ([x, y]) => {
		const food = this.state.food;
		if (x === food[0] && y === food[1]) {
			return "food";
		}

		const snake = this.state.snake;
		for (let i = 0; i < snake.length; i++) {
			if (x === snake[i][0] && y === snake[i][1]) {
				return "snake";
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

		let snake = this.state.snake.slice();
		snake.pop(); // remove snake tail

		const x = snake[0][0];
		const y = snake[0][1];

		// math
		let square;
		switch (this.state.dir) {
			case "w":
				square = [x, y - 1];
				break;
			case "a":
				square = [x - 1, y];
				break;
			case "s":
				square = [x, y + 1];
				break;
			case "d":
				square = [x + 1, y];
				break;
		}
		snake.unshift(square);
		this.setState({
			snake: snake
		});
	}

	drawFood() {
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
			if (square[0] === arr[i][0] && square[1] === arr[i][1]) {
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