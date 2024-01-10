import React, {useEffect, useState} from 'react';

import { Link } from 'react-router-dom';
import TopHeader from '../../components/TopHeader';
import BottomTabs from '../../components/BottomTabs';
import LoaderService from '../../services/loader';
import { postData } from '../../services/authService';
import { showToast } from '../../services/toastService';


export default function Updatepass() {
    const [isLoading, setIsLoading] = useState(false);
    const [password, setPassword] = useState('');
    const [newpassword, setNewpassword] = useState('');
    const [confirmnewpassword, setConfirmnewpassword] = useState('');
    const [errors, setErrors] = useState({});
    const [token, setToken] = useState(localStorage.getItem("userToken") || null);


    const handleSpaceKeyDown = (event) => {
      if (event.key === ' ') {
        event.preventDefault(); // Prevent the space character from being entered
      }
    };

    
    const handleInputChange = (event) => {
        const { name, value } = event.target;
    
        if (name === 'password') {
          setPassword(value);
        } else if (name === 'newpassword') {
          setNewpassword(value);
        } else if (name === 'confirmnewpassword') {
          setConfirmnewpassword(value);
        } 
    };

      //validations for form 
      const validateForm = () => {
        let formIsValid = true;
        const newErrors = {};
    
        // Validate pass
        if (!password) {
          formIsValid = false;
          newErrors.password = 'Password is required';
        }
    
        // Validate email
        if (!newpassword) {
            formIsValid = false;
            newErrors.newpassword = 'New Password is required';
        }

        if (!confirmnewpassword) {
            formIsValid = false;
            newErrors.confirmnewpassword = 'Confirm New Password is required';
        }
        if (confirmnewpassword!==newpassword) {
            formIsValid = false;
            newErrors.confirmnewpassword = 'Confirm New Password should be same as New Password';
        }
    
        setErrors(newErrors);
        return formIsValid;
      };
    

      const handleFormSubmit = (event) => {
        event.preventDefault();
        const newErrors = {};
        console.log('Form submitted:', { password,newpassword,confirmnewpassword});
        const payload = {current_password:password,new_password:newpassword,confirm_password:confirmnewpassword}
        if (validateForm()) {
          setIsLoading(true);


          postData('/change-password', payload, token).then((res) => {
            console.log(res);
            if(res.status === 'success'){ 
                showToast('Password Changed successfully', "success");
                setIsLoading(false);
                setPassword('');
                setNewpassword('');
                setConfirmnewpassword('');
              }else if(res.status==='error'){
                console.log('inside error sexctioh')
                showToast(res.message, "error");
                  newErrors.server = res.message;
                  setErrors(newErrors);
                  setIsLoading(false);
              }
           })
           .catch(error => {
             console.log(error)
             showToast(error, "error");
             setIsLoading(false);
             console.log('Server side issue!', 'error');
           });


        }
      }
    
  return (
    <div className="app">
    <TopHeader></TopHeader>
    <main className="content-main">
    <div className="dashboard-content">
      <div style={{width: '90%', margin: '0px auto'}}>
        <form onSubmit={handleFormSubmit} noValidate>
            <div style={{padding: 10}}>
              <div style={{marginBottom: 20}}>
                <p style={{padding: '0px 25px', color: '#000', fontSize: 14, marginBottom: 6}}>Current Password</p>
                <div className="input-outer-div">
                  <input type="password" className="left-input" style={{color: '#333'}}
                   name="password" value={password}  onChange={handleInputChange} onKeyDown={handleSpaceKeyDown}/>
                </div>
                {errors.password && <p style={{color: '#ff0037', padding: '0px 25px', marginTop: 6, marginBottm: 0}}>{errors.password}</p>}
              </div>
           

              <div style={{marginBottom: 20}}>
                <p style={{padding: '0px 25px', color: '#000', fontSize: 14, marginBottom: 6}}>New Password</p>
                <div className="input-outer-div">
                  <input type="password" className="left-input" style={{color: '#333'}}
                  name="newpassword" value={newpassword}  onChange={handleInputChange} onKeyDown={handleSpaceKeyDown}/>
                </div>
                {errors.newpassword && <p style={{color: '#ff0037', padding: '0px 25px', marginTop: 6, marginBottm: 0}}>{errors.newpassword}</p>}
              </div>
             

              <div style={{marginBottom: 20}}>
                <p style={{padding: '0px 25px', color: '#000', fontSize: 14, marginBottom: 6}}>Confirm New Password</p>
                <div className="input-outer-div">
                  <input type="password" className="left-input" style={{color: '#333'}}
                  name="confirmnewpassword" value={confirmnewpassword}  onChange={handleInputChange} onKeyDown={handleSpaceKeyDown}/>
                </div>
                {errors.confirmnewpassword && <p style={{color: '#ff0037', padding: '0px 25px', marginTop: 6, marginBottm: 0}}>{errors.confirmnewpassword}</p>}
              </div>
         

            </div>

            <div style={{margin: '10px 10px 20px'}}>
                <button type="submit" className="button-A" style={{margin: 0}}>Submit</button>
            </div>
          </form>
        </div>
        </div>
      </main>
    <BottomTabs/>
    
      {isLoading && <LoaderService />}
    </div>
  )
}
