import React from 'react';

import { Link } from 'react-router-dom';

import { BsDot } from "react-icons/bs";
import { TfiFaceSad } from "react-icons/tfi";

import sadEmoji from '../../assets/PNG/sad.png';



const PhotoVerification = () => {
  return (
    <div className="main-container">
      <div className="main-content">
      <div className="image-container">
        {/* <img src={logoTagline} alt="SVG Image" className="centered-image" /> */}
      </div>

      <div className="text-wrapper">
        <h2>Your photo verification <br /> 
        has failed</h2>

         <div>
          <img src={sadEmoji} className="centered-image" />
         </div>

         <p>Remember, to verify yourself successfully:</p>

         <p style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
          <BsDot style={{fontSize: 20}}></BsDot>Your face must be clearly visible</p>
         <p style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
          <BsDot style={{fontSize: 20}}></BsDot>You must be copying the pose exactly</p>
      </div>
  
      
        

        <div className="spcae1">
        <Link to="/">
          <button type="button" className="button-A">Retake my photo</button>
        </Link>
        <br />
        <br />
        <p>If you feel this is incorrect contact Admin</p>

        <Link to="/">
          <button type="button" className="button-B">Contact Admin</button>
        </Link>


        </div>


      </div>
    </div>
  );
};

export default PhotoVerification;