let nextPortfolio = 0;

export const addPortfolio = () => ({
  type: 'ADD_PORTFOLIO',
  portfolio: { id: nextPortfolio++ },
});

export const removePortfolio = id => ({
  type: 'REMOVE_PORTFOLIO',
  id,
});

export const addActive = portfolio => ({
  type: 'ADD_ACTIVE',
  portfolio,
});

export const removeActive = (portfolio, active) => ({
  type: 'REMOVE_ACTIVE',
  portfolio,
  active,
});

export const updateValue = (portfolio, active) => ({
  type: 'UPDATE_VALUE',
  portfolio,
  active,
});

export const updatePercentage = (portfolio, active) => ({
  type: 'UPDATE_PERCENTAGE',
  portfolio,
  active,
});

export const updateTotal = portfolio => ({
  type: 'UPDATE_TOTAL',
  portfolio,

});

export const updateCapital = portfolio => ({
  type: 'UPDATE_CAPITAL',
  portfolio,
});

export const updateTotalPercent = portfolio => ({
  type: 'UPDATE_TOTAL_PERCENT',
  portfolio,
});

export const unlockPortfolio = portfolio => ({
  type: 'UNLOCK_PORTFOLIO',
  portfolio,
});

export const updateColor = portfolio => ({
  type: 'UPDATE_COLOR',
  portfolio,
});
