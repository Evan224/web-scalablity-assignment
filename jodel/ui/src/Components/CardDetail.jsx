import {useState, useEffect} from 'react';
import {useParams } from 'react-router-dom';

export default function CardDetail(props) {
    const {id}=useParams();
    // console.log(id,"id")
    const [textValue,setTextValue]=useState("");
    const [content,setContent]=useState("");
    const [vote,setVote]=useState(0);
    const [replies,setReplies]=useState([]);

    const handleTextChange=(e)=>{
        e.preventDefault();
        setTextValue(e.target.value);
    }

    const handleClickButton=async (e)=>{
        e.preventDefault();
        let token=localStorage.getItem("token");
        const resp=await fetch(`http://localhost:7800/api/reply`,{
        method:"POST",
        body:JSON.stringify({
            "content":textValue,
            "message_id":id
        }),
        headers:{
            "Authorization":token
        }})
        const data=await resp.json()
        window.location.reload();
    }

    useEffect(()=>{
        const fetchData = async () => {
            // let token=localStorage.getItem("token");
            const resp=await fetch(`http://localhost:7800/api/${id}`,{
            method:"GET",
            headers:{
                "Authorization":localStorage.getItem("token")
            }})
            const data=await resp.json()
            const {message,replies}=data;
            console.log(message,"message")
            setContent(message[0][1]);
            setVote(message[0][2]);
            setReplies(replies);
        }
        fetchData();
    },[]);
    const currentColor=randomColor[id%randomColor.length]
    return (
        <div>
                <div className="card-list shadow-sm p-4">
                    <div className={`flex p-10 justify-between ${currentColor}`}>
                        <div className='flex flex-col w-full justify-between'>
                            <div className='w-2/3'>
                            {content}
                            </div>
                        </div>
                    
                        <div className="flex flex-col justify-between items-center">
                              <div>{vote}</div>
                        </div>
                    </div>
                </div>
                {replies.map((reply)=>{
                    const currentColor=randomColor[reply[0]%randomColor.length]
                    return <div className={`p-4 m-4 w-2/3 ${currentColor}`} key={reply[0]}>
                        {reply[2]}
                    </div>
                })}
                <div className='w-2/3'>
                    <textarea id="message" rows="4" value={textValue} onChange={handleTextChange} className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500
                    focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" ></textarea>
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mt-4 rounded" onClick={handleClickButton}>
                    reply
                    </button>
                </div>
        </div>
    )
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