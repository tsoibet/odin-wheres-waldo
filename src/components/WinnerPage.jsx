export default function WinnerPage(props) {

  const time = props.time;
  const toStartPage = props.toStartPage;

  const ms = Math.floor(time / 10) % 100;
  const seconds = Math.floor(time / 1000) % 60;
  const minutes = Math.floor(time / 60000) % 60;
  const hours = Math.floor(time / 3600000);

  return (
    <div className="WinnerPage">
      <div className="background"></div>
      <div className="WinnerMessage">
        <h1>
          Congratulations!
        </h1>
        <div>
          You found all of them in
          { hours > 0 && <span> {hours} hour{ hours > 1 && 's'}</span> }
          { minutes > 0 && <span> {minutes} minute{ minutes > 1 && 's'}</span> }
          <span> {seconds}.{ms} seconds</span>!
        </div>
        <button onClick={toStartPage}>
          Check Leaderboard
        </button>
      </div>
    </div>
  );
};