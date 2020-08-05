import React from 'react';
import Square from './square';
import './board.css';

/**
 * props:
 *
 * 
 *
 * reference: https://reactjs.org/#a-stateful-component
 */
class Board extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			row: 20,
			col: 30
		};
	}

	redraw() {
		
	}

	reset() {
		this.setState({

		});
	}

	render() {
		let rs = [];
		for (let i = 0; i < this.state.row; i++) {
			let r = [];
			for (let j = 0; j < this.state.col; j++) {
				const t = this.props.typeOf([i, j]);
				r.push(<Square type={t} x={i} y={j}/>);
			}
			rs.push(<div className="board-row">{r}</div>);
		}

		return (
			<div className="board">{rs}</div>
		);
	}
}

export default Board;