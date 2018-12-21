import React, { Component } from 'react';

import Portfolio from './components/Portfolio/';


import './App.css';

class App extends Component {

	render() {

		const { portfolios, addPortfolio, removePortfolio, addAsset, removeAsset, updateValue, updatePercentage,
						updateCapital, updateColor} = this.props;

		return (

			<div class="assets-app">
				{
					portfolios.map(({id, assets, capital, total, totalPercentage, color}) => {

 						return (
							<div>
								<Portfolio 
									id={id} 
									assets={assets}
									capital={capital}
									total={total}
									color={color}
									totalPercentage={totalPercentage}
									removePortfolio={() => removePortfolio(id)}
									addAsset={() => addAsset(id)}
									removeAsset={asset_id => removeAsset(id, asset_id)}
									updateValue={(asset_id, value) => updateValue(id, asset_id, value)}
									updatePercentage={(asset_id, percentage) => updatePercentage(id, asset_id, percentage)}
									updateCapital={capital => updateCapital(id, capital)}
									updateColor={color => updateColor(id, color)}

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


