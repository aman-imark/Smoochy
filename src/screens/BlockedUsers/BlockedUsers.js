import React, {useEffect, useState} from 'react';

import TopHeader from '../../components/TopHeader';
import BottomTabs from '../../components/BottomTabs';

import { AiOutlineStop } from "react-icons/ai";

import logo from '../../assets/SVG/logo.svg';
import profile1 from '../../assets/PNG/profile1.png';
import profile2 from '../../assets/PNG/profile2.png';
import profile3 from '../../assets/PNG/profile3.png';
import profile4 from '../../assets/PNG/profile4.png';
import profile5 from '../../assets/PNG/profile5.png';

import { getData } from '../../services/authService';
import { setStore, getStore, getUserToken } from '../../services/storageService';
import LoaderService from '../../services/loader';



const BlockedUsers = () => {
  const [token, setToken] = useState(localStorage.getItem('userToken') || null);

  const [blockedUsersList, setBlockedUsersList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);


  useEffect(() => {
      handleBlockedUsersList_Data();
  }, []);



  const handleBlockedUsersList_Data = () => {
    setIsLoading(true);
    getData('/blocked-user', token).then((res) => {
       console.log(res)
       if(res.status === 'success'){ 
        setIsLoading(false);
        setBlockedUsersList(res.data);
       }else if(res.error){
        setIsLoading(false);
       }
      })
      .catch(error => {
        setIsLoading(false);
      });
  };


  // const blockedUsersList = [
  //   {
  //     id: '1',
  //     name: 'Natasha W.',
  //     avatar: profile1,
  //   },
  //   {
  //     id: '2',
  //     name: 'Jamie W.',
  //     avatar: profile2,
  //   },
  //   {
  //     id: '3',
  //     name: 'Natasha W.',
  //     avatar: profile3,
  //   },
  //   {
  //     id: '4',
  //     name: 'Ally A.',
  //     avatar: profile4,
  //   },
  //   {
  //     id: '5',
  //     name: 'Mallory W.',
  //     avatar: profile5,
  //   }
  // ];




  return (
    <div className="app">

    <TopHeader></TopHeader>

    <main className="content-main">
    <div className="dashboard-content" style={{flexDirection: 'column'}}>
      <div style={{width: '90%', margin: '0px auto', position: 'relative'}}>

               
      <div className="title-div" style={{textAlign: 'center', marginTop: 30, marginBottom: 20}}>Blocked users</div>
       
      {blockedUsersList.length > 0 ? (
       <>
       {blockedUsersList.map((user) => (
        <div key={user.id} className="userList-Div">
          <div className="userAvatar-Div">
            <img src={user.image} alt="User Avatar" />
          </div>
          <div style={{width: 165}}>
            <h4 style={{color: '#000'}}>{user.name}</h4>
          </div>
          <div>  
            <AiOutlineStop style={{color: '#ff1547', fontSize: 40}}></AiOutlineStop>
          </div>
        </div>
       ))}
       </>
      ): (
        <div className="no-data-msg" style={{marginTop: '100%'}}>No Blocked user data found!</div>
      )}

      
      {/* {blockedUsersList.map((user) => (
        <div key={user.id} className="userList-Div">
          <div className="userAvatar-Div">
            <img src={user.avatar} alt="User Avatar" />
          </div>
          <div style={{width: 165}}>
            <h4 style={{color: '#000'}}>{user.name}</h4>
          </div>
          <div>  
            <AiOutlineStop style={{color: '#ff1547', fontSize: 40}}></AiOutlineStop>
          </div>
        </div>
       ))}

       <div className="no-data-msg">No Blocked user data found!</div> */}


      </div>

    </div>
    </main>


    <BottomTabs></BottomTabs>
    {isLoading && <LoaderService />}

    </div>
  );
};

export default BlockedUsers;