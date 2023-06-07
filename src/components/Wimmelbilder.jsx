import { useState } from "react";

export default function Wimmelbilder(props) {

  const imgPath = process.env.PUBLIC_URL + 'wimmelbilder.jpeg';

  const [isClicked, setIsClicked] = useState(false);
  const [pointerX, setPointerX] = useState(0);
  const [pointerY, setPointerY] = useState(0);
  const [ratio, setRatio] = useState(1);

  return (
    <div 
      className="Wimmelbilder"
      onContextMenu={(event) => {
        event.preventDefault();
        setIsClicked(true);
        setPointerX(event.nativeEvent.offsetX);
        setPointerY(event.nativeEvent.offsetY);
        setRatio(event.target.naturalHeight / event.target.height);
      }} 
      onClick={() => setIsClicked(false)}
    >
      <img src={imgPath} alt='full of dogs' />
      { isClicked && 
        <RightClickMenu
          targetList={props.targetList}  
          pointerX={pointerX} 
          pointerY={pointerY} 
          ratio={ratio} 
          handleClickOnMenu={props.handleClickOnMenu} 
        /> }
    </div>
  );
};

function RightClickMenu(props) {

  const targetList = props.targetList;
  const pointerX = props.pointerX;
  const pointerY = props.pointerY;
  const ratio = props.ratio;
  const handleClickOnMenu = props.handleClickOnMenu;

  return(
    <div className="RightClickMenu" 
      style={{
        top: pointerY, 
        left: pointerX
      }}
      >
      <ul>
        {targetList.map((target) => {
          if (!target.isFound) {
            return (
              <li 
                key={target.id}
                onClick={() => handleClickOnMenu(target.id, pointerX, pointerY, ratio)}
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
