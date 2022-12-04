import { Client } from "https://deno.land/x/postgres@v0.17.0/mod.ts";

const client = new Client({
    host:Deno.env.get("PGHOST"),
    user:Deno.env.get("PGUSER"),
    password:Deno.env.get("PGPASSWORD"),
    database:Deno.env.get("PGDATABASE"),
    port:5432
  });
  await client.connect();

const createUser = async (token) => {
    const response=await client.queryArray("INSERT INTO users (token) VALUES ($1)", [token]);
   return response;
};

const saveSolution= async (solution,userId,problem_id,status) => {
    const response = await client.queryArray("INSERT INTO problems (problem_id, ifSaved, solution, user_id) VALUES ($1, $2, $3, $4)", [String(problem_id), status, solution, userId]);
    return response.rows;
};

const updateSolution=async (solution,userId,problem_id,status) => {
    const response = await client.queryArray("update problems set solution = $1, ifSaved=$4 where user_id=$2 and problem_id=$3",[solution,userId,String(problem_id),status]);
    return response.rows;
};

const submitSolution = async (solution,userId,isSaved) => {
    // check if the solution already exists
    const response=await client.queryArray("SELECT * FROM problems WHERE user_id = ${userId}", userId);
    if(response.rows.length===0) {
        const response = await client.queryArray("INSERT INTO problems (solution, user_id) VALUES (${solution}, ${userId})", solution, userId);
        return response;
    }else{
        const response = await client.queryArray("UPDATE problems SET solution = ${solution} WHERE user_id = ${userId}", solution, userId);
        return response;
    }
};

const getAllSolutions = async (userId) => {
    const response = await client.queryArray("SELECT * FROM problems WHERE user_id = $1", [userId]);
    return response.rows;
}

const getOneSolution=async (userId,problem_id) => {
    const response = await client.queryArray("SELECT * FROM problems WHERE user_id = $1 and problem_id=$2", [userId,problem_id]);
    return response.rows;
}

const getUserId = async (token) => {
    const response = await client.queryArray("SELECT * FROM users WHERE token = $1", [token]);
    console.log(token,response.rows);
    return response.rows[0][0];
}

export { createUser, saveSolution, getAllSolutions, getUserId,submitSolution,updateSolution,getOneSolution};
