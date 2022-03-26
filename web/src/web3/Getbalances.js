/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState } from "react";
import axios from "axios";
import Web3 from "web3";
function Getbalances() {
  const privKey =
    "6ca849b4bc4aa2c1b3d2aa9beda60e22e4e321f815fb9194d95ec2f1e8062bbd";
  const ReceieverAddr = "0x31C6ADeD96f75A923d20B4f7CE386cF66820F237";
  const SenderAddr = "0x0fa6be1a9BD76E3e93bE2F907279E171842a67E8";
  const web3 = new Web3(
    "https://rinkeby.infura.io/v3/d8761b551d1f4423b12bcd298d66ed66"
  );

  let minABI = [
    { inputs: [], stateMutability: "nonpayable", type: "constructor" },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "owner",
          type: "address",
        },
        {
          indexed: true,
          internalType: "address",
          name: "spender",
          type: "address",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "value",
          type: "uint256",
        },
      ],
      name: "Approval",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "from",
          type: "address",
        },
        { indexed: true, internalType: "address", name: "to", type: "address" },
        {
          indexed: false,
          internalType: "uint256",
          name: "value",
          type: "uint256",
        },
      ],
      name: "Transfer",
      type: "event",
    },
    {
      inputs: [],
      name: "_totalSupply",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        { internalType: "address", name: "tokenOwner", type: "address" },
        { internalType: "address", name: "spender", type: "address" },
      ],
      name: "allowance",
      outputs: [
        { internalType: "uint256", name: "remaining", type: "uint256" },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        { internalType: "address", name: "spender", type: "address" },
        { internalType: "uint256", name: "tokens", type: "uint256" },
      ],
      name: "approve",
      outputs: [{ internalType: "bool", name: "success", type: "bool" }],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        { internalType: "address", name: "tokenOwner", type: "address" },
      ],
      name: "balanceOf",
      outputs: [{ internalType: "uint256", name: "balance", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        { internalType: "address", name: "from", type: "address" },
        { internalType: "uint256", name: "value", type: "uint256" },
      ],
      name: "burn",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [],
      name: "decimals",
      outputs: [{ internalType: "uint8", name: "", type: "uint8" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        { internalType: "address", name: "from", type: "address" },
        { internalType: "uint256", name: "value", type: "uint256" },
      ],
      name: "mint",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [],
      name: "name",
      outputs: [{ internalType: "string", name: "", type: "string" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        { internalType: "uint256", name: "a", type: "uint256" },
        { internalType: "uint256", name: "b", type: "uint256" },
      ],
      name: "safeAdd",
      outputs: [{ internalType: "uint256", name: "c", type: "uint256" }],
      stateMutability: "pure",
      type: "function",
    },
    {
      inputs: [
        { internalType: "uint256", name: "a", type: "uint256" },
        { internalType: "uint256", name: "b", type: "uint256" },
      ],
      name: "safeDiv",
      outputs: [{ internalType: "uint256", name: "c", type: "uint256" }],
      stateMutability: "pure",
      type: "function",
    },
    {
      inputs: [
        { internalType: "uint256", name: "a", type: "uint256" },
        { internalType: "uint256", name: "b", type: "uint256" },
      ],
      name: "safeMul",
      outputs: [{ internalType: "uint256", name: "c", type: "uint256" }],
      stateMutability: "pure",
      type: "function",
    },
    {
      inputs: [
        { internalType: "uint256", name: "a", type: "uint256" },
        { internalType: "uint256", name: "b", type: "uint256" },
      ],
      name: "safeSub",
      outputs: [{ internalType: "uint256", name: "c", type: "uint256" }],
      stateMutability: "pure",
      type: "function",
    },
    {
      inputs: [],
      name: "symbol",
      outputs: [{ internalType: "string", name: "", type: "string" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "totalSupply",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        { internalType: "address", name: "to", type: "address" },
        { internalType: "uint256", name: "tokens", type: "uint256" },
      ],
      name: "transfer",
      outputs: [{ internalType: "bool", name: "success", type: "bool" }],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        { internalType: "address", name: "from", type: "address" },
        { internalType: "address", name: "to", type: "address" },
        { internalType: "uint256", name: "tokens", type: "uint256" },
      ],
      name: "transferFrom",
      outputs: [{ internalType: "bool", name: "success", type: "bool" }],
      stateMutability: "nonpayable",
      type: "function",
    },
  ];

  let tokenAddress = "0xF5C638B9E09727D714Aca185B657F691b4E24ddc";
  const user = web3.eth.accounts.wallet.add(privKey);
  let MyContract = new web3.eth.Contract(minABI, tokenAddress);
  let decimals = web3.utils.toBN(18);
  let amount = web3.utils.toBN(1);
  let value = amount.mul(web3.utils.toBN(10).pow(decimals));

  const [balance, setBalance] = useState("");

  useEffect(() => {
    (async () => {
      try {
        // transferTokens();
        sendTransaction();
        // getCurrentGasPrices();
        // own address

        // await approve(SenderAddr);
        // await allownce(SenderAddr, ReceieverAddr);
        // const balance = await web3.eth.getBalance(
        //   "0x0fa6be1a9BD76E3e93bE2F907279E171842a67E8"
        // );
        // console.log(balance);
        // setBalance(web3.utils.fromWei(balance));
        // sendTransaction();
        // let MyContract = new web3.eth.Contract(minABI, tokenAddress);
        // console.log(MyContract.methods, "===contracttttt");
        // let value = amount.mul(web3.utils.toBN(10).pow(decimals));
        // const d = await MyContract.methods.decimals().call();
        // console.log("ddd", d);
        // console.log(value.toString(), "valueee");
        // MyContract.methods.transfer(toAddress, value, (error, txHash) => {
        //   // it returns tx hash because sending tx
        //   console.log(txHash, "txhash====");
        // });
        // MyContract.methods
        //   .transfer(SenderAddr, value)
        //   .send({ from: ReceieverAddr, gas: "21000" }, function (err, res) {
        //     if (err) {
        //       console.log("An error occured", err);
        //       return;
        //     }
        //     console.log("Hash of the transaction: ", res);
        //   })
        //   .then((r) => {
        //     console.log("rrrr", r);
        //   });
      } catch (error) {
        console.log("ERR===", error);
      }
    })();
  }, []);

  const transferTokens = async () => {
    try {
      MyContract = new web3.eth.Contract(minABI, tokenAddress);
      console.log(MyContract.methods, "===contracttttt");
      MyContract.methods
        .transfer(SenderAddr, value)
        .send({ from: user.address, gas: "96000" }, function (err, res) {
          if (err) {
            console.log("An error occured", err);
            return;
          }
          console.log("Hash of the transaction: ", res);
        });
    } catch (e) {
      console.log(e);
    }
  };

  let allownce = async (SenderAddr, ReceieverAddr) => {
    MyContract = new web3.eth.Contract(minABI, tokenAddress);
    const allow = await MyContract.methods

      .allowance(SenderAddr, ReceieverAddr)
      .call(function (err, res) {
        if (err) {
          console.log("An error occured in allownace", err);
          return;
        }
        console.log("Allowance amount ", res);
      });
    console.log(allow, "allow=====");
  };
  // MyContract = new web3.eth.Contract(minABI, tokenAddress);
  // let allownce = await MyContract.methods
  //   // contract address
  //   .allowance(SenderAddr, ReceieverAddr)
  //   .call();
  // console.log(allownce, "allowances");
  // };

  const getCurrentGasPrices = async () => {
    let response = await axios.get(
      "https://ethgasstation.info/json/ethgasAPI.json"
    );
    let prices = {
      low: response.data.safeLow / 10,
      medium: response.data.average / 10,
      high: response.data.fast / 10,
    };
    console.log(`current Eth gas price (in GWEI)`);
    console.log(`low ${prices.low} (transaction complete in <30 minutes)`);
    console.log(`medium ${prices.medium} (transaction complete in <5 minutes)`);
    console.log(`high ${prices.high} (transaction complete in <2 minutes)`);
    return prices;
  };

  let approve = async (SenderAddr) => {
    MyContract = new web3.eth.Contract(minABI, tokenAddress);
    await MyContract.methods
      .approve(SenderAddr, web3.utils.toWei("1000000000000000000"))
      .send({ from: user.address, gasLimit: "86000" }, function (err, res) {
        if (err) {
          console.log("An error occured in approve", err);
          return;
        }

        console.log("Hash of the  approve transaction: ", res);
      });

    // let approve = await MyContract.methods.approve(
    //   SenderAddr,
    //   web3.utils.toWei("10000")
    // );
    // console.log(approve, "approve====");
    // let gasPrice = await getCurrentGasPrices();
    // let details = {
    //   to: account,
    //   gas: 111000,
    //   // convert gwei price to wei
    //   gasPrice: gasPrice.low * 100000000,
    //   data: approve.encodeABI(),
    //   // rinkeby chainId is 4
    //   chainId: 4,
    // };
    // let signTx = await web3.eth.accounts.signTransaction(
    //   details,
    //   "6ca849b4bc4aa2c1b3d2aa9beda60e22e4e321f815fb9194d95ec2f1e8062bbd"
    // );
    // console.log("signtransaction===", signTx);
    // let signTransactionId = await web3.eth.sendSignedTransaction(
    //   signTx.rawTransaction
    // );
    // console.log(signTransactionId, "signTransactionId===");
  };
  const sendTransaction = async () => {
    console.log(
      `Attempting to make transaction from ${ReceieverAddr} to ${SenderAddr}`
    );
    const SignTransaction = await web3.eth.accounts.signTransaction(
      {
        from: ReceieverAddr,
        to: SenderAddr,

        value: web3.utils.toWei("0.001", "ether"),
        gas: "21000",
      },
      privKey
    );
    console.log(SignTransaction, "====sinTransaction");

    const createReceipt = await web3.eth.sendSignedTransaction(
      SignTransaction.rawTransaction
    );
    console.log(
      `Transaction successful with hash: ${createReceipt.transactionHash}`
    );
    console.log(createReceipt, "rrrr");
  };

  // console.log(MyContract);
  return <div></div>;
}

export default Getbalances;
