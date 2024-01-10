
import React, { useState, useEffect } from 'react';

import { IoCloseSharp } from 'react-icons/io5';

import { getData } from '../../services/authService';
import { setStore, getStore, getUserToken, clearStore } from '../../services/storageService';
import LoaderService from '../../services/loader';

import './DeleteAcModal.css';



const DeleteAcModal = ({ isOpen, onClose }) => {
  const [token, setToken] = useState(localStorage.getItem('userToken') || null);

  const [userToken, setUserToken] = useState(false);
  const [isLoading, setIsLoading] = useState(false);


  useEffect(() => {

  }, []);


  if (!isOpen) {
    return null;
  }


  const deleteUserAccount = () => {
    setIsLoading(true);
    getData('/delete-account', token).then((res) => {
       console.log(res)
       if(res.status === 'success'){ 
        setTimeout( () => {
            window.location.href = '/';
            setIsLoading(false);
            clearStore();
        }, 1500);
       }else if(res.error){
        setIsLoading(false);
       }
      })
      .catch(error => {
        setIsLoading(false);
      });
  };




  return (
    <div className={`modal ${isOpen ? 'open' : ''}`}>
    <div className="modal-content">
      <button className="close-button" onClick={onClose}>
        <IoCloseSharp className="close-icon" style={{color: '#333', fontSize: 30}}></IoCloseSharp>
      </button>

      <div style={{display: 'flex', alignItems: 'center', }}>
      <h2>Are you sure to <br/>delete your account?</h2>
      <br />
      <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-evenly'}}>
        <div>
            <button type="button" className="button-C" onClick={deleteUserAccount}>Yes</button>
        </div>
        <div>
            <button type="button" className="button-A" onClick={onClose}>No</button>
        </div>
      </div>
      <br />
      </div>

    </div>
    {isLoading && <LoaderService />}
    </div>
  );
};

export default DeleteAcModal;

