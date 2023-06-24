export default function Stopwatch(props) {

  const time = props.time;

  const ms = (Math.floor(time / 10) % 100).toString().padStart(2, '0');
  const seconds = (Math.floor(time / 1000) % 60).toString().padStart(2, '0');
  const minutes = (Math.floor(time / 60000) % 60).toString().padStart(2, '0');
  const hours = (Math.floor(time / 3600000)).toString().padStart(2, '0');

  return (
    <div className="Stopwatch">
      <span className="material-icons-outlined">
        timer
      </span>
      <div>
        <span>{hours}</span>:<span>{minutes}</span>:<span>{seconds}</span>.<span>{ms}</span>
      </div>
    </div>
  );
};