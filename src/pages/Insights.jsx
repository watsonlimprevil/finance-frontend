export default function Insights({summary}){
    return(
        <div>
            <h1>Insights</h1>
        <p>
        Highest Category:
        {summary?.highestCategory?.category 
        ? `${summary?.highestCategory?.category} ($${summary?.highestCategory?.total})`
        : 'none'
        }
       </p>
       <p>
        Avegrage Daily Spending: ${summary?.averageDailySpending}
       </p>
       <p>
        Total Transactions: {summary?.count}
       </p>
        </div>
    )
}