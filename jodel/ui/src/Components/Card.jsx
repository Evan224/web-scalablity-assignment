import {useState} from 'react';
import {useNavigate} from 'react-router-dom';




export default function Card(props) {
  // console.log(props,"props");
  const {show=true}=props;
  const {message}=props;
  const [vote,setVote]=useState(message[2]);
  const [content]=useState(message[1]);
  const navigate=useNavigate();



  const handleUpVote=async (e)=>{
    e.preventDefault();

    let token=localStorage.getItem("token");
    const resp=await fetch(`/api/upvote`,{
    method:"POST",
    body:JSON.stringify({
        "message_id":message[0]
    }),
    headers:{
        "Authorization":token
    }})

    setVote(vote=>vote+1);
  }

  const handleDownVote=async (e)=>{
    e.preventDefault();
    let token=localStorage.getItem("token");
    const resp=await fetch(`/api/downvote`,{
    method:"POST",
    body:JSON.stringify({
        "message_id":message[0]
    }),
    headers:{
      "Authorization":token
  }})
    setVote(vote=>vote-1);
  }

  const handleEdit=async (e)=>{
    e.preventDefault();
    //navigate to edit page
    navigate(`/detail/${message[0]}`, { state: { id: message[0] } });
  }

  const currentColor=randomColor[message[0]%randomColor.length]

  return (
    <div className="card-list shadow-sm p-4">
      <div className={`flex p-4 justify-between ${currentColor}`}>
        <div className='flex flex-col w-full justify-between'>
            <div className='w-2/3'>
              {content}
            </div>
            <div>
              {show&&<button className="btn btn-primary" onClick={(e)=>{handleEdit(e)}} >details</button>}
            </div>
        </div>
     
        <div className="flex flex-col justify-between items-center">
          <button className="btn btn-primary" onClick={(e)=>{handleUpVote(e)}}>UP</button>
          <div>{vote}</div>
          <button className="btn btn-primary" onClick={(e)=>{handleDownVote(e)}}>Down</button>
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