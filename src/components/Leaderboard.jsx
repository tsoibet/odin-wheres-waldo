export default function Leaderboard(props) {

  const records = [{
    name: "Bet",
    score: 9
  }, {
    name: "Tsoi",
    score: 1
  }];

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
            <Record key={index} rank={index + 1} name={record.name} score={record.score} />)
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
    </li>
  );
};
