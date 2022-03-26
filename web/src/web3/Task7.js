import React, { useEffect, useState } from "react";
import axios from "axios";
import Web3 from "web3";
function Task7() {
  const privKey =
    "6ca849b4bc4aa2c1b3d2aa9beda60e22e4e321f815fb9194d95ec2f1e8062bbd";
  const ReceieverAddr = "0x950eBa22b77379a4d6aB5E8d3789EF8C29d518bf";
  const SenderAddr = "0x0fa6be1a9BD76E3e93bE2F907279E171842a67E8";
  const TOKEN_ADDRESS = "0xF5C638B9E09727D714Aca185B657F691b4E24ddc";

  const web3 = new Web3(
    "https://rinkeby.infura.io/v3/d8761b551d1f4423b12bcd298d66ed66"
  );
  const amount = web3.utils.toHex(web3.utils.toWei("0.0002", "ether"));

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
  let user = web3.eth.accounts.wallet.add(privKey);
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

  const lowTransaction = async () => {
    let currentgasPrice = await getCurrentGasPrices();
    let nonce = await web3.eth.getTransactionCount(SenderAddr);
    const txObj = {
      gasLimit: 210000,
      nonce,
      //   gasPrice: web3.utils.toWei(currentgasPrice.low),
      gasPrice: currentgasPrice.low * 1000000000,
      from: user.address,
    };
    const erc20Token = new web3.eth.Contract(minABI, TOKEN_ADDRESS);

    let res = await erc20Token.methods
      .transfer(ReceieverAddr, amount)
      .send(txObj, function (err, res) {
        if (err) {
          console.log("An error occured", err);
          return;
        }
        console.log("Hash of the transaction: ", res);
      });
    console.log(res, "ressslow");
  };

  const SpeedUpTransaction = async () => {
    let currentgasPrice = await getCurrentGasPrices();
    let nonce = await web3.eth.getTransactionCount(SenderAddr);
    let txObj = {
      gasLimit: 210000,
      nonce,
      gasPrice: currentgasPrice.high * 1000000000,
      from: user.address,
    };
    let erc20Token = new web3.eth.Contract(minABI, TOKEN_ADDRESS);

    let res = await erc20Token.methods
      .transfer(ReceieverAddr, amount)
      .send(txObj, function (err, res) {
        if (err) {
          console.log("An error occured", err);
          return;
        }
        console.log("Hash of the transaction: ", res);
      });
    console.log(res, "highhhspped");
  };

  useEffect(() => {
    lowTransaction();
    SpeedUpTransaction();
  }, []);

  return <div>Task7</div>;
}

export default Task7;
