
import React from 'react';

import { Link, useLocation } from 'react-router-dom';

import { HiUser } from "react-icons/hi";
import { FaMapMarkerAlt } from "react-icons/fa";
import { BsFillChatRightDotsFill } from "react-icons/bs";


const BottomTabs = ({ }) => {

  const location = useLocation();
  // console.log(location);
  // console.log(location.pathname);

  const styles = {
    backgroundColor: '#74d9fc',
    height: '65%',
    width: 2,
  };


  const VerticalDivider = () => {
    return <div style={styles}></div>;
  };
  

  return (
    <footer style={{backgroundColor: '#4bd0fd', height: '7vh', position: 'fixed', bottom: 0, margin: 'auto'}}>
    <div style={{display: 'flex', justifyContent: 'space-around', alignItems:'center', height: 60}}>
      <div style={{flex: 1, textAlign: 'center'}}>
        <Link to="/bottomTab1">
          <HiUser style={{ color: location.pathname === '/bottomTab1' ? '#ffffff' : '#aae8fe',  fontSize: 22 }}></HiUser>
        </Link>
      </div>

      <VerticalDivider/>
      <div style={{flex: 1, textAlign: 'center'}}>
        <Link to="/bottomTab2">
          <FaMapMarkerAlt style={{ color: location.pathname === '/bottomTab2' ? '#ffffff' : location.pathname === '/' ? '#ffffff' : '#aae8fe', fontSize: 22 }}></FaMapMarkerAlt>
        </Link>
      </div>
      <VerticalDivider/>

      <div style={{flex: 1, textAlign: 'center'}}>
        <Link to="/bottomTab3">
           <BsFillChatRightDotsFill style={{ color: location.pathname === '/bottomTab3' ? '#ffffff' : '#aae8fe',  fontSize: 22 }}></BsFillChatRightDotsFill>
        </Link>
      </div>    
    </div>
    </footer>
  );
};

export default BottomTabs;

