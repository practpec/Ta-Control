"use client"
import React, {useState} from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import "@/Styles/Modal.css"
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar } from '@fortawesome/free-solid-svg-icons';


function MyModal({ showModal, onClose }) {
  const [isDatePickerVisible, setDatePickerVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);

  const toggleDatePicker = () => {
    setDatePickerVisible(!isDatePickerVisible);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(selectedDate);
    onClose();
  };

  return (
    <Modal show={showModal} onHide={onClose} className="custom-modal">
      <Modal.Header>
        <button className="cerrar" onClick={onClose}>
         
        </button>
      </Modal.Header>
      <Modal.Body>
     
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Cerrar
        </Button>
        <Button variant="primary" onClick={onClose}>
          Guardar cambios
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default MyModal;
