import React from 'react';
import Square from './square';

/**
 * props:
 *
 * 
 */
class Snake extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			length: 3
		};
	}

	// initialize timer
	componentDidMount() {
		this.interval = setInterval(() => {
			
		}, 100);
	}

	// clear timer when component unmounts
  	componentWillUnmount() {
    	clearInterval(this.interval);
  	}

	render() {
		return (
			<div className="snake">

			</div>
		);
	}
}

export default Snake;