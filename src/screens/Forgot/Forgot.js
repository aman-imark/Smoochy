import React, {useState} from 'react';
import '../../App.css';

import logo from '../../assets/SVG/logo and tagline.svg';
import BackButton from '../../components/BackButton';

import LoaderService from '../../services/loader';

import { postData, forget } from '../../services/authService';
import { showToast } from '../../services/toastService';



const Forgot = () => {

  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState('');

  const [forgotStatus, setForgotStatus] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  



  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name === 'email') {
      setEmail(value);
    }
  };


  const handleSpaceKeyDown = (event) => {
    if (event.key === ' ') {
      event.preventDefault(); // Prevent the space character from being entered
    }
  };


  const validateForm = () => {
    let formIsValid = true;
    const newErrors = {};

    // Validate email
    if (!email) {
      formIsValid = false;
      newErrors.email = 'Email is required';
    } else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
      formIsValid = false;
      newErrors.email = 'Email is invalid';
    }
    setErrors(newErrors);
    return formIsValid;
  };



  const handleFormSubmit = (event) => {
    event.preventDefault();
    const newErrors = {};
    
    if (validateForm()) {
      setIsLoading(true);

      forget(email).then((res) => {
        console.log(res);
        if(res.status === 'success'){
          showToast(res.msg, 'success');
          setEmail('');
        }else if(res.status === 'error'){
          showToast(res.message, 'warning');
        }       
        setIsLoading(false);     
      }).catch(error => {
           setIsLoading(false);
           newErrors.server = error;
           setErrors(newErrors);
           showToast(error, 'error');
      });
    }
  };




  return (
    // <BackButton></BackButton>
    <div className="main-container">
      
      <div className="top-header-content">
      <BackButton></BackButton>
      </div>


      <main className="centered-content">
      <div>
      {forgotStatus === false ? (
      <form className="custom-form" onSubmit={handleFormSubmit} noValidate>
      <div className="main-content">
       <h2 style={{marginTop: 0}}>Forgotten Your <br /> Password?</h2> <br />
       <div>
         <p>Lorem Ipsum is simply dummy text of the printing and {'\n'} typesetting industry. Lorem Ipsum has been the industry's 
         {'\n'} 
         standard dummy text ever since the 1500s, when an unknown printer {'\n'} took a galley of type and scrambled it to make a type specimen book.</p>
       </div>
       <br />
       {errors.server && <p style={{color: '#ff0037'}}>{errors.server}</p>}
       <div className="input-outer-div" >
            <input type="email" placeholder="Email Address"  className="left-input" style={{textAlign: 'center', color: '#000'}}
            name="email" value={email} onChange={handleInputChange} onKeyDown={handleSpaceKeyDown}/>
        </div>
        {errors.email && <p style={{color: '#ff0037'}}>{errors.email}</p>}
      </div>

      <div className="footer">
        <button type="submit" className="button-A">Submit</button>
      </div>
      </form>
      ) : ( 
      <div style={{padding: '0px 50px'}}>
        <h2>Thanks!</h2>
        <p>If the email address you have entered is in our database, we will send a password recovery link to it.</p>
      </div>
      )}

      <br /> <br/>
      </div>
      </main>

      <div className="bottom-footer-content">
      </div>
      {isLoading && <LoaderService />}
    </div>
  );
};

export default Forgot;