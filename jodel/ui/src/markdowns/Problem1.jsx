import React from 'react'
import ReactDom from 'react-dom'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

export default function Problem1() {
    return (
        <div className="card-list shadow-sm">
            <div className="text-2xl font-xl">
                 Sum of three values
            </div>
        <div>
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
            

            Write a function int sum(int first, int second, int third) that returns the sum of the given integers. As an example, the function call sum(1, 2, 3) should return the value 6.
            
            </ReactMarkdown>
        </div>
        </div>
    );
}