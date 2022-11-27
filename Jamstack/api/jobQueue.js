const jobQueue=[];
import { grade } from "./grade.js";
import { updateSolution,saveSolution } from "./database.js";

const handleQueue = async () => {
    if (!jobQueue.length > 0) {
        return setTimeout(() => {handleQueue()}, 1000);
    }

    while(jobQueue.length > 0) {
        const job = jobQueue.shift();
        

        const result=await grade(job.solution);
        if(job.ifSaved){
            await updateSolution(job.solution,job.userId,job.problem_id,result);
        }else{
            await saveSolution(job.solution,job.userId,job.problem_id,result);
        }
    }



    setTimeout(() => handleQueue(), 1000);
}
handleQueue();
export {jobQueue};