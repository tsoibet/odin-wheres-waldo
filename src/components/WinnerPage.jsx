import { useState } from "react";
import { firebaseConfig } from "./firebaseConfig";
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, serverTimestamp } from "firebase/firestore";

export default function WinnerPage(props) {

  const toStartPage = props.toStartPage;
  const time = props.time;
  const ms = Math.floor(time / 10) % 100;
  const seconds = Math.floor(time / 1000) % 60;
  const minutes = Math.floor(time / 60000) % 60;
  const hours = Math.floor(time / 3600000);

  const [playerInputName, setPlayerInputName] = useState("");
  function handleInputChange(event) {
    setPlayerInputName(event.target.value);
  }

  async function addRecords() {
    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);
    const playerName = playerInputName ? playerInputName : "Anonymous Player";
    try {
      const docRef = await addDoc(collection(db, "records"), {
        name: playerName,
        score: time,
        timestamp: serverTimestamp()
      });
      console.log("Record added: ", docRef.id)
    } catch (error) {
      console.error("Error adding data: ", error);
    }
  };

  return (
    <div className="WinnerPage">
      <div className="background"></div>
      <div className="WinnerMessage">
        <h1>
          Congratulations!
        </h1>
        <div>
          You found all of them in
          { hours > 0 && <span> <span className="number"> {hours} </span> hour{ hours > 1 && 's'}</span> }
          { minutes > 0 && <span> <span className="number"> {minutes} </span> minute{ minutes > 1 && 's'}</span> }
          <span> <span className="number"> {seconds}.{ms} </span> seconds</span>!
        </div>
        <div className="addRecord">
          <label htmlFor="name">
            Leave your name on our record:
          </label>
          <input id="name" type="text" maxLength={20} autoComplete="off" placeholder="Anonymous Player" value={playerInputName} onChange={handleInputChange}>
          </input>
          <button name="addRecord" onClick={async () => {
            await addRecords();
            toStartPage();
          }}>
            Add Record
          </button>
        </div>

        <button name="skipRecord" onClick={toStartPage}>
          Check Leaderboard Without Adding Record
        </button>
      </div>
    </div>
  );
};