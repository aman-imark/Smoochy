import React, { useState, useRef, useEffect } from 'react';

import TopHeader from '../../components/TopHeader';
import BottomTabs from '../../components/BottomTabs';

import { Link } from 'react-router-dom';

import profile1 from '../../assets/PNG/profile1.png';
import profile2 from '../../assets/PNG/profile2.png';
import profile3 from '../../assets/PNG/profile3.png';
import profile4 from '../../assets/PNG/profile4.png';
import profile5 from '../../assets/PNG/profile5.png';

import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

import { IoCloseSharp, IoCheckmarkSharp, IoArrowDownSharp } from "react-icons/io5";
import { ReactComponent as CustomMessageIcon } from '../../assets/SVG/message_icon.svg';

import { MdKeyboardArrowDown } from "react-icons/md";


import { getData, postData } from '../../services/authService';
import { setStore, getStore, getUserToken } from '../../services/storageService';
import LoaderService from '../../services/loader';
import FilterModal from '../../components/FilterModal/FilterModal';


import { useDispatch, useSelector } from 'react-redux';
 


const BottomTab3 = () => {
  const [token, setToken] = useState(localStorage.getItem('userToken') || null);

  const [openMsgList, setOpenMsgList] = useState([]);
  const [waitingMsgList, setWaitingMsgList] = useState([]);

  const [openDot, setOpenDot]  = useState(null);
  const [waitingDot, setWaitingDot]  = useState(null);

  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSearchBy, setIsSearchBy] = useState(false);

  const dispatch = useDispatch()
  const filters = useSelector((state) => state.data);
  // console.log('filter: ', filters);


  useEffect(() => {
    handleUserList_Open_Data();
    handleUserList_Waiting_Data();
    if(filters.filterStatusSet === true){
      setIsSearchBy(true);
    }
  }, [filters]);



  const handleUserList_Open_Data = () => {
    setIsLoading(true);

    let c_age = '';
    if(filters.age === "Any"){
      c_age = "any";
    }else{
      c_age = filters.age;
    }
    let c_gender = '';
    if(filters.gender === "Any"){
      c_gender = "any";
    }else{
      c_gender = filters.gender;
    }
    let c_ethnicity = '';
    if(filters.ethnicity === "Any"){
      c_ethnicity = "any";
    }else{
      c_ethnicity = filters.ethnicity;
    }
    let c_creativity = '';
    if(filters.creativity === "Any"){
      c_creativity = "any";
    }else{
      c_creativity = filters.creativity;
    }
    let c_sport = '';
    if(filters.sport === "Any"){
      c_sport = "any";
    }else{
      c_sport = filters.sport;
    }
    let c_general_interest = '';
    if(filters.general_interest === "Any"){
      c_general_interest = "any";
    }else{
      c_general_interest = filters.general_interest;
    }
    let c_night_in = '';
    if(filters.night_in === "Any"){
      c_night_in = "any";
    }else{
      c_night_in = filters.night_in;
    }
    let c_night_out = '';
    if(filters.night_out === "Any"){
      c_night_out = "any";
    }else{
      c_night_out = filters.night_out;
    }
    let c_like_have_children = '';
    if(filters.like_have_children === "Any"){
      c_like_have_children = "any";
    }else{
      c_like_have_children = filters.like_have_children;
    }
    let c_like_want_children = '';
    if(filters.like_want_children === "Any"){
      c_like_want_children = "any";
    }else{
      c_like_have_children = filters.like_want_children;
    }
    let c_personality_type = '';
    if(filters.personality_type === "Any"){
      c_personality_type = "any";
    }else{
      c_personality_type = filters.personality_type;
    }
    let c_why_here = '';
    if(filters.why_here === "Any"){
      c_why_here = "any";
    }else{
      c_why_here = filters.why_here;
    }


    let filterPayload = 
    {
      age: c_age,
      gender: c_gender,
      location: filters.location,
      nationality:  filters.nationality,
      ethnicity: c_ethnicity,
      creativity: c_creativity,
      sport: c_sport,
      general_interest: c_general_interest,
      night_in: c_night_in,
      night_out: c_night_out,
      like_have_children: c_like_have_children,
      like_want_children: c_like_want_children,
      personality_type: c_personality_type,
      why_here: c_why_here,
    };
    console.log('Filter: ', filters);
    console.log('Payload: ', filterPayload);

    postData('/message-open-filter', filterPayload, token).then((res) => {
       console.log(res)
       if(res.status === 'success'){ 
        setIsLoading(false);
        const openMsg = res.data.filter(itm => itm !== null && itm !== undefined);
        console.log(openMsg);
        // setOpenMsgList(res.data);
        setOpenMsgList(openMsg);
        const unreadMessagesCount = openMsg.filter(message => message.read_status === 0).length;
        console.log('Unread count: ',unreadMessagesCount);

        setOpenDot(unreadMessagesCount);
       }else if(res.error){
        setIsLoading(false);
       }
      })
      .catch(error => {
        setIsLoading(false);
      });
    };


  const handleUserList_Waiting_Data = () => {
    setIsLoading(true);

    let c_age = '';
    if(filters.age === "Any"){
      c_age = "any";
    }else{
      c_age = filters.age;
    }
    let c_gender = '';
    if(filters.gender === "Any"){
      c_gender = "any";
    }else{
      c_gender = filters.gender;
    }
    let c_ethnicity = '';
    if(filters.ethnicity === "Any"){
      c_ethnicity = "any";
    }else{
      c_ethnicity = filters.ethnicity;
    }
    let c_creativity = '';
    if(filters.creativity === "Any"){
      c_creativity = "any";
    }else{
      c_creativity = filters.creativity;
    }
    let c_sport = '';
    if(filters.sport === "Any"){
      c_sport = "any";
    }else{
      c_sport = filters.sport;
    }
    let c_general_interest = '';
    if(filters.general_interest === "Any"){
      c_general_interest = "any";
    }else{
      c_general_interest = filters.general_interest;
    }
    let c_night_in = '';
    if(filters.night_in === "Any"){
      c_night_in = "any";
    }else{
      c_night_in = filters.night_in;
    }
    let c_night_out = '';
    if(filters.night_out === "Any"){
      c_night_out = "any";
    }else{
      c_night_out = filters.night_out;
    }
    let c_like_have_children = '';
    if(filters.like_have_children === "Any"){
      c_like_have_children = "any";
    }else{
      c_like_have_children = filters.like_have_children;
    }
    let c_like_want_children = '';
    if(filters.like_want_children === "Any"){
      c_like_want_children = "any";
    }else{
      c_like_have_children = filters.like_want_children;
    }
    let c_personality_type = '';
    if(filters.personality_type === "Any"){
      c_personality_type = "any";
    }else{
      c_personality_type = filters.personality_type;
    }
    let c_why_here = '';
    if(filters.why_here === "Any"){
      c_why_here = "any";
    }else{
      c_why_here = filters.why_here;
    }


    let filterPayload = 
    {
      age: c_age,
      gender: c_gender,
      location: filters.location,
      nationality:  filters.nationality,
      ethnicity: c_ethnicity,
      creativity: c_creativity,
      sport: c_sport,
      general_interest: c_general_interest,
      night_in: c_night_in,
      night_out: c_night_out,
      like_have_children: c_like_have_children,
      like_want_children: c_like_want_children,
      personality_type: c_personality_type,
      why_here: c_why_here,
    };
    console.log('Filter: ', filters);
    console.log('Payload: ', filterPayload);

    postData('/message-waiting-filter', filterPayload, token).then((res) => {
       console.log(res);
       if(res.status === 'success'){ 
        setIsLoading(false);
        setWaitingMsgList(res.data);
        const unreadMessagesCount = res.data.filter(message => message.read_status === 0).length;      
        setWaitingDot(unreadMessagesCount);
       }else if(res.error){
        setIsLoading(false);
       }
      })
      .catch(error => {
        setIsLoading(false);
      });
    };


  const handle_Accept = (userId) => {
      console.log(userId);
      setIsLoading(true);
      postData('/accept-user', { id: userId }, token).then((res) => {
       console.log(res)
       if(res.status === 'success'){ 
        setIsLoading(false);
        handleUserList_Waiting_Data();
        handleUserList_Open_Data();
       }else if(res.error){
        setIsLoading(false);
       }
      })
      .catch(error => {
        setIsLoading(false);
      });
  };

  const handle_Reject = (userId) => {
      console.log(userId);
      setIsLoading(true);
      postData('/reject-user', { id: userId }, token).then((res) => {
       console.log(res)
       if(res.status === 'success'){ 
        setIsLoading(false);
        handleUserList_Waiting_Data();
        handleUserList_Open_Data();
       }else if(res.error){
        setIsLoading(false);
       }
      })
      .catch(error => {
        setIsLoading(false);
      });
  };
  


  const [isModal_Filter, setIsModal_Filter] = useState(false);

  const openModalFilter = () => {
    setIsModal_Filter(true);
  };

  const closeModalFilter = (modalValue) => {
    setIsModal_Filter(false);
  };

 


  return ( 
    <div className="app">
    <TopHeader></TopHeader>

    <main className="content-main">
      <div className="dashboard-content">
        <div style={{width: '90%', margin: '0px auto'}}>

        {isSearchBy && (
          <>
          <h4 style={{margin: 10}}>Search By: </h4>
          <div style={{display: 'flex', gap: 10, flexWrap: 'wrap'}}>
            {filters.age && 
            <span className="filterChip_">{filters.age}</span>
            }
            {filters.locationCom && 
            <span className="filterChip_">{filters.locationName}</span>
            }
            {filters.gender && 
            <span className="filterChip_">{filters.gender}</span>
            }
            {filters.natinationalityCom && 
            <span className="filterChip_">{filters.nationName}</span>
            }
            {filters.ethnicity && 
            <span className="filterChip_">{filters.ethnicity}</span>
            }
            {filters.creativity.length >= 1 && 
            <span className="filterChip_">{filters.creativity}</span>
            }
            {filters.sport.length >= 1 && 
            <span className="filterChip_">{filters.sport}</span>
            }
            {filters.general_interest.length >= 1 && 
            <span className="filterChip_">{filters.general_interest}</span>
            }
            {filters.night_in && 
            <span className="filterChip_">{filters.night_in}</span>
            }
            {filters.night_out && 
            <span className="filterChip_">{filters.night_out}</span>
            }
            {filters.like_have_children && 
            <span className="filterChip_">{filters.like_have_children}</span>
            }
            {filters.like_want_children && 
            <span className="filterChip_">{filters.like_want_children}</span>
            }
            {filters.personality_type && 
            <span className="filterChip_">{filters.personality_type}</span>
            }
            {filters.why_here && 
            <span className="filterChip_">{filters.why_here}</span>
            }
          </div>
          </>
        )}


        <Tabs style={{width: '100%'}}>
        <TabList>
          <Tab>
            <div style={{position: 'relative'}}>
              Open
              {openDot > 0 && (
              <div style={{position: 'absolute', top: -5, right: '25%'}}>
                  <div className="badge"></div>
              </div>
              )}
            </div>   
          </Tab>
          <Tab>
            <div style={{position: 'relative'}}>
              Waiting 
              {waitingDot > 0 && (
              <div style={{position: 'absolute', top: -5, right: '21%'}}>
                <div className="badge"></div>
              </div>
              )}
            </div>            
          </Tab>
        </TabList>
 
      

        <div style={{display: 'flex', align: 'center', justifyContent: 'center', margin: '25px 0px 20px'}}>
            <button className="a-button" onClick={openModalFilter}>Filter Messages</button>
            <MdKeyboardArrowDown style={{fontSize: 30, color: '#733faa'}}/>
        </div> 
       


        <TabPanel>
        {openMsgList.length > 0 ? (
          <>         
          {openMsgList.map((user) => (
            <div key={user.id} className="userList-Div">
              {/* <Link to="/friendProfile"> */}
              <Link to="/profile"  state={user}>              
              <div className="userAvatar-Div">
                <img src={user.image} alt="User Avatar" />
              </div>
              </Link>
              <div style={{width: 215}}>
                <h4>{user.name}</h4>
                <p>{user.message}</p>
              </div>
              <div>
                <Link to="/chatBetween"  state={user} >
                <button className="chat-button">
                  <CustomMessageIcon style={{color: '#ffffff', fontSize: 15, padding: 4}}/>
                </button>
                </Link>
              </div>
            </div>
           ))}
           </>
        ) : (
          <div className="no-data-msg">No User data found!</div>
        )}
        </TabPanel>


        <TabPanel>
        {waitingMsgList.length > 0 ? (
          <>         
          {waitingMsgList.map((user) => (
           <div key={user.id} className="userList-Div">
             <div className="userAvatar-Div">
               <img src={user.image} alt="User Avatar" />
             </div>
             <div className="row-name-div">
               <h4>{user.name}</h4>
             </div>
             <div>
               <button className="chat-button" onClick= {() => handle_Reject(user.id)}>
                 <IoCloseSharp style={{color: '#ffffff', fontSize: 25}}></IoCloseSharp>
               </button>
             </div>
             <div>  
               <button className="chat-button" onClick= {() => handle_Accept(user.id)} style={{backgroundColor: '#4bd0fd'}}>
                 <IoCheckmarkSharp style={{color: '#ffffff', fontSize: 25}}></IoCheckmarkSharp>
               </button>
             </div>
           </div>
           ))}
           </>
        ) : (
          <div className="no-data-msg">No User data found!</div>
        )}
        </TabPanel>

        </Tabs>
       
        </div>
      </div>
    </main>


    <BottomTabs></BottomTabs> 
    {isLoading && <LoaderService />}
    {isModal_Filter && <FilterModal onClose={closeModalFilter} />}
    </div>
  );
};

export default BottomTab3;