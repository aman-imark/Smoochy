import React, {useEffect, useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';

import '../../App.css';

import logoTagline from '../../assets/SVG/logo and tagline.svg';

import { setStore, getStore, getUserToken } from '../../services/storageService';
import LoaderService from '../../services/loader';

import { login, postData } from '../../services/authService';
import { showToast } from '../../services/toastService';
import { HiHome } from "react-icons/hi";

 
const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
  // Get the current URL's query parameters
  const urlSearchParams = new URLSearchParams(window.location.search);
  // Use the get method to retrieve the value of the "code" parameter
  const codeParam = urlSearchParams.get('code');

  if (codeParam) {
    // Do something with the code parameter value
    console.log('Code parameter value:', codeParam);
    sendVerifCode(codeParam);
  }else{
    // console.log('Not getting any code');
  }
  }, []);



  const handleInputChange = (event) => {
    const { name, value } = event.target;

    if (name === 'email') {
      setEmail(value);
    } else if (name === 'password') {
      setPassword(value);
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

    // Validate password
    if (!password) {
      formIsValid = false;
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      formIsValid = false;
      newErrors.password = 'Password should be at least 6 characters long';
    }

    setErrors(newErrors);
    return formIsValid;
  };

  
  const handleFormSubmit = (event) => {
    event.preventDefault();
    const newErrors = {};
    
    if (validateForm()) {
      setIsLoading(true);
      login(email, password).then((res) => {
        console.log(res)
        if(res.status === 'success'){ 
          showToast('Login Success.', 'success');
          setTimeout( () => {
            let token = res.token;
            const setToken = setStore('userToken', res.token).then( (res) => {
              if(res === true){
                window.location.href = '/';
                setIsLoading(false);
              }
            });   
          }, 1500);
        }else if(res.error){
          setIsLoading(false);
           newErrors.server = res.error;
           setErrors(newErrors);
        }else{
          showToast('Login unsuccessfull!', 'warning');
          newErrors.server = res;
          setIsLoading(false);
        }
      }).catch(error => {
          showToast('Login unsuccessfull!', 'error');
          setIsLoading(false);
           newErrors.server = error;
           setErrors(newErrors);
      });
    }
  };



  const sendVerifCode = (codeValue) => {
      // const code = "5e1a62123fa1814befff5866b58c5f63c7c5f44a504b561f3f616f67c01c1b38b2a23b72a716e10a6571fa435148f8aa46ac684165c1c53e392d6549ba227c44e39e317b1fd2132ff34dec89e7";
      postData("/second-step-verify", {'code' : codeValue}, '').then((res) => {
        console.log(res);
      }).catch((err) => {
        console.log(err);
      });
  }


  
  const handleSignupClick = () => {
    // const urlSearchParams = new URLSearchParams(window.location.search);
    // const codeParam = urlSearchParams.get('code');
    // console.log(codeParam)

    navigate('signup');

    // if (codeParam) {
    //   console.log('If section is Working!');
    //   // Do something with the code parameter value
    //   console.log('Code parameter value:', codeParam);
    //   sendVerifCode(codeParam);
    // }else{
    //   console.log('Else section is Working!');
    //   // const url = "https://av-sandbox.verifymyage.com/methods?client_id=key-l-81430902-2739-4d0a-baaf-5cee944472c0&country=gb&d2m=&method=&moderation_id=&redirect_uri=https%3A%2F%2Fsmoochy-b5387.web.app&response_type=code&scope=adult&sdk=&session_id=&sie=&state=&verification_id=745ebb287b734976a6b5340c9f413023&voice=";
    //   const url = "https://sandbox.verifymyage.com/oauth/authorize?client_id=key-l-81430902-2739-4d0a-baaf-5cee944472c0&scope=adult&country=gb&redirect_uri=https://smoochy-b5387.web.app/signup";
    //   window.open(url, "_self"); 
    // }
  }




  return (
    <div className="main-container">
      
      <div className="centered-content" style={{flex: 9}}>
        <div style={{paddingTop: 80}}>
        <div className="image-container">
          <img src={logoTagline} alt="SVG Image" className="centered-image" />
        </div>

        <div className="text-wrapper">
          <p style={{margin: '0px'}}>Welcome to Smoochy.</p>
          <p style={{margin: '0px auto', width: '80%'}}>The closest you're going to get to real life dating. Search, find and chat.</p>
          <br/>
          <p style={{margin: '0px'}}>Unlimited messaging at an affordable price.</p>
          <p style={{margin: '0px'}}>Create an account for a 1 month Free Trial.</p>
        </div>


        <form className="custom-form" onSubmit={handleFormSubmit} noValidate>
          {errors.server && <p style={{color: '#ff0037'}}>{errors.server}</p>}
          <div className="input-outer-div" style={{marginBottom: 12}}>
            <input type="email" placeholder="Username" className="left-input" style={{textAlign: 'center', color: '#000'}}
            name="email" value={email} onChange={handleInputChange} onKeyDown={handleSpaceKeyDown}/>
          </div>
          {errors.email && <p style={{color: '#ff0037'}}>{errors.email}</p>}

          <div className="input-outer-div" style={{marginBottom: 12}}>
            <input type="password" placeholder="Password" className="left-input" style={{textAlign: 'center', color: '#000'}}
            name="password" value={password} onChange={handleInputChange}  onKeyDown={handleSpaceKeyDown}/>
          </div>
          {errors.password && <p style={{color: '#ff0037'}}>{errors.password}</p>}

          <button type="submit" className="button-A" style={{margin: 0}}>Sign In</button>
        </form>

        <div className="spcae1" style={{marginTop: 20}}>
          <Link to="/forgot">
            <button className="a-button" type="button">Forgotten Password?</button>
          </Link>
        </div>

        <div className="spcae1">
          <button type="button" className="button-B"  onClick={handleSignupClick}>Create an Account</button>
        </div>

        <p>By tapping Create Account or Sign In, you agree to our <Link to="/terms_"><span style={{fontWeight: 800}}>Terms.</span></Link>Learn how we process our data in our <Link to="/privacy_"><span style={{fontWeight: 800}}>Privacy Policy</span></Link> and <Link to="/cookies_"><span style={{fontWeight: 800}}>Cookies Policy</span>.</Link></p>
        </div>
      </div>


      <div className="bottom-footer-content">
        <HiHome style={{ color: '#aae8fe', fontSize: 30, textAlign:'center', padding: '20px 0px', cursor: 'pointer' }}></HiHome>
      </div>
      {isLoading && <LoaderService />}
    </div>
  );

}

export default Login;