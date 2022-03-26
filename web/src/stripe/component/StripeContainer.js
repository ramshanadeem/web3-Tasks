import React from "react";

import PaymentForm from "./PaymentForm";

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./CheckoutForm";
function StripeContainer() {
  const CARD_OPTIONS = {
    base: {
      color: "#32325d",
      lineHeight: "24px",
      fontFamily: "Helvetica Neue",
      fontSmoothing: "antialiased",
      fontSize: "16px",
      "::placeholder": {
        color: "#aab7c4",
      },
    },
    invalid: {
      color: "#fa755a",
      iconColor: "#fa755a",
    },
  };
  const Public_Key =
    "pk_test_51KM4TeITJKhbXnQwydKg6ZhPIK3eUs8Xv8rP57la9S0csSOyjgJQK0ZmC9gXPjEQ1heCZQJZGdmoKsjqCFWZ3vKG000M3zUhHQ";
  const Stripe_Test_Promise = loadStripe(Public_Key);
  return (
    <div>
      <Elements stripe={Stripe_Test_Promise}>
        <PaymentForm />

        {/* <CheckoutForm /> */}
      </Elements>
    </div>
  );
}

export default StripeContainer;
