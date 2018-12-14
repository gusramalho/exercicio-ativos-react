import React, { Component } from 'react';
import TableActives from './components/TableActives'

import './App.css';
class App extends Component {
	

	state = {

		portfolios: [
									[
										{id: 0, name: 'company', value: 1000, percentage: 50},
									  {id: 1, name: 'company', value: 1000, percentage: 50},
									],
								]
	}

	handleNewPortfolio = () => this.setState({portfolios: [...this.state.portfolios, undefined]});
	

	render() {
		const { portfolios } = this.state;
		return (
			<div class="actives-app">
				{
					portfolios.map((actives) => {
						return (
							<div>
								 <hr></hr>
								 <TableActives actives={actives}></TableActives>
							
							</div>
						)
					})
				}
				

				<hr></hr>
				<p></p>
				<button onClick={this.handleNewPortfolio}>Novo portfólio</button>

			</div>

      
    );
	}
}

export default App;
