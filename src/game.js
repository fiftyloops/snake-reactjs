import React from 'react';
import Board from './board';
import Snake from './snake';
import Food  from './food';

class Game extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			running: false,

			snake: [[0, 0], [0, 1], [0, 2]],
			dir: "a",

			food: this.redrawFood
		};
	}

	componentDidMount() {
		// event handler for keypress event
		window.onkeypress = this.handleKeyPress;
	}

	handleKeyPress = (event) => {
		// press spacebar to start
		if (event.key === " ") {

			this.setState({
				running: true
			});

		} else if (["w", "a", "s", "d"].includes(event.key)) {

			this.setState({
				
			});
		}
	}

	// 
	typeOf = ([x, y]) => {
		// 
		if (x === this.state.food[0] && y === this.state.food[1]) {
			return "food";
		}

		//
		for (let i = 0; i < this.state.snake.length; i++) {
			if (x === this.state.snake[i][0]
					&& y === this.state.snake[i][1]) {
				return "snake";
			}
		}

		// else
		return "";
	}

	redrawSnake() {

	}

	redrawFood() {

	}

	//
	checkCollision() {
		
	}

	render() {
		return (
			<div className="game">
				<Board
					row={this.state.height}
					col={this.state.width}
					typeOf={this.typeOf}
				/>
				<Food
					coords={this.state.food}
					avoid={this.state.snake}
					update={this.redrawFood}
				/>
				<Snake
					coords={this.state.snake}
					dir={this.state.dir}
					update={this.redrawSnake}
				/>
			</div>
		);
	}
}

export default Game;