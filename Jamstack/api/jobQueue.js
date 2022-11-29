const jobQueue=[];
import { grade } from "./grade.js";
import { updateSolution,saveSolution } from "./database.js";

const handleQueue = async () => {
    if (!jobQueue.length > 0) {
        return setTimeout(() => {handleQueue()}, 1000);
    }

    while(jobQueue.length > 0) {
        const job = jobQueue.shift();
    
        // console.log(job,"job");
        const result=await grade(job.solution);
        
        await updateSolution(job.solution,job.userId,job.problem_id,result);

    }

    setTimeout(() => handleQueue(), 1000);
}
handleQueue();
export {jobQueue};