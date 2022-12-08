import { Client } from "https://deno.land/x/postgres@v0.17.0/mod.ts";

const client = new Client({
    host:Deno.env.get("PGHOST"),
    user:Deno.env.get("PGUSER"),
    password:Deno.env.get("PGPASSWORD"),
    database:Deno.env.get("PGDATABASE"),
    port:5432
  });
  await client.connect();

    // GET all messages// get message detail information
  // POST: post new message, reply to a message, upvote a message, downvote a message

const createUser = async (token) => {
    const response=await client.queryArray("INSERT INTO users (token) VALUES ($1)", [token]);
   return response;
};

const getUserId = async (token) => {
    const response = await client.queryArray("SELECT * FROM users WHERE token = $1", [token]);
    return response.rows[0][0];
}

const getAllMessages = async () => {
    const response = await client.queryArray("SELECT * FROM messages");
    return response.rows;
}

const getMessageReplies = async (message_id) => {
    const response = await client.queryArray("SELECT * FROM replies WHERE message_id=$1", [message_id]);
    return response.rows;
}

const postMessage = async (content, userId) => {
    const response = await client.queryArray("INSERT INTO messages (content, user_id) VALUES ($1, $2)", [content, userId]);
    return response.rows;
}

const postReply = async (content, userId, message_id) => {
    const response = await client.queryArray("INSERT INTO replies (content, user_id, message_id) VALUES ($1, $2, $3)", [content, userId, message_id]);
    return response.rows;
}

const upvoteMessage = async (message_id) => {
    const response = await client.queryArray("UPDATE messages set votes=votes+1 where (id=$1)", [message_id]);
    return response.rows;
}

const downvoteMessage = async (message_id) => {
    const response = await client.queryArray("UPDATE messages set votes=votes-1 where (id=$1)", [message_id]);
    return response.rows;
}

export { createUser, getUserId, getAllMessages, getMessageReplies, postMessage, postReply, upvoteMessage, downvoteMessage};