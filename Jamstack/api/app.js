import { serve } from "./deps.js";
import { grade } from "./grade.js";
import {createUser, saveSolution, getAllSolutions, getUserId,updateSolution,getOneSolution} from "./database.js";
import { jobQueue } from "./jobQueue.js";

const handleRequest = async (request) => {
  let token= request.headers.get("Authorization");
  const respheaders = new Headers();
  console.log(typeof token, token);
  if(!token||token==="null") {
    token=crypto.randomUUID();
    await createUser(token);
    console.log('new user',token);
  }
  respheaders.set("Authorization", token);
  const path=request.url.split('/api/')[1];
  let userId;
  try{
    userId=await getUserId(token);
  }catch(err){
    await createUser(token);
  }
  

  if(request.method==="GET") {
      console.log('get',path);
      let resp;
      if(!path) {
       resp=await getAllSolutions(userId);
      }else{
        resp=await getOneSolution(userId,path);
      }
      return new Response(JSON.stringify({problems:resp}), {
        headers: respheaders,
      });
  }else{
      const body=await request.json();
      console.log(body,'body');
      const {problem_id, solution,ifSaved} = body;
      console.log("problem_id",problem_id,"solution",solution,"ifSaved",ifSaved);
      jobQueue.push({problem_id, solution,userId,ifSaved});

      if(ifSaved&&ifSaved.length>0){ 
           await updateSolution(solution,userId,problem_id,"Pending");
      }else{
        await saveSolution(solution,userId,problem_id,"Pending");
      }
  }

  return new Response(JSON.stringify({ status:"success" }), {
    headers: respheaders,
  });







};

serve(handleRequest, { port: 7777 });
