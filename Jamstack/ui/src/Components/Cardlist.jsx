import {useState, useEffect,useMemo} from 'react';
import Card from './Card.jsx';
export default function CardList() {

    const [problems, setProblems] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            let token=localStorage.getItem("token");
            // const token=cookies.get("token");
            const resp=await fetch("http://localhost:7800/api",{
            method:"GET",
            headers:{
                "Authorization":token
            }})
            const data=await resp.json()
            setProblems(data.problems);
        }
        fetchData();
    }, []);

    const allProblemList=useMemo(()=>{
        const temp=[...problemsList];
        problems.forEach((problem)=>{
            const [id,probelm_id,ifSaved,solution,user_id]=problem;
            temp[Number(probelm_id)-1].ifSaved=ifSaved;
            temp[Number(probelm_id)-1].solution=solution;
        })
        return temp;
    },[problems])


  return (
    <div className="card-list">
        {allProblemList.map((problem,index) => (
            <Card key={index} problem={problem} />
        ))}
    </div>
  );
}

const problemsList=[
    {
        id:1,
        name:"Sum of three values",
        description:"Write a function int sum(int first, int second, int third) that returns the sum of the given integers. As an example, the function call sum(1, 2, 3) should return the value 6.",
    },{
        id:2,
        name:"Sum with formula",
        description:"Write a function String sumWithFormula(int first, int second) that returns the written out sum of the given integers and the sum. As an example, the function call sumWithFormula(1, 2) should return the string 1+2=3 and the function call sumWithFormula(1, 1) should return the string 1+1=2. Note! Do not add spaces to the returned string.",
    },{
        id:3,
        name:"Budget check",
        description:`Write a function String budgetCheck(double budget, double currentSpending) that returns information on whether a given budget is in order in light of given spending. If the value of currentSpending is larger than the value of budget, the function should return "Budget: Overspending". Otherwise, the function should return "Budget: OK".`
    },{
        id:4,
        name:"Mystery function",
        description:"Write a function int sum() that returns the value 0. As an example, the function call sum() should return the value 0.",
    },{
        id:5,
        name:"Sum of negative numbers",
        description:`Write a function int sumOfNegatives(List<int> numbers) that returns the sum of the negative numbers in the given list. For example, if the numbers list would contain the numbers -1, 2, -4, the function should return the value -5.`,
    },{
        id:6,
        name:"Average of positives",
        description:`Write a function double averageOfPositives(List<int> numbers) that returns the average value of the positive numbers on the list. If there are no positive values, the function should return the value -1.`,
    },{
        id:7,
        name:"Team",
        description:`Create a class Team and implement the two following constructors (and necessary properties) to the class. The default constructor should have three properties: (1) the name of the team (String), (2) the home town of the team (String), and (3) the year the team was formed (int). The named constructor nameAndYear should have two properties: (1) the name of the team (String) and (2) the year the team was formed (int). In the case of the named constructor, the home town of the team must be "Unknown".
  
        Once completed, add a toString method to the class which leads to outputs outlined by the following examples.`
    },{
        id:8,
        name:"Video and playlist",
        description:`Implement the classes Video and Playlist as follows. The class Video should have a name (String), a duration in seconds (int), a constructor with named arguments, and a toString method. The default name should be "Unknown" and the default length should be 0. The class should work as follows.`
    }
  ]