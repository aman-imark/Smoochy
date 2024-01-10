
import React from 'react';
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { IoChevronBack } from 'react-icons/io5';


const BackButton = ({ }) => {
  // const history = useHistory();

  // const goBack = () => {
  //   history.goBack();
  // };

  return (
    // <div className="header-back">
    //   <a href="/" className="back-button">
    //     <IoChevronBack style={{fontSize: 18, color: '#733faa', marginRight: 12}}></IoChevronBack>
    //     <span className="back-button-text">Back</span>
    //   </a>
    // </div>


    <div className="header-back">
      <Link to="/">
      <button className="back-button">
        <IoChevronBack style={{fontSize: 18, color: '#733faa', marginRight: 12}}></IoChevronBack>
        <span className="back-button-text">Back</span>
      </button>
      </Link>
    </div>

  );
};

export default BackButton;

