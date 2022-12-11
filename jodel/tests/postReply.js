import http from "k6/http";
export const options = { 
    duration: "10s",
    vus: 100,
    summaryTrendStats: ["avg","med", "p(99)", "p(95)"],
};
export default function () { 
    http.post("http://localhost:7800/api/reply",JSON.stringify({
        "content":"This is the test reply",
        "message_id":1
    }),{headers:{"Content-Type":"application/json"}}); 
}
