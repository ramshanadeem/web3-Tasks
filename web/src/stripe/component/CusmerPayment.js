import React from "react";
import { ElementsConsumer } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";

function CusmerPayment() {
  return (
    <div>
      <ElementsConsumer>
        {({ stripe, elements }) => (
          <CheckoutForm stripe={stripe} elements={elements} />
        )}
      </ElementsConsumer>
    </div>
  );
}

export default CusmerPayment;
