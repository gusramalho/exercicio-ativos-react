import { updateTotal } from "../actions";

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
};

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
      const { assets, locked, capital } = state;

      let updatedAssets = assets.filter(asset => asset.id !== action.asset.id);
      const updatedTotal = updatedAssets.reduce((total, asset) => total + asset.value, 0);

      if (locked)
        updatedAssets = updatedAssets.map(asset => ({ ...asset, percentage: (updatedTotal !== 0) ? asset.value / updatedTotal * 100 : 0 }));

      return {
        ...state, 
        assets: updatedAssets, 
        capital: (locked) ? updatedTotal : capital,
        totalPercentage: updatedAssets.reduce((total,  asset) => total + asset.percentage, 0),
      }
    }

    case 'UPDATE_VALUE': {
      const { assets, capital, locked } = state;
      const { value, id } = action.asset;

      let updatedAssets = assets.map(asset => (asset.id === id) ? { ...asset, value } : asset);
      const updatedTotal = updatedAssets.reduce((total, asset) => total + asset.value, 0);
    
      if (locked)
        updatedAssets = updatedAssets.map(asset => ({ ...asset, percentage: asset.value / updatedTotal * 100 }));
      else
        updatedAssets = updatedAssets.map(asset => (asset.id === id) ? { ...asset, percentage: asset.value / capital * 100 } : asset);

      return {
        ...state,
        assets: updatedAssets,
        capital: (locked) ? updatedTotal : capital,
        total: updatedTotal,
        totalPercentage: updatedAssets.reduce((total,  asset) => total + asset.percentage, 0),     
      }

    }

    case 'UPDATE_PERCENTAGE': {

      const { assets, capital, locked, totalPercentage } = state;
      const { percentage, id } = action.asset;  

      let updatedAssets = assets.map(asset => (asset.id === id) ? { ...asset, percentage } : asset);

      if (!locked) 
        updatedAssets = updatedAssets.map(asset => (asset.id === id) ? { ...asset, value: percentage / 100 * capital } : asset);
      else
        updatedAssets = updatedAssets.map(asset => (asset.id === id) ? { ...asset, value: percentage * capital / totalPercentage } : asset);
      
      const updatedTotal = updatedAssets.reduce((total, asset) => total + asset.value, 0);
      const updatedTotalPercentage = updatedAssets.reduce((total, asset) => total + asset.percentage, 0);

      return {
        ...state,
        assets: updatedAssets,
        capital:  (locked) ? updatedTotal : capital,
        total: updatedTotal,
        totalPercentage: updatedTotalPercentage,
      };
      
    }

    case 'UPDATE_CAPITAL': {
      const { assets, locked } = state;
      const { capital } = action.portfolio;

      if (!locked) {
        const updatedAssets = assets.map(asset => ({ ...asset, value: asset.percentage * capital / 100 }));
    
        this.setState({
          assets: updatedAssets,
          capital,
          total: this.total(updatedAssets),
          totalPercentage: this.totalPercentage(updatedAssets),
        })
    
      } else {
    
        const updatedAssets = assets.map(asset => ({ ...asset, percentage: asset.value / capital * 100 }));
        
    
      }

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