import React, {useEffect, useState} from 'react';

import { Link } from 'react-router-dom';

import { BiChevronRight } from "react-icons/bi";
import { getData } from '../services/authService';
import LoaderService from '../services/loader';
import TopHeader from './TopHeader';
import BottomTabs from './BottomTabs';
import { IoChevronBack } from 'react-icons/io5';



const TermsModal = ({ onClose }) => {

  const [termsContent, setTermsContent] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    handleTerms_Data();   
  }, []);

  
  const handleTerms_Data = () => {
    setIsLoading(true);
    getData('/terms', '').then((res) => {
       console.log(res)
       if(res.status === 'success'){ 
        setIsLoading(false);
        setTermsContent(res.data);
       }else if(res.error){
        setIsLoading(false);
       }
      })
      .catch(error => {
        setIsLoading(false);
      });
  };


  return (
    <div className="modal open"  style={{backgroundColor: '#4bd0fd'}}>

      <div className="modal-content app" style={{backgroundColor: '#4bd0fd'}}>

      {/* <TopHeader></TopHeader> */}

      <main className="content-main" style={{ height: '96vh', marginTop: '4vh'}}>
      <div className="dashboard-content" style={{flexDirection: 'column'}}>
    
      <div className="header-back" style={{top: 10}}>
            <button className="back-button" type="button" onClick={onClose}>
              <IoChevronBack
                style={{ fontSize: 18, color: "#733faa", marginRight: 12 }}
              ></IoChevronBack>
              <span className="back-button-text">Back</span>
            </button>
      </div>


      <div style={{width: '85%', margin: '0px auto', height: '83vh', position: 'relative'}}>
      {termsContent ? ( 
        <div>
        <br /> <br />
        <h3 style={{textAlign: 'center'}}>{termsContent.heading}</h3>
        <div dangerouslySetInnerHTML={{__html: termsContent.content }} style={{textAlign: 'left'}}></div>
        </div>
        ): (
        <div className="no-data-msg">No data found!</div>
      )}

      </div>
      </div>


      </main>

      {/* <BottomTabs></BottomTabs> */}
      {isLoading && <LoaderService />}
    </div>

    </div>
  );
};

export default TermsModal;

