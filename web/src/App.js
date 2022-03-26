import { useState } from "react";
import "./App.css";
import StripeContainer from "./stripe/component/StripeContainer";
import Getbalances from "./web3/Getbalances";
import Subarray from "./web3/Subarray";
import Task10 from "./web3/Task10";
import Task11 from "./web3/Task11";
import Task2 from "./web3/Task2";
import Task3 from "./web3/Task3";
import Task4 from "./web3/Task4";
import Task5 from "./web3/Task5";
import Task6 from "./web3/Task6";
import Task7 from "./web3/Task7";
import Task8 from "./web3/Task8";
import Task9 from "./web3/Task9";

function App() {
  const [showItem, setShowItem] = useState(false);
  return (
    <div className="App">
      {/* <header className="App-header"> */}
      <p>store</p>
      {/* <Getbalances /> */}
      {/* <Task2 /> */}
      {/* 0x77fb8d5711535c668c4f6ed5c682e77bdc3a50b5f630c67378e3ce250d9f5574 */}
      {/* <Task3 /> */}
      {/* <Task4 /> */}
      {/* <Task5 /> */}
      {/* <Task6 /> */}
      {/* <Task7 /> */}
      {/* <Task8 /> */}
      {/* <Task9 /> */}
      {/* <Task11 /> */}
      {/* <Task10 /> */}
      <Subarray />
      {/* 
      {showItem ? (
        <StripeContainer />
      ) : (
        <div>
          <button onClick={() => setShowItem(true)}>buy xyz</button>
        </div>
      )} */}

      {/* </header> */}
    </div>
  );
}

export default App;
