
import Stopwatch from './Stopwatch'
import Targets from './Targets';
import ToastNotification from './ToastNotification';
import Wimmelbilder from './Wimmelbilder';
import WinnerPage from './WinnerPage';
import getTargets from './data';
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

  const targets = getTargets();

  targets.forEach((target) => {
    target.isFound = false;
  });

  const [targetList, setTargetList] = useState(targets);

  useEffect(() => {
    function isAllFound() {
      for (let target of targetList) {
        if (!target.isFound) {
          return false;
        }
      }
      return true;
    }
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
      updateToast("correct");
      setTargetList(newTargetList);
    } else {
      updateToast("wrong");
    }
  };

  function isCorrect(id, x, y) {
    const chosenTarget = targets.find(target => target.id === id);
    if (x < chosenTarget.ans.x[0] || x > chosenTarget.ans.x[1] || 
        y < chosenTarget.ans.y[0] || y > chosenTarget.ans.y[1]) {
      return false;
    }
    return true;
  }

  const [toast, setToast] = useState();
  const [id, setId] = useState(0);

  function updateToast (type) {
    if (type === "correct") {
      setToast({
        id: id,
        type: type,
        message: "Good one!"
      });
    } else if (type === "wrong") {
      setToast({
        id: id,
        type: type,
        message: "No, that's not it."
      });
    }
    setId((id) => id + 1);
  }

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setToast(null);
    }, 1000);
    return () => {
      clearTimeout(timeoutId);
    };
  }, [toast]);

  return (
    <div className='Game'>
      { toast &&
        <ToastNotification toast={toast} />
      }
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