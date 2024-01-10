
import React, {useState, useEffect} from 'react';
import TopHeader from '../../components/TopHeader';

import Switch from '@mui/material/Switch';
import Divider from '@mui/material/Divider';
import BottomTabs from '../../components/BottomTabs';

import { getData, postData } from '../../services/authService';
import { setStore, getStore, getUserToken } from '../../services/storageService';
import LoaderService from '../../services/loader';



const Notifications = () => {
  const [token, setToken] = useState(localStorage.getItem('userToken') || null);

  const [pushNew, setPushNew] = useState(null);
  const [emailsNew, setEmailsNew] = useState(false);

  const [pushExt, setPushExt] = useState(false);
  const [emailsExt, setEmailsExt] = useState(false);


  const [isLoading, setIsLoading] = useState(false);




  useEffect(() => {
    handleUser_NotificationSettings();
  }, []);



  const handleUser_NotificationSettings = () => {
    setIsLoading(true);
      getData('/notification', token).then((res) => {
       console.log(res);
       if(res.status === 'success'){ 
        setIsLoading(false);

        if(res.data.new_contact_push === 1){
          setPushNew(true);
        }else if(res.data.new_contact_push === 0){
          setPushNew(false);
        }

        if(res.data.new_contact_email === 1){
          setEmailsNew(true);
        }else if(res.data.new_contact_email === 0){
          setEmailsNew(false);
        }

        if(res.data.existing_contact_push === 1){
          setPushExt(true);
        }else if(res.data.existing_contact_push === 0){
          setPushExt(false);
        }

        if(res.data.existing_contact_email === 1){
          setEmailsExt(true);
        }else if(res.data.existing_contact_email === 0){
          setEmailsExt(false);
        }
       }else if(res.status === 'error'){
        setIsLoading(false);
       }
      })
      .catch(error => {
        setIsLoading(false);
      });
  };



  
  const handleSetNotification = () => {

    let new_contact_push;
    let new_contact_email;
    let existing_contact_push;
    let existing_contact_email;

    console.log(pushNew);
    console.log(emailsNew);
    console.log(pushExt);
    console.log(emailsExt);


       if(pushNew === true){
          new_contact_push = 1;
       }else if(pushNew === false){
          new_contact_push = 0;
       }

       if(emailsNew === true){
          new_contact_email = 1;
       }else if(emailsNew === false){
          new_contact_email = 0;
       }

       if(pushExt === true){
          existing_contact_push = 1;
       }else if(pushExt === false){
          existing_contact_push = 0;
       }

       if(emailsExt === true){
          existing_contact_email = 1;
       }else if(emailsExt === false){
          existing_contact_email = 0;
       }

    const payload = {
      new_contact_push: new_contact_push,
      new_contact_email: new_contact_email,
      existing_contact_push: existing_contact_push,
      existing_contact_email: existing_contact_email
    };
    console.log(payload);

    postData('/notification', payload, token).then((res) => {
      console.log(res);
    })
    .catch(error => {
    });
  };



  return (
    <div className="app">

    <TopHeader></TopHeader>

    <main className="content-main">
    <div className="dashboard-content" style={{flexDirection: 'column'}}>
      <div style={{width: '90%', margin: '0px auto', position: 'relative'}}>
        <div className="title-div" style={{textAlign: 'center', marginTop: 30, marginBottom: 20}}>Notification Settings</div>
        <div style={{backgroundColor: '#fff', padding: 20, borderRadius: 20}}>
          <div className="title-div" style={{color: '#000', marginTop: 0, marginBottom: 10}}>New Contact Messages</div>
          <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: 14}}>
           <div className="title-div" style={{color: '#000', fontSize: 14, fontWeight: 600, marginTop: 0}}>Push notifications</div>
           <Switch checked={pushNew} onChange={() => {setPushNew(!pushNew)}}
             inputProps={{ 'aria-label': 'controlled' }}/>            
          </div>
          <Divider />
          <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: 14}}>
           <div className="title-div" style={{color: '#000', fontSize: 14, fontWeight: 600, marginTop: 0}}>Emails</div>
           <Switch checked={emailsNew}  onChange={() => {setEmailsNew(!emailsNew)}}
             inputProps={{ 'aria-label': 'controlled' }}/>            
          </div>
        </div>

        <br />
        <div style={{backgroundColor: '#fff', padding: 20, borderRadius: 20}}>
          <div className="title-div" style={{color: '#000', marginTop: 0, marginBottom: 10}}>Existing Contact Messages</div>
          <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: 14}}>
           <div className="title-div" style={{color: '#000', fontSize: 14, fontWeight: 600, marginTop: 0}}>Push notifications</div>
           <Switch checked={pushExt}  onClick={() => {setPushExt(!pushExt)}}
             inputProps={{ 'aria-label': 'controlled' }}/>            
          </div>
          <Divider />
          <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: 14}}>
           <div className="title-div" style={{color: '#000', fontSize: 14, fontWeight: 600, marginTop: 0}}>Emails</div>
           <Switch checked={emailsExt}  onChange={() => {setEmailsExt(!emailsExt)}}
             inputProps={{ 'aria-label': 'controlled' }}/>            
          </div>
        </div>
      </div>

      <div style={{position: 'absolute', bottom: 30, left: 20, right: 20}}>
        <button type="button" className="button-A" style={{margin: 0}} onClick={handleSetNotification}>Update</button>
      </div>

    </div>
    </main>

    <BottomTabs></BottomTabs>
    {isLoading && <LoaderService />}
    </div>
  );
};

export default Notifications;
