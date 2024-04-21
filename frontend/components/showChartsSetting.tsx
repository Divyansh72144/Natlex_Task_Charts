import React, { useState, useEffect } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import EditChartForm from './editChart'; 
import chartServices from '../services/chartServices';
import DeleteChart from './deleteChart'; 
import { useSelector,useDispatch } from 'react-redux';
import {getAllCharts} from '../redux/action';


interface ChartData {
  id: number; 
  data: number[];
  dates: string[];
  title: string;
  values: string;
  xAxisName: string;
  seriesTitle: string;
  color: string;
}

const ShowChartsSetting: React.FC = () => {
  const [filteredCharts, setFilteredCharts] = useState<ChartData[]>([]);
  const allCharts = useSelector(state=>state);

  const dispatch = useDispatch();

  useEffect(() => {
    chartServices.getAll()
      .then(response => {
        setFilteredCharts(response.data);
        dispatch(getAllCharts(response.data))
      })
      .catch(error => {
        console.error('Error fetching charts:', error);
      });
  }, []); 


  const handleDeleteSuccess = () => {
    
    chartServices.getAll()
      .then(response => {
        dispatch(getAllCharts(allCharts));
        setFilteredCharts(response.data);
      })
      .catch(error => {
        console.error('Error fetching charts after deletion:', error);
      });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '40px' }}>
      {Array.isArray(filteredCharts) && filteredCharts.map((chartData, index) => (
        <div key={index} style={{ position: 'relative', margin: '20px', maxWidth: '100%' }}>
          <HighchartsReact
            highcharts={Highcharts}
            options={{
              title: { text: chartData.title },
              series: chartData.seriesTitle
                ? [{ data: chartData.data, name: chartData.seriesTitle ,color: chartData.color}]
                : [{ data: chartData.data ,color: chartData.color}],
              yAxis: { title: { text: chartData.values } },
              xAxis: {
                title: { text: chartData.xAxisName },
                categories: chartData.dates,
              },
              responsive: {
                rules: [{
                  condition: {
                    maxWidth: 500
                  },
                  chartOptions: {
                    legend: {
                      enabled: false
                    }
                  }
                }]
              }
            }}
          />
          <div style={{ position: 'absolute', bottom: '3px', right: '0px' }}> 
            <EditChartForm chartData={chartData} onClose={() => console.log('Edit modal closed')} />
            <DeleteChart id={chartData.id} onDeleteSuccess={handleDeleteSuccess} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default ShowChartsSetting;
