import ReactMarkdown from 'react-markdown'

export default function Problem1() {
    return (
        <div className="card-list shadow-sm">
             <div className="text-2xl font-xl">
             Team
            </div>
        <div>
            <ReactMarkdown>
            Create a class Team and implement the two following constructors (and necessary properties) to the class. The default constructor should have three properties: (1) the name of the team (String), (2) the home town of the team (String), and (3) the year the team was formed (int). The named constructor nameAndYear should have two properties: (1) the name of the team (String) and (2) the year the team was formed (int). In the case of the named constructor, the home town of the team must be "Unknown".

Once completed, add a toString method to the class which leads to outputs outlined by the following examples.
            </ReactMarkdown>
            <div>
                final hjk = Team("HJK", "Helsinki", 1907);
                print(hjk);
                final secret = Team.nameAndYear("Secret", 1984);
                print(secret);
            </div>
            <ReactMarkdown>
            With the code above, the output should be as follows.
            </ReactMarkdown>
            <div>
            HJK (Helsinki, 1907)
Secret (Unknown, 1984)
            </div>
        </div>
        </div>
    );
}