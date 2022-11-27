import http from "k6/http";
export const options = { 
    duration: "10s",
    vus: 100,
    summaryTrendStats: ["avg","med", "p(99)", "p(95)"],
};
export default function () { 
    http.post("http://localhost:7800/api",JSON.stringify({
        problem_id: 1,
        solution: "def add(a,b):\n    return a+b",
        ifSaved: ""
    }),{headers:{"Content-Type":"application/json"}}); 
}