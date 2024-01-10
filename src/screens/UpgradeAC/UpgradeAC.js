import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import BackButton from "../../components/BackButton";
import { IoChevronBack } from "react-icons/io5";
import { BiPound } from "react-icons/bi";

import logoIcon from "../../assets/SVG/logo icon.svg";
import TermsModal from "../../components/TermsModal";

import { register, getData, postData, postFormData } from "../../services/authService";
import LoaderService from "../../services/loader";

import { showToast } from "../../services/toastService";


const UpgradeAC = () => {
  const navigate = useNavigate();

  const [token, setToken] = useState(localStorage.getItem("userToken") || null);

  const currentDate = new Date();
  const [step, setStep] = useState(1);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const [errors, setErrors] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [plan, setPlan] = useState("");
  const [payment, setPayment] = useState("");
  const [selectedButton_plan, setSelectedButton_plan] = useState(null);
  const [planData, setPlanData] = useState([]);
  const [planPrice, setPlanPrice] = useState();

  const [isNo_abuse, setIsNo_abuse] = useState(false);
  const [isRespect_one, setIsRespect_one] = useState(false);
  const [isRespect_people, setIsRespect_people] = useState(false);
  const [isGive_bankDetails, setIsGive_bankDetails] = useState(false);

  const [isChecked_Terms, setIsChecked_Terms] = useState(false);
  const [isModal_Terms, setIsModal_Terms] = useState(false);
  const [isChecked_Consent, setIsChecked_Consent] = useState(false);


  useEffect(() => {
    getPlan_Data();
    getMyCurrentPlan_Data();
  }, []); // Empty dependency array means the effect runs only once, similar to componentDidMount


  const getPlan_Data = () => {
    setIsLoading(true);
    getData("/plan", "").then((res) => {
        console.log(res);
        setIsLoading(false);
        if (res.status === "success") {
          setPlanData(res.data);
        } else if (res.error) {
          setErrors(res.error);
        }
      })
      .catch((error) => {
        setIsLoading(false);
        console.log(error);
      });
  };


  const getMyCurrentPlan_Data = () => {
    setIsLoading(true);
    getData("/last-plan", token).then((res) => {
        console.log(res);
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
        console.log(error);
      });
  };






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



  const handleButtonClick_Plan = (planId, price) => {
    setPlan("");
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



  const validateStepOne = () => {
    let stepOneErrors = {};
    let isValid = true;
    if (plan === "") {
      stepOneErrors.plan = "Plan selection is required";
      isValid = false;
    }

    if (isNo_abuse === false) {
      stepOneErrors.isNo_abuse =
        "Please accept the Smoochy Rules!";
      isValid = false;
    }
    if (isRespect_one === false) {
      stepOneErrors.isNo_abuse =
      "Please accept the Smoochy Rules!";
      isValid = false;
    }
    if (isRespect_people === false) {
      stepOneErrors.isNo_abuse =
      "Please accept the Smoochy Rules!";
      isValid = false;
    }
    if (isGive_bankDetails === false) {
      stepOneErrors.isNo_abuse =
      "Please accept the Smoochy Rules!";
      isValid = false;
    }

    if (isChecked_Terms === false) {
      stepOneErrors.isChecked_Terms =
        "Please accept the terms and conditions!";
      isValid = false;
    }

    if (isChecked_Consent === false) {
      stepOneErrors.isChecked_Consent =
      "Please accept the Smoochy Consent!";
      isValid = false;
    }

    setErrors(stepOneErrors);
    return isValid;
  };



  const validateStepTwo = () => {
    let stepTwoErrors = {};
    let isValid = true;
    if (payment.trim() === "") {
      stepTwoErrors.payment = "Payment is required";
      isValid = false;
    }
    setErrors(stepTwoErrors);
    return isValid;
  };



  // Handle Next, Progress
  const handleNextStep = () => {
    let isValid = false;
    isValid = validateStepOne();
    console.log(isValid);
  };



  const openModalTerms = () => {
    setIsModal_Terms(true);
  };


  const handleSubmitPlan = () => {
    handleNextStep();

    console.log('Plan: '+ plan);
    console.log('Terms: '+ isChecked_Terms);

    if(plan === 1 && isNo_abuse === true && isRespect_one === true
      && isRespect_people === true && isGive_bankDetails === true && isChecked_Terms === true) {
      handleUpgradePlanData(plan);
    }else if((plan === 2 || plan === 3) && isNo_abuse === true && isRespect_one === true
      && isRespect_people === true && isGive_bankDetails === true && isChecked_Terms === true) {
      handleUpgradePlanData(plan);
    }else{
      showToast("Please select plan!", "warning");
    }
  }


  const handleUpgradePlanData = (planId) => {
    console.log('Plan Id: ', plan);
    let serverResponseError = {};
    setIsLoading(true);

    if(plan === 1){
      console.log(token)
      postData("/upgrade-account", { plan: planId }, token).then((res) => {
        console.log(res);
        if (res.status === "success") {
          setIsLoading(false);
        }else if(res.status === "Expired"){
          setIsLoading(false);
          serverResponseError.serverErrors = res.message;
          setErrors(serverResponseError);
        } else if (res.error) {
          setIsLoading(false);
        }
      }).catch((error) => {
        setIsLoading(false);
      });
    }else if(plan === 2 || plan === 3){
      const payload = {
        plan: plan,
        planPrice: planPrice,
        token_id: "",
        requestType: "upgrade"
      };
      console.log(payload);
      setIsLoading(false);
      navigate('/cardpayment', { state: payload });
    }else{
      setIsLoading(false);
    }
  }

  const handleSubmitOutside = () => {
    handleNextStep();

    console.log('Plan: '+ plan);
    console.log('Terms: '+ isChecked_Terms);

    if(plan === 1 && isNo_abuse === true && isRespect_one === true
      && isRespect_people === true && isGive_bankDetails === true && isChecked_Terms === true && isChecked_Consent === true) {
      handleUpgradePlanData(plan);
    }else if((plan === 2 || plan === 3) && isNo_abuse === true && isRespect_one === true
      && isRespect_people === true && isGive_bankDetails === true && isChecked_Terms === true && isChecked_Consent === true) {
      handleUpgradePlanData(plan);
    }
  }

  return (
    <div className="main-container">

      <div className="top-header-content">
        <div className="top-progress-bar">
           <progress value={1} max={1} id="myProgress"></progress>
        </div>
        <div style={{textAlign: 'center'}}>
          <Link to="/">
            <button className="back-button">
              <IoChevronBack
                style={{ fontSize: 18, color: "#733faa", marginRight: 12 }}
              ></IoChevronBack>
              <span className="back-button-text">Back</span>
            </button>
          </Link>
        </div>
      </div>


 
      <div className="centered-content">
            {planData.length >= 1 && (
            <div style={{width: '100%', paddingTop: '10%'}}>
              <h2>Select your plan</h2>
              <div>
                <h5 style={{margin: '2px 0px'}}>
                  Both paid plans come with <br /> <span style={{color: 'red', lineHeight: '25px'}}>unlimited messaging</span>
                </h5>





                <div style={{ display: "flex", flexDirection: "column" }}>
                  {planData.map((button) => (
                    <>
                      {button.price === "0" ? (
                        <button disabled
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


          <div className="image-container-signup" style={{textAlign: 'center'}}>
            <img
              src={logoIcon}
              alt="SVG Image"
              className="centered-image"
              style={{zIndex: 0}} />
          </div>
      </div>
    
     
      <div className="bottom-footer-content">
          <button className="button-A" type="button" onClick={handleSubmitOutside}>Continue</button>
      </div>
  
      {isLoading && <LoaderService />}
      {isModal_Terms && <TermsModal onClose={() => setIsModal_Terms(false)} />}
    </div>
  );
};




export default UpgradeAC;

