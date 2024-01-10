
import React, {useState} from 'react';

import { IoCloseSharp } from 'react-icons/io5';
import './IntroModal.css';

import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';


const DateModal = ({ onClose }) => {

  const [modalValue, setModalValue] = useState('');

  const handleChange = (event) => {
    setModalValue(event.target.value);
  };

  const handleClose = () => {
    onClose(modalValue);
  };



  const closeModal = () => {
    setIsOpen(false);
  };

  const handleDateChange = (newDate) => {
    setDate(newDate);
    setIsCalendarOpen(false);
  };





  return (
    <div className={`modal ${isOpen ? 'open' : ''}`}>
    <div className="modal-content">
      <button className="close-button" onClick={handleClose}>
        <IoCloseSharp className="close-icon" style={{color: '#333', fontSize: 30}}></IoCloseSharp>
      </button>
     
      <Calendar onChange={handleDateChange} value={date}/>
      <br />

      <input type="text" value={modalValue} onChange={handleChange} />
    

      <div>
          <button type="button" className="button-C" onClick={handleClose}>Start Chatting</button>
      </div>
      <br />

    </div>
    </div>
  );
};

export default DateModal;

