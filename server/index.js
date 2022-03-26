const express = require("express");
const app = express();
require("dotenv").config();
const stripe = require("stripe")(process.env.STRIPE_SECRET_TEST);
const cors = require("cors");
const bodyParser = require("body-parser");
const { response } = require("express");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.post("/payments", cors(), async (req, res) => {
  let { amount, id } = req.body;
  try {
    const payment = await stripe.applePayDomains.create({
      amount,
      country: "US",
      currency: "usd",
      description: "Blockchain Company",
      payment_method: id,
      confirm: true,
      payment_method_type: ["apple_pay"],
      // enabledPaymentMethods: [
      //       "credit_debit_card",
      // "apple_pay",
      //       "google_pay",
      //       "sepa_bank_transfer",
      //     ],
      // metadata: { order_id: "6735" },
      enabledPaymentMethods: [
        "credit_debit_card",
        "apple_pay",
        "google_pay",
        "sepa_bank_transfer",
      ],
      //   defaultCurrencyCode: "btc",
      //   baseCurrencyAmount: 100,
      //   baseCurrencyCode: "eur",
      //   walletAddres: '[customer_wallet]',
      //   externalCustomerId: '[your_user_id]',
      // //   externalTransactionId: '[your_tx_id]',
      //   colorCode: '#FF875B',
      //   language: 'en',
    });
    console.log("payment", payment);
    res.json({ message: "payment succesful", success: true });
  } catch (error) {
    console.log("error", error);
    res.json({ message: "payment failed", success: false });
  }
});
app.listen(process.env.PORT || 4000, () => {
  console.log("server is listening on port 4000");
});
