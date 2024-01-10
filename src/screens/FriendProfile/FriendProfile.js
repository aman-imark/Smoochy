import React, {useState, useEffect} from 'react';
import TopHeader from '../../components/TopHeader';

import { Link } from 'react-router-dom';
import BottomTabs from '../../components/BottomTabs';

import { IoCloseSharp, IoCheckmarkSharp, IoArrowDownSharp } from "react-icons/io5";
import { ReactComponent as CustomMessageIcon } from '../../assets/SVG/message_icon.svg';

import profile7 from '../../assets/PNG/profile7.png';


import { getData } from '../../services/authService';
import { setStore, getStore, getUserToken } from '../../services/storageService';
import LoaderService from '../../services/loader';



const FriendProfile = () => {
  const [token, setToken] = useState(localStorage.getItem('userToken') || null);

  const [userData, setUserData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);


  useEffect(() => {
 
  }, []);





  return (
    <div className="app">

    <TopHeader></TopHeader>

    <main className="content-main">
        <div style={{padding: '2%'}}>
          <div className="item1" style={{height: '82vh', borderRadius: 20, position: 'relative', backgroundImage: `url(${profile7})`}}>
          <div className="linear-background" style={{position: 'absolute', bottom: 0, left: 0, right: 0, height: 180}}>
              <div style={{position: 'absolute', bottom: 0, left: 0, right: 0, height: 95}}>
                <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0px 25px'}}>
                  <div>              
                    <h1 style={{margin: '5px 0px', color: '#fff', fontWeight: 600}}>Jessica, 22</h1>
                    <h5 style={{margin: '5px 0px', color: '#fff', fontWeight: 300}}>Bournemouth, Female</h5>
                  </div>
                  {/* <div>
                    <button className="chat-button" style={{height: 50, width: 50}}>
                     <CustomMessageIcon  style={{color: '#ffffff', fontSize: 20, padding: 4}} />
                    </button>
                  </div> */}
                  <div>
                    <div style={{display: 'inline-flex'}}>
                      <button className="chat-button">
                        <IoCloseSharp style={{color: '#ffffff', fontSize: 25}}></IoCloseSharp>
                      </button>
                    </div>&nbsp;&nbsp;
                    <div style={{display: 'inline-flex'}}>
                      <button className="chat-button" style={{backgroundColor: '#4bd0fd'}}>
                        <IoCheckmarkSharp style={{color: '#ffffff', fontSize: 25}}></IoCheckmarkSharp>
                      </button>
                    </div>        
                  </div>
                </div>
              </div>
          </div>
          </div>

          <div style={{margin: '25px 0px'}}>
            <h4 style={{textAlign: 'center'}}>My Basics</h4>
          </div>
        </div>
    
        <Link>
          <button className="button-Z" style={{width: '70%', margin: 'auto', justifyContent:'center'}}>Looking for a relationship</button>
        </Link>
        <br />
    </main>

    <BottomTabs></BottomTabs>
    {isLoading && <LoaderService />}
    </div>
  );
};

export default FriendProfile;