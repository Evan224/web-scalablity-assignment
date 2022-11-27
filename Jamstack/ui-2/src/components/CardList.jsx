import {useState, useEffect} from 'react';
import Card from './Card.jsx';
export default function CardList() {

    const [problems, setProblems] = useState([[3,"2","true","this is the solution 2",29]]);

    useEffect(() => {
        const fetchData = async () => {
            let token=localStorage.getItem("token");
            // const token=cookies.get("token");
            const resp=await fetch("http://localhost:7800/api",{
            method:"GET",
            headers:{
                "Content-Type":"application/x-www-form-urlencoded",
                "Authorization":token
            }})

            setProblems([[3,"2","true","this is the solution 2",29],[3,"2","true","this is the solution 2",29]]);
        }
        fetchData();
    }, []);



  return (
    <div className="card-list">
        {problems.map((problem) => (
            <Card key={problem.id} problem={problem} />
        ))}
        ???
    </div>
  );
}