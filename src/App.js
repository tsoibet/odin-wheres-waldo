import './App.css';
import Stopwatch from './components/Stopwatch'
import Leaderboard from './components/Leaderboard';
import Targets from './components/Targets';
import Wimmelbilder from './components/Wimmelbilder';
import WinnerPage from './components/WinnerPage';
import { useEffect, useState } from "react";

  // connect to database to get ranking record
  // loading page & start button before timer starts


export default function App() {

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
  const [isEnd, setIsEnd] = useState(false);
  useEffect(() => {
    if(isAllFound()) {
      setIsEnd(true);
    }
  }, [targetList]);

  function handleClickOnMenu(id, pointerX, pointerY, ratio) {
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
    console.log(chosenTarget)
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

  function restart() {
    setIsEnd(false);
    setTargetList(targets);
  }

  return (
    <div className="App">
      <header>
        Where's Doggo?
      </header>
      <div className='main'>
        {/* <div className='side'>
          <Stopwatch />
          <Leaderboard />
        </div> */}
        <div className='gameboard'>
          <Targets targetList={targetList}/>
          { isEnd ? 
            <WinnerPage restart={restart} />
            : 
            <Wimmelbilder targetList={targetList} handleClickOnMenu={handleClickOnMenu}/>
          }
        </div>
      </div>
      <footer>
        Created by tsoibet @ The Odin Project 2023
      </footer>
    </div>
  );
};
