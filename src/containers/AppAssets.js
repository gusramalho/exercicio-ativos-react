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
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);