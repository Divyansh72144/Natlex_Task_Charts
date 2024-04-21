import {useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { FormControlElement } from 'react-bootstrap';
import chartServices from '../services/chartServices';
import { useDispatch, useSelector } from 'react-redux';
import { updateChartData} from '../redux/action';


interface ChartData {
  data: number[];
  dates: string[];
  title: string;
  values: string;
  xAxisName: string;
  seriesTitle: string;
  id: string;
  color: string;
}

interface Props {
  chartData: ChartData;
}

const EditChartForm: React.FC<Props> = ({ chartData }) => {
  const [show, setShow] = useState(false);

  const [editedChartDataLocal,setEditedChartDataLocal] = useState<ChartData>(chartData)

  
  const dispatch = useDispatch();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleChange = (e: React.ChangeEvent<FormControlElement>, index: number) => {
    const newData = [...(editedChartDataLocal as ChartData).data];
    newData[index] = parseInt(e.target.value);
    setEditedChartDataLocal({ ...(editedChartDataLocal as ChartData), data: newData });
  };

  const handleDateChange = (e: React.ChangeEvent<FormControlElement>, index: number) => {
    const newDates = [...(editedChartDataLocal as ChartData).dates];
    newDates[index] = e.target.value;
    setEditedChartDataLocal({ ...(editedChartDataLocal as ChartData), dates: newDates });
  };

  const handleEditChart = () => {
    chartServices.update(editedChartDataLocal.id, editedChartDataLocal)
      .then(response => {
        dispatch(updateChartData(editedChartDataLocal));
        handleClose();
      })
      .catch(error => {
        console.error('Error editing chart:', error);
      });
  };



  const handleTitleChange = (e: React.ChangeEvent<FormControlElement>) => {
    dispatch(updateChartData({ ...(editedChartDataLocal as ChartData), title: e.target.value }));
    setEditedChartDataLocal({ ...(editedChartDataLocal as ChartData), title: e.target.value });
  
  };

  const handlexAxisNameChange = (e: React.ChangeEvent<FormControlElement>) => {
    setEditedChartDataLocal({ ...(editedChartDataLocal as ChartData),  xAxisName: e.target.value });
  };

  const handleValuesChange = (e: React.ChangeEvent<FormControlElement>) => {
    setEditedChartDataLocal({ ...(editedChartDataLocal as ChartData), values: e.target.value });
  };

  const handleSeriesTitleChange = (e: React.ChangeEvent<FormControlElement>) => {
    setEditedChartDataLocal({ ...(editedChartDataLocal as ChartData), seriesTitle: e.target.value });
  };

  const handleColorChange = (e: React.ChangeEvent<FormControlElement>) => {
    setEditedChartDataLocal({ ...(editedChartDataLocal as ChartData), color:e.target.value });
  };
  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Edit Chart
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Chart</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="seriesTitle">
              <Form.Label>Series Title</Form.Label>
              <Form.Control
                type="text"
                value={(editedChartDataLocal as ChartData).seriesTitle}
                onChange={handleSeriesTitleChange}
              />
            </Form.Group>
            <Form.Group controlId="xAxisTitle">
              <Form.Label>X Axis title</Form.Label>
              <Form.Control
                type="text"
                value={(editedChartDataLocal as ChartData).xAxisName}
                onChange={handlexAxisNameChange}
              />
            </Form.Group>
            <Form.Group controlId="values">
              <Form.Label>Values</Form.Label>
              <Form.Control
                type="string"
                value={(editedChartDataLocal as ChartData).values}
                onChange={handleValuesChange}
              />
            </Form.Group>
            <Form.Group controlId="title">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                value={(editedChartDataLocal as ChartData).title}
                onChange={handleTitleChange}
              />
            </Form.Group>
            <Form.Group controlId="color">
              <Form.Label>Line Color</Form.Label>
              <Form.Control
                type="color"
                value={(editedChartDataLocal as ChartData).color}
                onChange={handleColorChange}
              />
            </Form.Group>
            <Form.Group controlId="data1">
              <Form.Label>Data 1</Form.Label>
              <InputGroup className="mb-3">
                <InputGroup.Text>$</InputGroup.Text>
                <Form.Control
                  type="number"
                  value={(editedChartDataLocal as ChartData).data[0] === undefined ? '' : (editedChartDataLocal as ChartData).data[0].toString()}
                  onChange={(e) => handleChange(e, 0)}
                />
                <InputGroup.Text>.00</InputGroup.Text>
              </InputGroup>
              <Form.Label>Date 1</Form.Label>
              <InputGroup className="mb-3">
                <InputGroup.Text>Date</InputGroup.Text>
                <Form.Control
                  type="date"
                  value={(editedChartDataLocal as ChartData).dates[0] === undefined ? '' : (editedChartDataLocal as ChartData).dates[0]}
                  onChange={(e) => handleDateChange(e, 0)}
                />
              </InputGroup>
            </Form.Group>
            <Form.Group controlId="data2">
              <Form.Label>Data 2</Form.Label>
              <InputGroup className="mb-3">
                <InputGroup.Text>$</InputGroup.Text>
                <Form.Control
                  type="number"
                  value={(editedChartDataLocal as ChartData).data[1] === undefined ? '' : (editedChartDataLocal as ChartData).data[1].toString()}
                  onChange={(e) => handleChange(e, 1)}
                />
                <InputGroup.Text>.00</InputGroup.Text>
              </InputGroup>
              <Form.Label>Date 2</Form.Label>
              <InputGroup className="mb-3">
                <InputGroup.Text>Date</InputGroup.Text>
                <Form.Control
                  type="date"
                  value={(editedChartDataLocal as ChartData).dates[1] === undefined ? '' : (editedChartDataLocal as ChartData).dates[1]}
                  onChange={(e) => handleDateChange(e, 1)}
                />
              </InputGroup>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleEditChart}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default EditChartForm;
