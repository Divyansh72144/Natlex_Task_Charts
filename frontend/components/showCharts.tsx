import React, { useState, useEffect } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import DateRangeFilter from './rangeFilter';
import chartServices from '../services/chartServices';
import { useSelector, useDispatch } from 'react-redux';
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

const ShowCharts: React.FC = () => {

  const [filteredCharts, setFilteredCharts] = useState<ChartData[]>([]);
  const allCharts = useSelector(state=>state);

  const dispatch = useDispatch();

  useEffect(() => {
    chartServices.getAll()
      .then(response => {
        setFilteredCharts(response.data)
        dispatch(getAllCharts(response.data))
      })
      .catch(error => {
        console.error('Error fetching charts:', error);
      });
  }, []);

  const handleDateRangeChange = (startDate: Date|null, endDate: Date|null) => {
    if (startDate && endDate) {
      const filtered = allCharts.filter((chart: ChartData) => {
        const filteredData = chart.data.filter((_, index: number) => {
          const date = new Date(chart.dates[index]);
          return date >= startDate && date <= endDate;
        });

        return filteredData.length > 0;
      });
      setFilteredCharts(filtered);
    } else {
      setFilteredCharts(allCharts as ChartData[]);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '40px' }}>
      {allCharts.length > 0 && <DateRangeFilter onDateRangeChange={handleDateRangeChange} />}
      {Array.isArray(filteredCharts) && filteredCharts.map((chartData, index) => (
        <div key={index} style={{ margin: '20px', maxWidth: '100%' }}>
          <HighchartsReact
            highcharts={Highcharts}
            options={{
              title: { text: chartData.title },
              series: chartData.seriesTitle
                ? [{ data: chartData.data, name: chartData.seriesTitle , color: chartData.color}]
                : [{ data: chartData.data , color: chartData.color}],
                
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
        </div>
      ))}
    </div>
  );
};

export default ShowCharts;
