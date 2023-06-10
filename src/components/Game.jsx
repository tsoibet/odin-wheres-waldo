
import Stopwatch from './Stopwatch'
import Targets from './Targets';
import Wimmelbilder from './Wimmelbilder';
import WinnerPage from './WinnerPage';
import { useEffect, useState } from "react";

export default function Game(props) {

  const [isEnd, setIsEnd] = useState(false);
  const toStartPage = props.toStartPage;

  // Stopwatch
  const [isRunning, setIsRunning] = useState(true);
  const [time, setTime] = useState(0);

  useEffect(() => {
    let interval = null;
    if (isRunning) {
      interval = setInterval(() => {
        setTime((time) => time + 10);
      }, 10);
    } else {
      clearInterval(interval);
    }
    return () => {
      clearInterval(interval);
    }
  }, [isRunning]);

  function pauseStopwatch() {
    setIsRunning(false);
  }
  //

  const targets = [
    {
      id: 1,
      name: "Nora",
      ans: {
        x: [2400, 2750], 
        y: [1700, 2200]
      }
    },
    {
      id: 2,
      name: "Doge",
      ans: {
        x: [1130, 1430],
        y: [3010, 3400]
      }
    },
    {
      id: 3,
      name: "Capybara",
      ans: {
        x: [1750, 2060],
        y: [680, 880]
      }
    }
  ];

  // const targets = [...props.targets];
  // retrieve targets from database
  targets.forEach((target) => {
    target.isFound = false;
  });

  const [targetList, setTargetList] = useState(targets);

  useEffect(() => {
    if(isAllFound()) {
      pauseStopwatch();
      setIsEnd(true);
    }
  }, [targetList]);

  const [isClicked, setIsClicked] = useState(false);

  function setClicked() {
    setIsClicked(true);
  }

  function resetClicked() {
    setIsClicked(false);
  }

  function handleClickOnMenu(id, pointerX, pointerY, ratio, event) {
    event.stopPropagation();
    resetClicked();
    if(isCorrect(id, pointerX * ratio, pointerY * ratio)) {
      const newTargetList = [...targetList];
      for (let target of newTargetList) {
        if (target.id === id) {
          target.isFound = true;
          break;
        }
      }
      setTargetList(newTargetList);
    }
  };

  function isCorrect(id, x, y) {
    // ans from database
    const chosenTarget = targets.find(target => target.id === id);
    if (x < chosenTarget.ans.x[0] || x > chosenTarget.ans.x[1] || 
        y < chosenTarget.ans.y[0] || y > chosenTarget.ans.y[1]) {
      return false;
    }
    return true;
  }

  function isAllFound() {
    for (let target of targetList) {
      if (!target.isFound) {
        return false;
      }
    }
    return true;
  }

  return (
    <div className='Game'>
      <Stopwatch isRunning={isRunning} time={time} />
      <div className='gameboard'>
        <Targets targetList={targetList}/>
        { isEnd ? 
          <WinnerPage time={time} toStartPage={toStartPage} />
          : 
          <Wimmelbilder targetList={targetList} handleClickOnMenu={handleClickOnMenu} isClicked={isClicked} setClicked={setClicked} />
        }
      </div>
    </div>
  );
}