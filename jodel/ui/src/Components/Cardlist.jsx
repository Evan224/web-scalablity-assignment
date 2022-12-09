import {useState, useEffect,useMemo} from 'react';
import Card from './Card.jsx';
import { Link,useNavigate } from "react-router-dom";
export default function CardList() {

    // [messageId,content,vote,user_id,time])
    const [textValue,setTextValue]=useState("");
    const [messages,setMessages]=useState([]);
    
    useEffect(()=>{
        const fetchData = async () => {
            let token=localStorage.getItem("token");
            const resp=await fetch(`http://localhost:7800/api/`,{
            method:"GET",
            headers:{
                "Authorization":localStorage.getItem("token")
            }})
            const data=await resp.json()
            setMessages(data);
            if(!token){
                localStorage.setItem("token",await resp.headers.get("Authorization"));
            }
        }
        fetchData();
    },[]);

    const handleTextChange=(e)=>{
        e.preventDefault();
        setTextValue(e.target.value);
    }

    const handleClickButton=async (e)=>{
        e.preventDefault();
        let token=localStorage.getItem("token");
        const resp=await fetch(`http://localhost:7800/api/`,{
        method:"POST",
        body:JSON.stringify({
            "content":textValue
        }),
        headers:{
            "Authorization":token
        }})
        const data=await resp.json()
        window.location.reload();
    }

    return (
        <div className="cardlist">
            {messages.map((message)=>{
                return <Card message={message} key={message[0]}/>
            })}
                <textarea id="message" rows="4" value={textValue} onChange={handleTextChange} className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500
                focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" ></textarea>
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mt-4 rounded" onClick={handleClickButton}>
                new message
                </button>
        </div>
    )
}
