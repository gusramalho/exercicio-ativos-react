const initialPortfolio = {
  id: 0,
  nextAsset: 0,
  assets: [],
  capital: 0,
  total: 0,
  totalPercentage: 0,
  locked: true,
  color: '#1c1c1c',
}



const initialState = [
  {
    ...initialPortfolio,
    
    assets: [
      { id: 0, name: 'company1', value: 1000, percentage: 50 },
      { id: 1, name: 'company2', value: 1000, percentage: 50 },
    ],
    nextAsset: 1,
    total: 2000,
    capital: 2000,
    totalPercentage: 100,
    locked: false,
   
  },
]



const initialAsset = {
  id: 0,
  name: 'ativo',
  value: 0,
  percentage: 0,
}

const asset = (state = initialAsset, action) => {
  switch (action.type) {
    case 'ADD_ASSET': {
      return { ...state };
    }
    case 'UPDATE_VALUE': {
      return { ...state, value: action.asset.value };
    }
    case 'UPDATE_PERCENTAGE': {
      return { ...state, percentage: action.asset.percentage };
    }
    default:
      return state;
  }
}

const portfolio = (state = initialPortfolio, action) => {

  switch (action.type) {
    case 'ADD_PORTFOLIO': {
      return { ...state };
    }
    case 'ADD_ASSET': {
      return {
        ...state,
        assets: [...state.assets, asset({ ...initialAsset, id: state.nextAsset + 1 }, action)],
        nextAsset: state.nextAsset + 1,
      }
    }
    case 'REMOVE_ASSET': {
      const { assets } = state;
      return { ...state, assets: assets.filter(asset => asset.id !== action.asset.id) };
      //TODO: aplicar as regras de negocio 
    }
    case 'UPDATE_VALUE': {
      const { assets } = state;
      return { ...state, assets: assets.map(a => (a.id === action.asset.id) ? asset(a, action) : a) };
      //TODO: aplicar as regras de negocio
    }
    case 'UPDATE_PERCENTAGE': {
      const { assets } = state;
      return { ...state, assets: assets.map(a => (a.id === action.asset.id) ? asset(a, action) : a) };
      //TODO: aplicar as regras de negocio
    }
    case 'UPDATE_TOTAL': {
      const { assets } = state;
      return { ...state, total: action.portfolio.total }
      //TODO: aplicar as regras de negocio
    }
    case 'UPDATE_CAPITAL': {
      const { assets } = state;
      return { ...state, capital: action.portfolio.capital }
      //TODO: aplicar as regras de negocio
    }
    case 'UPDATE_TOTAL_PERCENT': {
      const { assets } = state;
      return { ...state, total: action.portfolio.totalPercentage }
      //TODO: aplicar as regras de negocio      
    }
    case 'UNLOCK_PORTFOLIO': {
      return { ...state, locked: false }
    }
    case 'UPDATE_COLOR': {
      return { ...state, color: action.portfolio.color }
    }
    default:
      return state;

  }

}

const portfolios = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_PORTFOLIO': {
      return [...state, portfolio({...initialPortfolio, id: action.id}, action)];
    }
    case 'REMOVE_PORTFOLIO': {
      return state.filter(portfolio => (portfolio.id !== action.id));
    }
    case 'ADD_ASSET': {
      return state.map(p => p.id === action.id ? portfolio(p, action) : p);
    }

    case 'REMOVE_ASSET':

    case 'UPDATE_VALUE':

    case 'UPDATE_PERCENTAGE':

    case 'UPDATE_CAPITAL':

    case 'UPDATE_COLOR': {
      return state.map(p => (p.id === action.portfolio.id) ? portfolio(p, action) : p);
    }
    default:
      return state;

  }
}

export default portfolios;