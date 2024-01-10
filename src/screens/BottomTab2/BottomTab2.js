import React, {useEffect, useState } from 'react';

import TopHeader from '../../components/TopHeader';
import BottomTabs from '../../components/BottomTabs';

import { Link } from 'react-router-dom';

import IntroModal from '../../components/IntroModal/IntroModal';

import { ReactComponent as CustomEyeIcon } from '../../assets/SVG/eye_icon.svg';
import { ReactComponent as CustomMessageIcon } from '../../assets/SVG/message_icon.svg';

import { getData, postData } from '../../services/authService';
import { setStore, getStore, getUserToken } from '../../services/storageService';
import LoaderService from '../../services/loader';
import { useDispatch, useSelector } from 'react-redux';
 


const BottomTab2 = () => {
  const [token, setToken] = useState(localStorage.getItem('userToken') || null);
  const [introValue, setIntroValue] = useState(localStorage.getItem('introModal') || null);
  const [isSearchBy, setIsSearchBy] = useState(false);

  const [usersList, setUsersList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);


  const dispatch = useDispatch()
  const filters = useSelector((state) => state.data);
  // console.log('filter: ', filters);


  useEffect(() => {
    handleUserList_Data();
    if(filters.filterStatusSet === true){
      setIsSearchBy(true);
    }
   }, [filters]);


  const handleUserList_Data = () => {
    setIsLoading(true);
      // getData('/user-list', token).then((res) => {
      // //  console.log(res);
      //  if(res.status === 'success'){ 
      //   setIsLoading(false);
      //   setUsersList(res.data)
      //  }else if(res.error){
      //   setIsLoading(false);
      //  }
      // })
      // .catch(error => {
      //   setIsLoading(false);
      // });
     

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


      postData('/filter', filterPayload, token).then((res) => { console.log(res);
       if(res.status === 'success'){ 
        setIsLoading(false);
        setUsersList(res.data)
       }else if(res.error){
        setIsLoading(false);
       }
      })
      .catch(error => {
        setIsLoading(false);
      });
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


       {usersList.length > 0 ? (
        <>
        {usersList.map((user) => (
        <div key={user.id} className="userList-Div">
          {/* <Link to="/friendProfile"> */}
          <Link to="/profile"  state={user}>
          <div className="userAvatar-Div">
            <img src={user.image} alt="User Avatar" />
          </div>
          </Link>
           <div className="row-name-div">
            <h4>{user.name}</h4>
          </div>
           <div> 
            <Link to="/profile" state={user}>
            {/* <IoEyeSharp style={{color: '#733faa', fontSize: 22}}></IoEyeSharp> */}
            <CustomEyeIcon style={{color: '#733faa', fontSize: 22}}/>
            </Link>
          </div>
          <div>
            <Link to="/chatBetween" state={user}>
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


      </div>
      </div>
    </main>

    <IntroModal></IntroModal>
    <BottomTabs></BottomTabs> 
    {isLoading && <LoaderService />}

    </div>
  );
};


export default BottomTab2;
