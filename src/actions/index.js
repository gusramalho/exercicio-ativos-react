export const addPortfolio = (portfolios, novo) => ({
  type: 'ADD_PORTFOLIO',
  portfolios,
  novo
})

export const removePortfolio = id => ({
  type: 'REMOVE_PORTFOLIO',
  id
})