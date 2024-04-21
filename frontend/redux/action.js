export const UPDATE_ALL_CHARTS = 'UPDATE_ALL_CHARTS';
export const UPDATE_CHART_DATA = 'UPDATE_CHART_DATA';
export const UPDATE_FILTERED_CHARTS = 'UPDATE_FILTERED_CHARTS';
export const ADD_CHART_DATA='ADD_CHART_DATA';
export const GET_ALL_CHARTS='GET_ALL_CHARTS'

export const updateAllCharts = (charts) => ({
  type: UPDATE_ALL_CHARTS,
  payload: charts,
});

export const updateChartData = (data) => ({
  type: UPDATE_CHART_DATA,
  payload: data,
});

export const updateFilteredCharts = (filteredCharts) => ({
  type: UPDATE_FILTERED_CHARTS,
  payload: filteredCharts,
});

export const addChartData = (charts) => ({
  type: ADD_CHART_DATA,
  payload: charts,
});

export const getAllCharts=(charts)=>({
  type: GET_ALL_CHARTS,
  payload:charts
});
