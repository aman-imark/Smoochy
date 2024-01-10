import React, {useEffect, useState} from 'react';

import { Link } from 'react-router-dom';
import TopHeader from '../../components/TopHeader';
import BottomTabs from '../../components/BottomTabs';

import { BiChevronRight } from "react-icons/bi";
import { getData } from '../../services/authService';
import { setStore, getStore, getUserToken, removeStore, clearStore } from '../../services/storageService';
import LoaderService from '../../services/loader';



const Terms = () => {

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
    <div className="app">

      <TopHeader></TopHeader>

      <main className="content-main">
      <div className="dashboard-content" style={{flexDirection: 'column'}}>
    
      <div style={{width: '85%', margin: '0px auto', position: 'relative'}}>
      <br /> 

        <h3 style={{textAlign: 'center'}}>{termsContent.heading}</h3>
        <div dangerouslySetInnerHTML={{ __html: termsContent.content }} style={{textAlign: 'left'}}></div>

      </div>

      </div>
      </main>


      <BottomTabs></BottomTabs>
    
      {isLoading && <LoaderService />}
    </div>
  );
};

export default Terms;