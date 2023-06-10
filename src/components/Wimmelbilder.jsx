import { useState } from "react";

export default function Wimmelbilder(props) {

  const imgPath = process.env.PUBLIC_URL + 'wimmelbilder.jpeg';

  const isClicked = props.isClicked;
  const setClicked = props.setClicked;
  const [pointerX, setPointerX] = useState(0);
  const [pointerY, setPointerY] = useState(0);
  const [ratio, setRatio] = useState(1);

  function showClickMenu(event) {
    setClicked();
    setPointerX(event.nativeEvent.offsetX);
    setPointerY(event.nativeEvent.offsetY);
    setRatio(event.target.naturalHeight / event.target.height);
  }

  return (
    <div 
      className="Wimmelbilder"
      onContextMenu={(event) => {
        event.preventDefault();
        showClickMenu(event)
      }} 
      onClick={(event) => {
        event.preventDefault();
        showClickMenu(event)
      }}
    >
      <img src={imgPath} alt='full of dogs' />
      { isClicked && 
        <ClickMenu
          targetList={props.targetList}  
          pointerX={pointerX} 
          pointerY={pointerY} 
          ratio={ratio} 
          handleClickOnMenu={props.handleClickOnMenu} 
        /> }
    </div>
  );
};

function ClickMenu(props) {

  const targetList = props.targetList;
  const pointerX = props.pointerX;
  const pointerY = props.pointerY;
  const ratio = props.ratio;
  const handleClickOnMenu = props.handleClickOnMenu;

  return(
    <div className="ClickMenu" 
      style={{
        top: pointerY, 
        left: pointerX
      }}
      onClick={(event) => event.stopPropagation()}
      >
      <ul>
        {targetList.map((target) => {
          if (!target.isFound) {
            return (
              <li 
                key={target.id}
                onClick={(event) => handleClickOnMenu(target.id, pointerX, pointerY, ratio, event)}
              >
                  {target.name}
              </li>
            );
          }
        })}
      </ul>
    </div>
  );
};
