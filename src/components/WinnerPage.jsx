export default function WinnerPage(props) {

  const restart = props.restart;

  return (
    <div className="WinnerPage">
      <div className="background"></div>
      <div className="WinnerMessage">
        <div>
          You found all of them!
        </div>
        <h1>
          Congratulations!
        </h1>
        <button onClick={restart}>
          Restart
        </button>
      </div>
    </div>
  );
};