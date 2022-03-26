import React from "react";

function Subarray() {
  const SubArraySum = (values) => {
    let subArrValue = SubArr(values);
    console.log(subArrValue, "subarrayvalues");
    let arr = [];
    let spreadArrofSubArray = [];
    for (let j = 0; j <= subArrValue.length; j++) {
      arr.push(values[j]);
      spreadArrofSubArray.push(...arr);
    }
    // console.log(arr, "array");
    console.log(...spreadArrofSubArray, SubArr(subArrValue), "jsdshjhdsjh");
  };

  const SubArr = (values) => {
    let spreadArr = [];
    for (let i = 0; i < values.length; i++) {
      let arr = [];
      for (let j = i; j < values.length; j++) {
        arr.push(values[j]);
        spreadArr.push([...arr]);
      }

      console.log(spreadArr);
    }
    return spreadArr;
  };

  //   SubArr([5, -2, 7, -3]);
  SubArraySum([5, -2, 7, -3]);
  return <div>Subarray</div>;
}

export default Subarray;
