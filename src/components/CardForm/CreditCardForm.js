import React, { useState, useRef } from "react";

import { Link, useParams, useNavigate } from "react-router-dom";

import {CardElement, useStripe, useElements, 
  CardNumberElement, CardExpiryElement, CardCvcElement} from "@stripe/react-stripe-js";

import { IoChevronBack } from "react-icons/io5";
import { BiPound } from "react-icons/bi";
import LoaderService from "../../services/loader";
import { getData, postData, register } from "../../services/authService";
import { showToast } from "../../services/toastService";
import { setStore } from "../../services/storageService";


import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';


import { collection, doc, documentId, onSnapshot, 
  query, setDoc, Timestamp, where } from "firebase/firestore";

import { db } from "../../firebase";


// Replace 'your_stripe_publishable_key' with your actual Stripe publishable key
const stripePromise = loadStripe('pk_test_51JBaDCSBeQ4yffNjUjZesxjDBBX7WRrKvJIkHi2DcsHwzaOLeIfhF7MFarEsGgFkA99txz1Na8JsmjJhrlv0QxhJ00Pa8Cwvrt');



const CreditCardForm = (props) => {
  const { data } = props;
  // console.log(data);

  const [token, setToken] = useState(localStorage.getItem("userToken") || null);
  
  const navigate = useNavigate();

  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [isPaymentDone, setIsPaymentDone] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const formRef = useRef();

  const profileCreation = (user) => {
    console.log("firebase creation",user);
    const uid = user.id 
    // if (user) {
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
    // }
  };


  const handleSubmit = (event) => {
    event.preventDefault();
  }


  const handleUpgradeAccount = (stripeToken) => {
    setIsLoading(true);
    const payload_1 = {
      plan: data.plan,
      price: data.planPrice,
      token_id: stripeToken
    };
    // console.log(payload_1);

    postData("/upgrade-account", payload_1, token).then((res) => {
        // console.log(res);
        setIsLoading(false);
        if (res.status === "success") {
          setIsPaymentDone(true);
          showToast('Your account have been upgraded.', 'success');
        } else if (res.error) {
          setError(res.error);
        }
      })
      .catch((error) => {
        setIsLoading(false);
        console.log(error);
      });
  }


  const handleRegisterAccount = (stripeToken) => {
    setIsLoading(true);
    const payload_2 = {
        name: data.name,
        image: data.image,
        dob: data.dob,
        gender: data.gender,
        why_here: data.why_here,
        location: data.location,
        email: data.email,
        phone: data.phone,
        password: data.password,
        plan: data.plan,
        planPrice: data.planPrice,
        token_id: stripeToken,
    };
    // console.log(payload_2);

    register(payload_2, "").then((res) => {
        console.log("create profile res", res);
        setIsLoading(false);
        // setErrors(newErrors);
        if (res.status === "success") {
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
                    showToast(err, "Profile not fatched!");
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
  }


  const handleSubmitOutside = async () => {
    if (!stripe || !elements) {
      return;
    }

    try {
      const { error, token } = await stripe.createToken(elements.getElement(CardNumberElement));
      if (error) {
        setError(error.message);
      } else {
        setIsLoading(true);
        // Use the token.id to send the Stripe token to your backend for payment processing
        console.log("Stripe Token: ", token);
        console.log("Request: ", data.requestType);

         if(token.id && data.requestType === "upgrade"){
            setIsLoading(false);
            handleUpgradeAccount(token.id);
            elements.getElement(CardNumberElement).clear();
            elements.getElement(CardExpiryElement).clear();
            elements.getElement(CardCvcElement).clear();
         }else if(token.id && data.requestType === "signup"){
            setIsLoading(false);
            handleRegisterAccount(token.id);
            elements.getElement(CardNumberElement).clear();
            elements.getElement(CardExpiryElement).clear();
            elements.getElement(CardCvcElement).clear();
         }else{
           setIsLoading(false);
           setError("Error processing payment. Stripe Token not Genreted.");
         } 
      }
    } catch (error) {
      console.error("Error creating token:", error);
      setError("Error processing payment. Please try again.");
      setIsLoading(false);
    }
  }

  


  return (
    <>
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

        
        <div className="centered-content" style={{flex: 7}}>
        { isPaymentDone === false && (
        <form ref={formRef} onSubmit={handleSubmit}>
              <h2>Pay with card</h2>
              <div style={{ marginBlock: "16%" }}>

                  <div className="card-name">
                    <div className="title-div" style={{textAlign:'center', margin: '20px 0px'}}>Name on card</div>
                    <div className="input-outer-div">
                        <input type="text" className="left-input" style={{ color: "#000" }}
                                name="name"/>
                    </div>
                  </div>
      
                  <div className="card-number">
                  <div className="title-div" style={{textAlign:'center', margin: '20px 0px'}}>Card information</div>
                    <div className="input-outer-div">
                    <div className="cardNumberDiv">
                      <CardNumberElement setError={setError} />
                    </div>
                    </div>
                  </div>
      
                  <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                  <div className="expiration-date" style={{width: '45%'}}>
                    <div className="title-div" style={{textAlign:'center', height: '20px'}}></div>
                    <div className="input-outer-div"> 
                    <div className="expiryDiv">
                      <CardExpiryElement setError={setError} />
                    </div>
                    </div>
                  </div>
      
                  <div className="cvc" style={{width: '45%'}}>
                    <div className="title-div" style={{textAlign:'center', height: '20px'}}></div>
                    <div className="input-outer-div">
                    <div className="cvcDiv">
                      <CardCvcElement setError={setError} />
                    </div>
                    </div>
                  </div>
                  </div>
                  {error && <p style={{color: '#ff0037'}}>{error}</p>}
    
              </div>
        </form>
        )}

        { isPaymentDone === true && (
          <>
          <h2>Thanks!</h2>
          <p>Your account have been upgraded.</p>
          </>
        )}
        </div>

        { isPaymentDone === false && (
        <div className="bottom-footer-content"  style={{flex: 2}}>
            <div
              className="title-div"
              style={{display: "flex",alignItems: "center",justifyContent: "center"}}>
                Powered by&nbsp;<span style={{ fontSize: 22 }}>stripe</span>
            </div>
            <br />
            <button className="button-C" type="button"  onClick={handleSubmitOutside}
            style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}><span>Pay&nbsp;</span> <BiPound />{data.planPrice}</button>
        </div>
        )}


        {isLoading && <LoaderService />}    
    </div>
    </>
  );
};



const cardElementStyle = {
  style: {
    base: {
      fontSize: "16px",
      color: "#424770",
      "::placeholder": {
        color: "#aab7c4",
      },
    },
    invalid: {
      color: "#9e2146",
    },
  },
};



export default CreditCardForm;
