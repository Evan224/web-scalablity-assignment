import {useState, useEffect,lazy,Suspense} from 'react';
import {useLocation,useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown'
import useInterval from './useInterval.js';
import Problem1 from '../markdowns/Problem1.jsx';
import Problem2 from '../markdowns/Problem2.jsx';
import Problem3 from '../markdowns/Problem3.jsx';
import Problem4 from '../markdowns/Problem4.jsx';
import Problem5 from '../markdowns/Problem5.jsx';
import Problem6 from '../markdowns/Problem6.jsx';
import Problem7 from '../markdowns/Problem7.jsx';
import Problem8 from '../markdowns/Problem8.jsx';



const CurrentProblem={
    'Problem1':Problem1,
    'Problem2':Problem2,
    'Problem3':Problem3,

}


export default function Card() {
  // const {description,id,name,ifSaved,solution=""}=props.problem;
  // const [textValue,setTextValue]=useState(solution);
  // const [open,setOpen]=useState(false);
  // const location=useLocation();
  const [textValue,setTextValue]=useState("");
  const [problem,setProblem]=useState([]);
  const {id}=useParams();
  const [ifSaved,setIfSaved]=useState("");

  useEffect(()=>{
    const fetchData = async () => {
      // console.log(id,"id");
      let token=localStorage.getItem("token");
      const resp=await fetch(`http://localhost:7800/api/${id}`,{
      method:"GET",
      headers:{
          "Authorization":token
      }})
      const data=await resp.json()
      // console.log(data,"data");
      if(data.problems.length>0){
        setTextValue(data.problems[0][3]);
        setIfSaved(data.problems[0][2]);
      }
  }
  fetchData();
  },[id])

  useInterval(()=>{
    const fetchData = async () => {
      // console.log(id,"id");
      let token=localStorage.getItem("token");
      // const token=cookies.get("token");
      const resp=await fetch(`http://localhost:7800/api/${id}`,{
      method:"GET",
      headers:{
          "Authorization":token
      }})
      const data=await resp.json()
      // console.log(data,"data");
      if(data.problems.length>0){
        setIfSaved(data.problems[0][2]);
      }
    }
    fetchData();
  });

  const handleTextChange=(e)=>{
    e.preventDefault();
    setTextValue(e.target.value);
  }


  const handleClickButton=async ()=>{
    let token=localStorage.getItem("token");
    const resp=await fetch(`http://localhost:7800/api/${id}`,{
      method:"POST",
      headers:{
          "Authorization":token,
          "Content-Type":"application/json"
      },
      body:JSON.stringify({
        solution:textValue,
        problem_id:id,
        ifSaved:ifSaved
      })
    })
  }


  const CurrentProblem=({id})=>{
    switch(String(id)){
      case "1":
        return <Problem1 />;
      case "2":
        return <Problem2 />;
      case "3":
        return <Problem3 />;
      case "4":
        return <Problem4 />;
      case "5":
        return <Problem5 />;
      case "6":
        return <Problem6 />;
      case "7":
        return <Problem7 />;
      case "8":
        return <Problem8 />;
    }
  }


  return (
    <div className="card-list shadow-sm p-4">
      <div>
        <div className="text-2xl font-bold">id:{id}</div>
        <CurrentProblem id={id}/>

        <div className="text-2xl font-bold">current status: {ifSaved?ifSaved:"not submitted yet"}</div>
        <div className="p-4">
        </div>
    
        <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Code Area</label>
        <textarea id="message" rows="4" value={textValue} onChange={handleTextChange} className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" ></textarea>
        
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mt-4 rounded" onClick={handleClickButton}>
      Submit
    </button>
      </div>
    </div>
  );
}

