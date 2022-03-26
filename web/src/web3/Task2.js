import React from "react";
const Web3 = require("web3");
const pkg = require("ethers");
const { ethers } = pkg;

function Task2() {
  // export default Task2;
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

  const testnet = `https://rinkeby.infura.io/v3/84842078b09946638c03157f83405213`;
  const TOKEN_ADDRESS = "0xF5C638B9E09727D714Aca185B657F691b4E24ddc";
  const senderAddress = "0x0fa6be1a9BD76E3e93bE2F907279E171842a67E8";
  const receiverAddress = "0x31C6ADeD96f75A923d20B4f7CE386cF66820F237";
  const WALLET_PRIVATE_KEY =
    "0x6ca849b4bc4aa2c1b3d2aa9beda60e22e4e321f815fb9194d95ec2f1e8062bbd"; //do not push this
  const main = async () => {
    try {
      const web3 = new Web3(testnet);
      const erc20Token = new web3.eth.Contract(minABI, TOKEN_ADDRESS);
      const user = web3.eth.accounts.wallet.add(WALLET_PRIVATE_KEY);
      const getBalance = () => {
        erc20Token.methods.balanceOf(senderAddress).call(function (err, res) {
          if (res) {
            console.log("The balance is: ", res);
            // return;
          } else {
            console.log("An error occured bhai", err);
          }
        });
      };
      const getblockno = async () => {
        // let blockno = web3.eth.getBlockNumber();
        // console.log(blockno);

        console.log(erc20Token);
        // console.log("ddd", d);
      };
      const transferTokens = async () => {
        try {
          erc20Token.methods
            .transfer(receiverAddress, "10000000000000000000")
            .send(
              { from: user.address, gasLimit: "96000" },
              function (err, res) {
                if (err) {
                  console.log("An error occured", err);
                  return;
                }
                console.log("Hash of the transaction: ", res);
              }
            );
        } catch (e) {
          console.log(e);
        }
      };
      const transferFrom = async () => {
        try {
          // console.log(web3.utils.fromWei("100000000000000"));
          //   const allow = await erc20Token.methods
          //     .allowance(senderAddress, receiverAddress)
          //     .call(function (err, res) {
          //       if (err) {
          //         console.log("An error occured in allownace", err);
          //         return;
          //       }
          //       console.log("Allowance amount ", res);
          //     });
          //   console.log(allow, "allow");
          //   if (!Number(allow)) {
          //     await erc20Token.methods
          //       .approve(receiverAddress, web3.utils.toWei("1000000000000000000"))
          //       .send(
          //         { from: user.address, gasLimit: "86000" },
          //         function (err, res) {
          //           if (err) {
          //             console.log("An error occured in approve", err);
          //             return;
          //           }
          //           console.log("Hash of the  approve transaction: ", res);
          //         }
          //       );
          //   }
          await erc20Token.methods
            .transferFrom(senderAddress, receiverAddress, "1000000000000000000")
            .send({ from: user.address, gas: "96000" }, function (err, res) {
              if (err) {
                console.log("An error occured in tf", err);
                return;
              }
              console.log("Hash of the transferFrommm transaction: ", res);
            });
        } catch (e) {
          console.log("Error in catch block", e);
        }
      };
      getBalance();
      getblockno();
      transferTokens();
      transferFrom();
    } catch (e) {
      console.log("ERRORrrrrrrrrrrrrrrr", e);
    }
  };
  main();
  return <div></div>;
}

export default Task2;
