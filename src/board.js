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

	render() {
		let rs = [];
		for (let i = 0; i < this.props.row; i++) {
			let r = [];
			for (let j = 0; j < this.props.col; j++) {
				const t = this.props.typeOf([j, i]);
				r.push(<Square type={t} x={j} y={i}/>);
			}
			rs.push(<div className="board-row">{r}</div>);
		}

		return (
			<div className="board">{rs}</div>
		);
	}
}

export default Board;