import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';

import '../../App.css';

import logo from '../../assets/SVG/logo.svg';
import image1 from '../../assets/PNG/image1.png';
import image2 from '../../assets/PNG/image2.png';
import image3 from '../../assets/PNG/image3.png';


const Congratulations = () => {

  const [token, setToken] = useState(localStorage.getItem('userToken') || null);


  const handleReload = () => {
    window.location.href = '/';
  }


  useEffect(() => {
    if(token){     
    }else{
      window.location.href = '/';
    }  
  }, []);



  return (
    <div className="main-container">


      <div className="centered-content" style={{flex: 8}}>
          <div className="image-row">
             <img src={image1} alt="Image 1" />
             <img src={image2} alt="Image 2" className="row-centered-image"/>
             <img src={image3} alt="Image 3" />
          </div>
          <br /> <br />
          <div className="image-container">
             <img src={logo} style={{height: '60px'}} alt="SVG Image" className="centered-image" />
          </div>
    
          <h2>Congratulations <br />your Smoochy account <br />is now setup<br /></h2>
          <p>Please check your email to verify your account.</p>
          <br /> <br />

            {/* <div className="footer">
              <div className="spcae1">
                <Link to="/buildProfile">
                  <button type="button" className="button-A">Build your Profile</button>
                </Link>
              </div>
              <div>
                <button className="a-button" onClick={handleReload}>Skip</button>
              </div>
            </div> */}
      </div>


      <div className="bottom-footer-content" style={{flex: 2}}>
        <div style={{width: '100%'}}>
          <Link to="/buildProfile">
              <button type="button" className="button-A">Build your Profile</button>
          </Link>
          <button className="a-button" onClick={handleReload} style={{marginTop: '10%'}}>Skip</button>
        </div>
      </div>

    </div>
  );
};

export default Congratulations;