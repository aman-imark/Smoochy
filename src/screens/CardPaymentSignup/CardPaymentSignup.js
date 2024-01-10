import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

import BackButton from "../../components/BackButton";
import { IoChevronBack } from "react-icons/io5";
import { BsPlus } from "react-icons/bs";
import { BiPound } from "react-icons/bi";

import IdentifyModal from "../../components/IdentifModal/IdentifyModal";
import TermsModal from "../../components/TermsModal";

import { register, getData, postData, postFormData } from "../../services/authService";
import LoaderService from "../../services/loader";

import { setStore } from "../../services/storageService";
import { showToast } from "../../services/toastService";

import { useStripe, useElements, CardNumberElement } from "@stripe/react-stripe-js";
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

import CreditCardForm from "../../components/CardForm/CreditCardForm";

const stripePromise = loadStripe('pk_test_51JBaDCSBeQ4yffNjUjZesxjDBBX7WRrKvJIkHi2DcsHwzaOLeIfhF7MFarEsGgFkA99txz1Na8JsmjJhrlv0QxhJ00Pa8Cwvrt');


const CardPaymentSignup = () =>{
  const location = useLocation();
  const signupPayload = location.state;

  // console.log(signupPayload);

  return (
   <>
    <Elements stripe={stripePromise}>
      <CreditCardForm data={signupPayload}></CreditCardForm>
    </Elements>
   </>
  )
}

export default CardPaymentSignup;

