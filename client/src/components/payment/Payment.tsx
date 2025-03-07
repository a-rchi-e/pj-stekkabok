import { useState, useEffect } from 'react';
import { useLocation } from 'react-router';
import { loadStripe } from '@stripe/stripe-js';
import { EmbeddedCheckoutProvider, EmbeddedCheckout } from '@stripe/react-stripe-js';
import { requestCheckout } from '../../helper_funcs';
import './Payment.css';

function Payment () {

  const [clientSecret, setClientSecret] = useState('');
  const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);
  const { name, prod_id, price, days, nights } = useLocation().state.from;

  useEffect( () => {
      requestCheckout({name, prod_id, price, days, nights}).then( secret => {
        setClientSecret(secret);
      }) }, []);

  return (
    <div id="payment">
      { stripePromise && clientSecret && (
      <EmbeddedCheckoutProvider stripe={stripePromise} options={{clientSecret}}>
        <EmbeddedCheckout/>
      </EmbeddedCheckoutProvider>
      )}
    </div>
  )
}

export default Payment
