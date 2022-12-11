import {useState, useEffect} from 'react';
import Card from './Card.jsx';
import List from 'rc-virtual-list';



export default function CardList() {

    const [textValue,setTextValue]=useState("");
    const [messages,setMessages]=useState([]);

    const fetchData = async () => {
        let token=localStorage.getItem("token");
        const resp=await fetch(`http://localhost:7800/api?offset=${messages.length}`,{
        method:"GET",
        headers:{
            "Authorization":localStorage.getItem("token")
        }})
        const data=await resp.json()
        setMessages(message=>message.concat(data));
        if(!token){
            localStorage.setItem("token",await resp.headers.get("Authorization"));
        }
    }

    useEffect(()=>{
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

    const onScroll = (e) => {
        if (e.currentTarget.scrollHeight - e.currentTarget.scrollTop === ContainerHeight) {
            fetchData();
        }
    };

    const ContainerHeight=500;
    return (
        <div className="cardlist p-4">
            <textarea id="message" rows="4" value={textValue} onChange={handleTextChange} className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500
                focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" ></textarea>
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mt-4 rounded" onClick={handleClickButton}>
                new message
            </button>
                <List
                data={messages}
                height={ContainerHeight}
                itemHeight={50}
                onScroll={onScroll}
                itemKey={(index, data) => index}
                >
                    {(message)=>{
                        return <Card message={message} key={message[0]}/>
                    }}
                </List>
        </div>
    )
}
