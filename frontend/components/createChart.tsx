import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { updateChartData, addChartData } from '../redux/action';
import chartServices from '../services/chartServices';
import {useDispatch } from 'react-redux';


interface ChartData {
  data: number[];
  dates: string[];
  title: string;
  values: string;
  xAxisName: string;
  seriesTitle: string;
  color: string;
}

interface ChartFormProps {
  onAddChart: (newChart: ChartData) => void;
}

const ChartForm: React.FC<ChartFormProps> = ({ onAddChart }) => {
  
  const [show, setShow] = useState(false);


  const [chartDataLocal,setChartDataLocal] = useState<ChartData>({
    seriesTitle: '',
    xAxisName: '',
    values: '',
    title: '',
    data: [0],
    dates: [''],
    color: '',
  })


  
  const dispatch = useDispatch();

  const handleClose = () => setShow(false);
  const handleShow = () => {
    setShow(true);
    dispatch(updateChartData({
      seriesTitle: '',
      xAxisName: '',
      values: '',
      title: '',
      data: [0],
      dates: [''],
      color: '',
    }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index:number) => {
    const newData = [...(chartDataLocal as ChartData).data];
    newData[index] = parseInt(e.target.value);
    setChartDataLocal({ ...(chartDataLocal as ChartData), data: newData });
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const newDates = [...(chartDataLocal as ChartData).dates];
    newDates[index] = e.target.value;
    setChartDataLocal({ ...(chartDataLocal as ChartData), dates: newDates });
  };

  const handleAddChart = () => {
    chartServices.create(chartDataLocal)
      .then(response => {
        dispatch(addChartData(chartDataLocal));
        onAddChart(response.data);
      })
      .catch(error => {
        console.error('Error adding chart:', error);
      });
    handleClose();
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChartDataLocal({...(chartDataLocal as ChartData), title: e.target.value });
  };

  const handlexAxisNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChartDataLocal({...(chartDataLocal as ChartData), xAxisName: e.target.value });
  };

  const handleValuesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChartDataLocal({...(chartDataLocal as ChartData), values: e.target.value });
  };

  const handleSeriesTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChartDataLocal({...(chartDataLocal as ChartData), seriesTitle: e.target.value });
  };

  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChartDataLocal({...(chartDataLocal as ChartData), color: e.target.value });
  };

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Add Chart
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Chart</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="seriesTitle">
              <Form.Label>Series Title</Form.Label>
              <Form.Control
                type="text"
                value={(chartDataLocal as ChartData).seriesTitle}
                onChange={handleSeriesTitleChange}
              />
            </Form.Group>
            <Form.Group controlId="xAxisTitle">
              <Form.Label>X Axis title</Form.Label>
              <Form.Control
                type="text"
                value={(chartDataLocal as ChartData).xAxisName}
                onChange={handlexAxisNameChange}
              />
            </Form.Group>
            <Form.Group controlId="values">
              <Form.Label>Values</Form.Label>
              <Form.Control
                type="string"
                value={(chartDataLocal as ChartData).values}
                onChange={handleValuesChange}
              />
            </Form.Group>
            <Form.Group controlId="title">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                value={(chartDataLocal as ChartData).title}
                onChange={handleTitleChange}
              />
            </Form.Group>
            <Form.Group controlId="color">
              <Form.Label>Line Color</Form.Label>
              <Form.Control
                type="color"
                value={(chartDataLocal as ChartData).color}
                onChange={handleColorChange}
              />
            </Form.Group>
            <Form.Group controlId="data1">
              <Form.Label>Data 1</Form.Label>
              <InputGroup className="mb-3">
                <InputGroup.Text>$</InputGroup.Text>
                <Form.Control
                  type="number"
                  value={(chartDataLocal as ChartData).data[0] === undefined ? '' : (chartDataLocal as ChartData).data[0].toString()}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e, 0)}
                />
                <InputGroup.Text>.00</InputGroup.Text>
              </InputGroup>
              <Form.Label>Date 1</Form.Label>
              <InputGroup className="mb-3">
                <InputGroup.Text>Date</InputGroup.Text>
                <Form.Control
                  type="date"
                  value={(chartDataLocal as ChartData).dates[0] === undefined ? '' :(chartDataLocal as ChartData).dates[0]}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleDateChange(e, 0)}
                />
              </InputGroup>
            </Form.Group>
            <Form.Group controlId="data2">
              <Form.Label>Data 2</Form.Label>
              <InputGroup className="mb-3">
                <InputGroup.Text>$</InputGroup.Text>
                <Form.Control
                  type="number"
                  value={(chartDataLocal as ChartData).data[1] === undefined ? '' : (chartDataLocal as ChartData).data[1].toString()}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>)=> handleChange(e, 1)}
                />
                <InputGroup.Text>.00</InputGroup.Text>
              </InputGroup>
              <Form.Label>Date 2</Form.Label>
              <InputGroup className="mb-3">
                <InputGroup.Text>Date</InputGroup.Text>
                <Form.Control
                  type="date"
                  value={(chartDataLocal as ChartData).dates[1] === undefined ? '' : (chartDataLocal as ChartData).dates[1]}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleDateChange(e, 1)}
                />
              </InputGroup>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleAddChart}>
            Add Chart
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ChartForm;
