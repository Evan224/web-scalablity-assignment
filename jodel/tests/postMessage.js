import http from "k6/http";
export const options = { 
    duration: "10s",
    vus: 100,
    summaryTrendStats: ["avg","med", "p(99)", "p(95)"],
};
export default function () { 
    http.post("http://localhost:7800/api",JSON.stringify({
        "content":"This is the test message"
    }),{headers:{"Content-Type":"application/json"}}); 
}