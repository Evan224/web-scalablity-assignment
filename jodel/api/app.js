import { serve } from "./deps.js";
import { createUser, getUserId, getAllMessages, getMessageReplies, postMessage,getOneMessage,
   postReply, upvoteMessage, downvoteMessage} from "./database.js";
// import { jobQueue } from "./jobQueue.js";

const handleUserId=async (request)=>{
  let token= request.headers.get("Authorization");

  if(!token||token==="null") {
    token=crypto.randomUUID();
    await createUser(token);
    // console.log('new user',token);
  }

  let userId;
  try{
    userId=await getUserId(token);
  }catch(err){
    await createUser(token);
  }

  return [userId,token];
}

const handleRequest = async (request) => {
  const [userId,token]=await handleUserId(request);
  const respheaders = new Headers();
  respheaders.set("Authorization", token);

  const path=request.url.split('/api/')[1];
  const method=request.method;
  // GET all messages// get message detail information
  // POST: post new message, reply to a message, upvote a message, downvote a message
  if(method==="GET") {
    if(!path) { //all messages
        const messages=await getAllMessages();
        return new Response(JSON.stringify(messages), {
          headers: respheaders,
        });
      }
    if(path.includes('reply')){
      const message_id=path.split('reply/')[1];
      const replies=await getMessageReplies(message_id);
      return new Response(JSON.stringify(replies), {
        headers: respheaders,
      });
    }else{
      const message_id=path;
      const message=await getOneMessage(message_id);
      const replies=await getMessageReplies(message_id);

      return new Response(JSON.stringify({
        message,
        replies
      }), {
        headers: respheaders,
      });
    }
  };
  // console.log(method);
  if(method==="POST") {
    const body=await request.json();
 
    if(!path) { //new message
      const response=await postMessage(body.content,userId);
      return new Response(JSON.stringify(response), {
        headers: respheaders,
      });
    }
    if(path==="reply") { //reply to a message
      const response=await postReply(body.content,userId,body.message_id);
      return new Response(JSON.stringify(response), {
        headers: respheaders,
      });
    }
    if(path==="upvote") { //upvote a message
      const response=await upvoteMessage(body.message_id);
      return new Response(JSON.stringify(response), {
        headers: respheaders,
      });
    }
    if(path==="downvote") { //downvote a message
      const response=await downvoteMessage(body.message_id);
      return new Response(JSON.stringify(response), {
        headers: respheaders,
      });
    }
  }

  return new Response(JSON.stringify({error:"the path is not correct!"}), {
    headers: respheaders,
  });
};

serve(handleRequest, { port: 7777 });
