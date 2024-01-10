
import React, { useState, useRef } from 'react';

import { Link } from 'react-router-dom';

import logo from './../assets/SVG/logo.svg';

import { IoSettings, IoEyeSharp } from 'react-icons/io5';
import { CiSliderHorizontal } from "react-icons/ci";

import FilterModal from './FilterModal/FilterModal';
import { ReactComponent as CustomSettingIcon } from '../assets/SVG/settings_icon.svg';
import { ReactComponent as CustomFilterIcon } from '../assets/SVG/filter_icon.svg'; 



const TopHeader = () => {
  
  const [isModal_Filter, setIsModal_Filter] = useState(false);

  const openModalFilter = () => {
    setIsModal_Filter(true);
  };



  const closeModalFilter = (modalValue) => {
    setIsModal_Filter(false);
  };

 



  return (
    <>
    <header style={{ backgroundColor: '#4bd0fd', height: '9.5vh', position: 'fixed', top: 0, margin: 'auto'}}>
      <div style={{display: 'flex', justifyContent: 'space-around', alignItems:'center', height: 80}}>
        <Link to="/settings">
          <CustomSettingIcon style={{fontSize: 30, color: '#733faa', cursor: 'pointer'}} to="/notifications"/>
        </Link>
        <Link to="/bottomTab2">
        <img src={logo} alt="SVG Image" />
        </Link>

        <CustomFilterIcon  onClick={openModalFilter} style={{fontSize: 30, color: '#733faa', cursor: 'pointer'}}/>
      </div>
    </header>

  

    {/* {isModal_Filter && <FilterModal onClose={() => {
      console.log(isModal_Filter); setIsModal_Filter(false)
    }} />} */}


    {isModal_Filter && <FilterModal onClose={closeModalFilter} />}
    </>
  );
};

export default TopHeader;

