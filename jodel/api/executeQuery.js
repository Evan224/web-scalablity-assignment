import { Pool } from "https://deno.land/x/postgres@v0.17.0/mod.ts";
const CONCURRENT_CONNECTIONS = 2; 

let connectionPool; 

if (Deno.env.get("PG_CLUSTER_RW_SERVICE_HOST")) { 
    console.log("PG_CLUSTER_RW_SERVICE_HOST: " + Deno.env.get("PG_CLUSTER_RW_SERVICE_HOST"))
    console.log("PG_CLUSTER_RW_SERVICE_PORT: " + Deno.env.get("PG_CLUSTER_RW_SERVICE_PORT"))
    console.log("PGUSER: " + Deno.env.get("PGUSER"))
    console.log("PGPASSWORD: " + Deno.env.get("PGPASSWORD"))
    console.log("PGDATABASE: " + Deno.env.get("PGDATABASE"))
    connectionPool = new Pool({ 
        host:Deno.env.get("PG_CLUSTER_RW_SERVICE_HOST"),
        user:Deno.env.get("PGUSER"),
        password:Deno.env.get("PGPASSWORD"),
        port:5432,
        // port:Deno.env.get("PG_CLUSTER_RW_SERVICE_PORT"),
        database:Deno.env.get("PGDATABASE")
 }, CONCURRENT_CONNECTIONS); 
 } else { 
    connectionPool = new Pool({
        host:Deno.env.get("PGHOST"),
        user:Deno.env.get("PGUSER"),
        password:Deno.env.get("PGPASSWORD"),
        database:Deno.env.get("PGDATABASE"),
        port:5432  
    }, CONCURRENT_CONNECTIONS); 
 } 



 const executeQuery = async (query, params) => { 
    const response = {}; 
    let client; 
    try { 
        client = await connectionPool.connect(); 
        const result = await client.queryArray(query, params); 
        if (result.rows) { 
        response.rows = result.rows; 
        } 
    } catch (e) { 
        console.log(e); 
        response.error = e; 
    } finally { 
         if (client) { 
            try { 
                await client.release(); 
            } catch (e) { 
                console.log("Unable to release database connection."); 
                console.log(e); 
            } 
        } 
    } 
    return response; 
 }; 


 export { executeQuery }; 