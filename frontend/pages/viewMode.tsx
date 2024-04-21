import React from 'react';
import ShowCharts from '../components/showCharts';
import { Provider } from 'react-redux';
import store from '../redux/store';

const ViewMode: React.FC = () => {
  return (
    <>
      <Provider store={store}>
        <ShowCharts />
      </Provider>
    </>
  );
};

export default ViewMode;
