import React, { useState } from 'react';
import { CardElement, PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';

import './CheckoutForm.css';

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      setIsLoading(false);
      return;
    }

    // Create a payment method using the CardElement.
    const cardElement = elements.getElement(CardElement);
    // const { error, paymentMethod } = await stripe.createPaymentMethod({
    //   type: 'card',
    //   card: cardElement,
    // });

   stripe.createToken(cardElement).then((result) => {
      // Handle result.error or result.token
      console.log(result);
    });



    setIsLoading(false);

    if (error) {
      setError(error.message);
      return;
    }

    // Handle the paymentMethod object.
    // console.log('Payment Method:', paymentMethod);
    // You can now send the paymentMethod.id to your server to handle the payment on the backend.
  };

  return (
    <div>
      <h1>Upgrade Account</h1>
      <form onSubmit={handleSubmit}>
        <div style={{ border: '1px solid #ccc', padding: '10px', borderRadius: '4px' }}>
          <CardElement
options={{
  style: {
    base: {
      fontSize: '16px',
      color: '#424770',
      '::placeholder': {
        color: '#aab7c4',
      },
    },
    invalid: {
      color: '#9e2146',
    },
  },
}}
          />

        </div>
        {error && <div style={{ color: 'red' }}>{error}</div>}
        <button type="submit" disabled={!stripe || isLoading}>
          {isLoading ? 'Processing...' : 'Upgrade Now'}
        </button>
      </form>
    </div>
  );
};

export default CheckoutForm;
