import React, { useState, useEffect } from "react";
import TopHeader from "../../components/TopHeader";

import { Link, useParams, useLocation } from "react-router-dom";
import BottomTabs from "../../components/BottomTabs";

import { IoCloseSharp, IoCheckmarkSharp, IoArrowDownSharp } from "react-icons/io5";
import { ReactComponent as CustomMessageIcon } from '../../assets/SVG/message_icon.svg';

import { getData, postData } from "../../services/authService";
import {
  setStore,
  getStore,
  getUserToken,
} from "../../services/storageService";
import LoaderService from "../../services/loader";





const Profile = () => {
  const location = useLocation();
  const person = location.state;
  console.log(person);

  const [token, setToken] = useState(localStorage.getItem("userToken") || null);

  const [userData, setUserData] = useState([]);
  const [height, setHeight] = useState(180);
  const [basicsData, setBasicsData] = useState([]);
  const [interestsData, setInterestsData] = useState([]);

  const [isLoading, setIsLoading] = useState(false);


  useEffect(() => {
    getUserProfile_Data();
  }, []);

  const getUserProfile_Data = () => {
    setIsLoading(true);
    postData("/user-profile", { id: person.id }, token)
      .then((res) => {
        console.log(res);
        if (res.status === "success") {
          setIsLoading(false);
          setUserData(res.data);

          let setBasic = [res.data.height, res.data.nationality, res.data.education, res.data.ethnicity,
            res.data.why_here, res.data.eye_colour, res.data.body_type, res.data.do_smoke, res.data.do_drink, 
            res.data.personality_type, res.data.like_night_out, res.data.like_night_in, res.data.like_have_children];
          setBasic = cleanArray(setBasic);

          setHeight(res.data.height);
          
          setBasicsData(setBasic);
          setInterestsData(res.data.interests);
          convertToFeetInches(180);
        } else if (res.error) {
          setIsLoading(false);
        }
      })
      .catch((error) => {
        setIsLoading(false);
      });
  };


  function cleanArray(arr) {
    // Use the filter method to remove empty, null, and undefined elements
    return arr.filter((item) => item !== '' && item !== null && item !== undefined);
  }



  const convertToFeetInches = (centimeters) => {
    const feet = Math.floor(centimeters / 30.48);
    const inches = Math.round((centimeters % 30.48) / 2.54);
    return `${feet}'${inches}"`;
  };



  // console.log(`${convertToFeetInches(height)} (${height}cm)`);

  return (
    <div className="app">
      <TopHeader></TopHeader>

      <main className="content-main">
        <div style={{ padding: "2%" }}>
          <div
            className="item1"
            style={{
              height: "82vh",
              borderRadius: 20,
              position: "relative",
              backgroundImage: `url(${userData.image})`,
              backgroundColor: "#2a7d9a",
            }}>
            <div
              className="linear-background"
              style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                height: 180,
              }}
            >
              <div
                style={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  right: 0,
                  height: 95,
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "0px 25px",
                  }}
                >
                  <div>
                    <h2
                      style={{
                        margin: "5px 0px",
                        color: "#fff",
                        fontWeight: 600,
                      }}
                    >
                      {userData.age ? (
                      <>
                        {userData.name}, {userData.age}
                      </>
                      ) : (
                      <>
                        {userData.name}
                      </>
                      )}
                    </h2>
                    <h5
                      style={{
                        margin: "5px 0px",
                        color: "#fff",
                        fontWeight: 300,
                      }}
                    >

                      {userData.gender ? (
                      <>
                        {userData.location}, {userData.gender}
                      </>
                      ) : (
                      <>
                        {userData.location}
                      </>
                      )}
                    </h5>
                  </div>
                  <div>
                    <Link to="/chatBetween" state={person}>
                      <button
                        className="chat-button"
                        style={{ height: 50, width: 50 }}>
                        <CustomMessageIcon style={{ color: "#ffffff", fontSize: 20, padding: 4 }} />
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {userData.about == null && (
            <>
              <br /> <br />
            </>
          )}

          {userData.about && (
            <div
              style={{
                backgroundColor: "#b7ecfe",
                borderRadius: 16,
                padding: 20,
                margin: "12px 0px",
              }}>
              <h4 style={{ color: "#69a4c0", fontWeight: 600 }}>
                “{userData.about}”
              </h4>
            </div>
          )}

          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}>
           {userData?.image2&& <div
              className="item1"
              style={{
                height: "300px",
                width: "48%",
                borderRadius: 20,
                backgroundImage: `url(${userData.image1})`,
                backgroundColor: "#e2e2e280",
              }}
            />}
             {userData?.image2&& <div
              className="item1"
              style={{
                height: "300px",
                width: "48%",
                borderRadius: 20,
                backgroundImage: `url(${userData.image2})`,
                backgroundColor: "#e2e2e280",
              }}
            />}
          </div>

          <div style={{ margin: "25px 0px" }}>
            <h4 style={{ textAlign: "center", margin: "35px 0px 20px" }}>
              My Basics
            </h4>

            {basicsData.length >= 1 && (
            <div className="chip-container" style={{justifyContent: 'normal'}}>
              {basicsData.map((text, index) => (
                <div
                  className="normalChip"
                  style={{ backgroundColor: "#f7f7f7" }}>
                  {text}
                </div>
              ))}
            </div>
            )}

            {basicsData.length === 0 && (
            <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', height: 80, 
            background: '#9ad9f0', borderRadius: 20}}>
              <div>
              <h5 style={{color: '#2a7d9a', textAlign: 'center'}}>No Interests found...</h5>
              </div>
            </div>
            )}


            <div style={{ display: "flex", alignItems: "center" }}></div>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            {userData?.image3&&<div
              className="item1"
              style={{
                height: "300px",
                width: "48%",
                borderRadius: 20,
                backgroundImage: `url(${userData.image3})`,
                backgroundColor: "#e2e2e280",
              }}
            ></div>}
            {userData?.image4&&<div
              className="item1"
              style={{
                height: "300px",
                width: "48%",
                borderRadius: 20,
                backgroundImage: `url(${userData.image4})`,
                backgroundColor: "#e2e2e280",
              }}
            ></div>}
          </div>

          <div style={{ margin: "25px 0px" }}>
            <h4 style={{ textAlign: "center", margin: "35px 0px 20px" }}>
              My Interests
            </h4>
            {interestsData.length >= 1 && (
            <div className="chip-container" style={{justifyContent: 'normal'}}>
              {interestsData.map((text, index) => (
                <div
                  className="normalChip"
                  style={{ backgroundColor: "#733faa", color: "#fff" }}
                >
                  {text}
                </div>
              ))}
            </div>
            )}

            {interestsData.length === 0 && (
            <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', height: 80, 
            background: '#9ad9f0', borderRadius: 20}}>
              <div>
              <h5 style={{color: '#2a7d9a', textAlign: 'center'}}>No Interests found...</h5>
              </div>
            </div>
            )}




            <div style={{ display: "flex", alignItems: "center" }}></div>
          </div>

          {userData?.image5&&
          <div
            className="item1"
            style={{
              height: "82vh",
              borderRadius: 20,
              position: "relative",
              backgroundImage: `url(${userData.image5})`,
              backgroundColor: "#2a7d9a",
            }}
          >
            <div
              className="linear-background"
              style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                height: 180,
              }}
            >
              <div
                style={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  right: 0,
                  height: 95,
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "0px 25px",
                  }}
                >
                  <div>
                    <h2
                      style={{
                        margin: "5px 0px",
                        color: "#fff",
                        fontWeight: 600,
                      }}
                    >

                      {userData.age ? (
                      <>
                        {userData.name}, {userData.age}
                      </>
                      ) : (
                      <>
                        {userData.name}
                      </>
                      )}
                    </h2>
                    <h5
                      style={{
                        margin: "5px 0px",
                        color: "#fff",
                        fontWeight: 300,
                      }}
                    >
                      {userData.gender ? (
                      <>
                        {userData.location}, {userData.gender}
                      </>
                      ) : (
                      <>
                        {userData.location}
                      </>
                      )}
                    </h5>
                  </div>
                  <div>
                    <Link to="/chatBetween" state={person}>
                      <button
                        className="chat-button"
                        style={{ height: 50, width: 50 }}>
                        <CustomMessageIcon style={{ color: "#ffffff", fontSize: 20, padding: 4 }} />
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>}
        </div>
      </main>

      <BottomTabs></BottomTabs>
      {isLoading && <LoaderService />}
    </div>
  );
};

export default Profile;
