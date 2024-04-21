import React from 'react';
import ChartForm from '../components/createChart';
import ShowChartsSetting from '../components/showChartsSetting';
import { Provider } from 'react-redux';
import store from '../redux/store';

interface ChartData {
  data: number[];
  dates: string[];
  title: string;
  values: string;
  xAxisName: string;
  seriesTitle: string;
  color: string;
}

const ViewMode: React.FC = () => {
  const handleAddChart = (newChart: ChartData) => {
    console.log('New chart added:', newChart);
  };

  return (
    <>
      <Provider store={store}>
        <div style={{ marginTop: '35px' }}>
          <ChartForm onAddChart={handleAddChart} />
          <ShowChartsSetting/>
        </div>
      </Provider>
    </>
  );
};

export default ViewMode;
