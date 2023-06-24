import mark from './../resources/found.svg'

export default function Targets(props) {

  const targetList = props.targetList;

  return (
    <div className="Targets">
      <div>
        WANTED
      </div>
      <ul>
        {
          targetList.map(target =>
            <li key={target.id}>
              <div className={`target${target.id}`}>
                { target.isFound && 
                <span class="material-icons-outlined outlined found">
                  check_circle
                </span> }
              </div>
              <div>{target.name}</div>
            </li>)
        }
      </ul>
    </div>
  );
};