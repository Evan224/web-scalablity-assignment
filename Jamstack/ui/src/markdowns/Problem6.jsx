import ReactMarkdown from 'react-markdown'

export default function Problem1() {
    return (
        <div className="card-list shadow-sm">
             <div className="text-2xl font-xl">
             Average of positives
            </div>
        <div>
            <ReactMarkdown>
            Write a function double averageOfPositives(List`int` numbers) that returns the average value of the positive numbers on the list. If there are no positive values, the function should return the value -1.
            </ReactMarkdown>
        </div>
        </div>
    );
}