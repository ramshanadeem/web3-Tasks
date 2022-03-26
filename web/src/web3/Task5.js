import React from "react";
const Web3 = require("web3");
function Task5() {
  const testnet = `https://rinkeby.infura.io/v3/84842078b09946638c03157f83405213`;
  const TOKEN_ADDRESS = "0xF5C638B9E09727D714Aca185B657F691b4E24ddc";
  const web3 = new Web3(testnet);

  // transaction fees = gas price * gas used
  const TransactionFees = async () => {
    let { gasPrice } = await web3.eth.getTransaction(
      // transaction hash
      "0x0b9e9870677e7277a8133462df8c2770ae0b7826c04abe197c1cf9ec96debb06"
    );
    console.log(gasPrice, "gas_price");
    let { gasUsed } = await web3.eth.getTransactionReceipt(
      // transaction hash
      "0x0b9e9870677e7277a8133462df8c2770ae0b7826c04abe197c1cf9ec96debb06"
    );

    console.log(gasUsed, "txrr");
    let transaction_Fees = Number(gasPrice) * Number(gasUsed);
    console.log(
      web3.utils.fromWei(transaction_Fees.toString()),
      "transactionfees"
    );
  };
  TransactionFees();
  return <div></div>;
}

export default Task5;
