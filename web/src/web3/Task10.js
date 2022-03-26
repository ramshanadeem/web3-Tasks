import React, { useEffect } from "react";
import Web3 from "web3";
function Task10() {
  const web3 = new Web3(
    "https://rinkeby.infura.io/v3/d8761b551d1f4423b12bcd298d66ed66"
  );

  const getDeployerAddress = async (contractAddress) => {
    try {
      console.log("contractAddress", contractAddress);
      let currentBlockNum = await web3.eth.getBlockNumber();
      console.log("currentBlockNum", currentBlockNum);
      let txFound = false;

      while (currentBlockNum >= 0 && !txFound) {
        const block = await web3.eth.getBlock(10268228, true);
        const transact = block.transactions;
        for (let j = 0; j < transact.length; j++) {
          if (!transact[j].to) {
            const receipt = await web3.eth.getTransactionReceipt(
              transact[j].hash
            );
            console.log(receipt, "rrr");
            console.log("Contract Creation Transaction:", receipt);
            if (
              receipt.contractAddress ||
              receipt.contractAddress.toLowerCase() ===
                contractAddress.toLowerCase()
            ) {
              txFound = true;
              console.log(`Contract Creator Address: ${transact[j].from}`);
              break;
            }
          }
        }
        currentBlockNum--;
        console.log("currentBlockNum--", currentBlockNum);
        console.log("khh");
      }
    } catch (error) {
      console.log(error);
    }
    // const block = await web3.eth.getBlock(10268228, true);
    // const transact = block.transactions;
    // console.log(transact, "trran");
  };
  useEffect(() => {
    getDeployerAddress("0xF5C638B9E09727D714Aca185B657F691b4E24ddc");
  }, [,]);

  return <div>Task10</div>;
}

export default Task10;
