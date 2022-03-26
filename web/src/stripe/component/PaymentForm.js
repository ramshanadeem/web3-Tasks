import React, { useState } from "react";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import axios from "axios";
import GooglePayButton from "@google-pay/button-react";

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
export default function PaymentForm() {
  const [success, setSuccess] = useState(false);
  const stripe = useStripe();
  const element = useElements();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // const { error, paymentMethod } = await stripe.createPaymentMethod({
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "apple_pay",

      card: element.getElement(CardElement),

      // enabledPaymentMethods: [
      //   "credit_debit_card",
      //   "apple_pay",
      //   "google_pay",
      //   "sepa_bank_transfer",
      // ],
    });

    if (!error) {
      try {
        const { id } = paymentMethod;
        const response = await axios.post(
          "https://api.stripe.com/v1/apple_pay/domains",
          {
            amount: 1000,
            id,
          }
        );
        if (response.data.success) {
          console.log("succesful payment");
          setSuccess(true);
        }
      } catch (error) {
        console.log(error, "errorrr");
      }
    } else {
      console.log(error.message);
    }
  };

  return (
    <>
      {!success ? (
        <div>
          <form onSubmit={handleSubmit}>
            <fieldset className="formGroup">
              <div className="formRow">
                <CardElement options={CARD_OPTIONS}></CardElement>
              </div>
            </fieldset>
            <button>pay</button>
            <GooglePayButton
              environment="TEST"
              buttonSizeMode="fill"
              paymentRequest={{
                apiVersion: 2,
                apiVersionMinor: 0,
                allowedPaymentMethods: [
                  {
                    type: "CARD",
                    parameters: {
                      allowedAuthMethods: ["PAN_ONLY", "CRYPTOGRAM_3DS"],
                      allowedCardNetworks: ["MASTERCARD", "VISA"],
                    },
                    tokenizationSpecification: {
                      type: "PAYMENT_GATEWAY",
                      parameters: {
                        gateway: "example",
                        gatewayMerchantId: "exampleGatewayMerchantId",
                      },
                    },
                  },
                ],
                merchantInfo: {
                  merchantId: "1761312255336763067",
                  merchantName: "Demo only (you will not charged)",
                },
                transactionInfo: {
                  totalPriceStatus: "FINAL",
                  totalPriceLabel: "Total",
                  totalPrice: 10000,
                  currencyCode: "USD",
                  countryCode: "US",
                },
              }}
              onLoadPaymentData={(paymentData) => {
                console.log(
                  "TODO: send order to server",
                  paymentData.paymentMethodData
                );
                // history.push('/confirm');
              }}
            />
          </form>
        </div>
      ) : (
        <div>
          <p>succesfully bought </p>
        </div>
      )}
      {/* <iframe
        onSubmit={handleSubmit}
        src="https://buy.moonpay.com/?apiKey=pk_test_x5M_5fdXzn1fxK04seu0JgFjGsu7CH8lOvS9xZWzuSM0"
        allow="payment"
        width={1000}
        height={1000}
        frameBorder={0}
        title="xyzframe"
      />
      <a href="https://moonpay.com" target="_blank">
        Buy crypto
      </a> */}
    </>
  );
}
