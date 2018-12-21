import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import TableActives from './components/TableActives';

import { addPortfolio } from './actions';


import './App.css';

class App extends Component {

	render() {

		const { portfolios, addPortfolio } = this.props;

		return (

			<div class="actives-app">
				{
					portfolios.map(({id, actives}) => {
						
 						return (
							<div>
								<TableActives id={id} actives={actives}></TableActives> 
								
							</div>
						)
					})
				}

				<p></p>
				<button onClick={() => addPortfolio(undefined)}>Novo portfólio</button>


			</div>

		);
	}
}


const mapStateToProps = store => ({portfolios: store.portfolios});

const mapDispatchToPropos = dispatch => bindActionCreators({addPortfolio}, dispatch);

export default connect(mapStateToProps, mapDispatchToPropos)(App);


