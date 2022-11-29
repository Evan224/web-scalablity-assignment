import ReactMarkdown from 'react-markdown'

export default function Problem1() {
    return (
        <div className="card-list shadow-sm">
             <div className="text-2xl font-xl">
             Sum with formula
            </div>
        <div>
            <ReactMarkdown>
            Write a function String sumWithFormula(int first, int second) that returns the written out sum of the given integers and the sum. As an example, the function call sumWithFormula(1, 2) should return the string 1+2=3 and the function call sumWithFormula(1, 1) should return the string 1+1=2. Note! Do not add spaces to the returned string.
            </ReactMarkdown>
        </div>
        </div>
    );
}