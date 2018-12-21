const initialState = [
  {
    ...initialPortfolio,
    actives: [
      { id: 0, name: 'company1', value: 1000, percentage: 50 },
      { id: 1, name: 'company2', value: 1000, percentage: 50 },
    ],
    total: 2000,
    capital: 2000,
    totalPercentage: 100,
    locked: false,
  },
]

const initialPortfolio = {
  id: 0,
  nextActive: 0,
  actives: [],
  capital: 0,
  total: 0,
  totalPercentage: 0,
  locked: true,
  color: '#1c1c1c',
}

const initialActive = {
  id: 0,
  name: 'ativo',
  value: 0,
  percentage: 0,
}

const active = (state = initialActive, action) => {
  switch (action.type) {
    case 'ADD_ACTIVE': {
      return { ...state };
    }
    case 'UPDATE_VALUE': {
      return { ...state, value: action.active.value };
    }
    case 'UPDATE_PERCENTAGE': {
      return { ...state, percentage: action.active.percentage };
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
    case 'ADD_ACTIVE': {
      return {
        ...state,
        actives: [...state.actives, active({ ...initialActive, id: state.nextActive + 1 }, action)],
        nextActive: state.nextActive + 1,
      }
    }
    case 'REMOVE_ACTIVE': {
      const { actives } = state;
      return { ...state, actives: actives.filter(active => active.id !== action.active.id) };
      //TODO: aplicar as regras de negocio 
    }
    case 'UPDATE_VALUE': {
      const { actives } = state;
      return { ...state, actives: actives.map(a => (a.id === action.active.id) ? active(a, action) : a) };
      //TODO: aplicar as regras de negocio
    }
    case 'UPDATE_PERCENTAGE': {
      const { actives } = state;
      return { ...state, actives: actives.map(a => (a.id === action.active.id) ? active(a, action) : a) };
      //TODO: aplicar as regras de negocio
    }
    case 'UPDATE_TOTAL': {
      const { actives } = state;
      return { ...state, total: action.portfolio.total }
      //TODO: aplicar as regras de negocio
    }
    case 'UPDATE_CAPITAL': {
      const { actives } = state;
      return { ...state, total: action.portfolio.capital }
      //TODO: aplicar as regras de negocio
    }
    case 'UPDATE_TOTAL_PERCENT': {
      const { actives } = state;
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
      return [...state, portfolio(action.portfolio, action)];
    }
    case 'REMOVE_PORTFOLIO': {
      return state.filter(portfolio => (portfolio.id !== action.id));
    }
    case 'ADD_ACTIVE':

    case 'REMOVE_ACTIVE':

    case 'UPDATE_VALUE':

    case 'UPDATE_PERCENTAGE':

    case 'UPDATE_TOTAL':

    case 'UPDATE_CAPITAL':

    case 'UPDATE_TOTAL_PERCENT':

    case 'UNLOCK_PORTFOLIO':

    case 'UPDATE_COLOR': {
      return state.map(p => (p.id === action.portfolio.id) ? portfolio(p, action) : p);
    }
    default:
      return state;

  }
}

export default portfolios;