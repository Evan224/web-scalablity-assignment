import ReactMarkdown from 'react-markdown'

export default function Problem1() {
    return (
        <div className="card-list shadow-sm">
             <div className="text-2xl font-xl">
             Budget check
            </div>
        <div>
            <ReactMarkdown>
            Write a function String budgetCheck(double budget, double currentSpending) that returns information on whether a given budget is in order in light of given spending. If the value of currentSpending is larger than the value of budget, the function should return "Budget: Overspending". Otherwise, the function should return "Budget: OK".
            </ReactMarkdown>
        </div>
        </div>
    );
}