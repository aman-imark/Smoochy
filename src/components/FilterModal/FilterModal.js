import React, {useState, useEffect} from 'react';

import { IoChevronBack, IoAdd } from 'react-icons/io5';
import { IoCloseSharp } from 'react-icons/io5';

import './FilterModal.css';

import { getData } from '../../services/authService';

import gender_jsonI from '../../data/gender.json';
import have_children_jsonI from '../../data/have_children.json';
import why_here_jsonI from '../../data/why_here.json';
import personality_jsonI from '../../data/type_personality.json';

import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { getStore, setStore } from '../../services/storageService';
import { json, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setData } from '../../redux/filter/filterSlice';
import { showToast } from '../../services/toastService';

import SelectSearch from 'react-select-search';
import 'react-select-search/style.css';

const objectToAppend = { "id": 'any', "name": "Any" };


const gender_json = [objectToAppend, ...gender_jsonI];
const have_children_json = [objectToAppend, ...have_children_jsonI];
const why_here_json = [objectToAppend, ...why_here_jsonI];
const personality_json = [objectToAppend, ...personality_jsonI];



const age_json = [
  { "id": 0, "name": "Any" },
  { "id": 1, "name": "18-23" },
  { "id": 2, "name": "24-29" },
  { "id": 3, "name": "30-35" },
  { "id": 4, "name": "36-41" },
  { "id": 5, "name": "42-47" },
  { "id": 6, "name": "48-53" }   
];





