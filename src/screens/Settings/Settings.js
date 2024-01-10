import React, {useState} from 'react';

import { Link } from 'react-router-dom';
import TopHeader from '../../components/TopHeader';
import BottomTabs from '../../components/BottomTabs';

import { BiChevronRight } from "react-icons/bi";
import { setStore, getStore, getUserToken, removeStore, clearStore } from '../../services/storageService';
import LoaderService from '../../services/loader';
import DeleteACModal from '../../components/DeleteAcModal/DeleteAcModal';


const Settings = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isModalDeleteOpen, setModalDeleteOpen] = useState(false);


  const handleOpenModalDelete = () => {
    setModalDeleteOpen(true);
  };

  const handleCloseModalDelete = () => {
    setModalDeleteOpen(false);
  };



  function handleLogoutClick(){

    setIsLoading(true);
    setTimeout( () => {
      const removeToken = removeStore('userToken').then( (res) => {
        console.log(res)
        if(res === true){
          const removeIntro = removeStore('introModal').then( (res) => {
          });
          const removeIntro2 = removeStore('signupFormDataStore').then( (res) => {
          });
          window.location.href = '/';
          setIsLoading(false);
        }
      });    
    }, 2000)
  };



  return (
    <div className="app">

      <TopHeader></TopHeader>

      <main className="content-main">
      <div className="dashboard-content" style={{flexDirection: 'column'}}>
    
      <div style={{width: '90%', margin: '0px auto', position: 'relative'}}>
      <br /> <br />

      <Link to="/notifications">
      <button className="button-Z">Notification Settings
        <BiChevronRight  style={{fontSize: 22}}></BiChevronRight>
      </button>
      </Link>

      <Link to="/contact">
      <button className="button-Z">Contact & FAQ
        <BiChevronRight  style={{fontSize: 22}}></BiChevronRight>
      </button>
      </Link>


      <Link to="/privacy">
      <button className="button-Z">Security & Privacy
        <BiChevronRight  style={{fontSize: 22}}></BiChevronRight>
      </button>
      </Link>

      <Link to="/terms">
      <button className="button-Z">Terms & Conditions 
        <BiChevronRight  style={{fontSize: 22}}></BiChevronRight>
      </button>
      </Link>

      <Link to="/blockedUsers">
      <button className="button-Z">Blocked Users
        <BiChevronRight style={{fontSize: 22}}></BiChevronRight>
      </button>
      </Link>


      <Link to="/upgradeac">
      <button className="button-Z">Upgrade your account
        <BiChevronRight  style={{fontSize: 22}}></BiChevronRight>
      </button>
      </Link>

      <Link to="/updatePassword">
      <button className="button-Z">Change Password 
        <BiChevronRight  style={{fontSize: 22}}></BiChevronRight>
      </button>
      </Link>
      {/* <Link to="/cardpayment">
      <button className="button-Z">Upgrade your account
        <BiChevronRight  style={{fontSize: 22}}></BiChevronRight>
      </button>
      </Link> */}
 
        <div style={{padding: '20px 0px'}}>
        <button className="button-C"  onClick={handleLogoutClick}>Log out</button>
        <button className="button-D"  onClick={handleOpenModalDelete}>Delete account</button>
        </div>
      </div>
      
      {/* <div style={{position: 'absolute', bottom: 30, left: 20, right: 20}}>
        <button className="button-C"  onClick={handleLogoutClick}>Log out</button>
        <button className="button-D"  onClick={handleOpenModalDelete}>Delete account</button>
      </div> */}
      </div>
      </main>

      <DeleteACModal isOpen={isModalDeleteOpen} onClose={handleCloseModalDelete}></DeleteACModal>
      <BottomTabs></BottomTabs>
    
      {isLoading && <LoaderService />}
    </div>
  );
};

export default Settings;