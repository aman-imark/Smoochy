import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../App.css";
import BackButton from "../../components/BackButton";
import { IoChevronBack } from "react-icons/io5";
import { BsPlus } from "react-icons/bs";
import { BiPound } from "react-icons/bi";

import logoIcon from "../../assets/SVG/logo icon.svg";

import IdentifyModal from "../../components/IdentifModal/IdentifyModal";
import TermsModal from "../../components/TermsModal";

import { register, getData, postData, postFormData } from "../../services/authService";
import LoaderService from "../../services/loader";
import { setStore } from "../../services/storageService";
import { showToast } from "../../services/toastService";

import { loadStripe, StripeCardElement, useStripe } from "@stripe/stripe-js";
import { collection, doc, documentId, onSnapshot, 
         query, setDoc, Timestamp, where } from "firebase/firestore";

import { db } from "../../firebase";
import gender_json from "../../data/gender.json";

// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";


import Input from 'react-phone-number-input/input';
import { usePhoneInput } from 'react-phone-number-input';
 
import SelectSearch from 'react-select-search';
import 'react-select-search/style.css';

import PhoneInput from 'react-phone-number-input'
import 'react-phone-number-input/style.css';

import { DatePicker } from 'react-responsive-datepicker'
import 'react-responsive-datepicker/dist/index.css'