const FilterModal = ({ onClose }) => {

  const dispatch = useDispatch();
  const filters = useSelector((state) => state.data);

  const navigate = useNavigate();


  const [token, setToken] = useState(localStorage.getItem('userToken') || null);
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [genderOptions, seGenderOptions] = useState([]);

  const [location, setLocation] = useState("");
  const [locationOptions, setLocationOptions] = useState([]);

  const [nationality, setNationality] = useState("");
  const [nationalityOptions, setNationalityOptions] = useState([]);

  const [ethnicity, setEthnicity] = useState("");
  const [ethnicityOptions, setEthnicityOptions] = useState([]);

  const [interest_creativity, setInterestCreativity] = useState('');
  const [creativityOptions, setCreativityOptions] = useState([]);

  const [interest_sports, setInterestSports] = useState('');
  const [sportsOptions, setSportsOptions] = useState([]);

  const [interest_general, setInterestGeneral] = useState('');
  const [gInterestOptions, setGInterestOptions] = useState([]);

  const [haveChildren, sethaveChildren] = useState("");
  const [haveChildrenOptions, setHaveChildrenOptions] = useState([]);

  const [wantChildren, setWantChildren] = useState("");
  const [wantChildrenOptions, setWantChildrenOptions] = useState([]);

  const [personalityType, setPersonalityType] = useState("");
  const [personalityOptions, setPersonalityOptions] = useState([]);

  const [night_out, setNightOut] = useState("");
  const [night_outOptions, setNightOutOptions] = useState([]);

  const [night_in, setNightIn] = useState("");
  const [night_inOptions, setNightInOptions] = useState([]);

  const [looking, setLooking] = useState("");
  const [relationshipOptions, setRelationshipOptions] = useState([]);


  useEffect(() => {
    handleLocation_Data();
    handleNationality_Data();
    handleEthnicity_Data();
    handleGeneralInterest_Data();
    handleSports_Data();
    handleCreativity_Data()
    handleNightIn_Data();
    handleNightOut_Data();
    handleHaveChildren_Data();
    handleWantChildren_Data();
    handleRelationship_Data();
    handlePersonality_Data();

     if(filters.age){
      setAge(filters.age);
     }
     if(filters.locationCom){
      setLocation(filters.locationCom);
     }
     if(filters.gender){
      setGender(filters.gender);
     }
     if(filters.natinationalityCom){
      setNationality(filters.natinationalityCom);
     }
     if(filters.ethnicity){
      setEthnicity(filters.ethnicity);
     }
     if(filters.creativity){
      setInterestCreativity(filters.creativity);
     }
     if(filters.sport){
      setInterestSports(filters.sport);
     }
     if(filters.general_interest){
      setInterestGeneral(filters.general_interest);
     }
     if(filters.night_in){
      setNightIn(filters.night_in);
     }
     if(filters.night_out){
      setNightOut(filters.night_out);
     }
     if(filters.like_have_children){
      sethaveChildren(filters.like_have_children);
     }
     if(filters.like_want_children){
      setWantChildren(filters.like_want_children);
     }
     if(filters.personality_type){
      setPersonalityType(filters.personality_type);
     }
     if(filters.why_here){
      setLooking(filters.why_here);
     }  
  }, []);


  const handleLocation_Data = () => {
    getData('/location', token).then((res) => { console.log(res)
       if(res.status === 'success'){ 
        // const newArray = res.data.map(item => ({
        //   value: item['id'],
        //   label: item['name']
        // }));
        // setLocationOptions(newArray);
        const objectToAppendB = { "id": '0', "name": "Any" };
        const ld = [objectToAppendB, ...res.data];      
        setLocationOptions(ld);
       }
      })
      .catch(error => {
        console.log(error);
      });
  };

  const handleNationality_Data = () => {
    getData('/nationality', '').then((res) => { console.log(res)
       if(res.status === 'success'){ 
        // const newArray = res.data.map(item => ({
        //   value: item['id'],
        //   label: item['name']
        // }));
        // setNationalityOptions(newArray);
        const objectToAppendB = { "id": '0', "country_name": " Any" };
        const nd = [objectToAppendB, ...res.data];      
        setNationalityOptions(nd);
      }
      })
      .catch(error => {
      });
  };
  const handleEthnicity_Data = () => {
    getData('/ethnicity', '').then((res) => { // console.log(res);
       if(res.status === 'success'){ 
        const nd = [objectToAppend, ...res.data];      
        setEthnicityOptions(nd);
       }
      })
      .catch(error => {
      });
  };
  const handleGeneralInterest_Data = () => {
    getData('/general-interest', '').then((res) => {  console.log(res);
       if(res.status === 'success'){ 
        const nd = [objectToAppend, ...res.data];      
        setGInterestOptions(nd);
       }
      })
      .catch(error => {
      });
  };
  const handleSports_Data = () => {
    getData('/interest-sports', '').then((res) => { //console.log(res);
       if(res.status === 'success'){ 
        const nd = [objectToAppend, ...res.data];      
        setSportsOptions(nd);
       }
      })
      .catch(error => {
      });
  };
  const handleCreativity_Data = () => {
    getData('/interest-creativity', '').then((res) => { //console.log(res);
       if(res.status === 'success'){ 
        const nd = [objectToAppend, ...res.data];      
        setCreativityOptions(nd);
       }
      })
      .catch(error => {
      });
  };
  const handleNightIn_Data = () => {
    getData('/interest-night-in', '').then((res) => { // console.log(res);
       if(res.status === 'success'){ 
        const nd = [objectToAppend, ...res.data];      
        setNightInOptions(nd);
        // setNightInOptions(res.data);
       }
      })
      .catch(error => {
      });
  };
  const handleNightOut_Data = () => {
    getData('/interest-night-out', '').then((res) => { // console.log(res);
       if(res.status === 'success'){ 
        const nd = [objectToAppend, ...res.data];      
        setNightOutOptions(nd);
        // setNightOutOptions(res.data);
       }
      })
      .catch(error => {
      });
  };
  const handleHaveChildren_Data = () => {
    getData('/interest-children', '').then((res) => {  console.log(res);
       if(res.status === 'success'){ 
        // setHaveChildrenOptions(res.data);
        const objectToAppendB = { "id": '0', "name": "Any" };
        const ld = [objectToAppendB, ...res.data];      
        setHaveChildrenOptions(ld);
       }
      })
      .catch(error => {
      });
  };
  const handleWantChildren_Data = () => {
    getData('/interest-children', '').then((res) => {  console.log(res);
       if(res.status === 'success'){ 
        // setWantChildrenOptions(res.data);
        const objectToAppendB = { "id": '0', "name": "Any" };
        const ld = [objectToAppendB, ...res.data];      
        setWantChildrenOptions(ld);
       }
      })
      .catch(error => {
      });
  };
  const handleRelationship_Data = () => {
    getData('/relationship', '').then((res) => {  console.log(res);
       if(res.status === 'success'){ 
        // setRelationshipOptions(res.data);
        const objectToAppendB = { "id": '0', "name": "Any" };
        const ld = [objectToAppendB, ...res.data];      
        setRelationshipOptions(ld);
       }
      })
      .catch(error => {
      });
  };

  const handlePersonality_Data = () => {
    getData('/personality', '').then((res) => { // console.log(res);
       if(res.status === 'success'){ 
        // setPersonalityOptions(res.data);
        const objectToAppendB = { "id": '0', "name": "Any" };
        const ld = [objectToAppendB, ...res.data];      
        setPersonalityOptions(ld);
       }
      })
      .catch(error => {
      });
  };




  const handleInputChange = (event) => {
    console.log(event.target)
    const { name, value } = event.target;
    // console.log(name +' : '+ value);


    if (name === 'age') {
      setAge(value);
    }
    if (name === 'location') {
      setLocation(value);
    }
    if (name === 'gender') {
      setGender(value);
    }
    if (name === 'nationality') {
      setNationality(value);
    }
    if (name === 'ethnicity') {
      setEthnicity(value);
    }
    if (name === 'creativity') {
      setInterestCreativity(value);
    }
    if (name === 'sport') {
      setInterestSports(value);
    }
    if (name === 'general') {
      setInterestGeneral(value);
    }
    if (name === 'night_in') {
      setNightIn(value);
    }
    if (name === 'night_out') {
      setNightOut(value);
    }
    if (name === 'have_children') {
      sethaveChildren(value);
    }
    if (name === 'want_children') {
      setWantChildren(value);
    }
    if (name === 'personality_type') {
      setPersonalityType(value);
    }
    if (name === 'looking') {
      setLooking(value);
    }
  };



  const closeModal = () => {
    let payload = {
      filterStatusSet: false
    };
    console.log(payload);
    onClose(payload);
  }



  const handleClearClick = ()=>{
    let payload = {
      age: '',
      gender: '',
      location: '',
      locationName: '',
      locationCom : '',
      nationality: '',
      nationName: '',
      natinationalityCom: '',
      ethnicity: '',
      creativity: '',
      sport: '',
      general_interest: '',
      night_in: '',
      night_out: '',
      like_have_children: '',
      like_want_children: '',
      personality_type: '',
      why_here: '',
      filterStatusSet: false
    };
    console.log(payload);
    try {
      dispatch(setData(payload))
      onClose(payload);
    } catch (error) {
      showToast('something went wrong','error')
    }
  }





  const handleFilterSearch = ()=>{
    if(nationality){
      const inputString = nationality;
      const parts = inputString.split('/');
      var nationId = parts[0]; 
      var nationName = parts[1];
    }
    if(location){
      const inputString = location;
      const parts = inputString.split('/');
      var locationId = parts[0]; 
      var locationName = parts[1];
    }

    let payload = {
      age: age,
      gender: gender,
      location: locationId,
      locationName: locationName,
      locationCom : location, 
      nationality: nationId,
      nationName: nationName,
      natinationalityCom : nationality,
      ethnicity: ethnicity,  
      creativity: interest_creativity,
      sport: interest_sports,
      general_interest: interest_general,  
      night_in: night_in,
      night_out: night_out,
      like_have_children: haveChildren,
      like_want_children: wantChildren,
      personality_type: personalityType,
      why_here: looking,
      filterStatusSet: true
    };
    console.log(payload);
    try {
      dispatch(setData(payload))
      onClose(payload);
    } catch (error) {
      showToast('something went wrong','error')
    }
  }




  return (
    // <div className={`modal ${isOpen ? 'open' : ''}`}   style={{backgroundColor: '#fff'}}>
    <div className="modal open"  style={{backgroundColor: ''}}>
    <div className="modal-content">
      <button className="close-button" onClick={closeModal}>
        <IoCloseSharp className="close-icon" style={{color: '#333', fontSize: 30}}></IoCloseSharp>
      </button>
  
      <div className="filterModal" style={{width: '100%', margin: 'auto', height: '100vh', overflowY: 'scroll'}}>

      <div style={{padding: 10}}>
          <div>
            <p style={{padding: '0px 25px', color: '#000', lineHeight: 'normal', textAlign: 'left'}}>Age</p>
            <div className="input-outer-divModal-select">
              <SelectSearch
                  options={         
                     age_json.map(item => ( { name: item.name, value: item.name } ) )
                  }
                  search
                  placeholder="Search/Select option"
                  onChange={age => handleInputChange({ target: { value: age, name: 'age' } })}
                  value={age} />
            </div>
          </div>
          <br/>



          <div>
            <p style={{padding: '0px 25px', color: '#000', lineHeight: 'normal', textAlign: 'left'}}>Location</p>
            <div className="input-outer-divModal-select">
              <SelectSearch
                  options={    
                    locationOptions.map(item => ( { name: item.name, value: item.id+'/'+item.name } ) )
                  }
                  search
                  placeholder="Search/Select option"
                  onChange={location => handleInputChange({ target: { value: location, name: 'location'} })}
                  value={location} />
            </div>
          </div>
          <br />


          <div>
            <p style={{padding: '0px 25px', color: '#000', lineHeight: 'normal', textAlign: 'left'}}>Gender</p>
            <div className="input-outer-divModal-select dashed-border">
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
            <p style={{padding: '0px 25px', color: '#000', lineHeight: 'normal', textAlign: 'left'}}>Nationality</p>
            <div className="input-outer-divModal-select">
              <SelectSearch
                  options={    
                    nationalityOptions.map(item => ( { name: item.country_name, value: item.id+'/'+item.country_name } ) )
                  }
                  search
                  placeholder="Search/Select option"
                  onChange={nationality => handleInputChange({ target: { value: nationality, name: 'nationality' } })}
                  value={nationality} />
            </div>
          </div>
          <br />

          <div>
            <p style={{padding: '0px 25px', color: '#000', lineHeight: 'normal', textAlign: 'left'}}>Ethnicity</p>
            <div className="input-outer-divModal-select">
              <SelectSearch
                  options={    
                    ethnicityOptions.map(item => ( { name: item.name, value: item.name } ) )
                  }
                  search
                  placeholder="Search/Select option"
                  onChange={ethnicity => handleInputChange({ target: { value: ethnicity, name: 'ethnicity'} })}
                  value={ethnicity} />
              </div>
          </div>
          <br />

    
          <div>
            <p style={{padding: '0px 25px', color: '#000', lineHeight: 'normal', textAlign: 'left'}}>Creativity</p>
            <div className="input-outer-divModal-select">
              <SelectSearch
                  options={    
                    creativityOptions.map(item => ( { name: item.name, value: item.name } ) )
                  }
                  search
                  placeholder="Search/Select option"
                  onChange={interest_creativity => handleInputChange({ target: { value: interest_creativity, name: 'creativity' } })}
                  value={interest_creativity} />
              </div>
          </div>
          <br />
          <div>
            <p style={{padding: '0px 25px', color: '#000', lineHeight: 'normal', textAlign: 'left'}}>Sports</p>
            <div className="input-outer-divModal-select">
              <SelectSearch
                  options={    
                    sportsOptions.map(item => ( { name: item.name, value: item.name } ) )
                  }
                  search
                  placeholder="Search/Select option"
                  onChange={interest_sports => handleInputChange({ target: { value: interest_sports, name: 'sport' } })}
                  value={interest_sports} />
              </div>
          </div>
          <br />
          <div>
            <p style={{padding: '0px 25px', color: '#000', lineHeight: 'normal', textAlign: 'left'}}>General Interest</p>
            <div className="input-outer-divModal-select">
              <SelectSearch
                  options={    
                    gInterestOptions.map(item => ( { name: item.name, value: item.name } ) )
                  }
                  search
                  placeholder="Search/Select option"
                  onChange={interest_general => handleInputChange({ target: { value: interest_general, name: 'general' } })}
                  value={interest_general} />
              </div>
          </div>
          <br />


          <div>
            <p style={{padding: '0px 25px', color: '#000', lineHeight: 'normal', textAlign: 'left'}}>Nights In</p>
            <div className="input-outer-divModal-select">
              <SelectSearch
                  options={    
                    night_inOptions.map(item => ( { name: item.name, value: item.name } ) )
                  }
                  search
                  placeholder="Search/Select option"
                  onChange={night_in => handleInputChange({ target: { value: night_in, name: 'night_in' } })}
                  value={night_in} />
            </div>
          </div>
          <br />


          <div>
            <p style={{padding: '0px 25px', color: '#000', lineHeight: 'normal', textAlign: 'left'}}>Nights Out</p>
            <div className="input-outer-divModal-select">
              <SelectSearch
                  options={    
                    night_outOptions.map(item => ( { name: item.name, value: item.name } ) )
                  }
                  search
                  placeholder="Search/Select option"
                  onChange={night_out => handleInputChange({ target: { value: night_out, name: 'night_out' } })}
                  value={night_out} />
            </div>
          </div>
          <br />

          <div>
            <p style={{padding: '0px 25px', color: '#000', lineHeight: 'normal', textAlign: 'left'}}>Do you have children?</p>
            <div className="input-outer-divModal-select">
              <SelectSearch
                  options={    
                    haveChildrenOptions.map(item => ( { name: item.name, value: item.name } ) )
                  }
                  search
                  placeholder="Search/Select option"
                  onChange={haveChildren => handleInputChange({ target: { value: haveChildren, name: 'have_children' } })}
                  value={haveChildren} />
            </div>
          </div>
          <br />
       

          <div>
            <p style={{padding: '0px 25px', color: '#000', lineHeight: 'normal', textAlign: 'left'}}>Do you want children?</p>
            <div className="input-outer-divModal-select">
              <SelectSearch
                  options={    
                    wantChildrenOptions.map(item => ( { name: item.name, value: item.name } ) )
                  }
                  search
                  placeholder="Search/Select option"
                  onChange={wantChildren => handleInputChange({ target: { value: wantChildren, name: 'want_children' } })}
                  value={wantChildren} />
            </div>
          </div>
          <br />


          <div>
            <p style={{padding: '0px 25px', color: '#000', lineHeight: 'normal', textAlign: 'left'}}>Personality Type</p>
            <div className="input-outer-divModal-select">
              <SelectSearch
                  options={    
                    personalityOptions.map(item => ( { name: item.name, value: item.name } ) )
                  }
                  search
                  placeholder="Search/Select option"
                  onChange={personalityType => handleInputChange({ target: { value: personalityType, name: 'personality_type' } })}
                  value={personalityType} />
            </div>
          </div>
          <br />




          <div>
            <p style={{padding: '0px 25px', color: '#000', lineHeight: 'normal', textAlign: 'left'}}>Looking for</p>
            <div className="input-outer-divModal-select">
              <SelectSearch
                  options={    
                    relationshipOptions.map(item => ( { name: item.name, value: item.name } ) )
                  }
                  search
                  placeholder="Search/Select option"
                  onChange={looking => handleInputChange({ target: { value: looking, name: 'looking' } })}
                  value={looking} />
            </div>
          </div>
          <br />

   
          <button className="button-C" type="button" onClick={handleFilterSearch}>Search</button>
          <button className="button-A" type="button" onClick={handleClearClick} style={{backgroundColor: '#333'}}>Clear Filter</button>

      </div>
      </div>
    </div>
    </div>
  );

};


export default FilterModal;
