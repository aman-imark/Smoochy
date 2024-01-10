
import React, {useState} from 'react';

import { IoChevronBack, IoAdd } from 'react-icons/io5';

import './IdentifyModal.css';

import gender_json from '../../data/gender.json';


const IdentifyModal = ({ isModal_Identify, onClose }) => {
  const [gender, setGender] = useState('');
  const [selectedButton_gender, setSelectedButton_gender] = useState(null);

  const gender_secondPhase = gender_json.slice(2);



  const handleButtonClick_gender = (buttonId, buttonName) => {
    console.log(buttonId, buttonName)
    if (selectedButton_gender === buttonId) {
      setSelectedButton_gender(null);
      setGender('');
    } else {
      setSelectedButton_gender(buttonId);
      setGender(buttonName);
    }
 
  };


  const handelCloseAndSave = () => {
      console.log(gender);
      onClose(gender);
  }

  

  if (!isModal_Identify) {
    return null;
  }



  
  return (
    // <div className={`modal ${isOpen ? 'open' : ''}`}   style={{backgroundColor: '#fff'}}>
    <div className={`modal ${isModal_Identify ? 'open' : ''}`}  style={{backgroundColor: ''}}>
    <div className="modal-content" style={{overflowY: 'unset'}}>
      <div className="header-back2">
        <button className="back-button" onClick={() => onClose('')}>
          <IoChevronBack style={{fontSize: 18, color: '#733faa', marginRight: 12}}></IoChevronBack>
          <span className="back-button-text">Back</span>
        </button>
      </div>


      <div className="main-container">
        <div className="main-content">
        <br />
        <h2>How do you identify?</h2>

          <br />
          <div style={{display: 'flex', justifyContent: 'space-evenly', flexDirection: 'column'}}>
            {gender_secondPhase.map((button) => (
              <button className="selectableButton"
                key={button.id} type="button"
                onClick={() => handleButtonClick_gender(button.id, button.name)}
                style={{ backgroundColor: selectedButton_gender === button.id ? '#733faa' : '#F4F4F4', 
                color: selectedButton_gender === button.id ? '#ffffff' : '#733faa', fontWeight: 500, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>{button.name}</button>
            ))}
          </div>


          <div style={{marginBlockEnd: 40}}>
            <h5>Tell us if we’re missing something > </h5>
          </div>
   
          <div className="footer">
            <button className="button-A" type="button" onClick={handelCloseAndSave}>Save and Close</button>
          </div>
        </div>
      </div>

    </div>
    </div>
  );
};

export default IdentifyModal;