const Signup = () => {
  const navigate = useNavigate();

  const [signupFormData, setSignupFormData] = useState(localStorage.getItem('signupFormDataStore') || null);

  // const stripe = await loadStripe('pk_test_51BTUDGJAJfZb9HEBwDg86TN1KNprHjkfipXmEDMb0gSCassK5T3ZfxsAbcgKVmAIXF7oZ6ItlZZbXO6idTHE67IM007EwQ4uN3');

  const currentDate = new Date();
  const [step, setStep] = useState(1);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const [errors, setErrors] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [date, setDate] = useState(currentDate);
  const [month, setMonth] = useState(currentDate);
  const [year, setYear] = useState(currentDate);
  const [dob, setDob] = useState(null);
  const [gender, setGender] = useState("");

  const [modalGender, setModalGender] = useState("");

  const [why_here, setWhy_here] = useState("");
  const [relationshipOptions, setRelationshipOptions] = useState([]);

  const [location, setLocation] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [selectedCountry, setSelectedCountry] = useState('US');

  const [password, setPassword] = useState("");
  const [plan, setPlan] = useState(null);
  const [planPrice, setPlanPrice] = useState("");
  const [payment, setPayment] = useState("");

  const gender_firstPhase = gender_json.slice(0, 2);

  const [locationData, setLocationData] = useState([]);
  const [planData, setPlanData] = useState([]);
  const [selectedButton_gender, setSelectedButton_gender] = useState(null);
  const [selectedButton_why_here, setSelectedButton_why_here] = useState(null);
  const [selectedButton_plan, setSelectedButton_plan] = useState(null);

  const [isModal_Identify, setIsModal_Identify] = useState(false);

  const [isNo_abuse, setIsNo_abuse] = useState(false);
  const [isRespect_one, setIsRespect_one] = useState(false);
  const [isRespect_people, setIsRespect_people] = useState(false);
  const [isGive_bankDetails, setIsGive_bankDetails] = useState(false);

  const [isChecked_Terms, setIsChecked_Terms] = useState(false);
  const [isModal_Terms, setIsModal_Terms] = useState(false);
  const [isChecked_Consent, setIsChecked_Consent] = useState(false);

  const [isOpen, setIsOpen] = React.useState(false);
  const formRef = useRef();


  // Image selection
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
        setImage(reader.result);
      };
      reader.readAsDataURL(selectedFile);
      setIsButtonDisabled(false);
    }
  };




  // Gender male/female
  const [button1Selected, setButton1Selected] = useState(false);
  const [button2Selected, setButton2Selected] = useState(false);
  const handleButton1Click = () => {
    setButton1Selected(!button1Selected);
    setButton2Selected(false);
  };
  const handleButton2Click = () => {
    setButton2Selected(!button2Selected);
    setButton1Selected(false);
  };

  const openModalIdentify = () => {
    console.log(selectedButton_gender);
    setSelectedButton_gender("");
    setGender("");
    setIsModal_Identify(true);
  };

  const closeModalIdentify = (modalValue) => {
    setIsModal_Identify(false);
    setModalGender(modalValue);

    if (modalValue) {
      setGender(modalValue);
    } else {
      setGender("");
    }
  };

  const removeModalSelectableGender = (modalValue) => {
    setGender("");
    setModalGender("");
  };









  useEffect(() => {
    getPlan_Data();
    getLocation_Data();
    handleRelationship_Data();

    const storedFormData = JSON.parse(localStorage.getItem('signupFormDataStore'));
    console.log(JSON.parse(localStorage.getItem('signupFormDataStore')));
    if (storedFormData) {
      // Parse the JSON data and set it to your form state
      // setSignupFormData(JSON.parse(storedFormData));

      if(gender_firstPhase){
      const buttonsWithSpecificValueA = gender_firstPhase.filter(
        (button) => button.name === storedFormData.gender
      );
      buttonsWithSpecificValueA.forEach((button) => {
      setSelectedButton_gender(button.id);
      });
      console.log(buttonsWithSpecificValueA)
      }

      if(relationshipOptions){
        console.log(relationshipOptions)
        const buttonsWithSpecificValueB = relationshipOptions.filter(
          (button) => button.name === storedFormData.why_here
        );
        console.log(buttonsWithSpecificValueB)
        buttonsWithSpecificValueB.forEach((button) => {
        setSelectedButton_why_here(button.id);
        });
      }

      setStep(8);
      setName(storedFormData.name);
      setImage(storedFormData.image);
      setDob(storedFormData.dob);
      setGender(storedFormData.gender);
      setWhy_here(storedFormData.why_here);
      setLocation(storedFormData.location);
      setEmail(storedFormData.email);
      setPhone(storedFormData.phone);
      setPassword(storedFormData.password);
      console.log('Step value: ', step)
      console.log('Yes, have form data storage');

    }else{
      console.log('nothing in form store');
    }
  }, []); // Empty dependency array means the effect runs only once, similar to componentDidMount



  const getPlan_Data = () => {
    getData("/plan", "")
      .then((res) => {
        // console.log(res);
        if (res.status === "success") {
          setPlanData(res.data);
        } else if (res.error) {
          setErrors(res.error);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getLocation_Data = () => {
    getData("/location", "")
      .then((res) => {
        console.log(res);
        if (res.status === "success") {
          const newArray = res.data.map((item) => ({
            value: item["id"],
            name: item["name"],
          }));
          // setLocationData(newArray);
          setLocationData(newArray);
        } else if (res.error) {
          setErrors(res.error);
        }
      })
      .catch((error) => {
        console.log(error);
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





  function formatDate(dateString) {
    const options = { day: "2-digit", month: "2-digit", year: "numeric" };
    const formattedDate = new Date(dateString).toLocaleDateString(
      "en-US",
      options
    );
    return formattedDate;
  }



  const handleCheckboxNo_abuse = () => {
    setIsNo_abuse(!isNo_abuse);
  };
  const handleCheckboxRespect_one = () => {
    setIsRespect_one(!isRespect_one);
  };
  const handleCheckboxRespect_people = () => {
    setIsRespect_people(!isRespect_people);
  };
  const handleCheckboxGive_bankDetails = () => {
    setIsGive_bankDetails(!isGive_bankDetails);
  };


  const handleCheckboxChange_Terms = () => {
    setIsChecked_Terms(!isChecked_Terms);
  };

  const handleCheckboxConsent = () => {
    setIsChecked_Consent(!isChecked_Consent);
  };


  const handleButtonClick_gender = (buttonId, buttonName) => {
    setModalGender("");
    setSelectedButton_gender(null);
    if (selectedButton_gender === buttonId) {
      setSelectedButton_gender(null);
      setGender("");
    } else {
      setSelectedButton_gender(buttonId);
      setGender(buttonName);
    }
  };

  const handleButtonClick_why_here = (buttonId, buttonName) => {
    setWhy_here("");
    setSelectedButton_why_here(null);
    if (selectedButton_why_here === buttonId) {
      setSelectedButton_why_here(null);
      setWhy_here("");
    } else {
      setSelectedButton_why_here(buttonId);
      setWhy_here(buttonName);
    }
  };

  const handleButtonClick_Plan = (planId, price) => {
    setPlan("");
    setPlanPrice("");
    setSelectedButton_plan(null);
    if (selectedButton_plan === planId) {
      setSelectedButton_plan(null);
      setPlan("");
      setPlanPrice("");
    } else {
      setSelectedButton_plan(planId);
      setPlan(planId);
      setPlanPrice(price);
    }
  };



  const handleInputChange = (event) => {
    const { name, value } = event.target;
    // console.log(name + " : " + value);

    switch (name) {
      case "name":
        setName(value);
        break;
      case "image":
        setImage(value);
        break;
      case "dob":
        setDob(value);
        break;
      case "gender":
        setGender(value);
        break;
      case "why_here":
        setWhy_here(value);
        break;
      case "location":
        setLocation(value);
        break;
      case "email":
        setEmail(value);
        break;
      case "phone":
        setPhone(value);
        break;
      case "password":
        setPassword(value);
        break;
      case "plan":
        setPlan(value);
        break;
      case "terms":
        setIsChecked_Terms(value);
        break;
      default:
        break;
    }
  };

  const handleSpaceKeyDown = (event) => {
    if (event.key === ' ') {
      event.preventDefault(); // Prevent the space character from being entered
    }
    if(event.target.name === 'dob'){
      if (event.key === '') {
        event.preventDefault(); // Prevent the space character from being entered
      }
      if(event.target.value) {
        event.preventDefault(); 
      }
    }
  };

  const validateStepOne = () => {
    let stepOneErrors = {};
    let isValid = true;

    if (name.trim().length === 0) {
      stepOneErrors.name = "Name is required, and cannot be empty!";
      isValid = false;
    }
    setErrors(stepOneErrors);
    setStep(1)
    return isValid;
  };

  const validateStepTwo = () => {
    let stepTwoErrors = {};
    let isValid = true;

    if (image.trim() === "") {
      stepTwoErrors.image = "First Image selection is required!";
      isValid = false;
    }
    setErrors(stepTwoErrors);
    return isValid;
  };

  const validateStepThree = () => {
    let stepThreeErrors = {};
    let isValid = true;
    console.log('Dob:  ', dob)
    if (dob === "" || dob === null) {
      stepThreeErrors.dob = "Date of Birth is required!";
      isValid = false;
    }
    setErrors(stepThreeErrors);
    return isValid;
  };

  const validateStepFour = () => {
    let stepFourErrors = {};
    let isValid = true;

    if (gender === "") {
      stepFourErrors.gender = "Gender is required!";
      isValid = false;
    }
    setErrors(stepFourErrors);
    return isValid;
  };

  const validateStepFive = () => {
    let stepFiveErrors = {};
    let isValid = true;

    if (why_here === "") {
      stepFiveErrors.why_here = "Why here is required!";
      isValid = false;
    }
    setErrors(stepFiveErrors);
    return isValid;
  };

  const validateStepSix = () => {
    let stepSixErrors = {};
    let isValid = true;
    if (location === "") {
      stepSixErrors.location = "Location is required!";
      isValid = false;
    }
    setErrors(stepSixErrors);
    return isValid;
  };

  const validateStepSeven = () => {
    let stepSevenErrors = {};
    let isValid = true;

    if (!email) {
      isValid = false;
      stepSevenErrors.email = 'Email is required';
    } else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
      isValid = false;
      stepSevenErrors.email = 'Email is invalid';
    }

    if (phone === "") {
      stepSevenErrors.phone = "Phone number is required!";
      isValid = false;
    }

    if (password === "") {
      stepSevenErrors.password = "Pasword is required!";
      isValid = false;
    }

    if (password.length < 8) {
      stepSevenErrors.password =
        "Password should be at least 8 characters long!";
      isValid = false;
    }

    setErrors(stepSevenErrors);
    return isValid;
  };

  const validateStepEight = () => {
    let stepEightErrors = {};
    let isValid = true;
    // if (plan === "") {
    //   stepEightErrors.plan = "Plan selection is required";
    //   isValid = false;
    // }

    if (isNo_abuse === false) {
      stepEightErrors.isNo_abuse =
        "Please accept the Smoochy Rules!";
      isValid = false;
    }
    if (isRespect_one === false) {
      stepEightErrors.isNo_abuse =
      "Please accept the Smoochy Rules!";
      isValid = false;
    }
    if (isRespect_people === false) {
      stepEightErrors.isNo_abuse =
      "Please accept the Smoochy Rules!";
      isValid = false;
    }
    if (isGive_bankDetails === false) {
      stepEightErrors.isNo_abuse =
      "Please accept the Smoochy Rules!";
      isValid = false;
    }

    if (isChecked_Terms === false) {
      stepEightErrors.isChecked_Terms =
      "Please accept the terms and conditions!";
      isValid = false;
    }

    if (isChecked_Consent === false) {
      stepEightErrors.isChecked_Consent =
      "Please accept the Smoochy Consent!";
      isValid = false;
    }


    setErrors(stepEightErrors);
    return isValid;
  };

  const validateStepNine = () => {
    let stepNineErrors = {};
    let isValid = true;
    if (payment.trim() === "") {
      stepNineErrors.payment = "Payment is required";
      isValid = false;
    }
    setErrors(stepNineErrors);
    return isValid;
  };



  const openModalTerms = () => {
    setIsModal_Terms(true);
  };

  // Handle Next, Progress
  const handleNextStep = () => {
    console.log('current step: ', step)
    let isValid = false;
    if (step === 1) {
      isValid = validateStepOne();
    } else if (step === 2) {
      isValid = validateStepTwo();
    } else if (step === 3) {
      isValid = validateStepThree();
    } else if (step === 4) {
      isValid = validateStepFour();
    } else if (step === 5) {
      isValid = validateStepFive();
    } else if (step === 6) {
      isValid = validateStepSix();
    } else if (step === 7) {
      isValid = validateStepSeven();
      console.log('Step 7: '+ isValid);
    } else if (step === 8) {
      isValid = validateStepEight();
    }

    if (isValid){
      if(step === 7){
        postData("/validation", {email: email, phone: phone}, '').then((res) => {
          console.log(res);
          let stepSevenErrors = {};
          if(res.status === "required"){
            if(res.message.email){
              stepSevenErrors.email = res.message.email;
            }
            if(res.message.phone){
              stepSevenErrors.phone = res.message.phone;
            }
            setErrors(stepSevenErrors);
          }else if(res.status === "success"){
            const originalDate = dob;
            const formattedDate = formatDate(originalDate);
            const payload = {
              name: name,
              image: image,
              dob: formattedDate,
              gender: gender,
              why_here: why_here,
              location: location,
              email: email,
              phone: phone,
              password: password,
              plan: plan,
              planPrice: planPrice,
              token_id: "",
              requestType: "signup",
              cStep: "8"
            };
            console.log(payload);

            localStorage.setItem('signupFormDataStore', JSON.stringify(payload));
            console.log(JSON.parse(localStorage.getItem('signupFormDataStore')));
            goto_Verify();
            // setStep((prevStep) => prevStep + 1);
          }
        }).catch((error) => {
           console.log(error);
        });
      }else{
        setStep((prevStep) => prevStep + 1);
      }
    }
    console.log("Active step: " + step);
  };



  const goto_Verify = () => {
     const url = "https://sandbox.verifymyage.com/oauth/authorize?client_id=key-l-81430902-2739-4d0a-baaf-5cee944472c0&scope=adult&country=gb&redirect_uri=https://smoochy-b5387.web.app/signup";
     window.open(url, "_self"); 
  }



  // Handle Back, Progress
  const handlePreviousStep = () => {
    setStep(step - 1);
    setPlan("");
    setIsChecked_Terms(false);
    setSelectedButton_plan(null);
    console.log("all: " + step + isChecked_Terms + plan);
  };

  const profileCreation = (user) => {
    console.log("firebase creation",user);
    const uid = user.id 
    try {
      setDoc(doc(db, "users",uid.toString()), {
        uid:  uid.toString(),
        displayName: user.name,
        profile_pictures:user.image,
        created_at: Timestamp.now(),
        email: user.email,
      }).then((res) => {
        showToast("Profile Creation Successfully!");
        // navigate("/chat");
      });
    } catch (err) {
      console.log(err, "firestore err");
      showToast("Something went wrong during profile creation, Please Retry");
    }
  };

  const handleSelectChange = (value) => {
    setDob(value);
  };



  const handleFormSubmit = (event) => {
    event.preventDefault();
  };


  const handleSubmitOutside = () => {
    if (formRef.current) {
      // formRef.current.submit(); // Programmatically submit the form
      const newErrors = {};
      const originalDate = dob;
      const formattedDate = formatDate(originalDate);
  
      const payload = {
        name: name,
        image: image,
        dob: formattedDate,
        gender: gender,
        why_here: why_here,
        location: location,
        email: email,
        phone: phone,
        password: password,
        plan: plan,
        planPrice: planPrice,
        token_id: "",
        requestType: "signup"
      };
      console.log(payload);
      console.log('Outside button form submit worked');

      validateStepEight();
      if (payload.plan === 1 || payload.plan === null && isNo_abuse === true && isRespect_one === true
        && isRespect_people === true && isGive_bankDetails === true && isChecked_Terms === true && isChecked_Consent === true) {
          console.log('1 iofui ');
          if(isNo_abuse === true && isRespect_one === true && isRespect_people === true && 
          isGive_bankDetails === true && isChecked_Terms === true){
          setIsLoading(true);
          register(payload, "").then((res) => {
            console.log("create profile res", res);
            setIsLoading(false);
            // setErrors(newErrors);
            if(res.status === "success") {
              if(res.token){
                let token = res.token;
                const setToken = setStore("userToken", res.token).then((res) => {
                  if(res === true) {
                    showToast("User registration success.", "success");
                    getData("/my-profile", token).then((resp) => {
                        console.log("my-profile", resp);
                        if (resp.status === "success") {
                          profileCreation(resp.data);
                        }
                      }).catch((err) => {
                        console.log(err);
                        showToast(err, "Profile not fached!");
                      });
                    setIsLoading(false);
                    setTimeout(() => {
                      navigate("/congratulations");
                    }, 1000);
    
                  }
                })
              }
            }else if (res.status === "required") {
              if (res.message.email) {
                showToast(res.message.email, "warning");
              }else if(res.message.phone){
                showToast(res.message.phone, "warning");
              }
            }
          }).catch((error) => {
            console.log(error);
            showToast(error, "error");
            setIsLoading(false);
            // newErrors.server = error;
            // setErrors(newErrors);
          });
          }else{
            validateStepEight();
            console.log('diu hsyugy');
          }
      }else if((payload.plan === 2 || payload.plan === 3) && isNo_abuse === true && isRespect_one === true
        && isRespect_people === true && isGive_bankDetails === true && isChecked_Terms === true && isChecked_Consent === true){
          // console.log(payload);
          console.log('2 iofui ')
          // navigate('/cardpaymentsignup');
          navigate('/cardpaymentsignup', { state: payload });
      }
    }
  };




  return (
    <div className="main-container">
      <div className="top-header-content">
        <div className="top-progress-bar">
          <progress value={step} max={8} id="myProgress"></progress>
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
        {/* {step > 1 && step !== 8 && (
            <button className="back-button" onClick={handlePreviousStep}>
              <IoChevronBack
                style={{ fontSize: 18, color: "#733faa", marginRight: 12 }}
              ></IoChevronBack>
              <span className="back-button-text">Back</span>
            </button>
        )} */}
        </div>
      </div>


      <main className="centered-content">
        <form ref={formRef} onSubmit={handleFormSubmit}>
        {/* <form onSubmit={handleFormSubmit}> */}
          {step === 1 && (
            <div>
              <h2>
                Ok, let's set up your <br /> account! First, what's <br /> your
                name?
              </h2>
              <div style={{ marginBlockStart: "25%", marginBlockEnd: "25%" }}>
                <h5>This is how you'll appear on Smoochy</h5>
                <div className="input-outer-div">
                  <input
                    type="text"
                    className="left-input"
                    style={{ color: "#000" }}
                    name="name"
                    value={name}
                    onChange={handleInputChange}
                  />
                </div>      
                
                {errors.name && (
                  <p style={{ color: "#ff0037" }}>{errors.name}</p>
                )}
              </div>
            </div>
          )}

          {step === 2 && (
            <div>
              <h2>Add your first photo</h2> 
              <div 
                className="file-Selected item2"
                onClick={handleButtonClick1}
                style={{
                  cursor: 'pointer',
                  backgroundImage: `url(${image})`,
                  marginBlockStart: "10%"
                }}
              >
                <div>
                  {" "}
                  <BsPlus style={{ fontSize: 25 }} />{" "}
                </div>
                <input
                  type="file"
                  name="image"
                  style={{ display: "none" }}
                  ref={fileInputRef1}
                  onChange={handleFileSelected1}
                />
              </div>
              {errors.image && (
                <p style={{ color: "#ff0037" }}>{errors.image}</p>
              )}
            </div>
          )}

          {step === 3 && (
            // <div style={{ marginBlockStart: "10%", marginBlockEnd: "25%" }}>
            <div>
              <h2>When’s your birthday?</h2>

              <div style={{ marginBlockStart: "18%" }}>
                <div
                  style={{
                    display: "flex",
                    gap: "10px",
                    justifyContent: "center",
                  }}
                >
                  <div style={{ width: "80px" }}>
                    <h4>Day</h4>
                  </div>
                  <div style={{ width: "120px" }}>
                    <h4>Month</h4>
                  </div>
                  <div style={{ width: "100px" }}>
                    <h4>Year</h4>
                  </div>
                </div>

                <div
                  style={{
                    display: "flex",
                    gap: "10px",
                    justifyContent: "center",
                  }}>
                   <input
                    type="text"
                    className="left-input"
                    style={{ color: "#000", display: 'none'}}
                    name="date"
                    value={dob ? formatDate(dob) : ''}
                    className="centered-input"
                    readOnly
                  />
                  <button className="button-A" style={{backgroundColor: '#fff', color: '#6c6f85'}} type="button"
                    onClick={() => {
                      setIsOpen(true)
                    }}>{dob ? formatDate(dob) : 'Select Date'}</button>                  
                    <DatePicker
                      isOpen={isOpen} 
                      onClose={(date) => {
                        setIsOpen(false)
                      }}
                      onChange={(date) => {
                        console.log(date);
                        setDob(date);
                        setIsOpen(false)
                      }}
                      defaultValue={currentDate}
                      maxDate={currentDate}
                      showTitle={false}
                    />
                </div>                
                {errors.dob && <p style={{ color: "#ff0037" }}>{errors.dob}</p>}
              </div>
            </div>
          )}

          {step === 4 && (
            // <div style={{ marginBlockStart: "10%", marginBlockEnd: "25%" }}>
            <div>
              <h2>How do you identify?</h2>

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-around",
                  marginBlockStart: "18%",
                  marginBlockEnd: 20,
                }}
              >
                {gender_firstPhase.map((button) => (
                  <button
                    className="selectableButton"
                    key={button.id}
                    type="button"
                    onClick={() =>
                      handleButtonClick_gender(button.id, button.name)
                    }
                    style={{
                      backgroundColor:
                        selectedButton_gender === button.id
                          ? "#733faa"
                          : "#F4F4F4",
                      color:
                        selectedButton_gender === button.id
                          ? "#ffffff"
                          : "#733faa",
                      fontWeight: 500,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {button.name}
                  </button>
                ))}
              </div>

              {modalGender !== "" && (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-around",
                    marginBlockStart: 20,
                    marginBlockEnd: 20,
                  }}
                >
                  <button
                    className="selectableButton"
                    key={modalGender}
                    type="button"
                    onClick={() => removeModalSelectableGender(modalGender)}
                    style={{
                      backgroundColor: "#733faa",
                      color: "#ffffff",
                      fontWeight: 500,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      minWidth: "100%",
                    }}
                  >
                    {modalGender}
                  </button>
                </div>
              )}

              <div>
                <button
                  onClick={openModalIdentify}
                  type="button"
                  className="a-button"
                >
                  Another Gender
                </button>
                {/* <button className="a-button">Another Gender</button> */}
              </div>

              {errors.gender && (
                <p style={{ color: "#ff0037" }}>{errors.gender}</p>
              )}
              <IdentifyModal
                isModal_Identify={isModal_Identify}
                onClose={closeModalIdentify}>
              </IdentifyModal>
            </div>
          )}

          {step === 5 && (
            // <div style={{ marginBlockStart: "0%", marginBlockEnd: "50%" }}>
            <div>
              <h2>
                Tell people why <br /> you are here
                <br />
              </h2>
              <div>
                <h5>
                  You can change this whenever you want and will show on your
                  profile unless you’re unsure
                </h5>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  {relationshipOptions.map((button) => (
                    <button
                      className="selectableButton"
                      key={button.id}
                      type="button"
                      onClick={() =>
                        handleButtonClick_why_here(button.id, button.name)
                      }
                      style={{
                        backgroundColor:
                          selectedButton_why_here === button.id
                            ? "#733faa"
                            : "#F4F4F4",
                        color:
                          selectedButton_why_here === button.id
                            ? "#ffffff"
                            : "#733faa",
                        fontWeight: 500,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      {button.name}
                    </button>
                  ))}
                </div>
                {errors.why_here && (
                  <p style={{ color: "#ff0037" }}>{errors.why_here}</p>
                )}
              </div>
            </div>
          )}

          {step === 6 && (
            // <div style={{ marginBlockStart: "5%", marginBlockEnd: "25%"}}>
            <div>
              <h2>
                What town or city are <br /> you currently located in?
              </h2>

              <div style={{ marginBlockStart: "10%" }}>
                <div className="input-outer-div-select">
                  <SelectSearch
                    options={    
                      locationData.map(item => ( { name: item.name, value: item.value } ) )
                    }
                    search
                    placeholder="Search/Select option"
                    onChange={location => handleInputChange({ target: { value: location, name: 'location' } })}
                    value={location} />
                </div>
                {errors.location && (
                  <p style={{ color: "#ff0037" }}>{errors.location}</p>
                )}
              </div>
            </div>
          )}

          {step === 7 && (
            // <div style={{ marginBlockStart: "0%", marginBlockEnd: "50%"}}>
            <div>
              <h2>
                Almost there, <br /> let’s create your <br />
                login details{" "}
              </h2>
              <div>
                <br />
                <div className="title-div">Email address</div>
                <input
                  type="text"
                  placeholder="Your Email Address"
                  className="centered-input"
                  name="email"
                  value={email}
                  onChange={handleInputChange}
                  onKeyDown={handleSpaceKeyDown}
                />
                {errors.email && (
                  <p style={{ color: "#ff0037", margin: "0px 0px 20px" }}>
                    {errors.email}
                  </p>
                )}

                <div className="title-div">Telephone</div>
                <PhoneInput
                  defaultCountry="GB"
                  placeholder="Enter phone number"
                  className="centered-input"
                  value={phone}
                  onChange={phone => handleInputChange({ target: { value: phone, name: 'phone' } })}
                />
                {errors.phone && (
                  <p style={{ color: "#ff0037", margin: "0px 0px 20px" }}>
                    {errors.phone}
                  </p>
                )}

                <div className="title-div">Password</div>
                <input
                  type="password"
                  placeholder="Your Password"
                  className="centered-input"
                  name="password"
                  maxlength="15"
                  value={password}
                  onChange={handleInputChange}
                  onKeyDown={handleSpaceKeyDown}
                />
                {errors.password && (
                  <p style={{ color: "#ff0037", margin: "0px 0px 20px" }}>
                    {errors.password}
                  </p>
                )}
              </div>
            </div>
          )}

          {step === 8 && (
            <div>
              <h2>Select your plan</h2>
              <div>
                <h5 style={{margin: '2px 0px'}}>
                  Both paid plans come with <br /> <span style={{color: 'red', lineHeight: '25px'}}>unlimited messaging</span>
                </h5>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  {planData.map((button) => (
                    <>
                      {button.price === "0" ? (
                        <button
                          className="selectableButton"
                          key={button.id}
                          type="button"
                          onClick={() => handleButtonClick_Plan(button.id, button.price)}
                          style={{
                            margin: '12px 0px',
                            backgroundColor:
                              selectedButton_plan === button.id
                                ? "#733faa"
                                : "#F4F4F4",
                            color:
                              selectedButton_plan === button.id
                                ? "#ffffff"
                                : "#733faa",
                            fontWeight: 500,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          {" "}
                          Free Trial (1 month)
                        </button>
                      ) : (
                        <button
                          className="selectableButton"
                          key={button.id}
                          type="button"
                          onClick={() => handleButtonClick_Plan(button.id, button.price)}
                          style={{
                            margin: '12px 0px',
                            backgroundColor:
                              selectedButton_plan === button.id
                                ? "#733faa"
                                : "#F4F4F4",
                            color:
                              selectedButton_plan === button.id
                                ? "#ffffff"
                                : "#733faa",
                            fontWeight: 500,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          {button.name} (<BiPound /> {button.price}){" "}
                        </button>
                      )}
                    </>
                  ))}
                </div>
                {errors.plan && (
                  <p style={{ color: "#ff0037", margin: "0px 0px 20px" }}>
                    {errors.plan}
                  </p>
                )}

              <div>
                <h4 style={{fontSize: 14}}>Smoochy Rules</h4>
              </div>
              <div className="centered-input custom-checkbox" style={{display:'flex', flexDirection: 'column', alignItems:'center', justifyContent: 'center', 
              backgroundColor: '#a5e7fe', margin: '12px 0px 10px', height: 'auto', padding: '10px 0px'}}> 
              <label style={{color: '#733faa', fontSize: 12, display: 'flex', alignItems: 'center', padding: '0px 10px'}}>No abusive behaviour&nbsp;&nbsp;
                <input
                  type="checkbox" name="no_abuse"
                  checked={isNo_abuse}
                  onChange={handleCheckboxNo_abuse}
                 />
              </label>
              <label style={{color: '#733faa', fontSize: 12, display: 'flex', alignItems: 'center', padding: '0px 10px'}}>Respect one another&nbsp;&nbsp;
                <input
                  type="checkbox" name="respect_one"
                  checked={isRespect_one}
                  onChange={handleCheckboxRespect_one}
                 />
              </label>
              <label style={{color: '#733faa', fontSize: 12, display: 'flex', alignItems: 'center', padding: '0px 10px'}}>Respect people’s boundaries&nbsp;&nbsp;
                <input
                  type="checkbox" name="respect_people"
                  checked={isRespect_people}
                  onChange={handleCheckboxRespect_people}/>
              </label>
              <label style={{color: '#733faa', fontSize: 12, display: 'flex', alignItems: 'center', padding: '0px 10px'}}>Don’t give out personal information like bank details&nbsp;&nbsp;
                <input
                  type="checkbox" name="give_bankDetails"
                  checked={isGive_bankDetails}
                  onChange={handleCheckboxGive_bankDetails}/>
              </label>
              </div>
              {(errors.isNo_abuse || errors.isRespect_one || errors.isRespect_people || errors.isGive_bankDetails) &&
                <p style={{color: '#ff0037', margin: '0px 0px 20px'}}>{errors.isNo_abuse}</p>
              }

              <button type="button" className="a-button" onClick={openModalTerms} 
              style={{fontSize: 14, margin: '10px 0px 0px 0px', zIndex: 100}}>Terms & Conditions</button>
          
              <div className="centered-input custom-checkbox" style={{display:'flex', alignItems:'center', justifyContent: 'center', backgroundColor: '#a5e7fe', margin: '12px 0px 10px'}}> 
              <label style={{color: '#733faa', fontSize: 12, display: 'flex', alignItems: 'center', zIndex: 1, padding: '0px 10px'}}>Read terms & conditions&nbsp;&nbsp;
                <input
                  type="checkbox" name="terms"
                  checked={isChecked_Terms}
                  onChange={handleCheckboxChange_Terms}/>
              </label>
              </div>
              {errors.isChecked_Terms && <p style={{color: '#ff0037', margin: '0px 0px 2px'}}>{errors.isChecked_Terms}</p>}

              <div className="centered-input custom-checkbox"style={{display:'flex', flexDirection: 'column', alignItems:'center', justifyContent: 'center', 
              backgroundColor: '#a5e7fe', margin: '12px 0px 10px', height: 'auto', padding: '10px 0px'}}> 
              <label style={{color: '#733faa', fontSize: 12, display: 'flex', alignItems: 'center', zIndex: 1, padding: '0px 10px', lineHeight: 1.3}}>I hereby consent to full access to the Smoochy App and I understand and acknowledge that I will lose my right of withdrawal from my subscription once I have fully signed up and have access to the Smoochy App.&nbsp;&nbsp;</label>
              <input
                  type="checkbox" name="consent"
                  checked={isChecked_Consent}
                  onChange={handleCheckboxConsent} style={{zIndex: 1}}/>
              </div>
              {errors.isChecked_Consent && <p style={{color: '#ff0037', margin: '0px 0px 2px'}}>{errors.isChecked_Consent}</p>}
              </div>
            </div>
          )}
        </form>
    
        <div className="image-container-signup" style={{textAlign: 'center'}}>
          <img
            src={logoIcon}
            alt="SVG Image"
            className="centered-image"
            style={{zIndex: 0}} />
        </div>
      </main>


    
      <div className="bottom-footer-content">
            {step <= 7 && (
              <button className="button-A" type="button" onClick={handleNextStep}>Continue</button>
            )}
            {step === 8 && (
               <button className="button-A" type="button" onClick={handleSubmitOutside}>Continue</button>
            )}
      </div>

      {isLoading && <LoaderService />}
      {isModal_Terms && <TermsModal onClose={() => setIsModal_Terms(false)} />}
    </div>

    
  );
};

export default Signup;
