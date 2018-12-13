import React, { Component } from 'react';
import TableActives from './TableActives'

class App extends Component {
	
	state = {
		actives: [{id: 0, name: 'company', value: 1000, percentage: 100}],
	}

	render() {
		const { actives } = this.state;
		return (
		
			<TableActives actives={actives}></TableActives>

      
    );
	}
}

export default App;
