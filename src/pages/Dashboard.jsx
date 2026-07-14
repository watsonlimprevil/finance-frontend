import { useEffect, useState } from "react";
import { API_URL, authHeader } from "../utils/api.js";
import Summary from "../components/Summary.jsx";
import Transactions from "../components/Transactions.jsx";
import CategoryPieChart from "../components/CategoryPieChart.jsx";
import AddTransaction from "../components/AddTransactions.jsx";
import EditTransaction from "../components/EditTransactions.jsx";
import { DeleteConfirm } from "./Delete.jsx";
import MonthlyTrendChart from "../components/MonthlyTrendChart.jsx";
import Insights from "./Insights.jsx";
import BudgetProgress from "../components/BudgetProgress.jsx";
export default function Dashboard() {
  const [summary, setSummary] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [editing, setEditing] = useState(null);
  const [deleting , setDeleting] = useState(null)
  const [loading , setLoading] = useState(true)
  const [error , setError] = useState(null)
  const [page , setPage] = useState(1);
  const [limit] = useState(10);
  const [totalPages , setTotalPages] = useState(1)
  const [typeFilter , setTypeFilter] = useState('')
  const [categoryFilter , setCategoryFilter] = useState('')
  const [startDate, setStartDate] = useState('');
  const [endDate , setEndate] = useState('')
  const [sort , setSort] = useState('');
  const [order, setOrder] = useState('desc')
  const [trends, setTrends]= useState([])
  const [budgetProgress , setBudgetProgress] = useState(null)
  const [search , setSearch] = useState('')
  const [searchResults , setSearchResults] = useState(null)
  useEffect(() => {
   
      reloadAll()
  
  }, []);

  async function loadBudgetProgress() {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/transactions/budgets/progress`, {
    headers: authHeader()
  });

  const data = await res.json();
  setBudgetProgress(data.progress);
}


async function reloadAll() {
  setLoading(true);
  setError(null);

  try {
    await loadSummary();   // only summary reloads
    await loadTransactions()
    await loadTrends()
    await loadBudgetProgress()
  } catch (error) {
    setError("Failed to load dashboard data");
  } finally {
    setLoading(false);
  }
}

useEffect(()=>{
  if(!search.trim()) {
    setSearchResults(null);
    return
  }

  const timeout = setTimeout(()=>{
    handleSearch()
  },300)
  return () => clearTimeout(timeout)
}, [search])
  async function loadSummary() {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/transactions/summary`, {
      headers: authHeader()
    });
    console.log(res)
    setSummary(await res.json());
  }

  async function loadTransactions() {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/transactions?page=${page}&limit=${limit}&type=${typeFilter}&category=${categoryFilter}&startDate=${startDate}&endDate=${endDate}&sort=${sort}&order=${order}`, {
      headers: authHeader()
    });
    const data = await res.json();
    setTransactions(data.transactions);
    setTotalPages(Math.ceil(data.total / limit))
  }
  useEffect(() => {
    loadTransactions()
  }, [page])


 async function confirmDelete(){
  await fetch(`${import.meta.env.VITE_API_URL}/transactions/${deleting.id}`, {
    method: 'DELETE',
    headers: authHeader()
  })
  setDeleting(null)
  reloadAll()
 }
 function cancelDelete() {
  setDeleting(null);
}

async function loadTrends(){
  const res = await fetch(`${import.meta.env.VITE_API_URL}/transactions/trends` , {
    headers: authHeader()
  });

  const data = await res.json();
  setTrends(data.trends);
}

async function handleSearch(){
  if(!search.trim()) return;

  const res = await fetch(
    `${import.meta.env.VITE_API_URL}/transactions/search?q=${search}` ,{
      headers : authHeader()
    }
  );

  const data = await res.json();
  setSearchResults(data.results)
}

function claerSEarch(){
  setSearch('');
  setSearchResults(null)
}
  // RENDER STATES
  if (loading) {
    return (
      <div>
        <h1>Dashboard</h1>
        <p style={{ color: "white" }}>Loading dashboard…</p>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <h1>Dashboard</h1>
        <p style={{ color: "red" }}>{error}</p>
        <button onClick={reloadAll}>Retry</button>
      </div>
    );
  }
  console.log("Dashboard is inside Layout");
  return (
  

  <>
    <div className="section">
      <h1>Dashboard</h1>
    </div>
<div className="section">
<input 
type="text"
placeholder="Search transactions"
value={search}
onChange={e=> setSearch(e.target.value)}
style={{padding: '10px' , width: '250px'}}
/>
<button onClick={handleSearch}>Search</button>
<button onClick={claerSEarch}>Clear</button>
</div>
    <div className="section">
      <Summary summary={summary} />
    </div>

    <div className="section">
      <Insights summary={summary} />
    </div>

    <div className="section">
  <BudgetProgress progress={budgetProgress} />
</div>


    <div className="section">
      <CategoryPieChart data={summary?.byCategory || []} />
    </div>

    <div className="section">
      <MonthlyTrendChart data={trends} />
    </div>

    <div className="section">
      <AddTransaction reload={reloadAll} />
    </div>

    <div className="section">
      <EditTransaction editing={editing} cancel={() => setEditing(null)} reload={reloadAll} />
    </div>

    <div className="section">
      <select value={typeFilter} onChange={e => setTypeFilter(e.target.value)}>
        <option value=''>All Types</option>
        <option value='income'>Income</option>
        <option value='expense'>Expense</option>
      </select>

      <select value={categoryFilter} onChange={e => setCategoryFilter(e.target.value)}>
        <option value=''>All Categories</option>
        <option value='food'>Food</option>
        <option value='car'>Car</option>
        <option value='rent'>Rent</option>
      </select>

      <input type="date" value={startDate} onChange={e => setStartDate(e.target.value)} />
      <input type="date" value={endDate} onChange={e => setEndate(e.target.value)} />

      <select value={sort} onChange={e => setSort(e.target.value)}>
        <option value=''>Sort By</option>
        <option value='date'>Date</option>
        <option value='amount'>Amount</option>
      </select>

      <select value={order} onChange={e => setOrder(e.target.value)}>
        <option value='desc'>Descending</option>
        <option value='asc'>Ascending</option>
      </select>

      <button onClick={() => loadTransactions()}>Apply</button>
    </div>

    <div className="section">
     {searchResults ?(
      <Transactions 
      transactions={searchResults}
      reload={reloadAll}
      startEdit={t => setEditing(t)}
      remove={t => setDeleting(t)}
      />
     ):(
      <Transactions
      transactions={transactions}
      reload={reloadAll}
      startEdit={t => setEditing(t)}
      remove={t => setDeleting(t)}
      />
     )}
    </div>

    <div className="section">
      <button disabled={page === 1} onClick={() => setPage(page - 1)}>Previous</button>
      <span style={{ margin: '0 10px' }}>Page {page} of {totalPages}</span>
      <button disabled={page === totalPages} onClick={() => setPage(page + 1)}>Next</button>
    </div>

    <div className="section">
      <DeleteConfirm deleting={deleting} cancel={cancelDelete} confirm={confirmDelete} />
    </div>
  </>
);

}

