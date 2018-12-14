import React, { Component } from 'react';
import TableActives from './components/TableActives'

class App extends Component {
	
	state = {
		actives: [{id: 0, name: 'company', value: 1000, percentage: 100}],
	}

	render() {
		const { actives } = this.state;
		return (
			<div>
				<TableActives actives={actives}></TableActives>

				<hr></hr>
				<p></p>
				<TableActives></TableActives>

			</div>

      
    );
	}
}

export default App;
