import { firebaseConfig } from "./firebaseConfig";
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore"; 
import { useEffect, useState } from "react";

export default function Leaderboard(props) {

  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
  const [records, setRecords] = useState([]);

  useEffect(() => {
    async function getRecords() {
      try {
        const querySnapshot = await getDocs(collection(db, "records"));
        const temp = querySnapshot.docs.map((record) => record.data());
        setRecords(temp);
      } catch (error) {
        console.error("Error retrieving data: ", error);
      }
    };
    getRecords();
  }, []);

  const start = props.start;

  return(
    <div className="Leaderboard">
      <div className="background"></div>
      <div className="title">
        Leaderboard
      </div>
      <ol>
        {
          records.map((record, index) => 
            <Record key={index} rank={index + 1} name={record.name} score={record.score} timestamp={record.timestamp} />)
        }
      </ol>
      <button onClick={start}>
        Start
      </button>
    </div>
  );
};

function Record(props) {

  const rank = props.rank;
  const name = props.name;
  const score = props.score;
  const timestamp = props.timestamp.toDate().toLocaleDateString();

  return(
    <li className="Record">
      {/* <span>
        {rank}:
      </span> */}
      <span>
        {name}
      </span>
      <span>
        ({score})
      </span>
      <span>
        ({timestamp})
      </span>
    </li>
  );
};
