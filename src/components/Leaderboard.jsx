export default function Leaderboard(props) {

  const records = [{
    name: "Bet",
    score: 9
  }, {
    name: "Tsoi",
    score: 1
  }];

  return(
    <div className="Leaderboard">
      <div>
        Leaderboard
      </div>
      {
        records.map((record, index) => 
          <Record key={index} rank={index + 1} name={record.name} score={record.score} />)
      }
    </div>
  );
};

function Record(props) {

  const rank = props.rank;
  const name = props.name;
  const score = props.score;

  return(
    <div className="Record">
      <span>
        {rank}:
      </span>
      <span>
        {name}
      </span>
      <span>
        ({score})
      </span>
    </div>
  );
};
