export default function Summary({summary}){
  if(!summary) return null;

  return(
   
    <div className='card' style={{marginBottom:'20px'}}>
       <h2>Summary</h2>
       <p><strong>Total Income</strong>${summary.income}</p>
       <p><strong>Total expenses</strong>${summary.expenses}</p>
       <p><strong>Net:</strong>${summary.net}</p>


       <h3>This Month</h3>
       <p>income: ${summary.thisMonth.income}</p>
       <p>Expenses: ${summary.thisMonth.expenses}</p>
       <p>Net: ${summary.thisMonth?.net}</p>

       <h3>Last 30 Days</h3>
       <p>Income: ${summary.last30Days?.income}</p>
       <p>Expenses:${summary.last30Days?.expenses}</p>
       <p>Net: ${summary.last30Days?.net}</p>

       <h3>Insights</h3>
       <p>
        Highest Category:
        {summary.highestCategory?.category 
        ? `${summary.highestCategory?.category} ($${summary.highestCategory?.total})`
        : 'none'
        }
       </p>
       <p>
        Avegrage Daily Spending: ${summary.averageDailySpending}
       </p>
       <p>
        Total Transactions: {summary.count}
       </p>
    </div>
  )
}