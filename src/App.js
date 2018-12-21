import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Portfolio from './components/Portfolio/';

import { addPortfolio } from './actions';

import './App.css';

class App extends Component {

	render() {

		const { portfolios, addPortfolio, removePortfolio, addAsset } = this.props;

		return (

			<div class="assets-app">
				{
					portfolios.map(({id, assets}) => {
						
 						return (
							<div>
								<Portfolio 
									id={id} 
									assets={assets}
									removePortfolio={() => removePortfolio(id)}
									addAsset={() => addAsset(id)}
								/>
								
							</div>
						)
					})
				}

				<p></p>
				<button onClick={addPortfolio}>Novo portfólio</button>


			</div>

		);
	}
}


export default App;


