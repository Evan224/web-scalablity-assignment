import ReactMarkdown from 'react-markdown'

export default function Problem1() {
    return (
        <div className="card-list shadow-sm">
             <div className="text-2xl font-xl">
             Sum of negative numbers
            </div>
        <div>
            <ReactMarkdown>
            `Write a function int sumOfNegatives(numbers) that returns the sum of the negative numbers in the given list. For example, if the numbers list would contain the numbers -1, 2, -4, the function should return the value -5.`
            </ReactMarkdown>
        </div>
        </div>
    );
}