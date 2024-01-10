import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';

import '../../App.css';

import BackButton from '../../components/BackButton';
import { IoChevronBack, IoAdd } from 'react-icons/io5';

import logoIcon from '../../assets/SVG/logo icon.svg';

import { getData, postFormData, postData } from '../../services/authService';
import { setStore, getStore, getUserToken } from '../../services/storageService';
import LoaderService from '../../services/loader';
import { showToast } from '../../services/toastService';

import Slider from '@mui/material/Slider';

import smoke_json from '../../data/smoke.json';
import drink_json from '../../data/drink.json';

import SelectSearch from 'react-select-search';
import { BsPlus } from 'react-icons/bs';





const BuildProfile = () => {

  // const history = useHistory();
  const [token, setToken] = useState(localStorage.getItem('userToken') || null);
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState(1);

  const [nationality, setNationality] = useState("");
  const [nationalityOptions, setNationalityOptions] = useState([]);

  const [ethnicity, setEthnicity] = useState("");
  const [ethnicityOptions, setEthnicityOptions] = useState([]);

  const [education, setEducation] = useState("");
  const [educationOptions, setEducationOptions] = useState([]);
  const [selectedButton_education, setSelectedButton_education] = useState(null);

  const [children, setChildren] = useState("");
  const [haveChildrenOptions, setHaveChildrenOptions] = useState([]);
  const [selectedButton_have_children, setSelectedButton_have_children] = useState(null);
  
  const [height, setHeight] = useState(180);

  const [eye_colour, setEyeColour] = useState("");
  const [eyeColorOptions, setEyeColorOptions] = useState([]);
  const [selectedButton_eye_colour, setSelectedButton_eye_colour] = useState(null);

  const [body_type, setBodyType] = useState("");
  const [bodyTypeOptions, setBodyTypeOptions] = useState([]);
  const [selectedButton_body_type, setSelectedButton_body_type] = useState(null);
 
  const [smoke, setSmoke] = useState("");
  const [smokeTypeOptions, setSmokeTypeOptions] = useState([]);
  const [selectedButton_smoke, setSelectedButton_smoke] = useState(null);

  const [drink, setDrink] = useState("");
  const [drinkTypeOptions, setDrinkTypeOptions] = useState([]);
  const [selectedButton_drink, setSelectedButton_drink] = useState(null);

  const [creativity, setCreativity] = useState([]);
  const [creativityOptions, setCreativityOptions] = useState([]);

  const [sports, setSports] = useState([]);
  const [sportsOptions, setSportsOptions] = useState([]);

  const [gInterest, setGInterest] = useState([]);
  const [gInterestOptions, setGInterestOptions] = useState([]);

  const [night_out, setNightOut] = useState("");
  const [night_outOptions, setNightOutOptions] = useState([]);

  const [night_in, setNightIn] = useState("");
  const [night_inOptions, setNightInOptions] = useState([]);

  const [personality, setPersonality] = useState("");
  const [personalityOptions, setPersonalityOptions] = useState([]);

  const formRef = useRef();

  const [about, setAbout] = useState('')
  const [image1, setImage1] = useState(null);
  const [image2, setImage2] = useState(null);
  const [image3, setImage3] = useState(null);
  const [image4, setImage4] = useState(null);
  const [image5, setImage5] = useState(null);


  useEffect(() => {
    console.log(token);
    if(token){
    }else{
      window.location.href = '/';
    }  

    handleNationality_Data();
    handleEthnicity_Data();
    handleEducation_Data();
    handleHaveChildren_Data();
    handleEyeColor_Data();
    handleBodyType_Data();
    handleSmoke_Data();
    handleDrink_Data();
    handleGeneralInterest_Data();
    handleNightIn_Data();
    handleNightOut_Data();
    handlePersonality_Data();
    handleSports_Data();
    handleCreativity_Data();
  }, []); // Empty dependency array means the effect runs only once, similar to componentDidMount



  const handleNationality_Data = () => {
    getData('/nationality', '').then((res) => {  console.log(res);
       if(res.status === 'success'){ 
        setNationalityOptions(res.data);
       }
      })
      .catch(error => {
      });
  };

  const handleEthnicity_Data = () => {
    getData('/ethnicity', '').then((res) => { // console.log(res);
       if(res.status === 'success'){ 
        setEthnicityOptions(res.data);
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


  const handleGeneralInterest_Data = () => {
    getData('/general-interest', '').then((res) => { // console.log(res);
       if(res.status === 'success'){ 
        setGInterestOptions(res.data);
       }
      })
      .catch(error => {
      });
  };

  const handleNightIn_Data = () => {
    getData('/interest-night-in', '').then((res) => { // console.log(res);
       if(res.status === 'success'){ 
        setNightInOptions(res.data);
       }
      })
      .catch(error => {
      });
  };

  const handleNightOut_Data = () => {
    getData('/interest-night-out', '').then((res) => { // console.log(res);
       if(res.status === 'success'){ 
        setNightOutOptions(res.data);
       }
      })
      .catch(error => {
      });
  };

  const handlePersonality_Data = () => {
    getData('/personality', '').then((res) => { // console.log(res);
       if(res.status === 'success'){ 
        setPersonalityOptions(res.data);
       }
      })
      .catch(error => {
      });
  };


  const handleSports_Data = () => {
    getData('/interest-sports', '').then((res) => { //console.log("interest-sports",res);
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
    getData('/interest-creativity', '').then((res) => { //console.log("interest-sports",res);
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


  const handleButtonClick_education = (buttonId, buttonName) => {
    setEducation('');
    setSelectedButton_education(null);
    if (selectedButton_education === buttonId) {
      setEducation('');
      setSelectedButton_education(null);
    } else {
      setSelectedButton_education(buttonId);
      setEducation(buttonName);
    }
  };

  const handleButtonClick_have_children = (buttonId, buttonName) => {
    setChildren('');
    setSelectedButton_have_children(null);
    if (selectedButton_have_children === buttonId) {
      setChildren('');
      setSelectedButton_have_children(null);
    } else {
      setSelectedButton_have_children(buttonId);
      setChildren(buttonName);
    }
  };

  const handleButtonClick_eye_colour = (buttonId, buttonName) => {
    setEyeColour('');
    setSelectedButton_eye_colour(null);
    if (selectedButton_eye_colour === buttonId) {
      setEyeColour('');
      setSelectedButton_eye_colour(null);
    } else {
      setSelectedButton_eye_colour(buttonId);
      setEyeColour(buttonName);
    }
  };

  const handleButtonClick_body_type = (buttonId, buttonName) => {
    setBodyType('');
    setSelectedButton_body_type(null);
    if (selectedButton_body_type === buttonId) {
      setBodyType('');
      setSelectedButton_body_type(null);
    } else {
      setSelectedButton_body_type(buttonId);
      setBodyType(buttonName);
    }
  };

  const handleButtonClick_smoke = (buttonId, buttonName) => {
    setSmoke('');
    setSelectedButton_smoke(null);
    if (selectedButton_smoke === buttonId) {
      setSmoke('');
      setSelectedButton_smoke(null);
    } else {
      setSelectedButton_smoke(buttonId);
      setSmoke(buttonName);
    }
  };

  const handleButtonClick_drink = (buttonId, buttonName) => {
    setDrink('');
    setSelectedButton_drink(null);
    if (selectedButton_drink === buttonId) {
      setDrink('');
      setSelectedButton_drink(null);
    } else {
      setSelectedButton_drink(buttonId);
      setDrink(buttonName);
    }
  };


  const handleButtonClick_Creativity = (values) => {
    if (creativity.includes(values)) {
      setCreativity(creativity.filter((s) => s !== values));
    } else {
      setCreativity([...creativity, values]);
    }
  }
  

  const handleButtonClick_Sports = (values) => {
    if (sports.includes(values)) {
      // If sport is already selected, remove it from the selection
      setSports(sports.filter((s) => s !== values));
    } else {
      // If sport is not selected, add it to the selection
      setSports([...sports, values]);
    }
  }
  
  const handleButtonClick_gInterest = (values) => {
    if (gInterest.includes(values)) {
      setGInterest(gInterest.filter((s) => s !== values));
    } else {
      setGInterest([...gInterest, values]);
    }
  }


  const handleNextStep = () => {
    setStep(step + 1);
  };

  const handlePreviousStep = () => {
    setStep(step - 1);
  };


  const handleSliderChange = (event, value) => {
    setHeight(value);
  };

  const convertToFeetInches = (centimeters) => {
    const feet = Math.floor(centimeters / 30.48);
    const inches = Math.round((centimeters % 30.48) / 2.54);
    return `${feet}'${inches}"`;
  };


  // Image selection 1
  const fileInputRef1 = useRef(null);
  const handleButtonClick1 = () => {
    fileInputRef1.current.click();
  };
  const handleFileSelected1 = (event) => {
    const selectedFile = event.target.files[0];
    // console.log(selectedFile);
    if (selectedFile) {
      const reader = new FileReader();
      reader.onload = () => {
        setImage1(reader.result);
      };
      reader.readAsDataURL(selectedFile);
    }
  };


  // Image selection 2
  const fileInputRef2 = useRef(null);
  const handleButtonClick2 = () => {
    fileInputRef2.current.click();
  };
  const handleFileSelected2 = (event) => {
    const selectedFile = event.target.files[0];
    // console.log(selectedFile);
    if (selectedFile) {
      const reader = new FileReader();
      reader.onload = () => {
        setImage2(reader.result);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  // Image selection 3
  const fileInputRef3 = useRef(null);
  const handleButtonClick3 = () => {
    fileInputRef3.current.click();
  };
  const handleFileSelected3 = (event) => {
    const selectedFile = event.target.files[0];
    // console.log(selectedFile);
    if (selectedFile) {
      const reader = new FileReader();
      reader.onload = () => {
        setImage3(reader.result);
      };
      reader.readAsDataURL(selectedFile);
    }
  };


  // Image selection 4
  const fileInputRef4 = useRef(null);
  const handleButtonClick4 = () => {
    fileInputRef4.current.click();
  };
  const handleFileSelected4 = (event) => {
    const selectedFile = event.target.files[0];
    // console.log(selectedFile);
    if (selectedFile) {
      const reader = new FileReader();
      reader.onload = () => {
        setImage4(reader.result);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  // Image selection 5
  const fileInputRef5 = useRef(null);
  const handleButtonClick5 = () => {
    fileInputRef5.current.click();
  };
  const handleFileSelected5 = (event) => {
    const selectedFile = event.target.files[0];
    // console.log(selectedFile);
    if (selectedFile) {
      const reader = new FileReader();
      reader.onload = () => {
        setImage5(reader.result);
      };
      reader.readAsDataURL(selectedFile);
    }
  };



  const handleInputChange = (event) => {
    const { name, value } = event.target;
    console.log(name +' : '+ value);

    if (name === 'nationality') {
      setNationality(value);
    }
    if (name === 'ethnicity') {
      setEthnicity(value);
    }
    if (name === 'education') {
      setEducation(value);
    }
    if (name === 'children') {
      setChildren(value);
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
    if (name === 'gInterest') {
      setGInterest(value);
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
    if (name === 'about') {
      setAbout(value);
    }
  };


  
  const handleFormSubmit = (event) => {
      event.preventDefault();
  };


  const handleSubmitOutside = () => {
    if (formRef.current) {
      // formRef.current.submit(); // Programmatically submit the form
      const newErrors = {};

      const payload = {
        nationality: nationality,
        ethnicity: ethnicity,
        education: education,
        like_have_children: children,
        height: height,
        eye_colour: eye_colour,
        body_type: body_type,
        do_smoke: smoke,
        do_drink: drink,
        creativity: creativity,
        sports: sports,
        general_interest: gInterest,
        like_night_out: night_out,
        like_night_in: night_in,
        personality: personality,
        about: about,
        image1: image1,
        image2: image2,
        image3: image3,
        image4: image4,
        image5: image5,
      }
      console.log('Build profile: ',payload);
      console.log('Outside button form submit worked');

      setIsLoading(true);
      postData('/build-profile', payload, token).then((res) => {
        console.log(res);
        setIsLoading(false);
        if(res.status === 'success'){ 
         showToast('Profile Updated.', 'success');
         window.location.href = '/';
        }
       })
       .catch(error => {
         setIsLoading(false);
         console.log(error)
          showToast('Server side issue!', 'error');
       });
    };
  }




  return (
    <div className="main-container">
      <div className="top-header-content">
        <div className="top-progress-bar">
          <progress value={step} max={13} id="myProgress"></progress>
        </div>
        <div style={{textAlign: 'center'}}>
        {step === 1 && (
            <Link to="/">
              <button className="back-button">
                <IoChevronBack
                  style={{ fontSize: 18, color: "#733faa", marginRight: 12 }}
                ></IoChevronBack>
                <span className="back-button-text">Back</span>
              </button>
            </Link>
        )}
        {step > 1 && (
            <button className="back-button" onClick={handlePreviousStep}>
              <IoChevronBack
                style={{ fontSize: 18, color: "#733faa", marginRight: 12 }}
              ></IoChevronBack>
              <span className="back-button-text">Back</span>
            </button>
        )}
        </div>
      </div>


      <main className="centered-content" style={{flex : 7.5}}>
      <form ref={formRef} onSubmit={handleFormSubmit}>
        {step === 1 && (
          <div>
            <h2>What is your Nationality?</h2>
            <div style={{marginBlock: '20%'}}>
            <div className="input-outer-div-select">
              <SelectSearch
                  options={    
                    nationalityOptions.map(item => ( { name: item.country_name, value: item.id } ) )
                  }
                  search
                  placeholder="Search/Select option"
                  onChange={nationality => handleInputChange({ target: { value: nationality, name: 'nationality'} })}
                  value={nationality} />
            </div>          
            </div>
          </div>
        )}
        {step === 2 && (
          <div>
            <h2>What is your Ethnicity?</h2>
            <div style={{marginBlock: '20%'}}>
            <div className="input-outer-div-select">
              <SelectSearch
                  options={    
                    ethnicityOptions.map(item => ( { name:                                                                                                                                                                                                                                                                                                                                                                                                          item.name, value: item.id } ) )
                  }
                  search
                  placeholder="Search/Select option"
                  onChange={ethnicity => handleInputChange({ target: { value: ethnicity, name: 'ethnicity'} })}
                  value={ethnicity} />
            </div>
            </div>
          </div>
        )}
        {step === 3 && (
          <div>
            <h2>What is your education?</h2>
            <div style={{marginBlock: '10%'}}>
              <div style={{display: 'flex', flexDirection: 'column'}}> 
                  {educationOptions.map((button) => (
                    <button className="selectableButton"
                      key={button.id} type="button"
                      onClick={() => handleButtonClick_education(button.id, button.name)}
                      style={{ backgroundColor: selectedButton_education === button.id ? '#733faa' : '#F4F4F4', 
                      color: selectedButton_education === button.id ? '#ffffff' : '#733faa', fontWeight: 500, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>{button.name}</button>
                  ))}
              </div>
            </div>
          </div>
        )}
        {step === 4 && (
          <div>
          <h2>Would you like to <br /> have children?</h2>
          <div style={{marginBlock: '10%'}}>
            <div style={{display: 'flex', flexDirection: 'column'}}> 
                {haveChildrenOptions.map((button) => (
                  <button className="selectableButton"
                    key={button.id} type="button"
                    onClick={() => handleButtonClick_have_children(button.id, button.name)}
                    style={{ backgroundColor: selectedButton_have_children === button.id ? '#733faa' : '#F4F4F4', 
                    color: selectedButton_have_children === button.id ? '#ffffff' : '#733faa', fontWeight: 500, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>{button.name}</button>
                ))}
            </div>
          </div>
        </div>
        )}
        {step === 5 && (
          <div style={{marginBlock: '20%'}}>
            <h2>How tall are you?</h2>
            <input type="text" value={`${convertToFeetInches(height)} (${height}cm)`} className="centered-input" readOnly />
            <br />
            <div>
              <Slider
                value={height}
                onChange={handleSliderChange}
                min={100}
                max={250}
                step={1}
                // marks={[
                //   { value: 100, label: convertToFeetInches(100) },
                //   { value: 150, label: convertToFeetInches(150) },
                //   { value: 200, label: convertToFeetInches(200) },
                //   { value: 250, label: convertToFeetInches(250) },
                // ]}
              />
              {/* <div>{`${height} cm (${convertToFeetInches(height)})`}</div>
              <div>{`${convertToFeetInches(height)} (${height}cm)`}</div> */}
            </div>
          </div>
        )}
        {step === 6 && (
          <div>
            <h2>What is your <br /> eye colour?</h2>
            <div style={{marginBlock: '10%'}}>
              <div style={{display: 'flex', flexDirection: 'column'}}> 
                {eyeColorOptions.map((button) => (
                  <button className="selectableButton"
                    key={button.id} type="button"
                    onClick={() => handleButtonClick_eye_colour(button.id, button.name)}
                    style={{ backgroundColor: selectedButton_eye_colour === button.id ? '#733faa' : '#F4F4F4', 
                    color: selectedButton_eye_colour === button.id ? '#ffffff' : '#733faa', fontWeight: 500, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>{button.name}</button>
                ))}
              </div>
  
            </div>
          </div>
        )}
        {step === 7 && (
          <div>
            <h2>What is your <br /> Body type?</h2>
            <div style={{marginBlock: '15%'}}>
              <div style={{display: 'flex', flexDirection: 'column'}}> 
                {bodyTypeOptions.map((button) => (
                  <button className="selectableButton"
                    key={button.id} type="button"
                    onClick={() => handleButtonClick_body_type(button.id, button.name)}
                    style={{ backgroundColor: selectedButton_body_type === button.id ? '#733faa' : '#F4F4F4', 
                    color: selectedButton_body_type === button.id ? '#ffffff' : '#733faa', fontWeight: 500, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>{button.name}</button>
                ))}
              </div>  
            </div>
          </div>
        )}
        {step === 8 && (
          <div>
            <h2>Do you smoke?</h2>
            <div style={{marginBlock: '15%'}}>
              <div style={{display: 'flex', flexDirection: 'column'}}> 
                {smokeTypeOptions.map((button) => (
                  <button className="selectableButton"
                    key={button.id} type="button"
                    onClick={() => handleButtonClick_smoke(button.id, button.name)}
                    style={{ backgroundColor: selectedButton_smoke === button.id ? '#733faa' : '#F4F4F4', 
                    color: selectedButton_smoke === button.id ? '#ffffff' : '#733faa', fontWeight: 500, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>{button.name}</button>
                ))}
              </div>
  
            </div>
          </div>
        )}
        {step === 9 && (
          <div>
            <h2>Do you drink?</h2>
            <div style={{marginBlock: '15%'}}>
              <div style={{display: 'flex', flexDirection: 'column'}}> 
                {drinkTypeOptions.map((button) => (
                  <button className="selectableButton"
                    key={button.id} type="button"
                    onClick={() => handleButtonClick_drink(button.id, button.name)}
                    style={{ backgroundColor: selectedButton_drink === button.id ? '#733faa' : '#F4F4F4', 
                    color: selectedButton_drink === button.id ? '#ffffff' : '#733faa', fontWeight: 500, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>{button.name}</button>
                ))}
              </div>
  
            </div>
          </div>
        )}
        {step === 10 && (
          <div>
            <h2>Things you love</h2> 
            <div style={{marginBlock: '10%'}}>
              <h4>Creativity</h4> <br/>
              <div className="chip-container" style={{justifyContent: 'start', paddingInline: 8}}> 
                  {creativityOptions.map((button) => (
                    <button className="selectableButton2"
                      key={button.id} type="button"
                      onClick={() => handleButtonClick_Creativity(button.name)}
                      style={{ width: 'auto !important', minWidth: 80, backgroundColor: creativity.includes(button.name) ? '#733faa' : '#F4F4F4', 
                      color: creativity.includes(button.name) ? '#ffffff' : '#733faa', fontWeight: 500}}>{button.name}</button>
                  ))}
              </div>
              <br />  <br/> 
              <h4>Sports</h4>  <br/> 
              <div className="chip-container"  style={{justifyContent: 'start', paddingInline: 8}}> 
                  {sportsOptions.map((button) => (
                    <button className="selectableButton2"
                      key={button.id} type="button"
                      onClick={() => handleButtonClick_Sports(button.name)}
                      style={{ width: 'auto !important', minWidth: 80, backgroundColor: sports.includes(button.name) ? '#733faa' : '#F4F4F4', 
                      color: sports.includes(button.name) ? '#ffffff' : '#733faa', fontWeight: 500}}>{button.name}</button>
                  ))}
              </div>
            </div>
          </div>
        )}
        {step === 11 && (
          <div style={{marginBlock: '15%'}}>
            <div>
            <h2>Where do you like to <br /> go on a night out?</h2> <br />
            <div className="input-outer-div-select">
              <SelectSearch
                  options={    
                    night_outOptions.map(item => ( { name: item.name, value: item.id } ) )
                  }
                  search
                  placeholder="Search/Select option"
                  onChange={night_out => handleInputChange({ target: { value: night_out, name: 'night_out'} })}
                  value={night_out} />
            </div>
            <br /><br /> <br />
            <h2>What do you like to <br /> do on a night in?</h2> <br />
            <div className="input-outer-div-select">
              <SelectSearch
                  options={    
                    night_inOptions.map(item => ( { name: item.name, value: item.id } ) )
                  }
                  search
                  placeholder="Search/Select option"
                  onChange={night_in => handleInputChange({ target: { value: night_in, name: 'night_in'} })}
                  value={night_in} />
            </div>

            </div>
          </div>
        )}
        {step === 12 && (
          <div>
            <h2>General Interest</h2>
            <div style={{marginBlock: '15%'}}>
              <div className="chip-container" style={{justifyContent: 'start', paddingInline: 8}}> 
                  {gInterestOptions.map((button) => (
                    <button className="selectableButton2"
                      key={button.id} type="button"
                      onClick={() => handleButtonClick_gInterest(button.name)}
                      style={{ width: 'auto !important', minWidth: 80, backgroundColor: gInterest.includes(button.name) ? '#733faa' : '#F4F4F4', 
                      color: gInterest.includes(button.name) ? '#ffffff' : '#733faa', fontWeight: 500}}>{button.name}</button>
                  ))}
              </div>
            </div>
          </div>
        )}
        {step === 13 && (
          <div style={{marginBottom: '30%'}}>
            <h2>What is your type <br /> of personality?</h2>
            <div className="input-outer-div-select">
              <SelectSearch
                  options={    
                    personalityOptions.map(item => ( { name: item.name, value: item.id } ) )
                  }
                  search
                  placeholder="Search/Select option"
                  onChange={personality => handleInputChange({ target: { value: personality, name: 'personality'} })}
                  value={personality} />
            </div>
            <br /> <br />

            <h2>Tell us about yourself</h2>
            <div className="input-outer-div" style={{minHeight: 150}}>
                <textarea id="about" rows="4" cols="50" className="left-input-textarea" style={{color: '#333', height: 130}}
                name="about" onChange={handleInputChange}/>
            </div>
       
          </div>
        )}
        {/* {step === 14 && (
          <div style={{marginBottom: '30%'}}>
            <h2>Add more Photos here...</h2>
            <div className="parent-div-profile">
            <div className="row-profile">
            <div className="child-div-profile item2" style={{backgroundImage: `url(${image1})`}}>
            <button type="button" className="icon-button" style={{height: '100%'}} onClick={handleButtonClick1}>
            <BsPlus style={{fontSize: 25}}/>
            <input type="file" style={{ display: 'none' }} ref={fileInputRef1} onChange={handleFileSelected1}/>
            </button>
            </div> 
            </div>
            
            <div className="row-profile">
            <div className="child-div-profile item2" style={{backgroundImage: `url(${image2})`}}>
            <button type="button" className="icon-button" style={{height: '100%'}} onClick={handleButtonClick2}>
            <BsPlus style={{fontSize: 25}}/>
            <input type="file" style={{ display: 'none' }} ref={fileInputRef2} onChange={handleFileSelected2}/>
            </button>
            </div> 
            <div className="child-div-profile item2" style={{backgroundImage: `url(${image3})`}}>
            <button type="button" className="icon-button" style={{height: '100%'}} onClick={handleButtonClick3}>
            <BsPlus style={{fontSize: 25}}/>
            <input type="file" style={{ display: 'none' }} ref={fileInputRef3} onChange={handleFileSelected3}/>
            </button>
            </div>  
            </div>

            <div className="row-profile">
            <div className="child-div-profile item2" style={{backgroundImage: `url(${image4})`}}>
            <button type="button" className="icon-button" style={{height: '100%'}} onClick={handleButtonClick4}>
            <BsPlus style={{fontSize: 25}}/>
            <input type="file" style={{ display: 'none' }} ref={fileInputRef4} onChange={handleFileSelected4}/>
            </button>
            </div>  
            <div className="child-div-profile item2" style={{backgroundImage: `url(${image5})`}}>
            <button type="button" className="icon-button" style={{height: '100%'}} onClick={handleButtonClick5}>
            <BsPlus style={{fontSize: 25}}/>
            <input type="file" style={{ display: 'none' }} ref={fileInputRef5} onChange={handleFileSelected5}/>
            </button>
            </div>  
            </div>

            </div>
            <br /> 
          </div>
        )} */}

      </form>
      
      </main>

      <div className="bottom-footer-content" style={{flex : 1.5}}>
        <div style={{width: '100%'}}>
          {step !==  13 && (
          <>
          <div>
            <button type="button" className="button-A" onClick={handleNextStep}>Continue</button>
          </div>
          <br /> 
          <button className="a-button" onClick={handleNextStep}>Skip</button>
          </>
          )}
          {step ===  13 && (
          <>
          <div>
              {/* <button type="button" className="button-A" onClick={handleSubmitOutside}>Submit</button> */}
            <button type="button" className="button-A" onClick={handleSubmitOutside}>Submit</button>
          </div>
          <br /> 
          <Link to="/bottomTab2">
            <button className="a-button">Add Later</button>
          </Link>
          </>
          )}          
        </div>
      </div>

      {isLoading && <LoaderService />}
    </div>
  )

};

export default BuildProfile;