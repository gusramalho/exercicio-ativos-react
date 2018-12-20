let portId = 0;

const initialState = [
  {
    id: 0,
    actives: [
      { id: 0, name: 'company1', value: 1000, percentage: 50 },
      { id: 1, name: 'company2', value: 1000, percentage: 50 },
    ],
  }
]

const portfolios = (state = initialState, action) => {
  switch(action.type){
    case 'ADD_PORTFOLIO': {
      console.log('add portfolio');
      return [...state, {id: ++portId, actives: undefined}];
    }
      
    case 'REMOVE_PORTFOLIO':{
      console.log('remove portfolio');
     return state.filter(portfolio => (portfolio.id !== action.id));
      
    }
    default:
      return state;
  }

}

export default portfolios;