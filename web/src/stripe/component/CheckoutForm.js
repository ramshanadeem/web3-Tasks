import React, { useState } from "react";
import { PaymentElement } from "@stripe/react-stripe-js";
import axios from "axios";
function CheckoutForm(props) {
  const [success, setSuccess] = useState(false);
  const handleSubmit = async (event) => {
    // We don't want to let default form submission happen here,
    // which would refresh the page.
    event.preventDefault();

    const { stripe, elements } = props;

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    const result = await stripe.confirmPayment({
      //`Elements` instance that was used to create the Payment Element
      elements,
      confirmParams: {
        return_url: "https://my-site.com/order/123/complete",
      },
    });

    if (result.error) {
      // Show error to your customer (for example, payment details incomplete)
      console.log(result.error.message);
    } else {
      const { id } = result;
      const response = await axios.post("http://localhost:4000/payments", {
        amount: 1000,
        id,
      });
      if (response.data.success) {
        console.log("succesful payment");
        setSuccess(true);
      }
      // Your customer will be redirected to your `return_url`. For some payment
      // methods like iDEAL, your customer will be redirected to an intermediate
      // site first to authorize the payment, then redirected to the `return_url`.
    }
  };

  return (
    <div>
      {!success ? (
        <form onSubmit={handleSubmit}>
          <fieldset className="formGroup">
            <div className="formRow">
              <PaymentElement />
            </div>
          </fieldset>
          <button disabled={!props.stripe}>Submit</button>
        </form>
      ) : (
        <div>
          <p>succesfully bought </p>
        </div>
      )}
    </div>
  );
}

export default CheckoutForm;
