import { firebaseConfig } from "./firebaseConfig";
import { initializeApp } from "firebase/app";
import { getFirestore, query, collection, orderBy, limit, getDocs } from "firebase/firestore"; 
import { useEffect, useState } from "react";

export default function Leaderboard(props) {

  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
  const [records, setRecords] = useState([]);
  
  useEffect(() => {
    async function getRecords() {
      try {
        const q = query(collection(db, "records"), orderBy("score"), limit(10));
        const querySnapshot = await getDocs(q);
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
      <button onClick={start}>
        Start
      </button>
      <div className="board">
        <div className="title">
          Leaderboard
        </div>
        <ol>
        {
          records.map((record, index) => 
            <Record key={index} rank={index + 1} name={record.name} score={record.score} timestamp={record.timestamp} />)
        }
        </ol>
      </div>
    </div>
  );
};

function Record(props) {

  const rank = props.rank;
  const name = props.name;
  const score = props.score;
  const options = {
    year: "numeric",
    month: "short",
    day: "numeric",
  };
  const timestamp = props.timestamp.toDate().toLocaleDateString("en-US", options);

  const ms = (Math.floor(score / 10) % 100).toString().padStart(2, '0');
  const seconds = (Math.floor(score / 1000) % 60).toString().padStart(2, '0');
  const minutes = (Math.floor(score / 60000) % 60).toString().padStart(2, '0');
  const hours = (Math.floor(score / 3600000)).toString().padStart(2, '0');

  return(
    <li className="Record">
      <span>
        {rank}
      </span>
      <span className="name">
        {name}
      </span>
      <span className="number">
        { hours > 0 && `${hours}h` }
        { minutes > 0 && `${minutes}m` }
        {seconds}.{ms}s 
      </span>
      <span className="date">
        {timestamp}
      </span>
    </li>
  );
};
