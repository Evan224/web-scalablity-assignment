import {useState, useEffect,lazy,Suspense} from 'react';
import {useLocation,useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown'
import useInterval from './useInterval.js';




export default function Card(props) {
  // console.log(props,"props");
  const {message}=props;
  const [vote,setVote]=useState(message[2]);
  const [content,setContent]=useState(message[1]);


  // useInterval(()=>{
  //   const fetchData = async () => {
  //     // console.log(id,"id");
  //     let token=localStorage.getItem("token");
  //     // const token=cookies.get("token");
  //     const resp=await fetch(`http://localhost:7800/api/${id}`,{
  //     method:"GET",
  //     headers:{
  //         "Authorization":token
  //     }})
  //     const data=await resp.json()
  //     // console.log(data,"data");
  //     if(data.problems.length>0){
  //       setIfSaved(data.problems[0][2]);
  //     }
  //   }
  //   fetchData();
  // });

  const handleUpVote=async ()=>{
    // console.log("upvote");
    let token=localStorage.getItem("token");
    const resp=await fetch(`http://localhost:7800/api/upvote`,{
    method:"POST",
    body:JSON.stringify({
        "message_id":message[0]
    }),
    headers:{
        "Authorization":token
    }})

    setVote(vote=>vote+1);
  }

  const handleDownVote=async ()=>{
    // console.log("downvote");
    let token=localStorage.getItem("token");
    const resp=await fetch(`http://localhost:7800/api/downvote`,{
    method:"POST",
    body:JSON.stringify({
        "message_id":message[0]
    }),
    headers:{
      "Authorization":token
  }})
    setVote(vote=>vote-1);
  }
  const currentColor=randomColor[message[0]%randomColor.length]

  return (
    <div className="card-list shadow-sm p-4">
      <div className={`flex p-4 justify-between ${currentColor}`}>
        <div className='w-2/3'>
          {content}
        </div>
        <div className="flex flex-col justify-between items-center">
          <button className="btn btn-primary" onClick={(e)=>{handleUpVote()}}>UP</button>
          <div>{vote}</div>
          <button className="btn btn-primary" onClick={(e)=>{handleDownVote()}}>Down</button>
        </div>
      </div>
    </div>
  );
}


const randomColor = [
  "bg-red-200",
  "bg-yellow-200",
  "bg-green-200",
  "bg-blue-200",
  "bg-indigo-200",
  "bg-purple-200",
  "bg-pink-200",
  "bg-red-300",
  "bg-yellow-300",
  "bg-green-300",
  "bg-blue-300",

  "bg-indigo-300",
  "bg-purple-300",
  "bg-pink-300",
  "bg-red-400",
  "bg-yellow-400",
  "bg-green-400",
  "bg-blue-400",
  "bg-indigo-400",
  "bg-purple-400",
]