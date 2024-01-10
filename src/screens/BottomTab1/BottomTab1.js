import React, { useState, useRef, useEffect } from 'react';
import Select from "react-select";

import TopHeader from '../../components/TopHeader';
import BottomTabs from '../../components/BottomTabs';

import { Link } from 'react-router-dom';
import { BsPlus } from "react-icons/bs";

import logo from '../../assets/SVG/logo.svg';
import profile1 from '../../assets/PNG/profile1.png';
import profile2 from '../../assets/PNG/profile2.png';
import profile3 from '../../assets/PNG/profile3.png';
import profile4 from '../../assets/PNG/profile4.png';
import profile5 from '../../assets/PNG/profile5.png';
import myprofile from '../../assets/PNG/myprofile.png';

import { getData, postFormData, postData } from '../../services/authService';
import { setStore, getStore, getUserToken } from '../../services/storageService';
import LoaderService from '../../services/loader';
import { showToast } from '../../services/toastService';



import body_type_json from '../../data/body_type.json';
import drink_json from '../../data/drink.json';
import education_json from '../../data/education.json';

import eye_colour_json from '../../data/eye_colour.json';
import gender_json from '../../data/gender.json';
import have_children_json from '../../data/have_children.json';
import night_in_json from '../../data/night_in.json';
import night_out_json from '../../data/night_out.json';
import smoke_json from '../../data/smoke.json';
import type_personality_json from '../../data/type_personality.json';



import why_here_json from '../../data/why_here.json';




import interests_array from '../../data/interests_array.json'; 
import SelectSearch from 'react-select-search';


