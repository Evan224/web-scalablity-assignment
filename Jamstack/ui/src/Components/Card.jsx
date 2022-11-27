import {useState, useEffect} from 'react';
export default function Card(props) {
  const {description,id,name,ifSaved,solution=""}=props.problem;
  const [textValue,setTextValue]=useState(solution);
  const [open,setOpen]=useState(false);

  useEffect(()=>{
    setTextValue(solution);
  },[props])

  const handleSubmit=async (e)=>{
    e.preventDefault();
    const resp=await fetch("http://localhost:7800/api",{
      method:"POST",
      headers:{
        "Content-Type":"application/json",
        "Authorization":localStorage.getItem("token")
      },
      body:JSON.stringify({
        problem_id:id,
        solution:textValue,
        ifSaved:ifSaved
      })
    })
    const data=await resp.json();
  }


  return (
    <div className="card-list">
      <h1 onClick={()=>{setOpen(state=>!state)}}>{name}</h1>
      <h2>{ifSaved==="PASS"?"Pass":"Not finished yet" }</h2>
      {open && (
        <>
      <h2>{description}</h2>
      <textarea value={textValue} onChange={(e)=>setTextValue(e.target.value)}></textarea>
      <input type="submit" value="Submit" onClick={handleSubmit}/> </>)}
    </div>
  );
}

