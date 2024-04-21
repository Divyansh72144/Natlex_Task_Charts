import {useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import DatePicker from 'react-datepicker'; 
import 'react-datepicker/dist/react-datepicker.css'; 
interface DateRangeFilterProps {
  onDateRangeChange: (startDate: Date | null, endDate: Date | null) => void; 
}

const DateRangeFilter: React.FC<DateRangeFilterProps> = ({ onDateRangeChange }) => {
  const [showModal, setShowModal] = useState(false);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  const handleCloseModal = () => setShowModal(false);

  const handleApplyFilter = () => {
    if (startDate && endDate) {
      onDateRangeChange(startDate, endDate);
    }
    handleCloseModal();
  };

  const handleClearFilter = () => {
    setStartDate(null);
    setEndDate(null);
    onDateRangeChange(null,null);
    handleCloseModal();
  };


  return (
    <>
      <Button variant="primary" onClick={() => setShowModal(true)}>Date Range Filter</Button>
      
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Date Range Filter</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="startDate">
              <Form.Label>Start Date:</Form.Label>
              <DatePicker selected={startDate} onChange={(date: React.SetStateAction<Date | null>) => setStartDate(date)} />
            </Form.Group>
            <Form.Group controlId="endDate">
              <Form.Label>End Date:</Form.Label>
              <DatePicker selected={endDate} onChange={(date: React.SetStateAction<Date | null>) => setEndDate(date)} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClearFilter}>Clear Filter</Button>
          <Button variant="secondary" onClick={handleCloseModal}>Close</Button>
          <Button variant="primary" onClick={handleApplyFilter}>Apply</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default DateRangeFilter;
