let nextPortfolio = 0;

export const addPortfolio = () => ({
  type: 'ADD_PORTFOLIO',
  portfolio: { id: nextPortfolio++ },
});

export const removePortfolio = id => ({
  type: 'REMOVE_PORTFOLIO',
  id,
});

export const addAsset = portfolio => ({
  type: 'ADD_ASSET',
  portfolio,
});

export const removeAsset = (portfolio, asset) => ({
  type: 'REMOVE_ASSET',
  portfolio,
  asset,
});

export const updateValue = (portfolio, asset) => ({
  type: 'UPDATE_VALUE',
  portfolio,
  asset,
});

export const updatePercentage = (portfolio, asset) => ({
  type: 'UPDATE_PERCENTAGE',
  portfolio,
  asset,
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
