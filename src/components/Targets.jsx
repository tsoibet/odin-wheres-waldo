export default function Targets(props) {

  const targetList = props.targetList;

  return (
    <div className="Targets">
      <div>
        Find...
      </div>
      <ul>
        {
          targetList.map(target =>
            <li key={target.id} className={target.isFound ? 'found' : ''}>
              {target.name}
            </li>)
        }
      </ul>
    </div>
  );
};