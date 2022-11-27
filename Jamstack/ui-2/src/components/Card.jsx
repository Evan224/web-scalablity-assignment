
export default function Card(props) {

  return (
    <div className="card-list">
      {props.problem.map((item) => (
        <div className="card" key={item.id} >{item} </div>
      ))}
      ???123123
    </div>
  );
}