import { serve } from "./deps.js";
import { grade } from "./grade.js";
import {createUser, saveSolution, getAllSolutions, getUserId,updateSolution} from "./database.js";
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

  const userId=await getUserId(token);

  if(request.method==="GET") {
      const resp=await getAllSolutions(userId);
      return new Response(JSON.stringify({problems:resp}), {
        headers: respheaders,
      });
  }else{
      const body=await request.json();
      const {problem_id, solution,ifSaved} = body;
      // console.log(body);
      jobQueue.push({problem_id, solution,userId,ifSaved});

      // const result=await grade(solution);
      // console.log("result",result);
      // console.log(ifSaved,"ifSaved");
      if(ifSaved!=="") {
          const response = await updateSolution(solution,userId,problem_id,"Pending");
      }else{
          const response = await saveSolution(solution,userId,problem_id,"Pending");
      }
  }

  return new Response(JSON.stringify({ status:"success" }), {
    headers: respheaders,
  });







};

serve(handleRequest, { port: 7777 });
