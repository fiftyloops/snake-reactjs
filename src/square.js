import React from 'react';
import './square.css';

/**
 * props:
 *
 * type - 
 * x    - 
 * y    - 
 */
class Square extends React.Component {
	render() {
		return (
			<button className={'square ' + this.props.type}></button>
		);
	}
}

export default Square;