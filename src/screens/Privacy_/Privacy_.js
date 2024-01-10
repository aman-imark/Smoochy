import React, {useEffect, useState} from 'react';

import { Link } from 'react-router-dom';
import TopHeader from '../../components/TopHeader';
import BottomTabs from '../../components/BottomTabs';

import { BiChevronRight } from "react-icons/bi";
import { getData } from '../../services/authService';
import { setStore, getStore, getUserToken, removeStore, clearStore } from '../../services/storageService';
import LoaderService from '../../services/loader';



const Privacy_ = () => {

  const [privacyContent, setPrivacyContent] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    handlePrivacy_Data();
  }, []);



  const handlePrivacy_Data = () => {
    setIsLoading(true);
    getData('/privacy', '').then((res) => {
       console.log(res)
       if(res.status === 'success'){ 
        setIsLoading(false);
        setPrivacyContent(res.data);
       }else if(res.error){
        setIsLoading(false);
       }
      })
      .catch(error => {
        setIsLoading(false);
      });
  };


  return (
    <div className="app">

      <main className="content-main" style={{height: '95vh', marginTop: '4vh'}}>
      <div className="dashboard-content" style={{flexDirection: 'column'}}>
      <div style={{width: '85%', margin: '0px auto', position: 'relative'}}>
      <br /> 
        <h3 style={{textAlign: 'center'}}>{privacyContent.heading}</h3>
        <div dangerouslySetInnerHTML={{ __html: privacyContent.content }} style={{textAlign: 'left'}}></div>
      </div>
      </div>
      </main>

      {isLoading && <LoaderService />}
    </div>
  );
};

export default Privacy_;