const BottomTab1 = () => {
  const [token, setToken] = useState(localStorage.getItem('userToken') || null);

  const [userData, setUserData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedImage1, setSelectedImage1] = useState(null);
  const [selectedImage2, setSelectedImage2] = useState(null);
  const [selectedImage3, setSelectedImage3] = useState(null);
  const [selectedImage4, setSelectedImage4] = useState(null);
  const [selectedImage5, setSelectedImage5] = useState(null);
  const [name, setName] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");

  const [location, setLocation] = useState("");
  const [locationOptions, setLocationOptions] = useState([]);

  const [nationality, setNationality] = useState("");
  const [nationalityOptions, setNationalityOptions] = useState([]);

  const [ethnicity, setEthnicity] = useState("");
  const [ethnicityOptions, setEthnicityOptions] = useState([]);

  const [bio, setBio] = useState("");

  const [customInterests, setCustomInterests] = useState([]);
  const [creativityOptions, setCreativityOptions] = useState([]);
  const [sportsOptions, setSportsOptions] = useState([]);
  const [generalOptions, setGeneralOptions] = useState([]);

  const [creativity, setCreativity] = useState([]);
  const [sports, setSports] = useState([]);
  const [interests, setInterests] = useState([]);

  const [relationship, setRelationship] = useState("");
  const [relationshipOptions, setRelationshipOptions] = useState([]);

  const [education, setEducation] = useState("");
  const [educationOptions, setEducationOptions] = useState([]);

  const [children, setChildren] = useState("");
  const [haveChildrenOptions, setHaveChildrenOptions] = useState([]);

  const [height, setHeight] = useState("");

  const [eye_colour, setEyeColour] = useState("");
  const [eyeColorOptions, setEyeColorOptions] = useState([]);

  const [body_type, setBodyType] = useState("");
  const [bodyTypeOptions, setBodyTypeOptions] = useState([]);

  const [smoke, setSmoke] = useState("");
  const [smokeTypeOptions, setSmokeTypeOptions] = useState([]);

  const [drink, setDrink] = useState("");
  const [drinkTypeOptions, setDrinkTypeOptions] = useState([]);

  const [night_out, setNightOut] = useState("");
  const [night_outOptions, setNightOutOptions] = useState([]);

  const [night_in, setNightIn] = useState("");
  const [night_inOptions, setNightInOptions] = useState([]);

  const [personality, setPersonality] = useState("");
  const [personalityOptions, setPersonalityOptions] = useState([]);


    const fileInputRef = useRef(null);
    const fileInputRef1 = useRef(null);
    const fileInputRef2 = useRef(null);
    const fileInputRef3 = useRef(null);
    const fileInputRef4 = useRef(null);
    const fileInputRef5 = useRef(null);
      const handleButtonClick = () => {
        fileInputRef.current.click();
      };
      const handleButtonClick1 = () => {
        fileInputRef1.current.click();
      };
      const handleButtonClick2 = () => {
        fileInputRef2.current.click();
      };
      const handleButtonClick3 = () => {
        fileInputRef3.current.click();
      };
      const handleButtonClick4 = () => {
        fileInputRef4.current.click();
      };
      const handleButtonClick5 = () => {
        fileInputRef5.current.click();
      };



    const handleFileSelected = (event) => {
      const selectedFile = event.target.files[0];
      if (selectedFile) {
        const reader = new FileReader();
        reader.onload = () => {
          setSelectedImage(reader.result);
        };
        reader.readAsDataURL(selectedFile);
      }
    };
      const handleFileSelected1 = (event) => {
        const selectedFile = event.target.files[0];
        if (selectedFile) {
          const reader = new FileReader();
          reader.onload = () => {
            setSelectedImage1(reader.result);
          };
          reader.readAsDataURL(selectedFile);
        }
      };
    const handleFileSelected2 = (event) => {
      const selectedFile = event.target.files[0];
      if (selectedFile) {
        const reader = new FileReader();
        reader.onload = () => {
          setSelectedImage2(reader.result);
        };
        reader.readAsDataURL(selectedFile);
      }
    };
      const handleFileSelected3 = (event) => {
        const selectedFile = event.target.files[0];
        // console.log(selectedFile);
        if (selectedFile) {
          const reader = new FileReader();
          reader.onload = () => {
            setSelectedImage3(reader.result);
          };
          reader.readAsDataURL(selectedFile);
        }
      };
    const handleFileSelected4 = (event) => {
      const selectedFile = event.target.files[0];
      // console.log(selectedFile);
      if (selectedFile) {
        const reader = new FileReader();
        reader.onload = () => {
          setSelectedImage4(reader.result);
        };
        reader.readAsDataURL(selectedFile);
      }
    };
      const handleFileSelected5 = (event) => {
        const selectedFile = event.target.files[0];
        // console.log(selectedFile);
        if (selectedFile) {
          const reader = new FileReader();
          reader.onload = () => {
            setSelectedImage5(reader.result);
          };
          reader.readAsDataURL(selectedFile);
        }
      };

    const convertToFeetInches = (centimeters) => {
      const feet = Math.floor(centimeters / 30.48);
      const inches = Math.round((centimeters % 30.48) / 2.54);
      return `${feet}'${inches}"`;
    };


  useEffect(() => {
      handleUserProfile_Data();
      handleLocation_Data();
      handleNationality_Data();
      handleEthnicity_Data();
      handleSports_Data();
      handleCreativity_Data();
      handleGeneral_Data();
      handleRelationship_Data();
      handleEducation_Data();
      handleHaveChildren_Data();
      handleEyeColor_Data();
      handleBodyType_Data();
      handleSmoke_Data();
      handleDrink_Data();
      handleNightOut_Data();
      handleNightIn_Data();
      handlePersonality_Data();
  }, []);


  const handleUserProfile_Data = () => {
    setIsLoading(true);
    getData('/my-profile', token).then((res) => {
       console.log(res)
       if(res.status === 'success'){ 
        setIsLoading(false);
         
        if(res.data.image){
          setSelectedImage(res.data.image);
        }
        if(res.data.image){
          setSelectedImage1(res.data.image1);
        }
        if(res.data.image){
          setSelectedImage2(res.data.image2);
        }
        if(res.data.image){
          setSelectedImage3(res.data.image3);
        }
        if(res.data.image){
          setSelectedImage4(res.data.image4);
        }
        if(res.data.image){
          setSelectedImage5(res.data.image5);
        }

        setName(res.data.name);
        setDob(res.data.dob);
        setGender(res.data.gender);
        setLocation(res.data.location_id);
        setNationality(res.data.nationality_id);
        setEthnicity(res.data.ethnicity_id);
        setBio(res.data.about);
        setRelationship(res.data.why_here);
        setEducation(res.data.education);
        setChildren(res.data.like_have_children);
        setHeight(res.data.height);
        setEyeColour(res.data.eye_colour);
        setBodyType(res.data.body_type);
        setSmoke(res.data.do_smoke);
        setDrink(res.data.do_drink);

        // if(res.interests === '' || res.interests === undefined || res.interests === []){
        //   setInterests([]);
        // }else{
        //   setInterests(res.interests);
        // }
        setInterests(res.data.interests);
        setNightOut(res.data.night_out_interest_id);
        setNightIn(res.data.night_in_interest_id);
        setPersonality(res.data.personality_id);
       }else if(res.error){
        setIsLoading(false);
       }
    })
    .catch(error => {
      setIsLoading(false);
    });
  };


  const handleLocation_Data = () => {
    getData('/location', token).then((res) => {  console.log(res);
       if(res.status === 'success'){ 
        setLocationOptions(res.data);
       }
      })
      .catch(error => {
        console.log(error);
      });
  };
  const handleNationality_Data = () => {
    getData('/nationality', token).then((res) => {  console.log(res);
       if(res.status === 'success'){ 
        setNationalityOptions(res.data);
       }
      })
      .catch(error => {
      });
  };
  const handleEthnicity_Data = () => {
    getData('/ethnicity', token).then((res) => { // console.log(res);
       if(res.status === 'success'){ 
        setEthnicityOptions(res.data);
       }
      })
      .catch(error => {
      });
  };
  const handleSports_Data = () => {
    getData('/interest-sports', '').then((res) => {
       if(res.status === 'success'){ 
        const newArray = res.data.map(item => ({
          value: item['id'],
          name: item['name']
        }));
        setSportsOptions(newArray);
       }
      })
      .catch(error => {
      });
  };
  const handleCreativity_Data = () => {
    getData('/interest-creativity', '').then((res) => { 
       if(res.status === 'success'){ 
        const newArray = res.data.map(item => ({
          value: item['id'],
          name: item['name']
        }));
        setCreativityOptions(newArray);
       }
      })
      .catch(error => {
      });
  };
  const handleGeneral_Data = () => {
    getData('/general-interest', '').then((res) => { 
       if(res.status === 'success'){ 
        const newArray = res.data.map(item => ({
          value: item['id'],
          name: item['name']
        }));
        setGeneralOptions(newArray);
       }
      })
      .catch(error => {
      });
  };
  const handleRelationship_Data = () => {
    getData('/relationship', '').then((res) => {  console.log(res);
       if(res.status === 'success'){ 
        setRelationshipOptions(res.data);
       }
      })
      .catch(error => {
      });
  };
  const handleEducation_Data = () => {
    getData('/education', '').then((res) => {  console.log(res);
       if(res.status === 'success'){ 
        setEducationOptions(res.data);
       }
      })
      .catch(error => {
      });
  };
  const handleHaveChildren_Data = () => {
    getData('/interest-children', '').then((res) => {  console.log(res);
       if(res.status === 'success'){ 
        setHaveChildrenOptions(res.data);
       }
      })
      .catch(error => {
      });
  };
  const handleEyeColor_Data = () => {
    getData('/interest-eyecolour', '').then((res) => {  console.log(res);
       if(res.status === 'success'){ 
        setEyeColorOptions(res.data);
       }
      })
      .catch(error => {
      });
  };
  const handleBodyType_Data = () => {
    getData('/interest-bodytype', '').then((res) => {  console.log(res);
       if(res.status === 'success'){ 
        setBodyTypeOptions(res.data);
       }
      })
      .catch(error => {
      });
  };
  const handleSmoke_Data = () => {
    getData('/interest-smoke', '').then((res) => {  console.log(res);
       if(res.status === 'success'){ 
        setSmokeTypeOptions(res.data);
       }
      })
      .catch(error => {
      });
  };
  const handleDrink_Data = () => {
    getData('/interest-drink', '').then((res) => {  console.log(res);
       if(res.status === 'success'){ 
        setDrinkTypeOptions(res.data);
       }
      })
      .catch(error => {
      });
  };
  const handleNightOut_Data = () => {
    getData('/interest-night-out', token).then((res) => { // console.log(res);
       if(res.status === 'success'){ 
        setNightOutOptions(res.data);
       }
      })
      .catch(error => {
      });
  };
  const handleNightIn_Data = () => {
    getData('/interest-night-in', token).then((res) => { // console.log(res);
       if(res.status === 'success'){ 
        setNightInOptions(res.data);
       }
      })
      .catch(error => {
      });
  };
  const handlePersonality_Data = () => {
    getData('/personality', token).then((res) => { // console.log(res);
       if(res.status === 'success'){ 
        setPersonalityOptions(res.data);
       }
      })
      .catch(error => {
      });
  };


  interests_array = interests_array.filter(item => !interests.includes(item));
  // console.log(interests_array);
  // console.log(interests);
  





  

  const handleButtonClick_Interest = (values) => {
    if (interests.includes(values)) {
      setInterests(interests.filter((s) => s !== values));
    } else {
      setInterests([...interests, values]);
    }
    console.log('interests :  ', interests);
  }

  const handleButtonClick_Interest2 = (values) => {
    if (customInterests.includes(values)) {
      setCustomInterests(customInterests.filter((s) => s !== values));
    } else {
      setCustomInterests([...customInterests, values]);
    }
    console.log('customInterests :  ', customInterests);
  }

  


  const handleInputChange = (event) => {
    const { name, value } = event.target;
    // console.log(name +' : '+ value);

    if (name === 'name') {
      setName(value);
    }
    if (name === 'dob') {
      setDob(value);
    }
    if (name === 'gender') {
      setGender(value);
    }
    if (name === 'location') {
      setLocation(value);
    }
    if (name === 'nationality') {
      setNationality(value);
    }
    if (name === 'ethnicity') {
      setEthnicity(value);
    }
    if (name === 'bio') {
      setBio(value);
    }
    if (name === 'relationship') {
      setRelationship(value);
    }
    if (name === 'education') {
      setEducation(value);
    }
    if (name === 'children') {
      setChildren(value);
    }
    if (name === 'height') {
      setHeight(value);
    }
    if (name === 'eye_colour') {
      setEyeColour(value);
    }
    if (name === 'body_type') {
      setBodyType(value);
    }
    if (name === 'smoke') {
      setSmoke(value);
    }
    if (name === 'drink') {
      setDrink(value);
    }
    if (name === 'night_out') {
      setNightOut(value);
    }
    if (name === 'night_in') {
      setNightIn(value);
    }
    if (name === 'personality') {
      setPersonality(value);
    }
  };


  const handleUserProfile_UpdateData = () => {
     let image;
     let image1;
     let image2;
     let image3; 
     let image4;
     let image5;

     if(selectedImage.startsWith("https://")){
       image = "";
     }else{
       image = selectedImage; 
     }

     if(selectedImage1.startsWith("https://")){
       image1 = "";
     }else{
       image1 = selectedImage1; 
     }

     if(selectedImage2.startsWith("https://")){
       image2 = "";
     }else{
       image2 = selectedImage2; 
     }

     if(selectedImage3.startsWith("https://")){
        image3 = "";
     }else{
        image3 = selectedImage3; 
     }

     if(selectedImage4.startsWith("https://")){
        image4 = "";
     }else{
        image4 = selectedImage4;
     }

     if(selectedImage5.startsWith("https://")){
       image5 = "";
     }else{
       image5 = selectedImage5; 
     }
   

     let interestPost;
     if(interests.length === 0){
        interestPost = [...new Set([...customInterests])]; // for duplicate array flter
        console.log('if interst');
     }else{
       if(customInterests.length >= 1){
         interestPost = [...new Set([...interests, ...customInterests])]; // for duplicate array flter
       }else{
         interestPost = [...new Set([...interests])]; // for duplicate array flter
       }
       console.log('else interst');
     }
     console.log('interestPost values to post:  ',interestPost);
     //  const customInterstMy = [...creativity, ...sports];
     //  console.log(customInterstMy);


      const payload = {
        image: image,
        image1: image1,
        image2: image2,
        image3: image3,
        image4: image4,
        image5: image5,
        name: name,
        dob: dob,
        gender: gender,
        location: location,
        nationality: nationality,
        ethnicity: ethnicity,
        about: bio,
        relationship: relationship,
        education: education,
        children: children,
        height: height,
        eye_colour: eye_colour,
        body_type: body_type,
        smoke: smoke,
        drink: drink,
        night_out: night_out,
        night_in: night_in,
        personality: personality,
        interest: interestPost,
      };
      console.log(payload);
  

      postData('/update-profile', payload, token).then((res) => {
        console.log(res);
        if(res.status === 'success'){ 
         showToast('Profile Updated.', 'success');
         handleUserProfile_Data();
        }
       })
       .catch(error => {
         console.log(error)
         setIsLoading(false);
         showToast('Server side issue!', 'error');
       });
  };
  


  return (
    <div className="app">
    <TopHeader></TopHeader>

    <main className="content-main">
      <div className="dashboard-content">

      <div style={{width: '90%', margin: '0px auto'}}>
          <br />
          <h3 style={{textAlign:'center'}}>My Profile</h3>
   

        <div className="grid-container">
          <div className="item1" style={{backgroundImage: `url(${selectedImage})`}}>
           <button className="icon-button" onClick={handleButtonClick}>
            <BsPlus style={{fontSize: 25}}/>
            <input type="file" style={{ display: 'none' }} ref={fileInputRef} onChange={handleFileSelected}/>
            </button>
          </div>

          <div className="item2" style={{backgroundImage: `url(${selectedImage1})`}}>
            <button className="icon-button" onClick={handleButtonClick1}>
            <BsPlus style={{fontSize: 25}}/>
            <input type="file" style={{ display: 'none' }} ref={fileInputRef1} onChange={handleFileSelected1}/>
            </button>
          </div>


          <div className="item3" style={{backgroundImage: `url(${selectedImage2})`}}>
            <button className="icon-button" onClick={handleButtonClick2}>
            <BsPlus style={{fontSize: 25}}/>
            <input type="file" style={{ display: 'none' }} ref={fileInputRef2} onChange={handleFileSelected2}/>
            </button>
          </div>  


          <div className="item4" style={{backgroundImage: `url(${selectedImage3})`}}>
            <button className="icon-button" onClick={handleButtonClick3}>
            <BsPlus style={{fontSize: 25}}/>
            <input type="file" style={{ display: 'none' }} ref={fileInputRef3} onChange={handleFileSelected3}/>
            </button>
          </div>


          <div className="item5" style={{backgroundImage: `url(${selectedImage4})`}}>
            <button className="icon-button" onClick={handleButtonClick4}>
            <BsPlus style={{fontSize: 25}}/>
            <input type="file" style={{ display: 'none' }} ref={fileInputRef4} onChange={handleFileSelected4}/>
            </button>
          </div>


          <div className="item6" style={{backgroundImage: `url(${selectedImage5})`}}>
            <button className="icon-button" onClick={handleButtonClick5}>
            <BsPlus style={{fontSize: 25}}/>
            <input type="file" style={{ display: 'none' }} ref={fileInputRef5} onChange={handleFileSelected5}/>
            </button>
          </div>
        </div>

        <div style={{padding: 10}}>
          <div>
            <p style={{padding: '0px 25px', color: '#000', lineHeight: 'normal'}}>Name</p>
            <div className="input-outer-div">
              <input type="text" placeholder="Your Name" className="left-input" 
               name="name" readOnly={true} value={name} onChange={handleInputChange}/>
            </div>
          </div>
          <br />


          <div>
            <p style={{padding: '0px 25px', color: '#000', lineHeight: 'normal'}}>Birthday</p>
            <div className="input-outer-div">
              <input type="text" placeholder="Birthday" className="left-input" 
              name="dob" readOnly={true} value={dob} onChange={handleInputChange}/>
            </div>
          </div>
          <br />


          <div>
            <p style={{padding: '0px 25px', color: '#000', lineHeight: 'normal'}}>Gender</p>
            <div className="input-outer-div-select">
              <SelectSearch
                  options={         
                    gender_json.map(item => ( { name: item.name, value: item.name } ) )
                  }
                  search
                  placeholder="Search/Select option"
                  onChange={gender => handleInputChange({ target: { value: gender, name: 'gender' } })}
                  value={gender} />
            </div>
          </div>
          <br />


          <div>
            <p style={{padding: '0px 25px', color: '#000', lineHeight: 'normal'}}>Current Location</p>
            <div className="input-outer-div-select">
              <SelectSearch
                  options={         
                    locationOptions.map(item => ( { name: item.name, value: item.id } ) )
                  }
                  search
                  placeholder="Search/Select option"
                  onChange={location => handleInputChange({ target: { value: location, name: 'location' } })}
                  value={location} />
            </div>
          </div>
          <br />


          <div>
            <p style={{padding: '0px 25px', color: '#000', lineHeight: 'normal'}}>Nationality</p>
            <div className="input-outer-div-select">
              <SelectSearch
                  options={         
                    nationalityOptions.map(item => ( { name: item.country_name, value: item.id } ) )
                  }
                  search
                  placeholder="Search/Select option"
                  onChange={nationality => handleInputChange({ target: { value: nationality, name: 'nationality' } })}
                  value={nationality} />
            </div>
          </div>
          <br />


          <div>
            <p style={{padding: '0px 25px', color: '#000', lineHeight: 'normal'}}>Ethnicity</p>
            <div className="input-outer-div-select">
              <SelectSearch
                  options={         
                    ethnicityOptions.map(item => ( { name: item.name, value: item.id } ) )
                  }
                  search
                  placeholder="Search/Select option"
                  onChange={ethnicity => handleInputChange({ target: { value: ethnicity, name: 'ethnicity' } })}
                  value={ethnicity} />
            </div>
          </div>
          <br />

          <br />
          <div>
            <h3 style={{textAlign:'center'}}>My Bio</h3>
            <div style={{backgroundColor: '#fff', padding: '10px 20px', borderRadius: 20}}>
              <div>
              <textarea  id="bio"  rows="4" cols="50" className="left-input-textarea" style={{color: '#000',maxWidth:'100%',minWidth:'90%', padding: 0, borderRadius: 0}}
                  name="bio" value={bio}  onChange={handleInputChange}></textarea>
              {/* <p style={{color: '#000', fontWeight: 500}}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris malesuada fringilla sem, non viverra velit accumsan non. Etiam faucibus
              </p> */}
              </div>
            </div>
          </div>

          <br />
          <div>
            <h3 style={{textAlign:'center'}}>My Interests</h3>
            <div style={{backgroundColor: '#fff', padding: '15px 10px', borderRadius: 20, minHeight: 80}}>
            

              <div className="chip-container" style={{justifyContent: 'start'}}>
                  { interests?.length >= 1 && (
                  <>
                  {interests.map((button, i) => (
                    <button className="selectableButton3"
                      key={i} type="button"
                      onClick={() => handleButtonClick_Interest(button)}
                      style={{ backgroundColor: interests.includes(button) ? '#733faa' : '#F4F4F4', 
                      color: interests.includes(button) ? '#ffffff' : '#733faa', fontWeight: 500, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>{button}</button>
                  ))}
                  </>
                  )}
                  {creativityOptions.map((button, i) => (!interests.includes(button.name)&&
                    <button className="selectableButton3"
                      key={i} type="button"
                      onClick={() => handleButtonClick_Interest2(button.name)}
                      style={{ backgroundColor: customInterests.includes(button.name) ? '#733faa' : '#F4F4F4', 
                      color: customInterests.includes(button.name) ? '#ffffff' : '#733faa', fontWeight: 500, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>{button.name}</button>
                  ))}
                  {sportsOptions.map((button, i) => (!interests.includes(button.name)&&
                    <button className="selectableButton3"
                      key={i} type="button"
                      onClick={() => handleButtonClick_Interest2(button.name)}
                      style={{ backgroundColor: customInterests.includes(button.name) ? '#733faa' : '#F4F4F4', 
                      color: customInterests.includes(button.name) ? '#ffffff' : '#733faa', fontWeight: 500, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>{button.name}</button>
                  ))}
                  {generalOptions.map((button, i) => (!interests.includes(button.name)&&
                    <button className="selectableButton3"
                      key={i} type="button"
                      onClick={() => handleButtonClick_Interest2(button.name)}
                      style={{ backgroundColor: customInterests.includes(button.name) ? '#733faa' : '#F4F4F4', 
                      color: customInterests.includes(button.name) ? '#ffffff' : '#733faa', fontWeight: 500, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>{button.name}</button>
                  ))}
              </div>
           
            
              {/* <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', height: 80}}>
              <div>
              <p style={{color: '#beb6b6', textAlign: 'center'}}>Add Interests+</p>
              </div>
              </div> */}
           
            </div>
          </div>

          <br />
          <div>
          <h3 style={{textAlign:'center'}}>My Basics</h3>
          <div>
            <p style={{padding: '0px 25px', color: '#000', lineHeight: 'normal'}}>Relationship</p>
            <div className="input-outer-div-select">
              <SelectSearch
                  options={         
                    relationshipOptions.map(item => ( { name: item.name, value: item.name } ) )
                  }
                  search
                  placeholder="Search/Select option"
                  onChange={relationship => handleInputChange({ target: { value: relationship, name: 'relationship' } })}
                  value={relationship} />
            </div>
          </div>
          <br />

          <div>
            <p style={{padding: '0px 25px', color: '#000', lineHeight: 'normal'}}>Education</p>
            <div className="input-outer-div-select">
              <SelectSearch
                  options={         
                    educationOptions.map(item => ( { name: item.name, value: item.name } ) )
                  }
                  search
                  placeholder="Search/Select option"
                  onChange={education => handleInputChange({ target: { value: education, name: 'education' } })}
                  value={education} />
            </div>
          </div>
          <br />

          <div>
            <p style={{padding: '0px 25px', color: '#000', lineHeight: 'normal'}}>Children</p>
            <div className="input-outer-div-select">
              <SelectSearch
                  options={         
                    haveChildrenOptions.map(item => ( { name: item.name, value: item.name } ) )
                  }
                  search
                  placeholder="Search/Select option"
                  onChange={children => handleInputChange({ target: { value: children, name: 'children' } })}
                  value={children} />
            </div>
          </div>
          <br />

          <div>
            <p style={{padding: '0px 25px', color: '#000', lineHeight: 'normal'}}>Height</p>
            <div className="input-outer-div">
              <input type="text" placeholder="Your Height" className="left-input" 
               name="height" value={`${convertToFeetInches(height)} (${height}cm)`} readOnly/>
            </div>
          </div>
          <br />

          <div>
            <p style={{padding: '0px 25px', color: '#000', lineHeight: 'normal'}}>Eye Colour</p>
            <div className="input-outer-div-select">
              <SelectSearch
                  options={         
                    eyeColorOptions.map(item => ( { name: item.name, value: item.name } ) )
                  }
                  search
                  placeholder="Search/Select option"
                  onChange={eye_colour => handleInputChange({ target: { value: eye_colour, name: 'eye_colour' } })}
                  value={eye_colour} />
            </div>
          </div>
          <br />


          <div>
            <p style={{padding: '0px 25px', color: '#000', lineHeight: 'normal'}}>Body Type</p>
            <div className="input-outer-div-select">
              <SelectSearch
                  options={         
                    bodyTypeOptions.map(item => ( { name: item.name, value: item.name } ) )
                  }
                  search
                  placeholder="Search/Select option"
                  onChange={body_type => handleInputChange({ target: { value: body_type, name: 'body_type' } })}
                  value={body_type} />
            </div>
          </div>
          <br />


          <div>
            <p style={{padding: '0px 25px', color: '#000', lineHeight: 'normal'}}>Smoke</p>
            <div className="input-outer-div-select">
               <SelectSearch
                  options={         
                    smokeTypeOptions.map(item => ( { name: item.name, value: item.name } ) )
                  }
                  search
                  placeholder="Search/Select option"
                  onChange={smoke => handleInputChange({ target: { value: smoke, name: 'smoke' } })}
                  value={smoke} />
            </div>
          </div>
          <br />


          <div>
            <p style={{padding: '0px 25px', color: '#000', lineHeight: 'normal'}}>Drink</p>
            <div className="input-outer-div-select">
              <SelectSearch
                  options={         
                    drinkTypeOptions.map(item => ( { name: item.name, value: item.name } ) )
                  }
                  search
                  placeholder="Search/Select option"
                  onChange={drink => handleInputChange({ target: { value: drink, name: 'drink' } })}
                  value={drink} />
            </div>
          </div>
          <br />

          <div>
            <p style={{padding: '0px 25px', color: '#000', lineHeight: 'normal'}}>Perfect Night Out</p>
            <div className="input-outer-div-select">
              <SelectSearch
                  options={         
                    night_outOptions.map(item => ( { name: item.name, value: item.id } ) )
                  }
                  search
                  placeholder="Search/Select option"
                  onChange={night_out => handleInputChange({ target: { value: night_out, name: 'night_out' } })}
                  value={night_out} />
            </div>
          </div>
          <br />

          <div>
            <p style={{padding: '0px 25px', color: '#000', lineHeight: 'normal'}}>Perfect Night in</p>
            <div className="input-outer-div-select">
              <SelectSearch
                  options={         
                    night_inOptions.map(item => ( { name: item.name, value: item.id } ) )
                  }
                  search
                  placeholder="Search/Select option"
                  onChange={night_in => handleInputChange({ target: { value: night_in, name: 'night_in' } })}
                  value={night_in} />
            </div>
          </div>
          <br />

          <div>
            <p style={{padding: '0px 25px', color: '#000', lineHeight: 'normal'}}>Personality</p>
            <div className="input-outer-div-select">
              <SelectSearch
                  options={         
                    personalityOptions.map(item => ( { name: item.name, value: item.id } ) )
                  }
                  search
                  placeholder="Search/Select option"
                  onChange={personality => handleInputChange({ target: { value: personality, name: 'personality' } })}
                  value={personality} />
            </div>
          </div>
          <br />
          </div>


        </div>

        <div style={{margin: '10px 10px 40px'}}>
          <button type="submit" className="button-A" style={{margin: 0}} onClick={handleUserProfile_UpdateData}>Update</button>
        </div>

      </div>
      </div>
    </main>

    <BottomTabs></BottomTabs> 
    {isLoading && <LoaderService />}
    </div>
  );
};

export default BottomTab1;