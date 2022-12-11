import { executeQuery } from "./executeQuery.js";

    // GET all messages// get message detail information
  // POST: post new message, reply to a message, upvote a message, downvote a message

const createUser = async (token) => {
    // const response=await client.queryArray("INSERT INTO users (token) VALUES ($1)", [token]);
    const response = await executeQuery("INSERT INTO users (token) VALUES ($1)", [token]);
    return response;
};

const getUserId = async (token) => {
    const response = await executeQuery("SELECT * FROM users WHERE token = $1", [token]);
    // const response = await client.queryArray("SELECT * FROM users WHERE token = $1", [token]);
    return response.rows[0][0];
}

const getAllMessages = async (offset) => {
    const response = await executeQuery("SELECT * FROM messages ORDER BY time DESC LIMIT 20 offset $1", [offset]);
    // const response = await client.queryArray("SELECT * FROM messages ORDER BY time DESC LIMIT 20 offset $1", [offset]);
    return response.rows;
}

const getOneMessage = async (message_id) => {
    const response = await executeQuery("SELECT * FROM messages WHERE id=$1", [message_id]);
    // const response = await client.queryArray("SELECT * FROM messages WHERE id=$1", [message_id]);
    return response.rows;
}

const getMessageReplies = async (message_id) => {
    const response = await executeQuery("SELECT * FROM replies WHERE message_id=$1", [message_id]);
    // const response = await client.queryArray("SELECT * FROM replies WHERE message_id=$1", [message_id]);
    return response.rows;
}

const postMessage = async (content, userId) => {
    const response = await executeQuery("INSERT INTO messages (content, user_id) VALUES ($1, $2)", [content, userId]);
    // const response = await client.queryArray("INSERT INTO messages (content, user_id) VALUES ($1, $2)", [content, userId]);
    return response.rows;
}

const postReply = async (content, userId, message_id) => {
    const response = await executeQuery("INSERT INTO replies (content, user_id, message_id) VALUES ($1, $2, $3)", [content, userId, message_id]);
    // const response = await client.queryArray("INSERT INTO replies (content, user_id, message_id) VALUES ($1, $2, $3)", [content, userId, message_id]);
    return response.rows;
}

const upvoteMessage = async (message_id) => {
    const response = await executeQuery("UPDATE messages set votes=votes+1 where (id=$1)", [message_id]);
    // const response = await client.queryArray("UPDATE messages set votes=votes+1 where (id=$1)", [message_id]);
    return response.rows;
}

const downvoteMessage = async (message_id) => {
    const response = await executeQuery("UPDATE messages set votes=votes-1 where (id=$1)", [message_id]);
    // const response = await client.queryArray("UPDATE messages set votes=votes-1 where (id=$1)", [message_id]);
    return response.rows;
}

const randomInsert20Messages = async () => {
    for(let i=0; i<100; i++){
        const response = await executeQuery("INSERT INTO messages (content, user_id) VALUES ($1, $2)", [`test${i}`, 1]);
        // const response = await client.queryArray("INSERT INTO messages (content, user_id) VALUES ($1, $2)", [`test${i}`, 1]);
    }
    return [];
}

export { createUser, getUserId, getAllMessages, getMessageReplies, postMessage, postReply, upvoteMessage, downvoteMessage,getOneMessage,randomInsert20Messages};