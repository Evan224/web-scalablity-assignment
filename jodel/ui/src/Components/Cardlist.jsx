import {useState, useEffect,useMemo} from 'react';
import Card from './Card.jsx';
import { Link,useNavigate } from "react-router-dom";
export default function CardList() {

    // [messageId,content,vote,user_id,time])
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

    return (
        <div className="cardlist">
            {messages.map((message)=>{
                return <Card message={message} key={message[0]}/>
            })}
        </div>
    )
}
