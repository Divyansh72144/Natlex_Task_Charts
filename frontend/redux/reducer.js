/* eslint-disable no-case-declarations */

import { UPDATE_CHART_DATA ,ADD_CHART_DATA,GET_ALL_CHARTS} from './action';

const initialState = [{seriesTitle: '',
  xAxisName: '',
  values: '',
  title: '',
  data: [0],
  dates: [''],
  color: '',
}];

const chartDataReducer = (state = initialState, action) => {
  switch (action.type) {
  case UPDATE_CHART_DATA:
    const chart=state.map(i=>{
      if(i.id===action.payload.id){
        return action.payload
      }
      return i;
    })
    return chart;

  case ADD_CHART_DATA:
    return [...state.data,action.payload];
  
  case GET_ALL_CHARTS:
    return action.payload
  
  default:
    return state;
  }
};

export default chartDataReducer;