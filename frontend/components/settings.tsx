import React from 'react';
import ChartForm from '../components/createChart';
import ShowCharts from '../components/showCharts';


interface ChartData {
  data: number[];
  dates: string[];
  title: string;
  values: string;
  xAxisName: string;
  seriesTitle: string;
  color: string;
}

const SettingsMode: React.FC = () => {
  const handleAddChart = (newChart: ChartData) => {
    console.log('New chart added:', newChart);
  };

  return (
    <>
      <ShowCharts />
      <ChartForm onAddChart={handleAddChart} />
    </>
  );
};

export default SettingsMode;
