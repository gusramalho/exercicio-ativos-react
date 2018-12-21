import React from 'react'
import { connect } from 'react-redux'
import {
  addPortfolio, removePortfolio, addAsset, removeAsset, updateValue,
  updatePercentage, updateTotal, updateCapital, updateTotalPercent,
  unlockPortfolio, updateColor,
} from '../actions';
import App from '../App'


const mapStateToProps = state => ({
  portfolios: state.portfolios,
})

const mapDispatchToProps = dispatch => ({
  addPortfolio: () => dispatch(addPortfolio()),
  removePortfolio: id => dispatch(removePortfolio(id)),
  addAsset: id => dispatch(addAsset(id)),
  removeAsset: (portfolio_id, asset_id) => dispatch(removeAsset({id: portfolio_id}, {id: asset_id})),
  updateValue: (portfolio_id, asset_id, asset_value) => dispatch(updateValue({id: portfolio_id}, {id: asset_id, value: asset_value})),
  updatePercentage: (portfolio_id, asset_id, asset_percentage) => dispatch(updatePercentage({id: portfolio_id}, {id: asset_id, percentage: asset_percentage})),
  updateCapital: (id, capital) => dispatch(updateCapital({id, capital})),
  updateColor: (id, color) => dispatch(updateColor({id, color})),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);